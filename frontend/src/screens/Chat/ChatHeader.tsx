import { BsFillChatLeftFill } from 'react-icons/bs';

import Profile from '../../assets/img/default.png';
import useSidebar from '../../hooks/useSidebar';
import useUsers from '../../hooks/useUsers';

const ChatHeader = () => {
  const { selectedUser } = useUsers();
  const { setShowSidebar } = useSidebar();

  if (!selectedUser) return <></>;

  return (
    <div className="chat-header">
      <img className="chat-header__left" src={Profile} alt="" />
      <div className="chat-header__right">
        <h3 className="chat-header__name">{selectedUser.name}</h3>
        {/* {connected.includes(selectedUser._id) && ( */}
        <span className="chat-header__caption">online</span>
        {/* )} */}
      </div>
      <BsFillChatLeftFill
        onClick={() => setShowSidebar(true)}
        size={22}
        className="chat-header__sidebar-button"
      />
    </div>
  );
};

export default ChatHeader;
