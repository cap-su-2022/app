import {Platform} from "react-native";

export const API_URL = `http://${Platform.OS === 'android'
  ? '10.0.2.2'
  : '172.16.3.230'}:5000/api/v1`;
