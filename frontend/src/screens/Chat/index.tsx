import ChatArea from "./ChatArea";
import Sidebar from "./Sidebar";
import Loading from "../../components/Loading";

const Chat = () => {

  if (false) return <Loading />;

  return (
    <div className="chat">
      <Sidebar />
      <ChatArea />
    </div>
  );
};

export default Chat;
