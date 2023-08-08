import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import SimpleStorageAbi from './abi/SimpleStorage.json';

@Injectable()
export class BcSimpleStorageService {
  private contract;
  private wallet;

  constructor(private configService: ConfigService) {
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
    this.contract.on('DataChanged', this.handleDataChanged);
  }

  async triggerSmartContractMethod(): Promise<any> {
    return this.contract.set(Math.floor(Math.random() * 100));
  }

  private handleDataChanged(from, to, event) {
    console.log('DataChanged event', from, to, event);
    // You'll send the data to WebSocket here
  }
}
