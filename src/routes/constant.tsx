import { PATH_MAP } from "../constant/nav";
import Home from "../pages/Home";
import Dairy from "../pages/Dairy";
import Info from "../pages/Info";
import Account from "../pages/Account";

export const ROUTES_MAP = {
  [PATH_MAP.HOME]: <Home />,
  [PATH_MAP.DAIRY]: <Dairy />,
  [PATH_MAP.INFO]: <Info />,
  [PATH_MAP.ACCOUNT]: <Account />,
};
