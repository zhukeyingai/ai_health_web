import { Popconfirm, Button } from "antd";
import {
  FileAddOutlined,
  ExportOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CommonCard from "../../../components/CommonCard";
import PieceContent from "../../../components/PieceContent";

interface DataAccountProps {
  onDelete: () => void;
}

const DataAccount: React.FC<DataAccountProps> = ({ onDelete }) => {
  return (
    <CommonCard className="mt-6" title="账户数据">
      <PieceContent
        header="导入数据"
        description="从另一个应用程序导入您的数据。"
      >
        <Button
          className="p-0 text-xs h-0"
          type="link"
          onClick={() => console.log("@导入数据")}
        >
          <FileAddOutlined />
          导入数据
        </Button>
      </PieceContent>
      <PieceContent
        header="导出数据"
        description="将所有日记数据导出到.csv文件。"
      >
        <Button
          className="p-0 text-xs h-0"
          type="link"
          onClick={() => console.log("@导出数据")}
        >
          <ExportOutlined />
          导出数据
        </Button>
      </PieceContent>
      <PieceContent header="批量删除" description="有选择地删除您的日记数据。">
        <Button
          className="p-0 text-xs h-0"
          type="link"
          onClick={() => console.log("@批量删除")}
        >
          <DeleteOutlined />
          批量删除
        </Button>
      </PieceContent>
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
