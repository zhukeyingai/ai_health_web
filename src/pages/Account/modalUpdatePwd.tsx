import { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import authApi from "../../services/auth";
import { RequiredValidator } from "../../common/utils/validator";

const FormItem = Form.Item;
const FormConfig = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { updatePassword } = authApi;

interface ModalUpdatePwdProps {
  userId?: string;
  onCancel: () => void;
  onSuccess?: () => void;
}

const ModalUpdatePwd: React.FC<ModalUpdatePwdProps> = ({
  userId,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = () => {
    form.validateFields().then(async (values) => {
      setIsLoading(true);
      try {
        await updatePassword({ user_id: userId, ...values });
        message.success("保存成功！");
        onSuccess?.();
      } catch (err) {
        message.error(`保存失败：${err}`);
      }
      setIsLoading(false);
    });
  };

  return (
    <Modal
      title="更换密码"
      centered
      open={true}
      okText="保存"
      cancelText="取消"
      onOk={onSubmit}
      onCancel={onCancel}
      confirmLoading={isLoading}
    >
      <Form form={form} colon={false} {...FormConfig}>
        <FormItem
          label="当前密码"
          name="oldPassword"
          required
          rules={RequiredValidator}
        >
          <Input.Password type="password" placeholder="当前密码" />
        </FormItem>
        <FormItem
          label="新密码"
          name="newPassword"
          required
          rules={RequiredValidator}
        >
          <Input.Password type="password" placeholder="新密码" />
        </FormItem>
        <FormItem
          label="新密码（重复）"
          name="repeatedPassword"
          required
          rules={RequiredValidator}
        >
          <Input.Password type="password" placeholder="新密码（重复）" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default ModalUpdatePwd;
