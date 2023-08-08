import { Injectable } from '@nestjs/common';
import { ContractEventPayload, ethers } from 'ethers';
import { EventsGatewayService } from 'src/events-gateway/events-gateway.service';
import { SmartContractsEventsConfigService } from 'src/smart-contracts-events-config/smart-contracts-events-config.service';
import { stringifyBigInts } from 'src/utils/replacer';

@Injectable()
export class SmartContractsEventsListenerService {
  constructor(
    private smartContractsEventsConfigService: SmartContractsEventsConfigService,
    private eventsGatewayService: EventsGatewayService,
  ) {
    const contractsConfig = this.smartContractsEventsConfigService.getConfig();

    contractsConfig.forEach((contractConfig) => {
      const provider = new ethers.JsonRpcProvider(contractConfig.rpc_url);
      const contract = new ethers.Contract(
        contractConfig.address,
        contractConfig.abi,
        provider,
      );

      contractConfig.events.forEach(function (event) {
        contract.on(event, this.handleEvent.bind(this));
      }, this);
    });
  }

  private handleEvent(...data: any[]): void {
    // Last element in listener params is event payload
    const eventPayload: ContractEventPayload = data.pop();

    return this.eventsGatewayService.emitEvent(
      eventPayload.eventName,
      stringifyBigInts(data),
    );
  }
}
