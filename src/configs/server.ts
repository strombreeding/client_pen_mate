export const SERVER_URI =
  process.env.REACT_APP_SERVER_URI == undefined
    ? "http://localhost:8080/"
    : process.env.REACT_APP_SERVER_URI;

export const CLIENT_URI =
  process.env.REACT_APP_CLIENT_URI || "http://192.168.25.15:3000/";
// process.env.REACT_APP_CLIENT_URI || "http://localhost:3000/";
