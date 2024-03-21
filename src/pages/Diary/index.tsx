import { useEffect, useState } from "react";
import { message } from "antd";
import { useUserId } from "../../common/utils/useUserId";
import diaryApi from "../../services/diary";
import {
  MealResponse,
  MealGroupedByDate,
  SnackRecord,
  diaryQueryByDays,
  ExerciseResponse,
} from "../../interface/diary";
import Meals from "./Source/meals";
import Water from "./Source/water";
import Snack from "./Source/snack";
import Exercise from "./Source/Exercise";

const Diary: React.FC = () => {
  const { userId } = useUserId();
  const [meals, setMeals] = useState<MealGroupedByDate>({});
  const [waterQuantity, setWaterQuantity] = useState<number>(0);
  const [snackList, setSnackList] = useState<SnackRecord[]>([]);
  const [exerciseList, setExerciseList] = useState<ExerciseResponse[]>([]);

  useEffect(() => {
    queryMealRecords(1);
    queryWaterQuantity();
    querySnackRecords(1);
    queryExerciseRecords(1);
  }, [userId]);

  const queryMealRecords = (days: number) => {
    if (!userId) return;
    const params: diaryQueryByDays = {
      user_id: userId,
      days,
    };
    diaryApi
      .queryMealRecords(params)
      .then((res) => {
        const list = res.data;
        const mealsByDate = list.reduce(
          (acc: MealGroupedByDate, meal: MealResponse) => {
            const { date } = meal;
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(meal);
            return acc;
          },
          {} as MealGroupedByDate
        );
        setMeals(mealsByDate);
      })
      .catch((err) => message.error(`查询三餐记录失败：${err}`));
  };

  const queryWaterQuantity = () => {
    if (!userId) return;
    diaryApi
      .queryWaterRecords({ user_id: userId })
      .then((res) => setWaterQuantity(res.data))
      .catch((err) => message.error(`查询今日饮水记录失败：${err}`));
  };

  const querySnackRecords = (days: number) => {
    if (!userId) return;
    const params: diaryQueryByDays = {
      user_id: userId,
      days,
    };
    diaryApi
      .querySnackRecords(params)
      .then((res) => {
        const list = res.data.map((item: any) => ({
          date: item.date,
          foods: JSON.parse(item.foods),
        }));
        setSnackList(list);
      })
      .catch((err) => message.error(`查询零食信息失败：${err}`));
  };

  const queryExerciseRecords = (days: number) => {
    if (!userId) return;
    const params: diaryQueryByDays = {
      user_id: userId,
      days,
    };
    diaryApi
      .queryExerciseRecords(params)
      .then((res) => {
        setExerciseList(res.data);
      })
      .catch((err) => message.error(`查询锻炼信息失败：${err}`));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-1/2">
        <Meals
          userId={userId}
          onRefresh={(days) => queryMealRecords(days)}
          meals={meals}
        />
        <Water
          userId={userId}
          onRefresh={queryWaterQuantity}
          waterQuantity={waterQuantity}
        />
      </div>
      <div className="flex mt-6 h-1/2">
        <Snack
          userId={userId}
          onRefresh={(days) => querySnackRecords(days)}
          snackList={snackList}
        />
        <Exercise
          userId={userId}
          onRefresh={(days) => queryExerciseRecords(days)}
          exerciseList={exerciseList}
        />
      </div>
    </div>
  );
};

export default Diary;
