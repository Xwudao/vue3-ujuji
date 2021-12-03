export const jumpUrl = (url: string) => {
  let win = window.open(url);
  if (!win) {
    location.href = url;
  }
};
