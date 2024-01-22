import styled from "styled-components";
import { imgSrc } from "../../../assets/img";
import { Img, type IIconProps } from "../config";
// import { CSSProperties } from "react";

const Dm_26: React.FC<IIconProps> = ({ color, style, onClick }) => {
  return (
    <Img
      px={26}
      color={color}
      style={style}
      onClick={onClick}
      src={imgSrc.dm_26px}
      alt=""
    />
  );
};

export default Dm_26;
