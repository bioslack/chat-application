import { MouseEventHandler, useRef, forwardRef } from "react";
import { BsThreeDots } from "react-icons/bs";

interface RoomProps {
  user: {};
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
    if (e.target.classList.contains("room__menu-checkbox")) return;
    // @ts-ignore
    if (e.target.classList.contains("context-menu__item")) return;
    // dispatch(resetMessage());
  };

  return (
    <div className="room" onClick={handleClick}>
      <img
        className="room__left"
        src={`http://pudim.com.br/pudim.jpg`}
        alt={"pudim"}
      />
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
        <div className="room__title">{"Jane Roe"}</div>
        <div className="room__message">{"Hello"}</div>
      </div>
    </div>
  );
};

export default Room;
