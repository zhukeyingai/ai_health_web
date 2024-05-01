import { memo, useState } from "react";
import CommonCard from "../../components/CommonCard";
import { Button, Input } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const dataList = [
  {
    id: 1,
    name: "对话1adadasdafadadaascasdcasdcasdcwcas",
  },
  {
    id: 2,
    name: "对话1",
  },
  {
    id: 3,
    name: "对话1",
  },
];

const HistoryList: React.FC = memo(() => {
  const [currentConversation, setCurrentConversation] = useState<
    { id: number; name: string } | undefined
  >(undefined);

  const genList = () => {
    return (
      <div className="flex flex-col gap-2">
        {dataList.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between rounded-lg p-2 ${item.id === currentConversation?.id ? "bg-[#e9f6dc]" : "bg-[#f6f7f9]"}`}
            onClick={() => setCurrentConversation(item)}
          >
            <div className="w-[150px] truncate">{item.name}</div>
            <Button
              className="p-0 text-xs"
              type="link"
              icon={<DeleteOutlined />}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <CommonCard className="flex-shrink-0 overflow-hidden">
      <div className="p-2 h-full flex flex-col gap-6">
        <div className="flex flex-col gap-4 w-[200px]">
          <Button icon={<PlusCircleOutlined />} type="primary">
            新建对话
          </Button>
          <Input
            className="w-[200px]"
            placeholder="搜索历史记录"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="h-[calc(100%-104px)] overflow-auto">
          <div className="text-[#a5ba96] mb-2">历史记录</div>
          {genList()}
        </div>
      </div>
    </CommonCard>
  );
});

export default HistoryList;
