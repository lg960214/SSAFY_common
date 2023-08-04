import { getToken } from '@/utils/storage';
import axios from 'axios';
import { BASEURL } from '@/constants/url';

export const recordApi = async (date: Object) => {
  try {
    const token = getToken('userToken');
    const res = await axios.get(BASEURL + 'user/records', {
      params: date,
      headers: {
        Authorization: `Bearer ${token}`, // Token을 헤더에 추가
      },
    });
    return res.data;
  } catch (err) {
    console.log('getRecords err: ', err);
  }
};
export default recordApi;
