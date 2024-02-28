import { IOS, MOBILE } from "../configs/device";

export const useSafeAreaSize = () => {
  if (!MOBILE) return;
  let result;
  //   const dispatch = useDispatch<AppDispatch>();
  //@ts-ignore
  window.ReactNativeWebView.postMessage(message);

  const readDataFromReactNative = (event: MessageEvent<string>) => {
    if (typeof event.data === "string") {
      if (event.data.includes("init")) {
        const receivedData = event.data.split("/")[1].split(",");
        result = [Number(receivedData[0]), Number(receivedData[1])];
        //   dispatch(
        //     setSafeArea([Number(receivedData[0]), Number(receivedData[1])])
        //   );
      }
    }
  };

  if (IOS) {
    window.addEventListener("message", readDataFromReactNative);
  } else if (!IOS) {
    //@ts-ignore
    document.addEventListener("message", readDataFromReactNative);
  }

  return () => {
    //@ts-ignore
    document.removeEventListener("message", readDataFromReactNative);
    window.removeEventListener("message", readDataFromReactNative);
  };
};
