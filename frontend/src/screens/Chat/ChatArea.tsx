import ChatBalloon from "./ChatBalloon";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatArea = () => {

  return (
    <div className="chat-area">
      <ChatHeader />
      <div className="chat-area__list">
        {[].map((m) => (
          <ChatBalloon key={m} message={m} />
        ))}
      </div>
      {<MessageInput />}
    </div>
  );
};

export default ChatArea;
