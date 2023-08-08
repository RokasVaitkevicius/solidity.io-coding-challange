import { Test, TestingModule } from '@nestjs/testing';
import { SmartContractsEventsConfigService } from './smart-contracts-events-config.service';

describe('SmartContractsEventsConfigService', () => {
  let service: SmartContractsEventsConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartContractsEventsConfigService],
    }).compile();

    service = module.get<SmartContractsEventsConfigService>(
      SmartContractsEventsConfigService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
