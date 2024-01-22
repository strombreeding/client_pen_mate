import { imgSrc } from "../../../assets/img";
import { Img } from "../config";

const Dm20: React.FC<{
  style?: React.CSSProperties;
  color?: string;
}> = ({ style, color }) => {
  return (
    <Img px={20} color={color} src={imgSrc.dm_20px} style={style} alt="" />
  );
};

export default Dm20;
