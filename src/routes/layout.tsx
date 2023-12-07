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
      <Sider
        className="shadow-md"
        theme="light"
        collapsible
        width={220}
        collapsed={collapsed}
        onCollapse={() => setCollapsed((c) => !c)}
        trigger={null}
        collapsedWidth={60}
      >
        <Nav collapsed={collapsed} />
        <BottomInfo collapsed={collapsed} onCollapse={() => setCollapsed((c) => !c)}/>
      </Sider>
      <Content className="bg-white">
        <ContentRouter />
      </Content>
    </OutLayout>
  );
};

export default Layout;
