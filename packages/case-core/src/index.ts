import type {
  ArbitraryConfig,
  Assertable,
  MOCK_HTTP_SERVER,
} from './entities/types';

export * from './boundaries';
export * from './boundaries/types';
export { CaseConfig } from './core/types';
export * from './entities/errors';
export { LogLevel, AnyMockDescriptor } from './entities/types';

export * from './connectors';

export type HttpRequestConfig =
  | Assertable<typeof MOCK_HTTP_SERVER>['config']
  | ArbitraryConfig<typeof MOCK_HTTP_SERVER>;
