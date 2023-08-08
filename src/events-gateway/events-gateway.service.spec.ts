import { Test, TestingModule } from '@nestjs/testing';
import { EventsGatewayService } from './events-gateway.service';
import { Server } from 'socket.io';

describe('EventsGatewayService', () => {
  let service: EventsGatewayService;
  let mockServer: jest.Mocked<Server>;

  beforeEach(async () => {
    mockServer = {
      emit: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsGatewayService],
    }).compile();

    service = module.get<EventsGatewayService>(EventsGatewayService);
    service.server = mockServer;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should emit event', () => {
    const eventName = 'testEvent';
    const data = 'testData';

    service.emitEvent(eventName, data);
    expect(mockServer.emit).toHaveBeenCalledWith(eventName, data);
  });
});
