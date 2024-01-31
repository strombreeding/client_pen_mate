export function sleep(ms: number) {
  const startTime = Date.now();
  while (Date.now() - startTime < ms) {
    // 아무것도 하지 않고 대기
  }
}
export function asyncSleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
