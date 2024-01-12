import styled from "styled-components";
import { imgSrc } from "../../assets/img";
import { Img, type IIconProps } from "./config";
// import { CSSProperties } from "react";
const ArrowRight24: React.FC<IIconProps> = ({ color, style, onClick }) => {
  return (
    <Img
      px={24}
      color={color}
      style={style}
      src={imgSrc.arrow_right_24px}
      onClick={onClick}
      alt=""
    />
  );
};

export default ArrowRight24;
