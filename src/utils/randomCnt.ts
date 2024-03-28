export const getRandomTime = () => {
  const random = Math.random() * 100; // 0부터 99.999... 사이의 랜덤한 값 생성

  if (random < 15) {
    // 0.1초 ~ 0.9초 (15% 확률)
    return (Math.random() * 0.8 + 0.1) * 1000;
  } else if (random < 45) {
    // 1초 ~ 3초 (30% 확률)
    return (Math.random() * 2 + 1) * 1000;
  } else if (random < 75) {
    // 4초 ~ 5초 (30% 확률)
    return (Math.random() * 2 + 4) * 1000;
  } else if (random < 95) {
    // 6초 ~ 7초 (20% 확률)
    return (Math.random() * 2 + 6) * 1000;
  } else {
    // 8초 ~ 9초 (5% 확률)
    return (Math.random() * 2 + 8) * 1000;
  }
};

export const addK = (num: number | null) => {
  if (num == null) return 0;
  if (num >= 1000) {
    var k = Math.floor(num / 1000);
    var remainder = num % 1000;
    var remainderStr = remainder !== 0 ? " " + remainder : "";
    return k + "k" + remainderStr;
  } else {
    return num.toString();
  }
};
