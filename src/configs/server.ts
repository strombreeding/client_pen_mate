export const SERVER_URI =
  process.env.REACT_APP_SERVER_URI == undefined
    ? "http://localhost:8080/"
    : process.env.REACT_APP_SERVER_URI;

export const CLIENT_URI =
  process.env.REACT_APP_CLIENT_URI || "http://localhost:3000/";
