import { MMKV } from 'react-native-mmkv';

export const LOCAL_STORAGE = new MMKV();

export const useStorage = (key: string, defaultValue = undefined) => {
  return LOCAL_STORAGE.getString(key);
};

export const LocalStorageKeys = {
  authenticatedUser: 'user',
};
