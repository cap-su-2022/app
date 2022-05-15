import {LocalStorageKeys, useStorage} from "../app/utils/local-storage";
import {useEffect} from "react";

interface AuthenticatedUserModel {
  username: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
};

const authenticatedUserInitialState: AuthenticatedUserModel = {
  username: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  role: '',
}

export const useAuthenticatedUser = async () => {
  const [authenticatedUser, setAuthenticatedUser] = useStorage(LocalStorageKeys.authenticatedUser, authenticatedUserInitialState);


}
