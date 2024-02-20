import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useHistory = () => {
  const thisPage = window.location.href;
  // const location = useLocation();
  const signUp = thisPage.includes("sign-up");
  const signIn = thisPage.includes("sign-in");
  useEffect(() => {
    // alert(location.pathname);
    return () => {
      // alert(`${location.pathname} 언마운트`);
    };
  }, []);
  return;
};
