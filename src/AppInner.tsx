import styled from "styled-components";
import { Background, GlobalStyle } from "./styles";
import Routers from "./Router";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const BG = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background-color: black;
  opacity: 1;
  z-index: 1;
`;

const AppInner = () => {
  const popupState = useSelector((state: RootState) => state.appState.popup);

  return (
    <Fragment>
      {popupState && <BG />}
      <GlobalStyle />
      <Background>
        <Routers />
      </Background>
    </Fragment>
  );
};

export default AppInner;
