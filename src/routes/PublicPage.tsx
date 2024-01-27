import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";

const PublicPage = () => {
  const isLogged = useSelector((state: RootState) => state.userState.logedIn);
  return !isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PublicPage;
