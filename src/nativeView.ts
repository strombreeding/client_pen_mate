import styled from "styled-components";
// import backgroundImage from "@/assets/pngs/backgroundImage.png";

export const View = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

export const ScrollView = styled.div<{ horizontal: true }>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: ${(props) => (props.horizontal ? "hidden" : "auto")};
  overflow-x: ${(props) => (props.horizontal ? "auto" : "hidden")};
`;

export const Pressable = styled.div<{}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

export const Viewport = styled.div<{ bgUrl: any }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${(props) => props.bgUrl});
  background-size: cover;
  background-repeat: no-repeat;
`;
