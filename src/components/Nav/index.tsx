import { memo, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Tooltip } from "antd";
import AiHealthSvg from "../../assets/aiHealthSvg.svg";
import { NavList } from "../../constant/nav";

const { Item } = Menu;
const LogoImg = <img src={AiHealthSvg} className="w-8 h-8 cursor-pointer" />;

interface NavProps {
  collapsed: boolean;
}

const Nav: React.FC<NavProps> = memo(({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const goHome = () => navigate("/home");

  const menu = useMemo(() => {
    return (
      <Menu
        onClick={(path) => navigate(path.key)}
        selectedKeys={[location.pathname]}
      >
        {NavList.map((item) => {
          return (
            <Item key={item.path}>
              <Tooltip
                title={collapsed ? item.name : null}
                key={item.path}
                placement="right"
              >
                <div className="flex items-center">
                  <span>{item.icon}</span>
                  {collapsed ? null : <span className="ml-2">{item.name}</span>}
                </div>
              </Tooltip>
            </Item>
          );
        })}
      </Menu>
    );
  }, [navigate, collapsed, location.pathname]);

  return collapsed ? (
    <>
      <div className="flex justify-center px-2 py-4" onClick={goHome}>
        {LogoImg}
      </div>
      <div className="h-[calc(100%-193px)] overflow-auto font-medium">
        {menu}
      </div>
    </>
  ) : (
    <>
      <div className="flex items-center p-4" onClick={goHome}>
        {LogoImg}
        <div className="cursor-pointer ml-2 text-lg font-semibold text-gray-700">
          AI Health
        </div>
      </div>
      <div className="h-[calc(100%-112.5px)] overflow-auto font-medium">
        {menu}
      </div>
    </>
  );
});

export default Nav;
