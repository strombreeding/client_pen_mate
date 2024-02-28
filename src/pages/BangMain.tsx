import { usePageState } from "../hooks/getVisitedPage";
import { Container } from "../styles";

function BangMain() {
  const pageState = usePageState();

  return <Container></Container>;
}

export default BangMain;
