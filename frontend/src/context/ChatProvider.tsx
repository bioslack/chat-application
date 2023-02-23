import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { io } from 'socket.io-client';
import useAuth from '../hooks/useAuth';
import useUsers from '../hooks/useUsers';

export interface Message {
  id: number;
  text: string;
  senderId: number;
  receiverId: number;
  createdAt: Date;
}

interface SocketContextData {
  connected: number[];
  sendMessage: (message: string) => void;
  messages: Message[];
}

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketContext = createContext<SocketContextData>({
  connected: [],
  sendMessage: () => {},
  messages: [],
});

const socket = io('http://localhost:8000');

const ChatProvider = (props: SocketProviderProps) => {
  const { user } = useAuth();
  const [connected, setConnected] = useState<number[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { selectedUser } = useUsers();

  const refreshMessages = useCallback(async () => {
    if (!selectedUser) return;

    const response = await fetch(
      `http://localhost:8000/chat-app/v1/messages/${selectedUser.id}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );

    if (response.status !== 200) return;

    const resJson = await response.json();

    setMessages(resJson.messages);
  }, [selectedUser]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!selectedUser) return;
      const message = {
        id: Date.now(),
        text: text,
        receiverId: selectedUser.id,
        senderId: user!.id,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, message]);
      socket.emit('send-message', message);
    },
    [selectedUser, user]
  );

  useEffect(() => {
    socket.on('connect', () => {});

    socket.on('disconnect', () => {});

    socket.on('users-list', (ids: number[]) => {
      setConnected(ids);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('users-list');
    };
  }, []);

  useEffect(() => {
    socket.on('receive-message', (message: Message) => {
      console.log(message);
      if (selectedUser && selectedUser.id === message.senderId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    refreshMessages();

    return () => {
      socket.off('receive-message');
    };
  }, [selectedUser, refreshMessages]);

  useEffect(() => {
    if (user) socket.emit('subscribe-chat', user.id);
  }, [user]);

  useEffect(() => {
    console.log(connected);
  }, [connected]);

  return (
    <SocketContext.Provider value={{ connected, sendMessage, messages }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default ChatProvider;
