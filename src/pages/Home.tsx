import { useLocation, useNavigate } from "react-router-dom";
import HeaderHome from "../components/home/HeaderHome";
import { Container } from "../styles";
import { Pressable, View } from "../nativeView";
import { imgSrc } from "../assets/img";
import BigGameBtn from "../components/designs/BigGameBtn";
import BottomNav from "../components/BottomNav";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container
      style={{
        position: "relative",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <HeaderHome />
      <BigGameBtn />
      <BottomNav />
    </Container>
  );
};

export default Home;
