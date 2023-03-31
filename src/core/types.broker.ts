import { DataContext, ContractData, LogContext } from '../entities/types';

export interface DownloadedContract extends ContractData {
  _links: {
    'pb:pact-version': {
      name: string;
    };
  };
}

// TODO: Can probably remove this
export type DownloadedContracts = {
  contractData: DownloadedContract;
  name: string;
}[];

export type ContractFileFromDisk = {
  contents: DownloadedContract;
  filePath: string;
};

export type ContractLink = {
  href: string;
  name: string;
};

export type MakeBrokerApi = (context: DataContext) => BrokerApi;

export interface BrokerApi {
  publishContract: (
    contract: ContractData,
    version: string,
    context: LogContext
  ) => Promise<void>;

  publishContractAdvanced: (
    contract: ContractData,
    version: string,
    branch: string | false,
    logContext: LogContext
  ) => Promise<PublishResult>;

  downloadContract: (
    url: string,
    context: LogContext
  ) => Promise<DownloadedContract>;

  urlsForVerification: (
    serviceName: string,
    context: LogContext
  ) => Promise<ContractLink[]>;
}

interface BrokerNotice {
  type:
    | 'debug'
    | 'info'
    | 'warning'
    | 'prompt'
    | 'success'
    | 'error'
    | 'danger';
  text: string;
}

export interface PublishResult {
  notices: Array<BrokerNotice>;
}
