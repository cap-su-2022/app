import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const API_IP_ADDR = '10.0.2.2';

export const API_IP = API_IP_ADDR;

//Platform.OS === 'android' ? '10.0.2.2' : '172.16.4.112';

export const API_URL = `http://${
  Platform.OS === 'android' ? API_IP_ADDR : '172.16.4.112'
}:5000/api/v1`;
