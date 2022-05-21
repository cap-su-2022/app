import {Platform} from "react-native";

export const API_URL = `http://${Platform.OS === 'android'
  ? '10.0.2.2'
  : '192.168.1.104'}:5000/api/v1`;
