import { PATH_MAP } from "../constant/nav";
import Home from "../pages/Home";
import Diary from "../pages/Diary";
import Article from "../pages/Article";
import MotionPlanning from "../pages/MotionPlanning";
import CustomRecipes from "../pages/CustomRecipes";
import QARobot from "../pages/QARobot";
import Info from "../pages/Info";
import Account from "../pages/Account";

export const ROUTES_MAP = {
  [PATH_MAP.HOME]: <Home />,
  [PATH_MAP.DIARY]: <Diary />,
  [PATH_MAP.ARTICLE]: <Article />,
  [PATH_MAP.MOTION_PLANNING]: <MotionPlanning />,
  [PATH_MAP.CUSTOM_RECIPES]: <CustomRecipes />,
  [PATH_MAP.QA_ROBOT]: <QARobot />,
  [PATH_MAP.INFO]: <Info />,
  [PATH_MAP.ACCOUNT]: <Account />,
};
