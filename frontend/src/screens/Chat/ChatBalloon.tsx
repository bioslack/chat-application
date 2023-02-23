import { format } from 'date-fns';
import { Message } from '../../context/ChatProvider';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUsers';

interface ChatBalloonProps {
  message: Message;
  sent: boolean;
}

const ChatBalloon = ({ message, sent }: ChatBalloonProps) => {
  const { selectedUser } = useUsers();
  const { user } = useAuth();

  const name = sent ? user!.name : selectedUser!.name

  return (
    <div className={`chat-balloon ${sent ? 'chat-balloon--sent' : ''}`}>
      <h3 className="chat-balloon__title">{name}</h3>
      <p className="chat-balloon__body">{message.text}</p>
      <span className="chat-balloon__time">
        {format(new Date(message.createdAt), 'HH:mm')}
      </span>
    </div>
  );
};

export default ChatBalloon;
