import { Test, TestingModule } from '@nestjs/testing';
import { SmartContractsEventsListenerService } from './smart-contracts-events-listener.service';

describe('SmartContractsEventsListenerService', () => {
  let service: SmartContractsEventsListenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartContractsEventsListenerService],
    }).compile();

    service = module.get<SmartContractsEventsListenerService>(
      SmartContractsEventsListenerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
