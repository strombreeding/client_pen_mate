export function startAfterMsTime(timestamp: number) {
  // 현재 시간 가져오기
  const currentTime = Date.now();

  // 주어진 타임스탬프까지 남은 시간 계산 (밀리초 단위)
  const remainingTime = timestamp - currentTime;

  // 남은 시간을 'Ns 후에 시작합니다' 형식으로 변환하여 반환
  return `${remainingTime}ms 후 시작`;
}
