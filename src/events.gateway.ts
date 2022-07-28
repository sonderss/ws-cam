import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import * as WebSocket from 'ws';
@WebSocketGateway(8090)
export class EventsGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('client', client);
    console.log('payload', payload);
    return 'Hello world!';
  }
  @SubscribeMessage('hello2')
  hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    console.log('收到消息 client:', client);

    client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));

    return { event: 'hello2', data: data };
  }
}
