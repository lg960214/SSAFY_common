import { getToken } from '@/utils/storage';
import axios from 'axios';

const baseURL = 'http://I9A104.p.ssafy.io:8081/';

export const recordApi = async (date: Object) => {
  try {
    const token = getToken('userToken');
    const res = await axios.get(baseURL + 'user/records', {
      params: date,
      headers: {
        Authorization: `Bearer ${token}`, // Token을 헤더에 추가
      },
    });
    return res.data;
  } catch (err) {}
};
export default recordApi;
