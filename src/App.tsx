import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import useCountryFromLocation from "./hooks/getCountry";
import Routers from "./Router";
import { BrowserView, MobileOnlyView, isMobile } from "react-device-detect";
import { GlobalStyle, Background } from "./styles";

function App() {
  const [isBrowser] = useState(!isMobile);
  console.log(isBrowser);
  useEffect(() => {}, []);
  return (
    <Fragment>
      <GlobalStyle />
      <Background>
        {isBrowser ? (
          // <BrowserView>
          <Routers isMobile={false} />
        ) : (
          // </BrowserView>
          // {/* <MobileOnlyView> */}
          <Routers isMobile={true} />
          // </MobileOnlyView>
        )}
      </Background>
    </Fragment>
  );
}

export default App;
