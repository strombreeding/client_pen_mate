import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import useCountryFromLocation from "./hooks/getCountry";
import Routers from "./Router";
import { BrowserView, MobileOnlyView, isMobile } from "react-device-detect";
import { GlobalStyle, Background } from "./styles";
import { SERVER_URI } from "./configs/server";

function App() {
  const [isBrowser] = useState(!isMobile);
  console.log(isBrowser);
  console.log(SERVER_URI);
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
