import { format } from 'date-fns';

interface ChatBalloonProps {
  message: {
    text: string;
    createdAt: Date;
  };
}

const ChatBalloon = ({ message }: ChatBalloonProps) => {
  return (
    <div className={`chat-balloon ${'chat-balloon--sent'}`}>
      <h3 className="chat-balloon__title">{"Jane Roe"}</h3>
      <p className="chat-balloon__body">{message.text}</p>
      <span className="chat-balloon__time">
        {format(message.createdAt, 'HH:mm')}
      </span>
    </div>
  );
};

export default ChatBalloon;
