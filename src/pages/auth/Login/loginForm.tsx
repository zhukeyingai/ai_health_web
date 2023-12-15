import React, { forwardRef, useImperativeHandle } from "react";
import { Button, Form, Input, message } from "antd";
import {
  validateEmail,
  validatePassword,
} from "../../../common/utils/validator";
import { UserInfo } from "../../../interface/uesr";

const FormItem = Form.Item;

interface LoginFormProps {
  onLogin?: () => void;
  ref: any;
}

const LoginForm: React.FC<LoginFormProps> = forwardRef(({ onLogin }, ref) => {
  const [form] = Form.useForm<Pick<UserInfo, "email" | "password">>();
  useImperativeHandle(ref, () => form);

  return (
    <Form form={form} layout="vertical">
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
        label={
          <div className="flex justify-between w-full">
            <span>密码</span>
            <Button
              type="link"
              className="h-0 p-0"
              onClick={() => {
                console.log("忘记密码");
                message.error("忘记密码");
              }}
            >
              忘记密码
            </Button>
          </div>
        }
        name="password"
        className="pwd"
        validateDebounce={1000}
        rules={[{ validator: validatePassword }]}
        hasFeedback
      >
        <Input.Password type="password" />
      </FormItem>
      <FormItem>
        <Button type="primary" onClick={onLogin} block>
          登录
        </Button>
      </FormItem>
    </Form>
  );
});

export default LoginForm;
