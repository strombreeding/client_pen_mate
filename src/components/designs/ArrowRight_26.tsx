import styled from "styled-components";
import { imgSrc } from "../../assets/img";
import { Img, type IIconProps } from "./config";
// import { CSSProperties } from "react";

const ArrowRight26: React.FC<IIconProps> = ({ color, style, onClick }) => {
  return (
    <Img
      px={26}
      color={color}
      style={style}
      onClick={onClick}
      src={imgSrc.arrow_right_26px}
      alt=""
    />
  );
};

export default ArrowRight26;
