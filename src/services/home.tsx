import request from "./request";
import { EChartRequest } from "../interface/home";

export default {
  // 查询体重信息
  async queryWeightAllDays(data: EChartRequest) {
    return await request.get("home/queryWeightAllDays", { params: data });
  },
};
