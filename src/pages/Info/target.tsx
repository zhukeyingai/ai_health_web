import { Radio, Input, Space } from "antd";
import type { RadioChangeEvent } from "antd";
import CommonCard from "../../components/CommonCard";
import { useState } from "react";

const RadioGroup = Radio.Group;

const Target: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<"energy" | "weight">(
    "energy"
  );

  const onReset = () => {
    console.log("@重置默认值");
  };

  const changeTarget = (e: RadioChangeEvent) => {
    const curValue = e.target.value;
    setSelectedValue(curValue);
    console.log("@targetValue", curValue);
  };

  return (
    <CommonCard
      className="mt-6"
      title="体重目标或自定义能量目标"
      onClick={onReset}
      buttonName="重置默认值"
    >
      <RadioGroup
        className="mt-4"
        onChange={changeTarget}
        defaultValue="energy"
      >
        <Space direction="vertical" size="middle">
          <Radio value="energy">
            定制能量目标
            <Input
              className="mx-2 h-[24px] w-[80px] text-xs"
              disabled={selectedValue !== "energy"}
            />
            <span className="text-xs">kcal</span>
          </Radio>
          <Radio value="weight">
            体重目标
            <Input
              className="mx-2 h-[24px] w-[80px] text-xs"
              disabled={selectedValue !== "weight"}
            />
            <span className="text-xs">kg</span>
          </Radio>
        </Space>
      </RadioGroup>
      {selectedValue === "weight" ? (
        <div className="mt-4">
          todo:
          <br />
          能量摘要中显示体重目标
          <br />
          平均消耗的卡路里和燃烧的卡路里
          <br />
          体重目标时间表
        </div>
      ) : null}
    </CommonCard>
  );
};

export default Target;
