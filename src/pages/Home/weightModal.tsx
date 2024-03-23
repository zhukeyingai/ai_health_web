import { Form, Modal, message, Input } from "antd";
import { memo } from "react";
import { useUserId } from "../../common/utils/useUserId";
import { DailyWeight } from "../../interface/user";
import authApi from "../../services/auth";
import { RequiredValidator } from "../../common/utils/validator";

const { postDailyWeight } = authApi;
const FormItem = Form.Item;

interface Props {
  onSuccess: (userId: string) => void;
}

const WeightModal: React.FC<Props> = memo(({ onSuccess }) => {
  const { userId } = useUserId();
  const [form] = Form.useForm();

  const onSubmit = () => {
    if (!userId) return;
    form.validateFields().then(({ weight }) => {
      const params: DailyWeight = {
        user_id: userId,
        weight: Number(weight),
      };
      postDailyWeight(params)
        .then(({ data }) => {
          if (data) {
            message.success("今日体重上传成功");
            onSuccess(userId);
          }
        })
        .catch((err) => message.error(`上传今日体重失败：${err}`));
    });
  };

  return (
    <Modal
      title="今日体重"
      centered
      open={true}
      closeIcon={false}
      maskClosable={false}
      okText="保存"
      onOk={onSubmit}
      footer={(_, { OkBtn }) => <OkBtn />}
    >
      <Form form={form}>
        <FormItem
          label="体重"
          colon={false}
          name="weight"
          required
          rules={RequiredValidator}
        >
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );
});

export default WeightModal;
