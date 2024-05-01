import { memo } from "react";
import CommonCard from "../../components/CommonCard";
import { Breadcrumb, Descriptions, Divider, Timeline } from "antd";
import type { DescriptionsProps } from "antd";
import StepCard from "../../components/StepCard";

interface Props {
  onBackToList: () => void;
}

const DishDetail: React.FC<Props> = memo(({ onBackToList }) => {
  const items: any[] = [
    {
      title: "我的菜谱大全",
      className: "cursor-pointer",
      onClick: () => onBackToList(),
    },
    {
      title: "菜品名称",
    },
  ];
  const ingredientsItems: DescriptionsProps["items"] = [
    {
      key: "西红柿",
      label: "西红柿",
      children: "2个",
    },
    {
      key: "鸡蛋",
      label: "鸡蛋",
      children: "3个",
    },
    {
      key: "盐",
      label: "盐",
      children: "适量",
    },
  ];
  const heatItems: DescriptionsProps["items"] = [
    {
      label: "总热量",
      children: "400 kcal",
    },
  ];
  const timelineItems: any[] = [
    {
      color: "green",
      children: <StepCard step={1} content="将西红柿切片，鸡蛋打散。" />,
    },
    {
      color: "green",
      children: <StepCard step={1} content="将西红柿切片，鸡蛋打散。" />,
    },
    {
      color: "green",
      children: <StepCard step={1} content="将西红柿切片，鸡蛋打散。" />,
    },
    {
      color: "green",
      children: <StepCard step={1} content="将西红柿切片，鸡蛋打散。" />,
    },
  ];

  const genIngredientsList = () => {
    return (
      <div className="w-[300px] flex flex-col gap-4">
        <div className="text-base font-medium">配料表</div>
        <Descriptions bordered column={1} items={ingredientsItems} />
      </div>
    );
  };

  const genHeat = () => {
    return (
      <div className="w-[300px] flex flex-col gap-4">
        <div className="text-base font-medium">热量</div>
        <Descriptions bordered column={1} items={heatItems} />
      </div>
    );
  };

  return (
    <CommonCard className="h-full overflow-hidden min-w-[820px] relative">
      <div className="px-2 py-1 h-full flex flex-col gap-4">
        <Breadcrumb items={items} />
        <div className="h-[calc(100%-38px)] overflow-auto flex gap-4">
          <div className="flex flex-col gap-2">
            {genIngredientsList()}
            <Divider type="horizontal" />
            {genHeat()}
          </div>
          <Divider className="h-full" type="vertical" />
          <div className="flex-1">
            <Timeline items={timelineItems} />
          </div>
        </div>
      </div>
    </CommonCard>
  );
});

export default DishDetail;
