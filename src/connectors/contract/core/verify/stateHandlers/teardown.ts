import { CaseConfigurationError } from 'entities';
import { addLocation } from 'entities/context';
import {
  type StateFunctions,
  type AnyState,
  isSetupFunction,
} from 'entities/states/types';
import type { MatchContext } from 'entities/types';

const stateTeardownHandler = (
  stateSetups: StateFunctions,
  state: AnyState,
  parentContext: MatchContext
) =>
  Promise.resolve(addLocation(`[${state.stateName}]`, parentContext)).then(
    (context) =>
      Promise.resolve()
        .then(async () => {
          const stateFn = stateSetups[state.stateName];
          if (stateFn !== undefined && !isSetupFunction(stateFn)) {
            context.logger.debug(
              `Calling state teardown for '${state.stateName}'`
            );
            await stateFn.teardown();
          } else {
            context.logger.debug(
              `No state teardown exists for '${state.stateName}'`
            );
          }
        })
        .catch((e) => {
          context.logger.error(
            `State teardown for '${state.stateName}' failed with: ${e.message}`,
            e
          );
          context.logger.error(
            `Please check the implementation of the '${state.stateName}' state teardown function`
          );
          throw new CaseConfigurationError(
            `State teardown '${state.stateName}}' failed: ${e.message}. Please check the implementation of your state teardown handler`
          );
        })
  );

export const executeTeardownHandlers = (
  states: Array<AnyState>,
  stateSetups: StateFunctions,
  parentContext: MatchContext
): Promise<unknown> =>
  Promise.resolve(addLocation(':stateTeardown', parentContext)).then(
    (context) =>
      Promise.resolve()
        .then(async () => {
          // Usually the following code is a mistake,
          // but here we want to execute each handler in order
          // So we turn off the usual lint rules on purpose.
          // eslint-disable-next-line no-restricted-syntax
          for (const state of states) {
            // eslint-disable-next-line no-await-in-loop
            await stateTeardownHandler(stateSetups, state, context);
          }
        })
        .catch((e) => {
          context.logger.error(
            `Test may have passed, but at least one state teardown failed`,
            e.message
          );
          throw new CaseConfigurationError(
            `State teardown errored: ${e.message}`
          );
        })
  );
