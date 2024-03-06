import styled, { keyframes } from "styled-components";
import { View } from "../../nativeView";
import { memo } from "react";

const shake = keyframes`
  0% {
    transform: translateX(-12px);
  }
  10%{
    transform: translateX(12px);
  }
  20% {
    transform: translateX(-12px);
  }
  30%{
    transform: translateX(12px);
  }
  40% {
    transform: translateX(-12px);
  }
  50%{
    transform: translateX(12px);
  }
  60% {
    transform: translateX(-12px);
  }
  70%{
    transform: translateX(12px);
  }
  80% {
    transform: translateX(-12px);
  }
  90%{
    transform: translateX(12px);
  }
  100% {
    transform: translateX(-12px);
  }
`;
const ShakeView = styled(View)`
  animation: ${shake} linear 0.8s;
`;

function Shake({ children }: { children: React.ReactNode }) {
  return <ShakeView>{children}</ShakeView>;
}

export default memo(Shake);
