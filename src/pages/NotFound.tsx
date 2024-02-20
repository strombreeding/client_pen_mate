import React from "react";
import { Container } from "../styles";
import { Text } from "../assets/fontStyles";

const NotFount: React.FC = () => {
  return (
    <Container>
      <Text.SemiBold_32>404 없는 페이지 입니다.</Text.SemiBold_32>
    </Container>
  );
};

export default React.memo(NotFount);
