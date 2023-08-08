import { Controller, Get } from '@nestjs/common';
import { BcSimpleStorageService } from './bc-simple-storage.service';

@Controller('bc-simple-storage')
export class BcSimpleStorageController {
  constructor(private readonly smartContractService: BcSimpleStorageService) {}

  @Get('trigger-event')
  triggerContract(): any {
    // Add logic to trigger your smart contract here
    return this.smartContractService.triggerSmartContractMethod();
  }
}
