import { useCallback } from "react";

const useDefaultBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isKakaoInAppBrowser = userAgent.includes("kakaotalk");

  const moveOtherBrowser = useCallback(() => {
    const currentUrl = window.location.href;
    if (isKakaoInAppBrowser) {
      window.location.href =
        "kakaotalk://web/openExternal?url=" + encodeURIComponent(currentUrl);
    }
  }, [isKakaoInAppBrowser]);

  return { isKakaoInAppBrowser, moveOtherBrowser };
};

export default useDefaultBrowser;
