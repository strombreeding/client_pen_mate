import { useEffect } from "react";
import Login from "./Join";
import { useNavigate } from "react-router-dom";

function Profile() {
  const loggedIn = false;
  const navigator = useNavigate();
  useEffect(() => {
    if (!loggedIn) navigator("/login");
  }, []);
  return <Login></Login>;
}

export default Profile;
