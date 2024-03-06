import animationData from "../assets/lotties/loading.json";
import Lottie from "react-lottie";
function LoadingLottie() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={30} width={30} />;
}

export default LoadingLottie;
