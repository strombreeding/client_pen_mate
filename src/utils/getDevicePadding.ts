import { number } from "yargs";
import { MOBILE, SCREEN_HEIGHT } from "../configs/device";

/*모바일과 브라우저 각각의 paddingTop, bottom 순서대로 배열에 넣고 여기에 주면
"top 0px bottom 0px " 형식으로 반환
*/
export const devicePadding = (
  mobile: number[],
  browser: number[],
  headerNone?: boolean
) => {
  const figmaHeight = MOBILE
    ? headerNone == true
      ? 706
      : 706 - 56
    : headerNone == true
    ? 938
    : 938 - 56; // 이 값은 피그마 화면기준임 이 값으로 상대값을 구하여 리턴
  const paddingValue = MOBILE ? mobile : browser;
  const ratioTop = paddingValue[0] / figmaHeight;
  const ratioBot = paddingValue[1] / figmaHeight;
  console.log(
    `
      top비율 = ${ratioTop}
      bot비율 = ${ratioBot}
    `
  );
  console.log();

  const result =
    headerNone == true
      ? `${ratioTop * SCREEN_HEIGHT}px 0px ${ratioBot * SCREEN_HEIGHT}px 0px`
      : `${ratioTop * (SCREEN_HEIGHT - 56)}px 0px ${
          ratioBot * (SCREEN_HEIGHT - 56)
        }px 0px`;

  return result;
};
