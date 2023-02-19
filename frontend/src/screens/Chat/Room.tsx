import { MouseEventHandler, useRef, forwardRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';

import Profile from '../../assets/img/default.png';
import { User } from '../../context/AuthProvider';
import useSidebar from '../../hooks/useSidebar';
import useUsers from '../../hooks/useUsers';

interface RoomProps {
  user: User;
  onClick?: () => {};
}

const FloatMenu = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="context-menu">
      <ul>
        <li className="context-menu__item">Iniciar conversa</li>
        <li className="context-menu__item">Excluir conversa</li>
        <li className="context-menu__item">Bloquear</li>
      </ul>
    </div>
  );
});

const Room = ({ user }: RoomProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const contextMenu = useRef<HTMLDivElement>(null);
  const { setSelectedUser } = useUsers();
  const { setShowSidebar } = useSidebar();

  const handleBlurCheckbox = () => {
    setTimeout(() => {
      if (checkboxRef.current) checkboxRef.current.checked = false;
    }, 300);
  };

  const handleClickCheckbox: MouseEventHandler = (e) => {
    if (contextMenu.current) {
      const menuHeight = contextMenu.current.clientHeight + 5;
      const screenHeight = window.innerHeight;
      const clickHeight = e.clientY;

      if (clickHeight + menuHeight > screenHeight) {
        const posY = screenHeight - (clickHeight + menuHeight);
        contextMenu.current.style.top = `${posY}px`;
      }
    }
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // @ts-ignore
    if (e.target.classList.contains('room__menu-checkbox')) return;
    // @ts-ignore
    if (e.target.classList.contains('context-menu__item')) return;
    setSelectedUser(user);
    setShowSidebar(false);
  };

  return (
    <div className="room" onClick={handleClick}>
      <img className="room__left" src={Profile} alt={user.name} />
      <div className="room__right">
        <input
          ref={checkboxRef}
          type="checkbox"
          className="room__menu-checkbox"
          onClick={handleClickCheckbox}
          onBlur={handleBlurCheckbox}
        />
        <BsThreeDots className="room__menu" />
        <FloatMenu ref={contextMenu} />
        <div className="room__title">{user.name}</div>
        <div className="room__message">&nbsp;</div>
      </div>
    </div>
  );
};

export default Room;
