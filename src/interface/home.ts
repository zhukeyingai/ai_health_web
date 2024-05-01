export interface EChartRequest {
  user_id: string;
  days: number;
}

export interface HeatIn {
  mealHeatTotal: number;
  snackHeatTotal: number;
}

export interface HeatOut {
  baseHeatTotal: number;
  exerciseHeatTotal: number;
}
