import { useState } from "react";
import { Dropdown, Empty, Button, Tag, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { SportLabeLMap, amountTagColors, genSubTitle } from "../constant";
import ExerciseSvg from "../../../assets/exercise.svg";
import CommonCard from "../../../components/CommonCard";
import ExerciseModal from "../components/exerciseModal";
import { ExerciseResponse } from "../../../interface/diary";
import { amountOptions } from "../../../constant/amountOptions";

interface ExerciseProps {
  userId?: string;
  onRefresh: (days: number) => void;
  exerciseList: ExerciseResponse[];
}

const Exercise: React.FC<ExerciseProps> = ({
  userId,
  onRefresh,
  exerciseList,
}) => {
  const [showExerciseModal, setShowExerciseModal] = useState<boolean>(false);
  const [days, setDays] = useState<number>(1);

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
        <div className="px-3 py-5">
          {exerciseList.map(({ date, sports }) => {
            return (
              <div key={date} className="pb-5">
                <div className="mt-2 mb-2 ml-6 text-[#a1a1aa] text-sm">
                  {date}
                </div>
                <div className="flex flex-col">
                  {sports.map((item) => {
                    const curSportType = SportLabeLMap[item.type];
                    return (
                      <div
                        className="py-3 px-4 bg-[#f6f7f9] rounded-lg m-2"
                        key={item.type}
                      >
                        <div className="font-medium mb-3">
                          {curSportType.label}
                        </div>
                        <div className="flex flex-wrap">
                          {item.sports.map((m) => {
                            const curSport = curSportType.list.find(
                              (i) => i.value === m.sport
                            );
                            const curOption = amountOptions.find(
                              (i) => i.value === m.amount
                            );
                            const curColor = amountTagColors[m.amount - 1];
                            return curSport ? (
                              <Tooltip
                                key={m.sport}
                                title={
                                  <>
                                    <div>
                                      运动时长：{curOption?.label ?? "未知"}
                                    </div>
                                    <div>燃烧热量：{m.heat} kcal</div>
                                  </>
                                }
                              >
                                <Tag
                                  className="cursor-pointer flex items-center py-1"
                                  bordered={false}
                                  icon={
                                    <img
                                      className="mr-1"
                                      src={curSport.src}
                                      width={20}
                                    />
                                  }
                                  color={curColor ? curColor : "purple"}
                                >
                                  {curSport.label}
                                </Tag>
                              </Tooltip>
                            ) : null;
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Button
          className="absolute right-4 bottom-4"
          type="primary"
          onClick={() => setShowExerciseModal(true)}
        >
          添加
        </Button>
      </div>
    );
  };

  return (
    <div className="ml-6 w-1/2 min-w-[350px]">
      <CommonCard className="h-full relative">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img src={ExerciseSvg} className="w-8" />
            <div className="ml-1.5 text-[15px] font-semibold">锻炼</div>
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
        {exerciseList.length > 0 ? (
          genContent()
        ) : (
          <Empty
            rootClassName="h-[calc(100%-32px)] flex flex-col justify-center"
            description={false}
          >
            <Button type="primary" onClick={() => setShowExerciseModal(true)}>
              添加
            </Button>
          </Empty>
        )}
      </CommonCard>
      {showExerciseModal && (
        <ExerciseModal
          userId={userId}
          onCancel={() => setShowExerciseModal(false)}
          onSuccess={() => {
            setShowExerciseModal(false);
            onRefresh(1);
          }}
        />
      )}
    </div>
  );
};

export default Exercise;
