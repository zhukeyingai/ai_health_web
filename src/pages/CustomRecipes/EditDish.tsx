import { memo, useState } from "react";
import CommonCard from "../../components/CommonCard";
import { Breadcrumb, Button, Form, FormProps, Select } from "antd";
import BlockTitle from "../../components/BlockTitle";
import { RequiredValidator } from "../../common/utils/validator";
import { FlavorList } from "./constant";

const FormItem = Form.Item;
const { Option } = Select;
const FormLayout: FormProps = {
  layout: "horizontal",
  labelCol: { style: { minWidth: "160px", maxWidth: "160px" } },
  wrapperCol: { style: { flex: 1, maxWidth: "100%" } },
  labelAlign: "right",
};
const foodList = ["西红柿", "牛肉", "土豆"];
const dishList = [
  {
    id: 1,
    name: "西红柿炖牛肉",
  },
  {
    id: 2,
    name: "土豆炖牛腩",
  },
  {
    id: 3,
    name: "西红柿土豆炖牛肉",
  },
  {
    id: 4,
    name: "西红柿炖牛肉",
  },
  {
    id: 5,
    name: "土豆炖牛腩",
  },
  {
    id: 6,
    name: "西红柿土豆炖牛肉",
  },
];

interface Props {
  onBackToList: () => void;
}

const EditDish: React.FC<Props> = memo(({ onBackToList }) => {
  const [form] = Form.useForm();
  const [showAdvice, setShowAdvice] = useState<boolean>(false);
  const [dishCard, setDishCard] = useState<
    | {
        id: number;
        name: string;
      }
    | undefined
  >(undefined);
  const items: any[] = [
    {
      title: "我的菜谱大全",
      className: "cursor-pointer",
      onClick: () => onBackToList(),
    },
    {
      title: "创建菜品",
    },
  ];

  const getAdvice = () => {
    setShowAdvice(true); // 获取建议之后
  };

  const onSubmit = () => {};

  const genForm = () => {
    return (
      <Form form={form} {...FormLayout}>
        <FormItem
          label="食材"
          name="foods"
          colon={false}
          required
          rules={RequiredValidator}
        >
          <Select
            placeholder="请选择你喜欢的食材..."
            mode="multiple"
            allowClear
          >
            {foodList.map((m) => (
              <Option key={m} value={m}>
                {m}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          label="口味需求"
          name="flavor"
          colon={false}
          required
          rules={RequiredValidator}
        >
          <Select placeholder="请选择你喜欢的口味..." showSearch>
            {FlavorList.map((m) => (
              <Option key={m} value={m}>
                {m}
              </Option>
            ))}
          </Select>
        </FormItem>
      </Form>
    );
  };

  const genDishes = () => {
    if (!showAdvice) return null;
    return (
      <div>
        <div className="flex flex-wrap rounded-lg gap-6">
          {dishList.map(({ id, name }) => (
            <div
              className={`cursor-pointer flex items-center py-2 px-3 rounded-lg ${dishCard?.id === id ? "bg-[#e9f6dc]" : "bg-[#f6f7f9]"}`}
              key={id}
              onClick={() => setDishCard({ id, name })}
            >
              {name}
            </div>
          ))}
        </div>
        {dishCard?.id && (
          <div className="flex mt-6 bg-[#e9f6dc] rounded-lg py-2 px-3 justify-center items-center h-[65px]">
            <div className="w-[160px] text-right pr-[14px]">你所选择的菜品</div>
            <div>{dishCard?.name}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <CommonCard className="h-full overflow-hidden min-w-[820px] relative">
      <div className="px-2 py-1 h-full flex flex-col gap-2">
        <Breadcrumb items={items} />
        <div className="h-[calc(100%-82px)] overflow-auto px-[120px]">
          <div>
            <BlockTitle title="基础信息" className="my-6" />
            {genForm()}
            <Button className="ml-[160px]" type="primary" onClick={getAdvice}>
              获取菜品建议
            </Button>
          </div>
          <div>
            <BlockTitle title="菜品建议" className="my-6" />
            {genDishes()}
          </div>
          <Button
            className="absolute right-6 bottom-5"
            type="primary"
            onClick={() => onSubmit()}
          >
            创建
          </Button>
        </div>
      </div>
    </CommonCard>
  );
});

export default EditDish;
