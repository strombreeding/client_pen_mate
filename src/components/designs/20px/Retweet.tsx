import { imgSrc } from "../../../assets/img";
import { Img } from "../config";

const Retweet: React.FC<{
  style?: React.CSSProperties;
  color?: string;
}> = ({ style, color }) => {
  return (
    <Img px={20} color={color} src={imgSrc.retweet_20px} style={style} alt="" />
  );
};

export default Retweet;
