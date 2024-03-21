import { PATH_MAP } from "../constant/nav";
import Home from "../pages/Home";
import Diary from "../pages/Diary";
import Info from "../pages/Info";
import Account from "../pages/Account";

export const ROUTES_MAP = {
  [PATH_MAP.HOME]: <Home />,
  [PATH_MAP.Diary]: <Diary />,
  [PATH_MAP.INFO]: <Info />,
  [PATH_MAP.ACCOUNT]: <Account />,
};
