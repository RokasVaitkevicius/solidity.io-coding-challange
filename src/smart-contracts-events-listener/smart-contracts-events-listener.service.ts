import { Injectable, Logger } from '@nestjs/common';
import { ContractEventPayload, ethers } from 'ethers';
import { EventsGatewayService } from '../events-gateway/events-gateway.service';
import { SmartContractsEventsConfigService } from '../smart-contracts-events-config/smart-contracts-events-config.service';
import { stringifyBigInts } from '../utils/replacer';

@Injectable()
export class SmartContractsEventsListenerService {
  private readonly logger = new Logger(
    SmartContractsEventsListenerService.name,
  );

  constructor(
    private smartContractsEventsConfigService: SmartContractsEventsConfigService,
    private eventsGatewayService: EventsGatewayService,
  ) {
    // Get contracts configs and for each contract and each event a listener
    // When listener is called call handleEvent method
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

  /**
   * Basically acts a proxy between contract event and websocket
   * Only thing it does besides forwarding data is it stringifies data
   * because ethers.js doesn't do it by default
   */
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
