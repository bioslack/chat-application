import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAppSelector } from "../../app/hooks";
// import { getAuthState } from "../../features/auth/authSlice";

const RequireAuth = () => {
  // const { access } = useAppSelector(getAuthState);
  const location = useLocation();

  return false ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
};

export default RequireAuth;
