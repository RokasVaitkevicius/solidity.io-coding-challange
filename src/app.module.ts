import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SmartContractsEventsListenerService } from './smart-contracts-events-listener/smart-contracts-events-listener.service';
import { SmartContractsEventsConfigService } from './smart-contracts-events-config/smart-contracts-events-config.service';
import { EventsGatewayService } from './events-gateway/events-gateway.service';
import { SmartContractsEventsController } from './smart-contracts-events-listener/smart-contracts-events.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, SmartContractsEventsController],
  providers: [
    AppService,
    SmartContractsEventsListenerService,
    SmartContractsEventsConfigService,
    EventsGatewayService,
  ],
})
export class AppModule {}
