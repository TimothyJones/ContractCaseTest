import { Mutex } from 'async-mutex';

import { makeLogger as defaultMakeLogger } from '../logger';

import { CaseCoreError, CaseFailedAssertionError } from '../../entities';
import { applyNodeToContext, addLocation } from '../../entities/context';
import { nameMock, exampleToNames } from '../../entities/contract';
import { makeResults } from '../../entities/results';
import {
  type ContractDescription,
  type LogLevelContext,
  type Logger,
  SETUP_VARIABLE_STATE,
  type CaseExample,
  type MatchContext,
  ERROR_TYPE_EXECUTION,
  AnyMockDescriptorType,
} from '../../entities/types';
import { makeBrokerApi } from '../broker';

import { BaseCaseContract } from './BaseCaseContract';
import { DEFAULT_CONFIG, configToRunContext, executeExample } from './core';
import type { CaseConfig } from './core/types';
import { addExample, hasFailure } from './structure';
import type { TestInvoker } from './types';
import { writeContract } from './writer';

export class WritingCaseContract extends BaseCaseContract {
  testIndex = 0;

  mutex: Mutex;

  constructor(
    description: ContractDescription,
    config: CaseConfig = DEFAULT_CONFIG,
    makeLogger: (context: LogLevelContext) => Logger = defaultMakeLogger
  ) {
    super(description, config, makeLogger);
    this.mutex = new Mutex();
  }

  executeTest<T extends AnyMockDescriptorType>(
    { states = [], mock, trigger, stateHandlers = {} }: TestInvoker<T>,
    runConfig?: CaseConfig
  ): Promise<unknown> {
    const thisIndex = this.testIndex;
    this.testIndex += 1;

    const runContext = applyNodeToContext(mock, this.initialContext, {
      'case:currentRun:context:contractMode': 'write',
      'case:currentRun:context:testName': `${thisIndex}`,
      ...(runConfig ? configToRunContext(runConfig) : {}),
    });

    if (runContext['case:currentRun:context:contractMode'] !== 'write') {
      runContext.logger.warn(
        `The contractMode is expected to be 'write', but it was '${runContext['case:currentRun:context:contractMode']}'. If you are not expecting this message, this is almost certainly a misconfiguration`
      );
    }
    return this.mutex.runExclusive(() => {
      states.forEach((state) => {
        if (state['case:state:type'] === SETUP_VARIABLE_STATE) {
          Object.entries(state.variables).forEach(([key, value]) =>
            runContext.addDefaultVariable(key, state.stateName, value)
          );
        }
      });

      const example: CaseExample = {
        states,
        mock: nameMock(mock, runContext),
        result: 'PENDING',
      };

      return executeExample<T>(
        example,
        {
          stateHandlers,
          trigger,
          names: exampleToNames(example, `${this.testIndex}`),
        },
        this,
        runContext
      );
    });
  }

  recordExample(
    example: CaseExample,
    currentContext: MatchContext
  ): CaseExample {
    if (!this.currentContract) {
      currentContext.logger.error(
        'recordSuccess was called without initialising the contract file. This should not be possible.'
      );
      throw new CaseCoreError(
        'Contract was not initialised at the time that recordSuccess was called'
      );
    }
    if (example.result === 'PENDING') {
      throw new CaseCoreError(
        'Trying to record a pending example. This should never happen.'
      );
    }
    this.currentContract = addExample(
      this.currentContract,
      example,
      currentContext
    );
    return example;
  }

  endRecord(): Promise<unknown> {
    const writingContext = addLocation('WritingContract', this.initialContext);
    if (hasFailure(this.currentContract)) {
      // TODO: Print all failures
      throw new CaseFailedAssertionError(
        makeResults({
          type: ERROR_TYPE_EXECUTION,
          message: 'There were contract failures',
          code: 'FAIL',
          location: ['Writing Contract'],
          toString: () => 'There were contract failures',
        })
      );
    }
    //  - if success, write contract
    const fileName = writeContract(this.currentContract, writingContext);
    writingContext.logger.debug(`Wrote contract file: ${fileName}`);

    return makeBrokerApi().publishContract(
      this.currentContract,
      addLocation('PublishingContract', this.initialContext)
    );
  }
}