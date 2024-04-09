import {
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  ReadOutlined,
  ShakeOutlined,
  RobotOutlined,
  AlertOutlined,
} from "@ant-design/icons";

export const PATH_MAP = {
  HOME: "/home",
  DIARY: "/diary",
  ARTICLE: "/article",
  MOTION_PLANNING: "/motionPlanning",
  CUSTOM_RECIPES: "/customRecipes",
  QA_ROBOT: "/qaRobot",
  ACCOUNT: "/account",
  INFO: "/info",
};

export const NavList = [
  {
    path: PATH_MAP.HOME,
    name: "仪表盘",
    icon: <PieChartOutlined />,
  },
  {
    path: PATH_MAP.DIARY,
    name: "日记",
    icon: <AppstoreAddOutlined />,
  },
  {
    path: PATH_MAP.ARTICLE,
    name: "文章推荐",
    icon: <ReadOutlined />,
  },
  {
    path: PATH_MAP.MOTION_PLANNING,
    name: "运动规划",
    icon: <ShakeOutlined />,
  },
  {
    path: PATH_MAP.CUSTOM_RECIPES,
    name: "菜谱定制",
    icon: <AlertOutlined />,
  },
  {
    path: PATH_MAP.QA_ROBOT,
    name: "私人查询",
    icon: <RobotOutlined />,
  },
  {
    path: PATH_MAP.INFO,
    name: "个人信息",
    icon: <UserOutlined />,
  },
  {
    path: PATH_MAP.ACCOUNT,
    name: "个人设置",
    icon: <SettingOutlined />,
  },
];
