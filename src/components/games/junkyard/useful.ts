export const getAiInt = (aiInt: string | undefined): number => {
  if (aiInt === "초보" || aiInt === "FOOL") {
    return 5;
  }
  if (aiInt === "중수" || aiInt === "AVG") {
    return 3;
  }
  if (aiInt === "고수" || aiInt === "Univ") {
    return 1;
  }
  if (aiInt === "신" || aiInt === "GOD") {
    return 0;
  }
  return 5;
};

export const throwDice = (probabilityString: string) => {
  // 입력된 확률 문자열에서 숫자 부분과 퍼센트 기호를 제거하여 숫자로 변환
  const probability = parseFloat(probabilityString.replace("%", "")) / 100;

  // 0부터 1 사이의 난수 생성
  const randomNum = Math.random();

  // 난수가 확률에 해당하는 범위 안에 있으면 true를 반환, 아니면 false를 반환
  return randomNum < probability;
};

export const getAntiMatter = () => {
  const isGet = throwDice("1%");
  // const isGet = throwDice("0.5%");
  return isGet;
};

export const getEnergy = () => {
  const isGet = throwDice("2%");
  return isGet;
};
