import axios from "axios";

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const origReq = error.config;
  if (error.response.status === 401 && !origReq.url.endsWith('/auth/signin')) {
    console.log('auth failed');
    return Promise.reject(error);
  }
  return Promise.reject(error);
});
