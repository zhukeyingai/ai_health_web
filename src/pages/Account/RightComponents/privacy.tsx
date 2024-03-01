import { Switch } from "antd";
import CommonCard from "../../../components/CommonCard";
import PieceContent from "../../../components/PieceContent";

const Privacy: React.FC = () => {
  return (
    <CommonCard className="mt-6" title="隐私">
      <PieceContent
        header="向我发送新闻通讯和促销电子邮件"
        description="开启后您随时都可以通过邮件中的退订链接或者账户设置中取消订阅，以控制您的通讯接收偏好。我们致力于提供有价值和相关的信息，帮助您更好地了解我们的产品和服务。"
      >
        <Switch />
      </PieceContent>
      <PieceContent
        header="向我发送个性化的应用内广告"
        description="如果您选择关闭，您将收到不太相关的非个性化广告。"
      >
        <Switch />
      </PieceContent>
    </CommonCard>
  );
};

export default Privacy;
