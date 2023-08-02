import { BASEURL } from '@/constants/url';
import { LoginData } from '@/types/account.type';
import { setStorage } from '@/utils/storage';
import axios from 'axios';

export const userLogin = async (loginData: LoginData) => {
  try {
    const res = await axios.post(BASEURL + 'user/login', loginData);
    const setStorageValue = {
      token: res.data.data.token,
      name: res.data.data.name,
      subject: res.data.data.subject,
    };
    setStorage('userToken', setStorageValue);

    return res.data.data;
  } catch (err) {
    console.log('userLogin err: ', err);
  }
};
