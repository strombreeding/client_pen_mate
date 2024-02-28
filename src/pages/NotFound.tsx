import React from "react";
import { Container } from "../styles";
import { Text } from "../assets/fontStyles";
import { usePageState } from "../hooks/getVisitedPage";

const NotFount: React.FC = () => {
  const pageState = usePageState();
  return (
    <Container>
      <Text.SemiBold_32>404 없는 페이지 입니다.</Text.SemiBold_32>
    </Container>
  );
};

export default React.memo(NotFount);
