import { Platform } from 'react-native';

// Use LAN IP for physical device testing
// Ensure your phone is on the SAME WiFi network
const LOCALHOST = Platform.OS === 'android' ? 'http://10.49.183.254:3000' : 'http://10.0.2.2:3000';

export const API_BASE_URL = `${LOCALHOST}/api`;
