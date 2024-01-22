import styled from "styled-components";
import { imgSrc } from "../../../assets/img";
import { Img, type IIconProps } from "../config";
// import { CSSProperties } from "react";

const ArrowLetf26: React.FC<IIconProps> = ({ color, style, onClick }) => {
  return (
    <Img
      px={26}
      onClick={onClick}
      color={color}
      src={imgSrc.arrow_left_26px}
      style={style}
      alt=""
    />
  );
};

export default ArrowLetf26;
