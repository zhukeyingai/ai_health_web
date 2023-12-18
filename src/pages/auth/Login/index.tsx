import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInstance, Button, Spin, message } from "antd";
import AuthLayout from "../../../components/AuthLayout";
import { TOKEN_KEY, USER_ID_KEY } from "../../../constant/localStorageKey";
import authApi from "../../../services/auth";
import LoginForm from "./loginForm";
import "../index.css";

const { login } = authApi;

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormInstance>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogin = () => {
    const params = formRef?.current?.getFieldsValue();
    setIsLoading(true);
    login(params)
      .then((res) => {
        message.success("登录成功！");
        localStorage.setItem(TOKEN_KEY, res.data.token);
        localStorage.setItem(USER_ID_KEY, res.data.user_id);
        navigate("/home");
      })
      .catch((err) => {
        message.error(`登录失败:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        formRef?.current?.resetFields();
      });
  };

  return (
    <AuthLayout
      content={
        <Spin spinning={isLoading}>
          <LoginForm ref={formRef} onLogin={onLogin} />
          <div className="text-center">
            <span>不是会员？</span>
            <Button
              type="link"
              className="h-0 p-0 mt-2"
              onClick={() => {
                navigate("/register");
              }}
            >
              注册
            </Button>
          </div>
        </Spin>
      }
    />
  );
};

export default Auth;
