import { memo } from "react";
import CommonCard from "../../components/CommonCard";
import { MealItem } from "../../constant/mealItem";
import { MealTime } from "../../interface/diary";
import { getRandomColor } from "../../common/utils/getRandomColor";
import { amountOptions } from "../../constant/amountOptions";
import { Tooltip } from "antd";

const todayMenu = [
  {
    mealTime: "BREAKFAST",
    foods: [
      {
        id: 1,
        foodName: "西红柿牛肉",
        amount: 2,
        heat: 200,
      },
      {
        id: 2,
        foodName: "西红柿牛肉",
        amount: 2,
        heat: 200,
      },
    ],
  },
  {
    mealTime: "LUNCH",
    foods: [
      {
        id: 1,
        foodName: "西红柿牛肉",
        amount: 2,
        heat: 200,
      },
      {
        id: 2,
        foodName: "西红柿牛肉",
        amount: 2,
        heat: 200,
      },
    ],
  },
  {
    mealTime: "DINNER",
    foods: [
      {
        id: 1,
        foodName: "西红柿牛肉",
        amount: 2,
        heat: 200,
      },
      {
        id: 2,
        foodName: "西红柿牛肉",
        amount: 2,
        heat: 200,
      },
    ],
  },
];

interface Props {
  onDetail: (id: number) => void;
}

const TodayMenu: React.FC<Props> = memo(({ onDetail }) => {
  return (
    <CommonCard className="flex-shrink-0 overflow-hidden">
      <div className="p-2 h-full">
        <div className="text-lg font-medium leading-8">今日菜谱</div>
        <div className="mt-4 h-[calc(100%-48px)]  flex overflow-auto flex-col gap-4">
          {todayMenu.map(({ mealTime, foods }) => (
            <div
              key={mealTime}
              className="bg-[#f1f8ea] w-[300px] rounded-lg p-4 "
            >
              <div className="text-base font-medium">
                {MealItem[mealTime as MealTime]}
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {foods.map((item) => {
                  const matchedItem = amountOptions.find(
                    (i) => i.value === item.amount
                  );
                  return (
                    <Tooltip
                      title={`点击查看【${item.foodName}】这道菜品的制作指南`}
                    >
                      <div
                        key={item.id}
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => onDetail(item.id)}
                      >
                        <div
                          className={`w-3 h-3 mr-1 rounded-full ${getRandomColor()}`}
                        />
                        <div className="font-medium">{item.foodName}</div>
                        <div className="text-[#a6cf60]">
                          [{matchedItem ? matchedItem.label : "未知"}]
                        </div>
                        <div className="text-[#b1b6aa]">{item.heat} kcal</div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommonCard>
  );
});

export default TodayMenu;
