import { View } from "../../nativeView";
import { Text } from "../../assets/fontStyles";
import { Container, EmptyBox } from "../../styles";
import styled, { keyframes } from "styled-components";

const shake = keyframes`
  0% {
    transform: translateX(-12px);
  }
  25% {
    transform: translateX(12px);
  }
  50% {
    transform: translateX(-12px);
  }
  75% {
    transform: translateX(12px);
  }
  100% {
    transform: translateX(-12px);
  }
    
`;

const Form = styled.form`
  animation: ${shake} 0.25s linear;
`;
function SignUp({ step }: { step: string }) {
  return (
    <Container>
      <View style={{ padding: "0px 20px 0px 20px" }}></View>
      <EmptyBox height={20} />
      <Form>
        <Text.Spo_Medium_16>닉네임</Text.Spo_Medium_16>
        <input type="text" maxLength={10} />
      </Form>
      <EmptyBox height={60} />
    </Container>
  );
}

export default SignUp;
