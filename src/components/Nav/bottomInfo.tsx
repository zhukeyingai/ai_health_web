import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Avatar, Badge, Dropdown, message } from "antd";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  UserOutlined,
  BellOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { USER_ID_KEY } from "../../constant/localStorageKey";
import authApi from "../../services/auth";

const { logout } = authApi;

interface BottomInfoProps {
  collapsed: boolean;
  onCollapse: () => void;
}

const BottomInfo: React.FC<BottomInfoProps> = memo(
  ({ collapsed, onCollapse }) => {
    const navigate = useNavigate();

    const onLogout = () => {
      const currentUserId = localStorage.getItem(USER_ID_KEY);
      if (currentUserId) {
        const params = { user_id: currentUserId };
        logout(params)
          .then(() => {
            message.success("退出成功！");
            localStorage.clear();
            navigate("/login");
          })
          .catch((err) => {
            message.error(`退出失败:${err}`);
          });
      }
    };

    return (
      <div className="w-full absolute bottom-0 p-2">
        <Space
          className={`flex items-center ${
            collapsed ? `flex-col-reverse` : `flex-row justify-between`
          }`}
        >
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <div
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <UserOutlined className="mr-1.5" />
                      个人中心
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <div onClick={() => onLogout()}>
                      <PoweroffOutlined className="mr-1.5" />
                      退出登录
                    </div>
                  ),
                },
              ],
            }}
            placement="topLeft"
          >
            <Space className="cursor-pointer p-1 rounded-md hover:bg-gray-100">
              <Avatar size="small">
                <UserOutlined />
              </Avatar>
              {!collapsed && <div className="text-gray-800">朱柯颖</div>}
            </Space>
          </Dropdown>
          <Space
            className={`${
              collapsed ? `flex flex-col-reverse items-center` : ``
            }`}
          >
            <div className="cursor-pointer p-2 rounded-md hover:bg-gray-100">
              <Badge count={1} overflowCount={10} size="small">
                <BellOutlined />
              </Badge>
            </div>
            <div
              className="cursor-pointer p-2 rounded-md hover:bg-gray-100"
              onClick={onCollapse}
            >
              {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            </div>
          </Space>
        </Space>
      </div>
    );
  }
);

export default BottomInfo;
