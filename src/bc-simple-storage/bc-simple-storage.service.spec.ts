import { Test, TestingModule } from '@nestjs/testing';
import { BcSimpleStorageService } from './bc-simple-storage.service';

describe('BcSimpleStorageService', () => {
  let service: BcSimpleStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcSimpleStorageService],
    }).compile();

    service = module.get<BcSimpleStorageService>(BcSimpleStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
