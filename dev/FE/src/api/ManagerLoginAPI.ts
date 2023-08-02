import { BASEURL } from '@/constants/url';
import { LoginData } from '@/types/account.type';
import axios from 'axios';

const managerLoginApi = async (loginData: LoginData) => {
  try {
    const url = BASEURL + 'admin/login';
    const response = await axios.post(url, loginData);

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'An error occurred during login.',
    );
  }
};

export default managerLoginApi;
