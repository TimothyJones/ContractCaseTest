import { addLocation } from 'entities/context';
import { mustResolveToString } from 'entities/nodes/matchers/resolve';
import { matchingError, makeResults } from 'entities/results';
import type {
  MatchContext,
  MatcherExecutor,
  MatchResult,
  CoreStringSuffixMatcher,
  STRING_SUFFIX_TYPE,
} from 'entities/types';

const check = async (
  matcher: CoreStringSuffixMatcher,
  matchContext: MatchContext,
  actual: unknown
): Promise<MatchResult> => {
  if (typeof actual !== 'string') {
    return makeResults(
      matchingError(
        matcher,
        `'${typeof actual}' is not a string`,
        actual,
        matchContext
      )
    );
  }

  return actual.endsWith(matcher['case:matcher:suffix'])
    ? matchContext.descendAndCheck(
        matcher['case:matcher:prefix'],
        addLocation(':suffix', matchContext),
        actual.substring(
          0,
          actual.length - matcher['case:matcher:suffix'].length
        )
      )
    : makeResults(
        matchingError(
          matcher,
          `The string '${actual}' did not end with the expected suffix '${matcher['case:matcher:suffix']}'`,
          actual,
          matchContext
        )
      );
};

export const StringSuffixMatcher: MatcherExecutor<typeof STRING_SUFFIX_TYPE> = {
  describe: (matcher: CoreStringSuffixMatcher, matchContext) =>
    `"${matchContext.descendAndDescribe(
      matcher['case:matcher:prefix'],
      addLocation(':prefix', matchContext)
    )}${matcher['case:matcher:suffix']}"`,
  check,
  strip: (matcher: CoreStringSuffixMatcher, matchContext) =>
    `${mustResolveToString(
      matcher['case:matcher:prefix'],
      addLocation(':suffix', matchContext)
    )}${matcher['case:matcher:suffix']}`,
};
