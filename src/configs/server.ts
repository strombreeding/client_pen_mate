export const SERVER_URI =
  process.env.REACT_APP_SERVER_URI == undefined
    ? "http://localhost:8080/"
    : process.env.REACT_APP_SERVER_URI;
