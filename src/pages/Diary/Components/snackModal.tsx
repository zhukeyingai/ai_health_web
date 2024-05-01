import { useState, useEffect } from "react";
import { Form, Modal, Input, Radio, Button, message } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { RequiredValidator } from "../../../common/utils/validator";
import { SnackRequest } from "../../../interface/diary";
import diaryApi from "../../../services/diary";
import { amountOptions } from "../../../constant/amountOptions";

const { createSnackRecords } = diaryApi;
const FormItem = Form.Item;
const FormList = Form.List;
const RadioGroup = Radio.Group;

interface Props {
  userId?: string;
  onCancel: () => void;
  onSuccess?: () => void;
}

const SnackModal: React.FC<Props> = ({ userId, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      foods: [{ foodName: "", amount: 3 }],
    });
  }, []);

  const onSubmit = () => {
    if (!userId) return;
    form.validateFields().then(({ foods }) => {
      if (foods.length > 0) {
        setLoading(true);
        const params: SnackRequest = {
          user_id: userId,
          foods,
        };
        createSnackRecords(params)
          .then(({ data }) => {
            if (data) {
              message.success("您的零食信息上传成功");
              onSuccess?.();
            }
          })
          .catch((err) => message.error(`创建零食信息失败：${err}`))
          .finally(() => setLoading(false));
      }
    });
  };

  return (
    <Modal
      title="记录零食"
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
        <FormList name="foods">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }) => {
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
      </Form>
    </Modal>
  );
};

export default SnackModal;
