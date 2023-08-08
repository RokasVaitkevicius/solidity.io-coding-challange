import { Injectable } from '@nestjs/common';
import { SmartContractsEventsConfig } from './smart-contracts-events-config.types';
import { ConfigService } from '@nestjs/config';
import SimpleStorageAbi from './abis/SimpleStorage.json';

@Injectable()
export class SmartContractsEventsConfigService {
  constructor(private configService: ConfigService) {}

  // Ofc this could come from DB or file in the future and be dynamic
  private readonly contracts: SmartContractsEventsConfig[] = [
    {
      name: 'SimpleStorage',
      address: '0x4dB6158A28326075fbEffC6C93CdD756F0D1193a',
      rpc_url: this.configService.get<string>('NODE_RPC_URL'),
      wallet_pk: this.configService.get<string>('WALLET_PRIVATE_KEY'),
      abi: SimpleStorageAbi.abi,
      events: ['DataChanged'],
    },
    {
      name: 'SimpleStorage2',
      rpc_url: this.configService.get<string>('NODE_RPC_URL'),
      wallet_pk: this.configService.get<string>('WALLET_PRIVATE_KEY'),
      address: '0x0d4b13ab292c7E6A43f9616f6beFD39Be1a569eD',
      abi: SimpleStorageAbi.abi,
      events: ['DataChanged'],
    },
    // Other contracts...
  ];

  getConfig(): SmartContractsEventsConfig[] {
    return this.contracts;
  }
}
