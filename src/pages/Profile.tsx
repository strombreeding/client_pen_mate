import { useEffect } from "react";
import Login from "./Join";
import { useNavigate } from "react-router-dom";
import { usePageState } from "../hooks/getVisitedPage";

function Profile() {
  const pageState = usePageState();

  const loggedIn = false;
  const navigator = useNavigate();
  useEffect(() => {
    if (!loggedIn) navigator("/join");
  }, []);
  return <Login></Login>;
}

export default Profile;
