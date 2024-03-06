import React, { useRef } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import Cookies from "js-cookie";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

Cookies.set("history", JSON.stringify(["/", window.location.pathname]));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
