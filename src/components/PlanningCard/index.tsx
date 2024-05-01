import { memo } from "react";
import CommonCard from "../CommonCard";
import { ExerciseItem } from "../../interface/motionPlanning";
import PlanRow from "./planRow";
import { getRandomColor } from "../../common/utils/getRandomColor";

interface Props {
  title: string;
  list: ExerciseItem[];
}

const PlanningCard: React.FC<Props> = memo(({ title, list }) => {
  return (
    <CommonCard className="w-full min-w-[350px]">
      <div className="px-1">
        <div className="text-lg font-medium">{title}</div>
        <div className="mt-4 mb-2 flex flex-col gap-2">
          {list.map(({ name, time, heat }, index) => {
            return (
              <PlanRow
                key={index}
                name={name}
                time={time}
                heat={heat}
                bg={getRandomColor()}
              />
            );
          })}
        </div>
      </div>
    </CommonCard>
  );
});

export default PlanningCard;
