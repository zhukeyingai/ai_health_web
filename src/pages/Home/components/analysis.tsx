import { memo } from "react";
import CommonCard from "../../../components/CommonCard";

const Analysis: React.FC = memo(() => {
  return (
    <CommonCard className="w-1/2 min-w-[438px] ml-6 flex flex-col">
      <div className="pl-[18px] pr-[12px] my-2 text-[15px] font-medium flex items-center">
        <div className="w-3 h-3 bg-purple-300 rounded-full mr-3" />
        <div>分析</div>
      </div>
      <div className="flex-1 m-4">一些分析内容</div>
    </CommonCard>
  );
});

export default Analysis;
