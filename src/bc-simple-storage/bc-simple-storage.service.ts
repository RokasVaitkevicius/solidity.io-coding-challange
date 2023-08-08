import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import SimpleStorageAbi from './abi/SimpleStorage.json';
import { BcSimpleStorageEventsGateway } from './bc-simple-storage.events.gateway';

@Injectable()
export class BcSimpleStorageService {
  private contract;
  private wallet;

  constructor(
    private configService: ConfigService,
    private bcSimpleStorageEventsGateway: BcSimpleStorageEventsGateway,
  ) {
    const provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('NODE_RPC_URL'),
    );
    const contractAddress = this.configService.get<string>('CONTRACT_ADDRESS');
    const contractAbi = SimpleStorageAbi.abi as any;

    this.wallet = new ethers.Wallet(
      this.configService.get<string>('WALLET_PRIVATE_KEY'),
      provider,
    );

    this.contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      this.wallet,
    );

    // Listen for the specific event
    this.contract.on('DataChanged', this.handleDataChanged.bind(this));
  }

  async triggerSmartContractMethod(): Promise<any> {
    return this.contract.set(Math.floor(Math.random() * 100));
  }

  private handleDataChanged(from, to, event) {
    console.log('DataChanged event', from, to, event);
    this.bcSimpleStorageEventsGateway.emitDataChanged(
      JSON.stringify({ from, to, event }),
    );
  }
}
