export const safeParseLocalStorage = (key: LocalStorageKeys) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    return undefined;
  }
};
type LocalStorageKeys = "crvif/auth";

export const getDefaultRedirectUrl = () => {
  return new URLSearchParams(window.location.search).get("redirect") || "/";
};

export const downloadFile = (url: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = "report.pdf";
  a.click();
  a.remove();
}