import { useState } from "react";
import { Container } from "../styles";
import SimpleHeader from "./SimpleHeader";
import { useNavigate } from "react-router-dom";

const EditAvatar = () => {
  const navigate = useNavigate();
  const [] = useState();

  return (
    <Container>
      <SimpleHeader nowPage={0} goBack={navigate} />
      <div>하이</div>
    </Container>
  );
};

export default EditAvatar;
