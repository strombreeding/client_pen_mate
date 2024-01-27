import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivatePage = () => {
  const isLogged = useSelector((state: RootState) => state.userState.logedIn);
  return isLogged ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivatePage;
