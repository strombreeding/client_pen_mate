import styled from "styled-components";
import { imgSrc } from "../../../assets/img";
import { Img, type IIconProps } from "../config";
// import { CSSProperties } from "react";

const X_14: React.FC<IIconProps> = ({ color, style, onClick }) => {
  return (
    <Img
      onClick={onClick}
      px={14}
      color={color}
      src={imgSrc.x_circle_14px}
      style={style}
      alt=""
    />
  );
};

export default X_14;
