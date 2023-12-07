import React from "react";
import { Button, Form, Input, message } from "antd";
import validator from "email-validator";

const FormItem = Form.Item;

interface SignFormProps {
  isLogin: boolean;
}

const SignForm: React.FC<SignFormProps> = ({ isLogin }) => {
  const [form] = Form.useForm();

  const validateEmail = (_: any, value: any) => {
    if (!value) {
      return Promise.reject("请输入邮箱");
    } else if (!validator.validate(value)) {
      return Promise.reject("邮箱格式不正确");
    }
    return Promise.resolve();
  };

  const validatePassword = (_: any, value: any) => {
    // 密码验证正则
    // (?=.*[a-z])：密码必须至少包含一个小写字母。
    // (?=.*[A-Z])：密码必须至少包含一个大写字母。
    // (?=.*\d)：密码必须至少包含一个数字。
    // [^]{6,}：密码必须至少包含6个字符。
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,}$/;
    if (!value) {
      return Promise.reject("请输入你的密码");
    } else if (!passwordRegex.test(value)) {
      return Promise.reject(
        "密码必须包含至少一个大写字母，一个小写字母和一个数字，且长度至少为6"
      );
    }
    return Promise.resolve();
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <FormItem
        label="邮箱"
        name="address"
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
            {isLogin && (
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
            )}
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
        <Button type="primary" htmlType="submit" block>
          {isLogin ? "登陆" : "注册"}
        </Button>
      </FormItem>
    </Form>
  );
};

export default SignForm;
