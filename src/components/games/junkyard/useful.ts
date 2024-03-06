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
