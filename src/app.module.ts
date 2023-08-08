import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BcSimpleStorageService } from './bc-simple-storage/bc-simple-storage.service';
import { BcSimpleStorageController } from './bc-simple-storage/bc-simple-storage.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, BcSimpleStorageController],
  providers: [AppService, BcSimpleStorageService],
})
export class AppModule {}
