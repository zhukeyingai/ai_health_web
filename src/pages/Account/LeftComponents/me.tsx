import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { UserInfo } from "../../../interface/user";
import { useEffect, useState } from "react";

interface MeProps {
  userInfo: UserInfo;
}

const Me: React.FC<MeProps> = ({ userInfo }) => {
  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();

  useEffect(() => {
    if (userInfo) {
      const { created_time } = userInfo;
      const d = dayjs().diff(dayjs(created_time), "day");
      const h = dayjs().diff(dayjs(created_time).add(d, "day"), "hour");
      const m = dayjs().diff(
        dayjs(created_time).add(d, "day").add(h, "hour"),
        "minute"
      );
      setDays(d);
      setHours(h);
      setMinutes(m);
    }
  }, [userInfo]);

  return (
    <div className="mt-4 flex flex-col items-center">
      {userInfo?.avatar_url ? (
        <Avatar
          className="mb-3"
          shape="square"
          size={60}
          src={userInfo?.avatar_url}
        />
      ) : (
        <Avatar
          className="mb-3"
          shape="square"
          size={60}
          icon={<UserOutlined />}
        />
      )}
      <div className="mb-2 text-base text-black">{userInfo?.user_name}</div>
      <div className="text-[#78ae2c] text-xs">
        成为会员：
        {`${days} 天 ${hours} 小时 ${minutes} 分`}
      </div>
    </div>
  );
};

export default Me;
