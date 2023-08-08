import { Test, TestingModule } from '@nestjs/testing';
import { SmartContractsEventsListenerService } from './smart-contracts-events-listener.service';
import { EventsGatewayService } from '../events-gateway/events-gateway.service';
import { SmartContractsEventsConfigService } from '../smart-contracts-events-config/smart-contracts-events-config.service';

describe('SmartContractsEventsListenerService', () => {
  let service: SmartContractsEventsListenerService;
  let eventsGatewayService: jest.Mocked<EventsGatewayService>;

  beforeEach(async () => {
    eventsGatewayService = {
      emitEvent: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SmartContractsEventsListenerService,
        {
          provide: EventsGatewayService,
          useValue: eventsGatewayService,
        },
        {
          provide: SmartContractsEventsConfigService,
          useValue: {
            getConfig: jest.fn().mockReturnValue([]), // Assuming this returns your desired mock config
          },
        },
      ],
    }).compile();

    service = module.get<SmartContractsEventsListenerService>(
      SmartContractsEventsListenerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle event and emit via gateway', () => {
    const testEventPayload = { eventName: 'testEvent' } as any;
    const testData = 'testData';

    service['handleEvent'](testData, testEventPayload);

    expect(eventsGatewayService.emitEvent).toHaveBeenCalledWith(
      testEventPayload.eventName,
      JSON.stringify(['testData']),
    );
  });
});
