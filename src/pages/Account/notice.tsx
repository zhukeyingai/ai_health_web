import { Divider, TimePicker, Switch } from "antd";
import dayjs from "dayjs";
import CommonCard from "../../components/CommonCard";

const Notice: React.FC = () => {
  return (
    <CommonCard className="mt-4">
      <div className="text-base font-semibold">通知</div>
      <Divider />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="font-medium">详情日记</div>
          <div className="mt-1 text-xs text-gray-500">
            如果我忘记输入日记详细信息，请通过电子邮件向我发送提醒。
          </div>
        </div>
        <div className="ml-5">
          <TimePicker
            className="mr-3 w-[112px]"
            size="small"
            defaultValue={dayjs("12:08", "HH:mm")}
            placeholder="请选择时间"
            format="HH:mm"
          />
          <Switch />
        </div>
      </div>
    </CommonCard>
  );
};

export default Notice;
