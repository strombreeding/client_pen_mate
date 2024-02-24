import { View } from "../../nativeView";
import { Text } from "../../assets/fontStyles";
import { Container, EmptyBox } from "../../styles";
import { keyframes } from "styled-components";

const shake = keyframes`
  0% {
    transform: translateX(-3px);
  }
  25% {
    transform: translateX(3px);
  }
  50% {
    transform: translateX(-3px);
  }
  75% {
    transform: translateX(3px);
  }
  100% {
    transform: translateX(-3px);
  }
    
`;

function SignUp({ step }: { step: string }) {
  return (
    <Container>
      <View style={{ padding: "0px 20px 0px 20px" }}></View>
      <EmptyBox height={20} />
    </Container>
  );
}

export default SignUp;
