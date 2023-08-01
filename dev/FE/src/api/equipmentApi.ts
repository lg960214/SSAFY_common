import { Reader } from '@/types/reader.type';
import { getToken } from '@/utils/storage';
import axios from 'axios';

const baseURL = 'http://I9A104.p.ssafy.io:8081/';

export const getReaders = async () => {
  try {
    const token = getToken('managerToken');
    if (!token) return;
    const res = await axios.get(baseURL + 'readers', {
      headers: {
        Authorization: `Bearer ${token}`, // Token을 헤더에 추가
      },
    });
    return res.data;
  } catch (err) {
    console.log('getReaders err: ', err);
  }
};

export const putReaders = async (jsonData: Reader[]) => {
  try {
    const res = await axios.put(baseURL + 'readers', jsonData);
    console.log('putReaders: ', res);
  } catch (err) {
    console.log('putReaders: ', err);
  }
};
