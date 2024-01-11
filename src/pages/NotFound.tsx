import React from "react";
import { Container, Text } from "../styles";

const NotFount: React.FC = () => {
  return (
    <Container>
      <Text.LargeTitle>404 없는 페이지 입니다.</Text.LargeTitle>
    </Container>
  );
};

export default React.memo(NotFount);
