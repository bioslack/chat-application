import { Server, Socket } from 'socket.io';
import server from '../server';
import { Message } from '@prisma/client';
import { prisma } from '../../prisma';

class User {
  id: number;
  socket: Socket;

  constructor(socket: Socket, userid: number) {
    this.socket = socket;
    this.id = userid;
  }

  async send(message: Message) {
    this.socket.emit('receive-message', message);
    // delete message.id;
    await prisma.message.create({
      data: message,
    });
  }

  sendConnectedUsers(usersId: number[]) {
    this.socket.emit('users-list', usersId);
  }
}

class ServerSocket {
  users: User[];

  constructor() {
    this.users = [];

    const io = new Server(server, {
      cors: {
        origin: ['http://localhost:3000', 'http://192.168.1.45:3000'],
      },
    });

    const self = this;

    io.on('connection', (socket) => {
      socket.on('subscribe-chat', (id: number) => {
        self.add(new User(socket, id));
      });

      socket.on('send-message', (message: Message, members: string[]) => {
        self.users.forEach((u) => {
          if (u.id === message.receiverId) {
            u.send(message);
          }
        });
      });

      socket.on('disconnect', () => {
        self.remove(socket.id);
      });
    });
  }

  add(user: User) {
    this.users = [...this.users.filter((u) => u.id !== user.id), user];
    this.broadcastConnectedUsersList();
  }

  remove(socketId: string) {
    this.users = this.users.filter((u) => u.socket.id !== socketId);
    this.broadcastConnectedUsersList();
  }

  broadcastConnectedUsersList() {
    const usersId = this.users.map((u) => u.id);
    this.users.forEach((u) => u.sendConnectedUsers(usersId));
  }
}

new ServerSocket();