import { useEffect, useState } from "react";
import { message } from "antd";
import { useUserId } from "../../common/utils/useUserId";
import diaryApi from "../../services/diary";
import { MealResponse, MealGroupedByDate } from "../../interface/diary";
import Meals from "./Source/meals";
import Water from "./Source/water";
import Snack from "./Source/snack";
import Fitness from "./Source/fitness";

const Dairy: React.FC = () => {
  const { userId } = useUserId();
  const [meals, setMeals] = useState<MealGroupedByDate>({});

  useEffect(() => {
    queryMealRecords(1);
  }, [userId]);

  const queryMealRecords = (days: number) => {
    if (!userId) return;
    const params = {
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-1/2">
        <Meals
          userId={userId}
          onRefresh={(days) => queryMealRecords(days)}
          meals={meals}
        />
        <Water />
      </div>
      <div className="flex mt-6 h-1/2">
        <Snack />
        <Fitness />
      </div>
    </div>
  );
};

export default Dairy;
