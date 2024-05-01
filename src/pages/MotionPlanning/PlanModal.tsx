import { memo, useState } from "react";
import { Form, Modal, Radio } from "antd";
import { RequiredValidator } from "../../common/utils/validator";
import { amountOptions } from "../../constant/amountOptions";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
}

const PlanModal: React.FC<Props> = memo(({ onCancel, onSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onSubmit = () => {
    form.validateFields().then((res) => {
      console.log("@res", res);
    });
  };

  return (
    <Modal
      title="运动定制"
      centered
      open={true}
      okText="确认"
      cancelText="取消"
      onOk={onSubmit}
      onCancel={onCancel}
      width={700}
      confirmLoading={loading}
    >
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <FormItem
          label="运动难度"
          name="difficulty"
          colon={false}
          required
          rules={RequiredValidator}
          initialValue="medium"
        >
          <RadioGroup>
            <Radio value="simple">简单</Radio>
            <Radio value="medium">中等</Radio>
            <Radio value="hard">困难</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="运动偏好"
          name="hobby"
          colon={false}
          required
          rules={RequiredValidator}
          initialValue="in"
        >
          <RadioGroup>
            <Radio value="in">室内</Radio>
            <Radio value="out">室外</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="运动量"
          name="amount"
          colon={false}
          required
          rules={RequiredValidator}
          initialValue={3}
        >
          <RadioGroup options={amountOptions} />
        </FormItem>
      </Form>
    </Modal>
  );
});

export default PlanModal;
