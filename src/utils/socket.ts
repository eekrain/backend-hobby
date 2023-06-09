import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  public users: { [uid: string]: string };

  constructor(server: HTTPServer) {
    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin:
          process.env.NODE_ENV === 'production'
            ? process.env.WEB_ORIGIN_URL || 'http://localhost:3000'
            : '*',
      },
    });

    this.io.on('connect', this.StartListeners);
    console.info('Socket IO started');
  }

  StartListeners = (socket: Socket) => {
    console.info('Message received from ', socket.id);

    socket.on('handshake', () => {
      console.info('Handshake received');
    });

    socket.on('disconnect', () => {
      console.info('Disconnect received from ', socket.id);
    });
  };
}
