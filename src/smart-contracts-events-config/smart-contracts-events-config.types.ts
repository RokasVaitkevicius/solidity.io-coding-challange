export interface SmartContractsEventsConfig {
  name: string;
  address: string;
  rpc_url: string;
  wallet_pk: string;
  abi: any; // TODO: ABI type
  events: [string];
}
