import { Divider, Switch } from "antd";
import CommonCard from "../../components/CommonCard";

const Privacy: React.FC = () => {
  return (
    <CommonCard className="mt-4">
      <div className="text-base font-semibold">隐私</div>
      <Divider />
      <div className="flex justify-between">
        <div className="flex flex-col w-[500px]">
          <div className="font-medium">向我发送新闻通讯和促销电子邮件</div>
          <div className="mt-1 text-xs text-gray-500">
            开启后您随时都可以通过邮件中的退订链接或者账户设置中取消订阅，以控制您的通讯接收偏好。我们致力于提供有价值和相关的信息，帮助您更好地了解我们的产品和服务。
          </div>
        </div>
        <Switch className="ml-5" />
      </div>
      <Divider />
      <div className="flex justify-between">
        <div className="flex flex-col w-[500px]">
          <div className="font-medium">向我发送个性化的应用内广告</div>
          <div className="mt-1 text-xs text-gray-500">
            如果您选择关闭，您将收到不太相关的非个性化广告。
          </div>
        </div>
        <Switch className="ml-5" />
      </div>
    </CommonCard>
  );
};

export default Privacy;
