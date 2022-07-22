import { Platform } from 'react-native';

export const API_URL = `http://${
  Platform.OS === 'android' ? 'localhost' : '10.0.2.2'
}:5000/api/v1`;
