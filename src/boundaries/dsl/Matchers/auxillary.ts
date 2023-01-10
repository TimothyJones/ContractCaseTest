import { CaseConfigurationError, coreShapedArrayMatcher } from 'entities';
import {
  coreAndMatcher,
  coreArrayLengthMatcher,
} from 'entities/nodes/matchers/auxillary';
import {
  CoreArrayLengthMatcher,
  AnyCaseNodeOrData,
  CoreAndCombinationMatcher,
  CoreShapedArrayMatcher,
  CoreArrayContainsMatch,
  ARRAY_CONTAINS_MATCH,
} from 'entities/types';

type ArrayLengthOptions = { minLength?: number; maxLength?: number };

/**
 * Matches an Array whose length is within a certain range.
 *
 * @param options `ArrayLengthOptions { minLength?: number; maxLength?: number }`
 */
export const arrayLength = (
  options: ArrayLengthOptions
): CoreArrayLengthMatcher => {
  const matcher = coreArrayLengthMatcher(options);
  if (
    matcher['case:matcher:minLength'] === 0 &&
    matcher['case:matcher:maxLength'] !== 0
  ) {
    throw new CaseConfigurationError(
      "Can't create an arrayLength matcher with minimum size 0 and maximum size not 0. Use a raw empty array instead. See the documentation for details."
    );
    // TODO write documentation for this
  }
  return matcher;
};

/**
 * Matches an Array which contains elements that match the given matchers
 *
 * @param matchers
 */
export const arrayContains = (
  ...matchers: AnyCaseNodeOrData[]
): CoreArrayContainsMatch => ({
  'case:matcher:type': ARRAY_CONTAINS_MATCH,
  'case:matcher:matchers': matchers,
});

/**
 * Matches an Array whose length is within a certain range.
 *
 * @param options
 */
export const and = (
  ...matchers: AnyCaseNodeOrData[]
): CoreAndCombinationMatcher => coreAndMatcher(...matchers);

export const arrayStartsWith = (
  matchers: AnyCaseNodeOrData[]
): CoreShapedArrayMatcher => coreShapedArrayMatcher(matchers);
