import styled from "styled-components";
import React from "react";
// import backgroundImage from "@/assets/pngs/backgroundImage.png";
interface IScrollViewProps {
  horizontal?: boolean;
  scrollDisenable?: boolean;
}

export const View = styled.div<{ direction?: "row" | "column" }>`
  display: flex;
  position: relative;
  flex-direction: ${(props) => (props.direction == null ? "column" : "row")};
`;

export const ScrollView = styled.div<IScrollViewProps>`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.horizontal == null || false ? "column" : "row"};

  overflow-y: ${(props) =>
    props.horizontal == null || false ? "auto" : "hidden"};
  overflow-x: ${(props) =>
    props.horizontal == null || false ? "hidden" : "auto"};

  ${(props) => props.scrollDisenable == true && `overflow:hidden;`}
`;

export const Pressable = styled.div<{}>`
  flex-direction: column;
  display: flex;
  position: relative;
`;

export const Viewport = styled.div<{ bgUrl: any }>`
  position: absolute;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${(props) => props.bgUrl});
  background-size: cover;
  background-repeat: no-repeat;
`;
