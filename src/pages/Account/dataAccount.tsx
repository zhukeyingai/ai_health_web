import { Popconfirm, Button, Divider } from "antd";
import {
  FileAddOutlined,
  ExportOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CommonCard from "../../components/CommonCard";

interface DataAccountProps {
  onDelete: () => void;
}

const DataAccount: React.FC<DataAccountProps> = ({ onDelete }) => {
  return (
    <CommonCard className="mt-4">
      <div className="text-base font-semibold">账户数据</div>
      <Divider />
      <div className="flex justify-between">
        <div className="flex flex-col w-[500px]">
          <div className="font-medium">导入数据</div>
          <div className="mt-1 text-xs text-gray-500">
            从另一个应用程序导入您的数据。
          </div>
        </div>
        <Button
          className="p-0 text-xs ml-5 h-0"
          type="link"
          onClick={() => console.log("@导入数据")}
        >
          <FileAddOutlined />
          导入数据
        </Button>
      </div>
      <Divider />
      <div className="flex justify-between">
        <div className="flex flex-col w-[500px]">
          <div className="font-medium">导出数据</div>
          <div className="mt-1 text-xs text-gray-500">
            将所有日记数据导出到.csv文件。
          </div>
        </div>
        <Button
          className="p-0 text-xs ml-5 h-0"
          type="link"
          onClick={() => console.log("@导出数据")}
        >
          <ExportOutlined />
          导出数据
        </Button>
      </div>
      <Divider />
      <div className="flex justify-between">
        <div className="flex flex-col w-[500px]">
          <div className="font-medium">批量删除</div>
          <div className="mt-1 text-xs text-gray-500">
            有选择地删除您的日记数据。
          </div>
        </div>
        <Button
          className="p-0 text-xs ml-5 h-0"
          type="link"
          onClick={() => console.log("@批量删除")}
        >
          <DeleteOutlined />
          批量删除
        </Button>
      </div>
      <Popconfirm
        title="确认注销账号吗？"
        description="注销后不可恢复，请谨慎操作"
        onConfirm={onDelete}
        okText="确定"
        cancelText="取消"
      >
        <Button className="mt-4" danger>
          注销账号
        </Button>
      </Popconfirm>
    </CommonCard>
  );
};
export default DataAccount;
