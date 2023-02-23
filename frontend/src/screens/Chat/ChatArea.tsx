import useChat from "../../hooks/useChat";
import useUsers from "../../hooks/useUsers";
import ChatBalloon from "./ChatBalloon";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatArea = () => {
  const { messages } = useChat();
  const { selectedUser } = useUsers()

  return (
    <div className="chat-area">
      <ChatHeader />
      <div className="chat-area__list">
        {messages.map((m) => (
          <ChatBalloon sent={m.receiverId === selectedUser!.id} key={m.id} message={m} />
        ))}
      </div>
      {<MessageInput />}
    </div>
  );
};

export default ChatArea;
