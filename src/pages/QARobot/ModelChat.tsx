import { memo } from "react";
import CommonCard from "../../components/CommonCard";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { RoleEnum } from "../../interface/robot";

const messageList = [
  {
    role: RoleEnum.user,
    message: "你好",
  },
  {
    role: RoleEnum.assistant,
    message: "你好，请问有什么可以帮到您的吗？",
  },
  {
    role: RoleEnum.user,
    message:
      "我有一个问题，请问我的体重水平说明了什么？你能给一个比较标准的答案吗？因为我想知道你是如何计算的？",
  },
  {
    role: RoleEnum.assistant,
    message: "你好，请问有什么可以帮到您的吗？",
  },
];

const ModelChat: React.FC = memo(() => {
  const genChat = () => {
    return (
      <div className="h-[calc(100%-56px)] pb-6 justify-center overflow-auto">
        <div className="px-[100px]">
          {messageList.map(({ role, message }) => {
            const isUser = role === RoleEnum.user;
            return (
              <div
                className={`rounded-lg flex p-2 ${isUser ? "mt-6" : "bg-[#e9f6dc] mt-2"}`}
              >
                {message}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <CommonCard className="flex-1 relative min-w-[650px] overflow-hidden">
      <div className="p-2 h-full flex flex-col gap-4">
        {genChat()}
        <div className="px-[100px] w-[calc(100%-48px)] absolute bottom-6 flex justify-center gap-2">
          <Input.TextArea
            style={{ resize: "none" }}
            placeholder="在这里输入问题..."
            autoSize={{
              minRows: 1,
              maxRows: 5,
            }}
          />
          <Button type="link" icon={<SendOutlined />} />
        </div>
      </div>
    </CommonCard>
  );
});

export default ModelChat;
