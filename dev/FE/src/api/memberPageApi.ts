import axios from 'axios';
import { MemberInfo } from '@/types/member.type';

// 로그인 기능 개발후 토큰자리
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNjkwODYwMTg2LCJleHAiOjE2OTA5NDY1ODYsInN1YiI6InNzYWZ5MSJ9.6DVipd0vMIk70u_eAtqWi_LFJ5_OrFdf1agQoCvCbBA';

// BASEURL 자리
const BASEURL = 'http://i9a104.p.ssafy.io:8080/';

// 회원정보 리스트 불러오는 api
const getUserLists = async (): Promise<MemberInfo[]> => {
  const response = await axios.get<MemberInfo[]>(BASEURL + 'admin/users/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('회원정보리스트 불러오기', response.data);
  return response.data;
};

export { getUserLists };
