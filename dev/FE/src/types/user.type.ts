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

export interface SearchingData {
  now: number | null;
  weak: number | null;
  weak2: number | null;
  weak3: number | null;
}
