import useSWR from "swr";

interface LoginRequest {
  username: string;
  password: string;
}

export const JSONFetcher = (...args) => fetch(...args).then(res => res.json());
export const TextFetcher = (...args) => fetch(...args).then(res => res.text());
export const BlobFetcher = (...args) => fetch(...args).then(res => res.blob());


export const AUTH_API = {
  login: '/api/v1/signin',
  logout: '/api/v1/signout',
  refreshToken: '/api/v1/refreshToken'
}

export function useLoginRequest(request: LoginRequest) {
  const { data, error } = useSWR(AUTH_API.login, JSONFetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}
