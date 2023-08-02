import axios from 'axios';
import { getToken } from '@/utils/storage';

// const token = getToken('userToken');
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNjkwOTQ4ODIwLCJleHAiOjE2OTEwMzUyMjAsInN1YiI6InRlc3QyIn0.Sb7GKSJqm93RtbOpoe3tZAJ45sfy3HZkA7L-zb3_sbE';
const BASEURL = 'http://i9a104.p.ssafy.io:8081/';

// 헬스장 이용객 수 알아오는 api
// const getUsingGymUsers = async (): Promise<number[]> => {
//   const response = await axios
//     .get<number[]>(BASEURL + 'users/using-gym/', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   console.log('헬스장 이용객수 api', response);
//   return response.data;
// };

// 헬스장 등록 api
const registGym = async (gymCode: string) => {
  const response = await axios.put(
    BASEURL + 'user/regist-gym/',
    {
      gym_code: gymCode,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export { registGym };
