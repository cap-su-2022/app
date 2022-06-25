import { Platform } from 'react-native';

export const API_URL = `http://${
  Platform.OS === 'android' ? '10.0.2.2' : '10.15.99.187'
}:5000/api/v1`;
