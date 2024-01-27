export const useShowAnimation = (page: string) => {
  const isVistedPage = window.sessionStorage.getItem(page) != null; // 방문했으면 true
  if (!isVistedPage) {
    console.log("첫 방문~");
    window.sessionStorage.setItem(page, "v");
    return false;
  }
  if (isVistedPage) {
    console.log("이미 방문함~");
    return true;
  }
  console.log("방문여부 알 수 없음");

  return true;
};
