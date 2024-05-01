import request from "./request";
import { EChartRequest } from "../interface/home";

export default {
  // 查询体重信息
  async queryWeightAllDays(data: EChartRequest) {
    return await request.get("home/queryWeightAllDays", { params: data });
  },
  // 查询摄入热量
  async queryHeatIntake(data: { user_id: string }) {
    return await request.get("home/queryHeatIntake", { params: data });
  },
  // 查询消耗热量
  async queryHeatConsume(data: { user_id: string }) {
    return await request.get("home/queryHeatConsume", { params: data });
  },
};
