import { useNavigate } from "react-router-dom";
import HeaderHome from "../components/home/HeaderHome";
import { Container } from "../styles";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container style={{ position: "relative" }}>
      <HeaderHome />
      <div
        onClick={() => {
          navigate("/sign-in");
        }}
      >
        로그인 요망
      </div>
      <div>gd</div> <div>gd</div>
      <div>gd</div>
      <div>gd</div>
      <div>gd</div>
      <div>gd</div>
      <div>gd</div>
      <div>gd</div>
      <div>gd</div>
      <div>gd</div>
    </Container>
  );
};

export default Home;
