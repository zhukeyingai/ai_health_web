import { useEffect, useState } from "react";
import { Form, Modal, Button, Input, Radio, Checkbox, message } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { RequiredValidator } from "../../../common/utils/validator";
import { MealTime, MealRecord } from "../../../interface/diary";
import diaryApi from "../../../services/diary";
import { MealItem, amountOptions } from "../constant";

const { createMealRecords } = diaryApi;
const FormItem = Form.Item;
const FormList = Form.List;
const RadioGroup = Radio.Group;

interface Props {
  userId?: string;
  onCancel: () => void;
  onSuccess?: () => void;
}

const MealModal: React.FC<Props> = ({ userId, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      meals: [{ mealTime: MealTime.breakfast, eat: false }],
    });
  }, []);

  const onSubmit = () => {
    if (!userId) return;
    form.validateFields().then(({ meals }) => {
      if (meals.length === 0) {
        message.error("当前没有填写任何就餐信息");
        return;
      }
      const meal = meals.find((i: any) => i?.eat && i?.foods.length === 0);
      if (meal) {
        message.error("当前餐次没有填写任何饮食信息");
        return;
      }
      setLoading(true);
      const params: MealRecord = {
        user_id: userId,
        meals,
      };
      createMealRecords(params)
        .then(({ data }) => {
          if (data) {
            message.success("您的就餐信息上传成功！");
            onSuccess?.();
          }
        })
        .catch((err) => message.error(`创建三餐信息失败：${err}`))
        .finally(() => setLoading(false));
    });
  };

  const handleCheck = (id: number) => {
    const currentMeals = form.getFieldValue("meals");
    const currentMealTime = currentMeals[id];
    if (currentMealTime?.eat && !currentMealTime?.foods) {
      form.setFieldsValue({
        meals: {
          ...currentMeals,
          [id]: {
            ...currentMealTime,
            foods: [{ foodName: "", amount: 3 }],
          },
        },
      });
    }
  };

  const genFoods = (id: number) => {
    return (
      <FormList name={[id, "foods"]}>
        {(subFields, { add, remove }) => (
          <>
            {subFields.map(({ key, name }) => {
              return (
                <div key={key}>
                  <div className="flex justify-between">
                    <FormItem
                      name={[name, "foodName"]}
                      label="食物"
                      colon={false}
                      required
                      rules={RequiredValidator}
                    >
                      <Input placeholder="食物名称" />
                    </FormItem>
                    <FormItem
                      name={[name, "amount"]}
                      label="量"
                      colon={false}
                      initialValue={3}
                      required
                      rules={RequiredValidator}
                    >
                      <RadioGroup options={amountOptions} />
                    </FormItem>
                    <Button
                      className="p-0"
                      type="link"
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                    >
                      删除
                    </Button>
                  </div>
                </div>
              );
            })}
            <Button
              className="p-0"
              type="link"
              icon={<PlusCircleOutlined />}
              onClick={() => add()}
            >
              添加食物
            </Button>
          </>
        )}
      </FormList>
    );
  };

  return (
    <Modal
      title="记录三餐"
      centered
      open={true}
      okText="添加"
      cancelText="取消"
      onOk={onSubmit}
      onCancel={onCancel}
      width={850}
      confirmLoading={loading}
    >
      <Form form={form}>
        <FormList name="meals">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => {
                return (
                  <div
                    key={key}
                    className="bg-[#f6f7f9] rounded-lg mb-4 px-4 py-3"
                  >
                    <div className="flex justify-between">
                      <FormItem
                        name={[name, "mealTime"]}
                        initialValue={MealTime.breakfast}
                      >
                        <RadioGroup
                          options={Object.entries(MealItem).map(
                            ([value, label]) => ({ value, label })
                          )}
                        />
                      </FormItem>
                      <FormItem
                        name={[name, "eat"]}
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox onChange={() => handleCheck(name)}>
                          吃了
                        </Checkbox>
                      </FormItem>
                      <Button
                        className="p-0"
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      >
                        删除
                      </Button>
                    </div>
                    <FormItem noStyle shouldUpdate>
                      {() => {
                        const currentMealTime =
                          form.getFieldValue("meals")[name];
                        return currentMealTime?.eat ? genFoods(name) : null;
                      }}
                    </FormItem>
                  </div>
                );
              })}
              <Button
                className="p-0"
                type="link"
                icon={<PlusOutlined />}
                onClick={() => add()}
              >
                添加三餐
              </Button>
            </>
          )}
        </FormList>
      </Form>
    </Modal>
  );
};

export default MealModal;
