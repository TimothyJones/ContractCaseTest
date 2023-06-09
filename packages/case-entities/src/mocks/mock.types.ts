import { AnyCaseMatcher } from '../matchers/definitions.types';

export type AnyMockDescriptorType =
  | typeof MOCK_HTTP_SERVER
  | typeof MOCK_HTTP_CLIENT;

export const MOCK_HTTP_SERVER = '_case:MockHttpServer' as const;
export const MOCK_HTTP_CLIENT = '_case:MockHttpClient' as const;

export interface InternalContractCaseCoreBehaviour {
  type: AnyMockDescriptorType;

  stateVariables: 'state' | 'default';

  triggers: 'provided' | 'generated';
}

export interface InternalContractCaseCoreSetup {
  /**
   * Defines how the ContractCase core will behave when writing (ie, defining) an Example of this type.
   */
  write: InternalContractCaseCoreBehaviour;
  /**
   * Defines how the ContractCase core will behave when reading (ie, verifying) a Example of this type.
   */
  read: InternalContractCaseCoreBehaviour;
}

export interface HasTypeForMockDescriptor<T extends AnyMockDescriptorType> {
  '_case:mock:type': T;
  '_case:run:context:setup': InternalContractCaseCoreSetup;
}

export const isCaseMock = (
  maybeMock: unknown
): maybeMock is AnyMockDescriptor =>
  typeof maybeMock === 'object' &&
  maybeMock != null &&
  '_case:mock:type' in (maybeMock as AnyMockDescriptor);

export type AnyMockDescriptor = ConsumeHttpResponse | ProduceHttpResponse;

export type CaseMockDescriptorFor<T extends AnyMockDescriptorType> = Extract<
  AnyMockDescriptor,
  HasTypeForMockDescriptor<T>
>;

export interface CoreHttpRequestResponseMatcherPair {
  request: AnyCaseMatcher;
  response: AnyCaseMatcher;
}

export interface ConsumeHttpResponse
  extends HasTypeForMockDescriptor<typeof MOCK_HTTP_SERVER>,
    CoreHttpRequestResponseMatcherPair {
  '_case:run:context:setup': {
    write: {
      type: typeof MOCK_HTTP_SERVER;
      stateVariables: 'default';
      triggers: 'provided';
    };
    read: {
      type: typeof MOCK_HTTP_CLIENT;
      stateVariables: 'state';
      triggers: 'generated';
    };
  };
}

export interface ProduceHttpResponse
  extends HasTypeForMockDescriptor<typeof MOCK_HTTP_CLIENT>,
    CoreHttpRequestResponseMatcherPair {
  '_case:run:context:setup': {
    write: {
      type: typeof MOCK_HTTP_CLIENT;
      stateVariables: 'state';
      triggers: 'generated';
    };
    read: {
      type: typeof MOCK_HTTP_SERVER;
      stateVariables: 'default';
      triggers: 'provided';
    };
  };
}
