import { memo } from "react";
import { Space, Avatar, Badge } from "antd";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";

interface BottomInfoProps {
  collapsed: boolean;
  onCollapse: () => void;
}
const BottomInfo: React.FC<BottomInfoProps> = memo(
  ({ collapsed, onCollapse }) => {
    return (
      <div className="w-full absolute bottom-0 p-3">
        <Space
          className={`flex items-center ${
            collapsed ? `flex-col-reverse` : `flex-row justify-between`
          }`}
        >
          <Space>
            <Avatar>
              <UserOutlined />
            </Avatar>
            {!collapsed && <div className="text-gray-800">朱柯颖</div>}
          </Space>
          <Space
            className={`${
              collapsed ? `flex flex-col-reverse items-center` : ``
            }`}
          >
            <Badge className="m-2" count={1} overflowCount={10} size="small">
              <BellOutlined />
            </Badge>
            {collapsed ? (
              <DoubleRightOutlined
                className="cursor-pointer m-2"
                onClick={onCollapse}
              />
            ) : (
              <DoubleLeftOutlined
                className="cursor-pointer m-2"
                onClick={onCollapse}
              />
            )}
          </Space>
        </Space>
      </div>
    );
  }
);

export default BottomInfo;
