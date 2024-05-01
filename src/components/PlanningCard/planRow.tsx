import { memo } from "react";
import { getTimes } from "../../common/utils/getTimes";

interface Props {
  className?: string;
  bg?: string;
  name: string;
  time: number;
  heat?: number;
}

const PlanRow: React.FC<Props> = memo(({ className, bg, name, time, heat }) => {
  const genTime = () => {
    const { hours, minutes } = getTimes(time);
    return (
      <div className="text-sm text-[#a1a1aa]">
        {hours ? `${hours}h` : ""}
        {minutes ? `${minutes}min` : ""}
      </div>
    );
  };

  return (
    <div
      className={`text-sm flex items-center gap-3 ${className || "ml-[21px]"}`}
    >
      <div className="flex items-center">
        <div className={`w-3 h-3 mr-4 rounded-full ${bg || ""}`} />
        <div className="font-medium">{name}</div>
      </div>
      {genTime()}
      {heat && <div className="text-[#a1a1aa]">消耗热量：{heat}kcal</div>}
    </div>
  );
});

export default PlanRow;
