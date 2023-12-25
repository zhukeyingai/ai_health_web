import { Button, Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CommonCard from "../../../components/CommonCard";
import { UserInfo } from "../../../interface/user";

interface DetailAccountProps {
  userInfo: UserInfo;
}

const DetailAccount: React.FC<DetailAccountProps> = ({ userInfo }) => {
  return (
    <CommonCard title="账号信息">
      <Divider />
      <div className="text-gray-500 flex font-medium justify-between">
        <div className="flex items-center">
          <span className="w-[110px]">电子邮箱</span>
          <span className="text-black">{userInfo?.email}</span>
        </div>
        <Button
          className="p-0 text-xs ml-5"
          type="link"
          onClick={() => console.log("@编辑电子邮箱")}
        >
          <EditOutlined />
          编辑
        </Button>
      </div>
      <Divider />
      <div className="text-gray-500 flex font-medium justify-between">
        <div className="flex items-center">
          <span className="w-[110px]">密码</span>
          <span className="text-black">**********</span>
        </div>
        <Button
          className="p-0 text-xs ml-5"
          type="link"
          onClick={() => console.log("@编辑密码")}
        >
          <EditOutlined />
          编辑
        </Button>
      </div>
    </CommonCard>
  );
};

export default DetailAccount;
