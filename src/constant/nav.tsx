import { HomeOutlined } from "@ant-design/icons";

export const PATH_MAP = {
  HOME: "/home",
  OTHER: "/other"
};

export const NavList = [
  {
    path: PATH_MAP.HOME,
    name: "首页",
    icon: <HomeOutlined />,
  },
  {
    path: PATH_MAP.OTHER,
    name: "其他",
    icon: <HomeOutlined />,
  },
];
