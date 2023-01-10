import type { MatchContext } from 'entities/context/types';
import type { AnyState } from 'entities/states/types';
import { hasErrors } from 'entities/results/MatchResult';
import type { CaseContract } from 'connectors/contract';
import type {
  AnyInteractionType,
  CaseInteractionFor,
  Assertable,
  MatchResult,
} from 'entities/types';
import { handleResult } from 'entities/results';

import { setupExecutor } from './executor';
import { SetupExecutors } from './SetupExecutors';

export const setupVerify = <T extends AnyInteractionType>(
  interaction: CaseInteractionFor<T>,
  context: MatchContext
): Promise<Assertable<T>> =>
  setupExecutor(interaction, SetupExecutors, context);

export const setupAssert = <T extends AnyInteractionType>(
  states: Array<AnyState>,
  interaction: CaseInteractionFor<T>,
  context: MatchContext,
  contract: CaseContract
): Promise<Assertable<T>> =>
  setupVerify(interaction, context).then((assertable: Assertable<T>) => ({
    ...assertable,
    assert: () =>
      assertable.assert().then((result: MatchResult) => {
        context.logger.warn('NOT YET IMPLEMENTED: Index of interaction');
        if (hasErrors(result)) {
          handleResult(
            contract.recordFailure(interaction, states, context, result),
            0,
            result,
            context
          );
        } else {
          handleResult(
            contract.recordSuccess(interaction, states, context),
            0,
            result,
            context
          );
        }
        return result;
      }),
  }));