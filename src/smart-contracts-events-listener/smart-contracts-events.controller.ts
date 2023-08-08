import { Controller, Get } from '@nestjs/common';
import { ethers } from 'ethers';
import { SmartContractsEventsConfigService } from 'src/smart-contracts-events-config/smart-contracts-events-config.service';

@Controller('smart-contracts-events')
export class SmartContractsEventsController {
  constructor(
    private smartContractsEventsConfigService: SmartContractsEventsConfigService,
  ) {}

  /**
   * This is just for testing purposes
   * It's not dynamic etc. so use it at your own risk
   */
  @Get('trigger-events')
  async triggerContract(): Promise<any> {
    const contractsConfig = this.smartContractsEventsConfigService.getConfig();

    const contractCalls: Promise<any>[] = contractsConfig.reduce(
      (calls, contractConfig) => {
        const provider = new ethers.JsonRpcProvider(contractConfig.rpc_url);
        const wallet = new ethers.Wallet(contractConfig.wallet_pk, provider);
        const contract = new ethers.Contract(
          contractConfig.address,
          contractConfig.abi,
          wallet,
        );

        // Because it's just used for testing purposes it always calls set method
        // and sets random number
        calls.push(contract.set(Math.floor(Math.random() * 100)));

        return calls;
      },
      [],
    );

    return Promise.all(contractCalls);
  }
}
