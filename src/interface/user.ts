export interface BaseInfo {
  user_id: string;
  avatar_url?: string;
  user_name: string;
  age: number;
  birthday: string;
  height: number;
  weight: number;
  sex: string;
  job?: string;
  address?: string;
}

export interface UserInfo extends BaseInfo {
  bmr: number;
  email: string;
  password: string;
  token?: string;
  login_num: number;
  login_last_ip?: string;
  login_last_num?: string;
  created_time: string;
  updated_time: string;
}

export interface DailyWeight {
  user_id: string;
  weight: number;
}

export interface Weight {
  date: string;
  weight: number;
}

export interface User {
  avatar_url?: string;
  user_name: string;
  user_id: string;
}
