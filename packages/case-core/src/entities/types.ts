import type { AnyMockDescriptorType } from './nodes/mocks/types';
import type { MatchResult } from './results/types';
import type { SetupInfoFor } from './nodes/mocks/setup.types';

export * from './results/types';
export * from './nodes/types';
export * from './context/types';
export * from './contract/types';
export * from './logger/types';
export * from './states/types';

export type Assertable<T extends AnyMockDescriptorType> = {
  config: SetupInfoFor<T>;
  assert: () => Promise<MatchResult>;
};
