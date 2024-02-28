import { useNavigate } from "react-router-dom";

export const useCustomNavi = () => {
  const useResult = (path: string | -1) => {
    const navigation = useNavigate();
    const storage = window.localStorage.getItem("history");
    const history = JSON.parse(storage!);
    if (path === -1) {
      navigation(history[0]);
    } else {
      navigation(path);
    }
  };

  return useResult;
};
