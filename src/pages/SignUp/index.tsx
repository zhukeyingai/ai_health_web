import React, { useState } from "react";
import { Col, Row, Button, message } from "antd";
import LoginSvg from "../../assets/loginSvg.svg";
import AiHealthSvg from "../../assets/aiHealthSvg.svg";
import Footer from "../../components/Footer";
import SignForm from "./signForm";
import "./index.css";

const SignUp: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const genLogin = () => {
    if (isLogin) {
      return (
        <div className="text-center">
          不是会员？
          <Button
            type="link"
            className="h-0 p-0 mt-2"
            onClick={() => {
              console.log("注册");
              message.error("注册");
              setIsLogin(false);
            }}
          >
            注册
          </Button>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          已是会员？
          <Button
            type="link"
            className="h-0 p-0 mt-2"
            onClick={() => {
              console.log("登陆");
              message.error("登陆");
              setIsLogin(true);
            }}
          >
            登陆
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-aut">
      <Row className="bg-white justify-center items-center w-3/5 max-md:w-full h-[600px] rounded-lg shadow-lg ">
        <Col
          className="w-1/2 h-full max-md:hidden"
          style={{ backgroundColor: "#e9f6dc" }}
        >
          <img src={LoginSvg} className="w-full h-full" />
        </Col>
        <Col className="w-1/2 p-14 max-md:w-full">
          <div className="flex flex-col items-center justify-center mb-8">
            <img src={AiHealthSvg} className="w-10 mb-4" />
            <div className="text-[24px] text-center font-bold">AI Health</div>
          </div>
          <SignForm isLogin={isLogin} />
          {genLogin()}
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default SignUp;
