import { useState } from "react";
import { Button, Dropdown, Empty, Timeline } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Meal from "../../../assets/threeMeals.svg";
import BreakfastSvg from "../../../assets/breakfast.svg";
import LunchSvg from "../../../assets/lunch.svg";
import DinnerSvg from "../../../assets/dinner.svg";
import CommonCard from "../../../components/CommonCard";
import MealModal from "../components/mealModal";
import { MealTime, MealGroupedByDate } from "../../../interface/diary";
import { genSubTitle } from "../constant";
import { amountOptions } from "../../../constant/amountOptions";
import { MealItem } from "../../../constant/mealItem";

interface MealsProps {
  userId?: string;
  onRefresh: (days: number) => void;
  meals: MealGroupedByDate;
}

const Meals: React.FC<MealsProps> = ({ userId, onRefresh, meals }) => {
  const [showMealModal, setShowMealModal] = useState<boolean>(false);
  const [days, setDays] = useState<number>(1);

  const genMealIcon = (mealTime: MealTime) => {
    switch (mealTime) {
      case MealTime.breakfast:
        return BreakfastSvg;
      case MealTime.lunch:
        return LunchSvg;
      case MealTime.dinner:
        return DinnerSvg;
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setDays(1);
            onRefresh(1);
          }}
        >
          {genSubTitle(1)}记录
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setDays(3);
            onRefresh(3);
          }}
        >
          {genSubTitle(3)}记录
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            setDays(7);
            onRefresh(7);
          }}
        >
          {genSubTitle(7)}记录
        </div>
      ),
    },
  ];

  const genContent = () => {
    return (
      <div className="h-[calc(100%-64px)] overflow-auto">
        <div className="pl-3 py-5">
          {Object.entries(meals).map(([date, mealsOfDay]) => (
            <div key={date}>
              <div className="mt-2 mb-4 ml-6 text-[#a1a1aa] text-sm">
                {date.toString()}
              </div>
              <Timeline>
                {mealsOfDay.map((item) => (
                  <Timeline.Item
                    key={`${item.date}_${item.mealTime}`}
                    dot={<img src={genMealIcon(item.mealTime)} width={24} />}
                  >
                    <div className="font-medium">{MealItem[item.mealTime]}</div>
                    <div className="mt-1 text-[13px]">
                      {item.foods.length > 0 ? (
                        item.foods.map((m) => {
                          const matchedItem = amountOptions.find(
                            (i) => i.value === m.amount
                          );
                          return (
                            <div key={`${m.foodName}_${m.amount}`}>
                              <span className="mr-1">{m.foodName}</span>
                              <span className="text-[#a6cf60] mr-1">
                                【{matchedItem ? matchedItem.label : "未知"}】
                              </span>
                              <span className="text-[#b1b6aa]">
                                {m.heat} kcal
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-[#a1a1aa]">{`没吃 :(`}</div>
                      )}
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          ))}
        </div>
        <Button
          className="absolute right-4 bottom-4"
          type="primary"
          onClick={() => setShowMealModal(true)}
        >
          添加
        </Button>
      </div>
    );
  };

  return (
    <div className="w-1/2 overflow-hidden min-w-[350px]">
      <CommonCard className="h-full relative">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img src={Meal} className="w-8" />
            <div className="ml-1.5 text-[15px] font-semibold">三餐</div>
          </div>
          <div className="flex items-center">
            <div className="text-[#a1a1aa] font-semibold mr-6">
              {genSubTitle(days)}
            </div>
            <Dropdown className="cursor-pointer" menu={{ items }}>
              <div className="text-[#a6cf60]">
                更多
                <MoreOutlined />
              </div>
            </Dropdown>
          </div>
        </div>
        {Object.keys(meals).length > 0 ? (
          genContent()
        ) : (
          <Empty
            rootClassName="h-[calc(100%-32px)] flex flex-col justify-center"
            description={false}
          >
            <Button type="primary" onClick={() => setShowMealModal(true)}>
              添加
            </Button>
          </Empty>
        )}
      </CommonCard>
      {showMealModal && (
        <MealModal
          userId={userId}
          onCancel={() => setShowMealModal(false)}
          onSuccess={() => {
            setShowMealModal(false);
            onRefresh(1);
          }}
        />
      )}
    </div>
  );
};

export default Meals;
