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
  @WebSocketServer()
  server: Server;

  handleConnection(client: any): any {
    console.log(`Client connected: ${client?.id}`);
  }

  handleDisconnect(client: any): any {
    console.log(`Client disconnected: ${client?.id}`);
  }

  emitEvent(eventName: string, data: string): void {
    console.log(`Emitting event: ${eventName}`);
    console.log(data);
    this.server.emit(eventName, data);
  }
}
