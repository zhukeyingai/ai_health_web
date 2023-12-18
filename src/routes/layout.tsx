import { useState } from "react";

import { Layout as OutLayout } from "antd";
import Nav from "../components/Nav";
import BottomInfo from "../components/Nav/bottomInfo";
import ContentRouter from "./Content";

const { Sider, Content } = OutLayout;

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <OutLayout className="h-full" hasSider>
      {" "}
      <Sider
        className="rounded-r-3xl"
        style={{
          boxShadow: "#7779861a 0 3px 20px",
        }}
        theme="light"
        collapsible
        width={260}
        collapsed={collapsed}
        onCollapse={() => setCollapsed((c) => !c)}
        trigger={null}
        collapsedWidth={60}
      >
        {" "}
        <Nav collapsed={collapsed} />{" "}
        <BottomInfo
          collapsed={collapsed}
          onCollapse={() => setCollapsed((c) => !c)}
        />{" "}
      </Sider>{" "}
      <Content
        className="p-4"
        style={{
          backgroundColor: "#f5f5f5",
        }}
      >
        {" "}
        <ContentRouter />{" "}
      </Content>{" "}
    </OutLayout>
  );
};

export default Layout;
