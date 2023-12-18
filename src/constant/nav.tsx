import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";

export const PATH_MAP = {
  HOME: "/home",
  ACCOUNT: "/account",
  INFO: "/info",
};

export const NavList = [
  {
    path: PATH_MAP.HOME,
    name: "首页",
    icon: <HomeOutlined />,
  },
  {
    path: PATH_MAP.INFO,
    name: "个人中心",
    icon: <UserOutlined />,
  },
  {
    path: PATH_MAP.ACCOUNT,
    name: "个人设置",
    icon: <SettingOutlined />,
  },
];
