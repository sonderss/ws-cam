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

  @SubscribeMessage('msgClient')
  msgclient(
    @MessageBody() data: any,
    @ConnectedSocket() client: WebSocket,
  ): any {
    console.log('接收到的数据', data);
    if (data === 2) {
      return client.send(
        JSON.stringify({ event: 'msgClient', data: '推送关闭' }),
      );
    }
    // 开始推数据
    client.send(JSON.stringify({ event: 'msgClient', data: data }));
    return;
  }
}
