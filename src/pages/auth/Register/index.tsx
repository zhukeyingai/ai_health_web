import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInstance, Button, Spin, message } from "antd";
import AuthLayout from "../../../components/AuthLayout";
import authApi from "../../../services/auth";
import RegisterForm from "./registerForm";
import "../index.css";

const { register } = authApi;

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onRegister = () => {
    const params = formRef?.current?.getFieldsValue();
    setIsLoading(true);
    register(params)
      .then(() => {
        message.success("注册成功！");
        navigate("/login");
      })
      .catch((err) => {
        message.error(`注册失败:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout
      content={
        <Spin spinning={isLoading}>
          <RegisterForm ref={formRef} onRegister={onRegister} />
          <div className="text-center">
            <span>已是会员？</span>
            <Button
              type="link"
              className="h-0 p-0 mt-2"
              onClick={() => {
                navigate("/login");
              }}
            >
              登录
            </Button>
          </div>
        </Spin>
      }
    />
  );
};

export default Auth;
