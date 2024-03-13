import request from "./request";
import { MealRecord } from "../interface/diary";

export default {
  // 创建三餐信息
  async createMealRecords(data: MealRecord) {
    return await request.post("/diary/createMealRecords", data);
  },
  // 查询三餐记录
  async queryMealRecords(data: { user_id: string; days: number }) {
    return await request.get("/diary/queryMealRecords", { params: data });
  },
};
