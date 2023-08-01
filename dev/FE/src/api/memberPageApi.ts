import axios from 'axios';
import { MemberInfo, UnAuthorizedUser, Device } from '@/types/member.type';

// 로그인 기능 개발후 토큰자리
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNjkwODYwMTg2LCJleHAiOjE2OTA5NDY1ODYsInN1YiI6InNzYWZ5MSJ9.6DVipd0vMIk70u_eAtqWi_LFJ5_OrFdf1agQoCvCbBA';

// BASEURL 자리
const BASEURL = 'http://i9a104.p.ssafy.io:8081/';

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

// 미승인 회원 리스트 불러오는 api
const getUnAuthorizedUsers = async (): Promise<UnAuthorizedUser[]> => {
  const response = await axios.get<UnAuthorizedUser[]>(
    BASEURL + 'admin/unauthorized-users',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log('미승인 회원 리스트 불러오기', response.data);
  return response.data;
};

// 디바이스 매칭 제거 api
const deleteDevice = async (id: string, device_code: string | null) => {
  const response = await axios.put(
    BASEURL + 'devices/',
    {
      device_code: device_code,
      id: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log('디바이스 매칭 제거', response);
  return response.data;
};

// 디바이스 매칭 api
const matchDevice = async (id: string, device_code: string | null) => {
  const response = await axios.put(
    BASEURL + 'devices/match/',
    {
      device_code: device_code,
      id: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// 디바이스 리스트 api
const deviceLists = async (): Promise<Device[]> => {
  const response = await axios.get<Device[]>(BASEURL + 'devices/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('디바이스 불러오기', response.data);
  return response.data;
};

// 회원승인, 해제 api
const changeUserGym = async ({
  userid,
  check,
}: {
  userid: number;
  check: boolean;
}) => {
  const url = check ? 'users/' : 'approval/';
  const response = await axios.put(
    BASEURL + 'admin/' + url,
    {
      userid: userid,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(url);
  if (url === 'approval/') {
    console.log('회원 승인', response);
  } else {
    console.log('회원 삭제', response);
  }
  return response.data;
};

export {
  getUserLists,
  getUnAuthorizedUsers,
  deleteDevice,
  matchDevice,
  deviceLists,
  changeUserGym,
};
