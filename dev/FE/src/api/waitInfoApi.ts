import axios from 'axios';
import { getToken } from '@/utils/storage';

const BASEURL = 'http://i9a104.p.ssafy.io:8081/';

// 헬스장 이용객 수 알아오는 api
const getUsingGymUsers = async (): Promise<number[]> => {
  const token = getToken('userToken');
  const response = await axios.get<number[]>(BASEURL + 'user/using-gym/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 헬스장 등록 api
const registGym = async (gymCode: string) => {
  const token = getToken('userToken');
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

// 헬스장 기구 받아오는 api
const getGymEquipments = async () => {
  const token = getToken('userToken');
  const response = await axios.get(BASEURL + 'user/readers/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { getUsingGymUsers, registGym, getGymEquipments };
