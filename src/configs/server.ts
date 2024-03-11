export const SERVER_URI =
  process.env.REACT_APP_SERVER_URI == undefined
    ? "http://localhost:8080/"
    : process.env.REACT_APP_SERVER_URI;

// export const SOCKET_URI = "http://socket.jinytree.store/";
export const SOCKET_URI =
  process.env.REACT_APP_SOCEKT_URI == undefined
    ? "http://localhost:8000/"
    : process.env.REACT_APP_SOCEKT_URI;

export const CLIENT_URI =
  process.env.REACT_APP_CLIENT_URI || "http://192.168.25.15:3000/";
// process.env.REACT_APP_CLIENT_URI || "http://localhost:3000/";

export const iceServers: RTCIceServer[] = [
  {
    urls: "stun:stun.l.google.com:19302",
  },
  {
    urls: process.env.REACT_APP_TURN_SERVER!,
    username: process.env.REACT_APP_TURN_ID!,
    credential: process.env.REACT_APP_TURN_PW!,
  },
];

console.log(iceServers);
