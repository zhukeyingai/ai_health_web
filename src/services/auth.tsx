import request from "./request";
import { UserInfo } from "../interface/uesr";

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
};
