import { Platform } from 'react-native';

export const API_URL = `http://${
  Platform.OS === 'android' ? 'localhost' : '192.168.1.107'
}:5000/api/v1`;
