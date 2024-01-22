import { imgSrc } from "../../../assets/img";
import { Img } from "../config";

const CircleCheck: React.FC<{
  active: boolean;
  style?: React.CSSProperties;
  color?: string;
}> = ({ active, style, color }) => {
  return (
    <Img
      px={24}
      color={color}
      src={active ? imgSrc.check_24px : imgSrc.un_check_24px}
      style={style}
      alt=""
    />
  );
};

export default CircleCheck;
