import { Injectable, Logger } from '@nestjs/common';
import { ContractEventPayload, ethers } from 'ethers';
import { EventsGatewayService } from 'src/events-gateway/events-gateway.service';
import { SmartContractsEventsConfigService } from 'src/smart-contracts-events-config/smart-contracts-events-config.service';
import { stringifyBigInts } from 'src/utils/replacer';

@Injectable()
export class SmartContractsEventsListenerService {
  private readonly logger = new Logger(
    SmartContractsEventsListenerService.name,
  );

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
    try {
      // Last element in listener params is event payload
      const eventPayload: ContractEventPayload = data.pop();

      this.logger.log('Event received: ' + eventPayload.eventName);

      return this.eventsGatewayService.emitEvent(
        eventPayload.eventName,
        stringifyBigInts(data),
      );
    } catch (error) {
      this.logger.error('Error handling event: ' + error);
    }
  }
}
