import request from "./request";
import {
  MealRecord,
  WaterRequest,
  SnackRequest,
  ExerciseRequest,
  DiaryQueryByDays,
} from "../interface/diary";

export default {
  // 创建三餐信息
  async createMealRecords(data: MealRecord) {
    return await request.post("/diary/createMealRecords", data);
  },
  // 查询三餐记录
  async queryMealRecords(data: DiaryQueryByDays) {
    return await request.get("/diary/queryMealRecords", { params: data });
  },
  // 查询饮水量
  async queryWaterRecords(data: { user_id: string }) {
    return await request.get("/diary/queryWaterRecords", { params: data });
  },
  // 更新饮水量
  async updateWaterRecords(data: WaterRequest) {
    return await request.post("/diary/updateWaterRecords", data);
  },
  // 创建零食信息
  async createSnackRecords(data: SnackRequest) {
    return await request.post("/diary/createSnackRecords", data);
  },
  // 查询零食信息
  async querySnackRecords(data: DiaryQueryByDays) {
    return await request.get("/diary/querySnackRecords", { params: data });
  },
  // 创建零食信息
  async createExerciseRecords(data: ExerciseRequest) {
    return await request.post("/diary/createExerciseRecords", data);
  },
  // 查询锻炼信息
  async queryExerciseRecords(data: DiaryQueryByDays) {
    return await request.get("/diary/queryExerciseRecords", { params: data });
  },
};
