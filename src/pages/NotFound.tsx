import React, { useEffect } from "react";
import { Container } from "../styles";
import { Text } from "../assets/fontStyles";
import { usePageState } from "../hooks/getVisitedPage";
import { useLocation } from "react-router-dom";

const NotFount: React.FC = () => {
  const pageState = usePageState();
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
  }, []);
  return (
    <Container>
      <Text.SemiBold_32>404 없는 페이지 입니다.</Text.SemiBold_32>
    </Container>
  );
};

export default React.memo(NotFount);
