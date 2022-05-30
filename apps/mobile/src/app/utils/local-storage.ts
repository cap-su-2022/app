import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const useStorage = (key: string, defaultValue = undefined) => {
  return storage.getString(key);
};

export const LocalStorageKeys = {
  authenticatedUser: 'user',
};
