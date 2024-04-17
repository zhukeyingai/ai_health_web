import { memo, useMemo } from "react";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import CommonCard from "../../../components/CommonCard";
import { Weight } from "../../../interface/user";
import { Select } from "antd";
import { daysOptions } from "../constant";

interface Props {
  weightList?: Weight[];
  loading: boolean;
  onChangeDays: (days: number) => void;
}

const WeightEChart: React.FC<Props> = memo(
  ({ weightList, loading, onChangeDays }) => {
    const minValue =
      weightList && weightList.length > 0
        ? Math.min(...weightList.map((i) => i.weight)) - 1
        : 0;
    const maxValue =
      weightList && weightList.length > 0
        ? Math.max(...weightList.map((i) => i.weight)) + 1
        : 100;

    const data = useMemo(() => {
      return weightList?.map((item) => ({
        value: [item.date, item.weight],
      }));
    }, [weightList]);

    const option: EChartsOption = {
      xAxis: {
        type: "category",
        name: "日期",
        axisLabel: {
          formatter: (value) => {
            const date = new Date(value);
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
          },
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
        name: "体重（kg）",
        min: minValue,
        max: maxValue,
        splitNumber: 5,
      },
      tooltip: {
        trigger: "axis",
      },
      series: [
        {
          name: "体重（kg）",
          data,
          type: "line",
          showSymbol: false,
        },
      ],
      grid: [
        {
          left: 50,
          right: 50,
          top: 45,
          bottom: 30,
        },
      ],
      visualMap: [
        {
          show: false,
          type: "continuous",
          seriesIndex: 0,
          min: 0,
          max: 100,
        },
      ],
    };

    return (
      <CommonCard className="min-w-[900px]">
        <div className="flex items-center justify-between pl-[18px] pr-[12px] my-2">
          <div className="text-[15px] font-medium flex items-center">
            <div className="w-3 h-3 bg-sky-300 rounded-full mr-3"></div>
            <div>重量</div>
          </div>
          <Select
            className="w-[150px]"
            options={daysOptions}
            variant="filled"
            defaultValue={7}
            onChange={onChangeDays}
          />
        </div>
        <EChartsReact option={option} showLoading={loading} />
      </CommonCard>
    );
  }
);

export default WeightEChart;
