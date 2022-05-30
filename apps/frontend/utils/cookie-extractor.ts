export const getCookie = (cookie: string, extractingName: string) => {
  const parts = cookie.split(`; ${extractingName}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
