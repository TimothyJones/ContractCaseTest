import filenamify from 'filenamify';
import slug from 'slug';
import { mkdirp } from 'mkdirp';

import * as fs from 'fs';
import * as path from 'path';

import type { WriteContract } from '../../core/types';

import { CaseConfigurationError } from '../../entities';
import type {
  HasContractFileConfig,
  CaseContractDescription,
  ContractData,
  DataContext,
} from '../../entities/types';

const checkCurrentRunField = <T extends DataContext>(
  context: DataContext,
  configName: string
) => {
  const maybeCaseContractConfig = context as T;
  const fieldName = `_case:currentRun:context:${configName}`;
  if (fieldName in maybeCaseContractConfig) {
    const value = maybeCaseContractConfig[fieldName as keyof T];
    if (typeof value === 'string' && value !== '') {
      context.logger.maintainerDebug(
        `Validated config field '${fieldName}', accepted '${value}'`
      );
      return true;
    }
    context.logger.maintainerDebug(
      `Failed validation for config field '${fieldName}', failed '${value}'`
    );
  } else {
    context.logger.maintainerDebug(
      `Failed validation for config field '${fieldName}', not present in context`,
      context
    );
  }

  context.logger.error(
    `Missing configuration field '${configName}'. Please ensure it is set to a non-empty string.`
  );

  return false;
};

const isCaseContractConfig = (
  context: DataContext
): context is HasContractFileConfig =>
  ['testRunId', 'contractDir']
    .map((field) => checkCurrentRunField(context, field))
    .reduce((acc, curr) => acc && curr, true);

const EXTENSION = '.case.json';

const escapeFileName = (pathString: string) => filenamify(pathString);

const makeFilename = (
  description: CaseContractDescription,
  config: HasContractFileConfig
) =>
  escapeFileName(
    `${slug(`${description.consumerName}-${description.providerName}`)}-${
      config['_case:currentRun:context:testRunId']
    }${EXTENSION}`
  );

const makePath = (
  description: CaseContractDescription,
  config: HasContractFileConfig
) =>
  path.join(
    config['_case:currentRun:context:contractDir'],
    makeFilename(description, config)
  );

export const writeContract: WriteContract = (
  contract: ContractData,
  context: DataContext
): string => {
  if (!isCaseContractConfig(context)) {
    throw new CaseConfigurationError(
      'Unable to write contract without required configuration options set. See the error logs for more information.'
    );
  }
  if (
    context['_case:currentRun:context:contractFilename'] !== undefined &&
    context['_case:currentRun:context:contractDir'] !==
      context['_case:currentRun:context:defaultConfig']['contractDir']
  ) {
    context.logger.warn(
      'Both contractFilename and contractDir have been specified, but you should only set one of these when writing a contract.'
    );

    context.logger.warn(
      `Ignoring contractDir setting, and writing to file at: ${context['_case:currentRun:context:contractFilename']}`
    );
  }

  const pathToFile = context['_case:currentRun:context:contractFilename']
    ? context['_case:currentRun:context:contractFilename']
    : makePath(contract.description, context);

  context.logger.maintainerDebug(`About to write contract to '${pathToFile}'`);
  const dirName = path.dirname(pathToFile);
  if (!fs.existsSync(dirName)) {
    context.logger.maintainerDebug(`Creating directory ${dirName}`);
    try {
      mkdirp.sync(dirName);
    } catch (e) {
      throw new CaseConfigurationError(
        `Failed trying to create contract directory '${dirName}': ${
          (e as Error).message
        }`
      );
    }
  }

  if (
    fs.existsSync(pathToFile) &&
    !context['_case:currentRun:context:overwriteFile']
  ) {
    context.logger.error(
      `Can't write to '${pathToFile}, as it already exists'`
    );
    throw new CaseConfigurationError(`The file ${pathToFile} already exists`);
  }
  fs.writeFileSync(pathToFile, JSON.stringify(contract, undefined, 2));
  return pathToFile;
};
