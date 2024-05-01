export enum MealTime {
  breakfast = "BREAKFAST",
  lunch = "LUNCH",
  dinner = "DINNER",
}

export enum SportKey {
  normalExercise = "NORMAL_EXERCISE",
  ballGames = "BALLGAMES",
  gym = "GYM",
}

export interface Food {
  foodName: string;
  amount: number;
  heat?: number;
}

export interface MealRequest {
  eat: boolean;
  mealTime: MealTime;
  foods?: Food[];
}

export interface MealResponse {
  date: string;
  mealTime: MealTime;
  foods: Food[];
}

export interface MealGroupedByDate {
  [date: string]: MealResponse[];
}

export interface MealRecord {
  user_id: string;
  meals: MealRequest[];
}

export interface WaterRequest {
  user_id: string;
  quantity: number;
}

export interface SnackRequest {
  user_id: string;
  foods: Food[];
}

export interface SnackRecord {
  date: string;
  foods: Food[];
}

export interface ExerciseRequest {
  user_id: string;
  type: SportKey;
  sport: string;
  amount: number;
}

export interface DiaryQueryByDays {
  user_id: string;
  days: number;
}

export interface Sport {
  sport: string;
  amount: number;
  heat?: number;
}

export interface Sports {
  type: SportKey;
  sports: Sport[];
}

export interface ExerciseResponse {
  date: string;
  sports: Sports[];
}
