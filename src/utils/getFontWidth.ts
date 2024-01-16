/* 
    글자와 글자크기, 그리고 폰트 패밀리를 넣으면 해당 글자가 잡아먹는 width를 숫자로 반환
*/
export function getTextWidth(text: string, fontSize: number, fontFamily: any) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  context.font = `${fontSize}px ${fontFamily}`;
  return Math.ceil(context.measureText(text).width);
}
