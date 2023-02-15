import { BsFillChatLeftFill } from "react-icons/bs";

const ChatHeader = () => {

  if (false) return <></>;

  return (
    <div className="chat-header">
      <div className="chat-header__left"></div>
      <div className="chat-header__right">
        <h3 className="chat-header__name">{"Luis Pereira"}</h3>
        {/* {connected.includes(selectedUser._id) && ( */}
          <span className="chat-header__caption">online</span>
        {/* )} */}
      </div>
      <BsFillChatLeftFill
        onClick={() => {}}
        size={22}
        className="chat-header__sidebar-button"
      />
    </div>
  );
};

export default ChatHeader;
