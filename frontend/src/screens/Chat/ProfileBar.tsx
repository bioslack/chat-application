import { useRef } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import Picture from '../../assets/img/default.png';

const FloatMenu = () => {
  const { signout } = useAuth();
  const navigate  = useNavigate();

  const handleLogout = () => {
    signout().finally(() => {
      navigate("/");
    })
  };

  return (
    <div className="floatmenu">
      <ul>
        <li onClick={handleLogout}>Sair</li>
      </ul>
    </div>
  );
};

const ProfileBar = () => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleBlurCheckbox = () => {
    setTimeout(() => {
      if (checkboxRef.current) checkboxRef.current.checked = false;
    }, 300);
  };

  return (
    <div className="profile-bar">
      <img
        className="profile-bar__left"
        src={Picture}
        alt="Perfil"
      />
      <div className="profile-bar__right">{user!.name}</div>
      <input ref={checkboxRef} onBlur={handleBlurCheckbox} type="checkbox" />
      <BiDotsVerticalRounded className="profile-bar__menu" />
      <FloatMenu />
    </div>
  );
};

export default ProfileBar;
