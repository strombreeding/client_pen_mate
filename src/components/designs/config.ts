import styled from "styled-components";

export interface IIconProps {
  color?: string;
  style?: React.CSSProperties;
  onClick?: (e?: any) => any;
}
interface StyledComponentProps {
  inlineStyle?: React.CSSProperties;
}
export const Img = styled.img<{
  px: number;
  color?: string;
}>`
  width: ${(props) => props.px}px;
  height: ${(props) => props.px}px;
  color: ${(props) => (props.color == null ? "none" : props.color)};
  cursor: pointer;
`;
