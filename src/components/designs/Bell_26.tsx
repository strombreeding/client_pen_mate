import styled from "styled-components";
import { imgSrc } from "../../assets/img";
import { Img, type IIconProps } from "./config";
// import { CSSProperties } from "react";

const Bell26: React.FC<IIconProps> = ({ color, style, onClick }) => {
  return (
    <Img
      px={26}
      color={color}
      style={style}
      src={imgSrc.bell_26px}
      alt=""
      onClick={onClick}
    />
  );
};

export default Bell26;
