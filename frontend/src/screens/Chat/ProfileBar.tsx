import { useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

const FloatMenu = () => {

  const handleLogout = () => {
    
  };

  return (
    <div className="floatmenu">
      <ul>
        <li>Criar grupo</li>
        <li>Configurações</li>
        <li onClick={handleLogout}>Sair</li>
      </ul>
    </div>
  );
};

const ProfileBar = () => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleBlurCheckbox = () => {
    setTimeout(() => {
      if (checkboxRef.current) checkboxRef.current.checked = false;
    }, 300);
  };

  return (
    <div className="profile-bar">
      <img
        className="profile-bar__left"
        // src={`${API_URL}/img/${user?.picture}`}
        alt="Perfil"
      />
      <div className="profile-bar__right">{"Jane Roe"}</div>
      <input ref={checkboxRef} onBlur={handleBlurCheckbox} type="checkbox" />
      <BiDotsVerticalRounded className="profile-bar__menu" />
      <FloatMenu />
    </div>
  );
};

export default ProfileBar;
