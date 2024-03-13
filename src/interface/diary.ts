export enum MealTime {
  breakfast = "BREAKFAST",
  lunch = "LUNCH",
  dinner = "DINNER",
}

export interface Food {
  foodName: string;
  amount: number;
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
