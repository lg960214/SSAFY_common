import { BASEURL } from '@/constants/url';
import { Reader } from '@/types/reader.type';
import { getToken } from '@/utils/storage';
import apiClient from './apiClient';
import axios from 'axios';

export const getReaders = async () => {
  try {
    const token = getToken('managerToken');
    if (!token) return;
    const res = await apiClient.get('readers', {
      headers: {
        Authorization: `Bearer ${token}`, // Token을 헤더에 추가
      },
    });
    return res.data;
  } catch (e) {}
};

export const putReaders = async (jsonData: Reader[]) => {
  try {
    await axios.put(BASEURL + 'readers', jsonData);
  } catch (e) {}
};
