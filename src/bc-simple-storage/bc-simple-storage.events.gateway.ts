import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway(8080, { namespace: 'simple-storage-events', cors: true })
export class BcSimpleStorageEventsGateway
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

  emitDataChanged(newValue: string): void {
    this.server.emit('DataChanged', { newValue });
  }
}
