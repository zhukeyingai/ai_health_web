export interface UserInfo {
  user_id: string;
  user_name: string;
  email: string;
  password: string;
  age: number;
  birthday: string;
  height: number;
  weight: number;
  avatar_url?: string;
  sex: string;
  job?: string;
  address?: string;
  token?: string;
  login_num: number;
  login_last_ip?: string;
  login_last_num?: string;
  created_time: string;
  updated_time: string;
}
