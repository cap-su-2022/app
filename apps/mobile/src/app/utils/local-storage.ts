import MMKVStorage, {useMMKVStorage} from "react-native-mmkv-storage";

export const storage = new MMKVStorage.Loader().initialize();

export const useStorage = (key: string, defaultValue = undefined) => {
  return useMMKVStorage(key, storage, defaultValue);
};

export const LocalStorageKeys = {
  authenticatedUser: 'user',
}
