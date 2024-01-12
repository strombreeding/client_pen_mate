import { useEffect, useState } from "react";

export const useShowAnimation = (page: string) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(page, "마운트", window.sessionStorage.getItem(page));
    const isVisitPage =
      window.sessionStorage.getItem(page) == undefined ? false : true;
    setShow(!isVisitPage);

    return () => {
      window.sessionStorage.setItem(page, "1");
    };
  }, []);

  return show;
};
