import { useContext } from 'react';
import { SocketContext } from '../context/ChatProvider';

const useChat = () => useContext(SocketContext);

export default useChat;
