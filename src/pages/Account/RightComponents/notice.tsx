import { TimePicker, Switch } from "antd";
import dayjs from "dayjs";
import CommonCard from "../../../components/CommonCard";
import PieceContent from "../../../components/PieceContent";

const Notice: React.FC = () => {
  return (
    <CommonCard className="mt-6" title="通知">
      <PieceContent
        header="详情日记"
        description="如果我忘记输入日记详细信息，请通过电子邮件向我发送提醒。"
      >
        <div className="flex">
          <TimePicker
            className="mr-3 w-[112px] h-[22px]"
            size="small"
            defaultValue={dayjs("12:08", "HH:mm")}
            placeholder="请选择时间"
            format="HH:mm"
          />
          <Switch />
        </div>
      </PieceContent>
    </CommonCard>
  );
};

export default Notice;
