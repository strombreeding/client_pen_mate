import { imgSrc } from "../../../assets/img";
import { Img } from "../config";

const Dots: React.FC<{
  style?: React.CSSProperties;
  color?: string;
}> = ({ style, color }) => {
  return <Img px={20} color={color} src={imgSrc.dots} style={style} alt="" />;
};

export default Dots;
