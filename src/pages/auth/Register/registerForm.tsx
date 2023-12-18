import React, { forwardRef, useImperativeHandle } from "react";
import { Button, Form, Input } from "antd";
import {
  validateEmail,
  validatePassword,
} from "../../../common/utils/validator";
import { UserInfo } from "../../../interface/user";

const FormItem = Form.Item;

interface RegisterFormProps {
  onRegister: () => void;
  ref: any;
}

const RegisterForm: React.FC<RegisterFormProps> = forwardRef(
  ({ onRegister }, ref) => {
    const [form] = Form.useForm<Pick<UserInfo, "email" | "password">>();
    useImperativeHandle(ref, () => form);

    return (
      <Form form={form} layout="vertical" onFinish={onRegister}>
        <FormItem
          label="邮箱"
          name="email"
          validateDebounce={1000}
          rules={[{ validator: validateEmail }]}
          hasFeedback
        >
          <Input />
        </FormItem>
        <FormItem
          label="密码"
          name="password"
          className="pwd"
          validateDebounce={1000}
          rules={[{ validator: validatePassword }]}
          hasFeedback
        >
          <Input.Password type="password" />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" block>
            注册
          </Button>
        </FormItem>
      </Form>
    );
  }
);
export default RegisterForm;
