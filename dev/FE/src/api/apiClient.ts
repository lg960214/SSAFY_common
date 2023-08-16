import axios from 'axios';
import { BASEURL } from '@/constants/url';

const apiClient = axios.create({
  baseURL: BASEURL,
});

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('managerToken');
      localStorage.removeItem('userToken');
      alert('토큰이 만료되었습니다. 새로 로그인 해주세요');

      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default apiClient;
