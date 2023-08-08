import { Test, TestingModule } from '@nestjs/testing';
import { SmartContractsEventsConfigService } from './smart-contracts-events-config.service';
import { ConfigService } from '@nestjs/config';

describe('SmartContractsEventsConfigService', () => {
  let service: SmartContractsEventsConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SmartContractsEventsConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('some value'), // mock the 'get' method or other needed methods
          },
        },
      ],
    }).compile();

    service = module.get<SmartContractsEventsConfigService>(
      SmartContractsEventsConfigService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
