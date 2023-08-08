import { Test, TestingModule } from '@nestjs/testing';
import { BcSimpleStorageController } from './bc-simple-storage.controller';

describe('BcSimpleStorageController', () => {
  let controller: BcSimpleStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BcSimpleStorageController],
    }).compile();

    controller = module.get<BcSimpleStorageController>(BcSimpleStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
