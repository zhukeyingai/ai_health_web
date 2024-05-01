import { memo, useState } from "react";
import { Radio, Input, Tooltip, Select, Switch } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import CommonCard from "../../components/CommonCard";
import PieceContent from "../../components/PieceContent";
import { ActivityLevelOptions } from "../../constant/infoSetting";

const RadioGroup = Radio.Group;
const SelectOption = Select.Option;

interface Props {
  bmr: number;
}

const EnergyBurned: React.FC<Props> = memo(({ bmr }) => {
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  const onReset = () => {
    console.log("@重置默认值");
  };

  const changeBMR = (e: RadioChangeEvent) => {
    const curValue = e.target.value;
    console.log("@curValue", curValue);
    if (curValue === "custom") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
    }
  };

  return (
    <CommonCard
      className="mt-6"
      title="能量消耗"
      description="选择您的偏好以确定您每天燃烧的能量（TDEE）。"
      onClick={onReset}
      buttonName="重置默认值"
    >
      <PieceContent
        header="基础代谢率（BMR）"
        description="BMR 是一个人在休息时保持身体机能所需的能量。"
      >
        <RadioGroup
          className="flex items-center energy-radio"
          onChange={changeBMR}
          defaultValue="defalut"
        >
          <Tooltip title="默认 BMR 设置使用 Mifflin St. Jeor 方程，该方程会随着您的年龄、性别、身高和体重的变化而波动。">
            <Radio className="text-xs mr-6" value="defalut">
              默认
              {!showCustomInput && (
                <span className="ml-2 text-xs">{bmr} kcal</span>
              )}
            </Radio>
          </Tooltip>
          <Radio className="mr-0 text-xs" value="custom">
            自定义
            {showCustomInput && (
              <>
                <Input className="mx-2 h-[24px] w-[80px] text-xs" />
                <span className="text-xs">kcal</span>
              </>
            )}
          </Radio>
        </RadioGroup>
      </PieceContent>
      <PieceContent header="活动水平">
        <Select
          className="h-[25px] energy-select"
          style={{ width: 240 }}
          onChange={(value) => console.log("@selectValue", value)}
          placeholder="请选择您的活动水平"
        >
          {ActivityLevelOptions.map((option) => (
            <SelectOption value={option.value}>
              {option.label}
              <Tooltip title={option.tip}>
                <QuestionCircleOutlined className="ml-2" />
              </Tooltip>
            </SelectOption>
          ))}
        </Select>
      </PieceContent>
      <div className="h-[65px] bg-[#b9d7be] my-4 rounded-lg flex items-center justify-center">
        <div className="text-base font-semibold">
          <span>燃烧的总能量（TDEE）= {bmr} kcal</span>
        </div>
      </div>
      <div className="flex flex-col w-[450px] mr-5">
        <div className="font-medium">燃烧的总能量</div>
        <div className="mt-1 text-xs text-gray-500 whitespace-pre-line">
          选择您希望日记条目如何计算您的 TDEE。
        </div>
      </div>
      <PieceContent header="锻炼" description="将锻炼纳入您的能量预算中。">
        <Switch />
      </PieceContent>
      <PieceContent
        header="食物的热效应（TEF）"
        description="TEF 是对消化食物所需能量的估计。选择此选项可根据日记中记录的食物更新消耗的卡路里。"
      >
        <Switch />
      </PieceContent>
    </CommonCard>
  );
});

export default EnergyBurned;
