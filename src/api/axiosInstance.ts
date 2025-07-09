import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  // baseURL: 'http://13.61.230.67:8080/api',
  baseURL: 'http://10.0.2.2:8080/api',
  headers: {'Content-Type': 'application/json'},
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default instance;
