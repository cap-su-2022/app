import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const API_IP_ADDR = '34.142.193.100';

const getAndroidIPAddress = () =>
  DeviceInfo.isEmulatorSync() ? '10.0.2.2' : API_IP_ADDR;

export const API_URL = `http://${
  Platform.OS === 'android' ? API_IP_ADDR : API_IP_ADDR
}:5000/api/v1`;
