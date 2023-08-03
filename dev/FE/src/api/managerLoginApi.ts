import { BASEURL } from '@/constants/url';
import { LoginData } from '@/types/account.type';
import axios from 'axios';

const managerLoginApi = async (loginData: LoginData) => {
  try {
    const url = BASEURL + 'admin/login';
    const response = await axios.post(url, loginData);

    if (response.data.data === 'FAIL') throw Error('Login Failed');

    return response.data;
  } catch (error) {
    alert('아이디 또는 비밀번호를 확인하세요!');
    console.log(error);
  }
};

export default managerLoginApi;
