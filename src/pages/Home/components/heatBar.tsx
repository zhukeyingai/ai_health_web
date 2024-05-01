import { memo } from "react";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import CommonCard from "../../../components/CommonCard";
import { HeatIn, HeatOut } from "../../../interface/home";

interface Props {
  loading: boolean;
  dataIn?: HeatIn;
  dataOut?: HeatOut;
}

const colors = ["#daf7a6", "#85c1e9", "#f1948a", "#f0b27a"];

const HeatBar: React.FC<Props> = memo(({ loading, dataIn, dataOut }) => {
  const option: EChartsOption = {
    dataset: {
      source: [
        ["kcal", "name"],
        [dataOut?.exerciseHeatTotal, "运动热量消耗"],
        [dataOut?.baseHeatTotal, "基础热量消耗"],
        [dataIn?.snackHeatTotal, "零食热量摄入"],
        [dataIn?.mealHeatTotal, "三餐热量摄入"],
      ],
    },
    xAxis: {
      name: "kcal",
    },
    yAxis: {
      type: "category",
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        type: "bar",
        encode: {
          x: "kcal",
          y: "name",
        },
        itemStyle: {
          color: function (params) {
            return colors[params.dataIndex];
          },
        },
      },
    ],
    grid: [
      {
        left: 96,
        right: 50,
        top: 20,
        bottom: 20,
      },
    ],
  };

  return (
    <CommonCard className="w-1/2 min-w-[438px]">
      <div className="pl-[18px] pr-[12px] my-2 text-[15px] font-medium flex items-center">
        <div className="w-3 h-3 bg-red-300 rounded-full mr-3" />
        <div>热量</div>
      </div>
      <EChartsReact option={option} showLoading={loading} />
    </CommonCard>
  );
});

export default HeatBar;
