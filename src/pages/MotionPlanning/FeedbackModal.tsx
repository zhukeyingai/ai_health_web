import { memo, useState } from "react";
import { Form, Input, Modal, Rate } from "antd";
import { RequiredValidator } from "../../common/utils/validator";
import styles from "./index.module.scss";

const FormItem = Form.Item;

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
}

const FeedbackModal: React.FC<Props> = memo(({ onCancel, onSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onSubmit = () => {
    form.validateFields().then((res) => {
      console.log("@res", res);
    });
  };

  return (
    <Modal
      title="反馈"
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
          label="满意度"
          name="satisfaction"
          className={styles.feedbackRate}
          colon={false}
          required
          rules={RequiredValidator}
          initialValue={2.5}
        >
          <Rate allowHalf />
        </FormItem>
        <FormItem label="评论" colon={false}>
          <Input.TextArea
            placeholder="请输入你的调整需求..."
            style={{ height: 72, resize: "none" }}
          />
        </FormItem>
      </Form>
    </Modal>
  );
});

export default FeedbackModal;
