export interface MemberInfo {
  deviceCode: string | null;
  email: string;
  gymCode: number;
  id: string;
  name: string;
  password: string;
  phoneNumber: string;
  regist: number;
  sex: string;
  userId: number;
}

export interface UnAuthorizedUser {
  name: string;
  userid: string;
  access_user: string | null;
}
