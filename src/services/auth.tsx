import request from "./request";
import { BaseInfo, UserInfo } from "../interface/user";

export default {
  // 注册
  async register(data: Pick<UserInfo, "email" | "password">) {
    return await request.post("/auth/register", data);
  },
  //登录
  async login(data: Pick<UserInfo, "email" | "password">) {
    return await request.post("/auth/login", data);
  },
  // 退出登录
  async logout(data: Pick<UserInfo, "user_id">) {
    return await request.get("/auth/logout", { params: data });
  },
  // 用户注销
  async deleteUser(data: Pick<UserInfo, "user_id">) {
    return await request.post("/auth/deleteUser", data);
  },
  // 获取用户信息
  async getUserInfo(data: Pick<UserInfo, "user_id">) {
    return await request.get("/user/getUserInfo", { params: data });
  },
  // 更改密码
  async updatePassword(data: {
    user_id: string;
    oldPassword: string;
    newPassword: string;
    repeatedPassword: string;
  }) {
    return await request.patch("/user/updatePassword", data);
  },
  // 更改用户信息
  async updateUserInfo(data: BaseInfo) {
    return await request.patch("/user/updateUserInfo", data);
  },
};
