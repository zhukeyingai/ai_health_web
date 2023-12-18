import React, { ReactNode } from "react";
import { Col, Row } from "antd";
import LoginSvg from "../../assets/loginSvg.svg";
import AiHealthSvg from "../../assets/aiHealthSvg.svg";
import Footer from "../Footer";

interface AuthLayoutProps {
  content: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ content }) => {
  return (
    <div
      className="flex flex-col items-center justify-center h-full overflow-aut"
      style={{ backgroundColor: "#f5f5f5" }}
    >
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
          {content}
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default AuthLayout;
