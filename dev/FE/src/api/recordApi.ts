// import { getToken } from '@/utils/storage';
import axios from 'axios';

const baseURL = 'http://I9A104.p.ssafy.io:8081/';

export const recordApi = async (date: Object) => {
  try {
    // const token = getToken('userToken');
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNjkwOTQ3OTIzLCJleHAiOjE2OTEwMzQzMjMsInN1YiI6InRlc3QxMCJ9.gB4oQcctjqB1U5VsZ_GoSIETaDWT4CX_CqGjxX1DEU8';
    const res = await axios.get(baseURL + 'user/records', {
      params: date,
      headers: {
        Authorization: `Bearer ${token}`, // Token을 헤더에 추가
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log('getRecords err: ', err);
  }
};
export default recordApi;
