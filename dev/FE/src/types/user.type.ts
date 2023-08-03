export interface User {
  gymName: string;
  name: string;
  regist: number | null;
  subject: string;
}

export interface GymEquipments {
  reader: string;
  region: string;
  name: string;
  gymCode: number;
}
