import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8080, { namespace: 'events', cors: true })
export class EventsGatewayService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGatewayService.name);

  @WebSocketServer()
  server: Server;

  handleConnection(client: any): any {
    this.logger.log(`Client connected: ${client?.id}`);
  }

  handleDisconnect(client: any): any {
    this.logger.log(`Client disconnected: ${client?.id}`);
  }

  emitEvent(eventName: string, data: string): void {
    try {
      this.logger.log(`Emitting event: ${eventName}`);
      this.server.emit(eventName, data);
    } catch (error) {
      this.logger.error(
        `Error emitting event: ${eventName} with data: ${data}`,
        error,
      );
    }
  }
}
