import { useState, useEffect } from "react";
import { Spin, message } from "antd";
import dayjs from "dayjs";
import { useUserId } from "../../common/utils/useUserId";
import { CityList } from "../../constant/cityList";
import { UserInfo } from "../../interface/user";
import authApi from "../../services/auth";
import DetailProfile from "./detailProfile";
import EnergyBurned from "./energyBurned";
import Target from "./target";
import "./index.css";

const { getUserInfo } = authApi;

const Info: React.FC = () => {
  const { userId } = useUserId();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getUser = () => {
    if (!userId) return;
    setIsLoading(true);
    const params = { user_id: userId };
    getUserInfo(params)
      .then((res) => {
        const { birthday, address, ...values } = res.data;
        const curBirthday = dayjs(birthday);
        const curAddress = [];
        if (address) {
          const arr = address ? JSON.parse(address) : null;
          const p = CityList.find((i) => i.value === arr[0]);
          if (p) {
            const c = p.children.find((child) => child.value === arr[1]);
            if (c) {
              curAddress.push(p.label, c.label);
            } else {
              curAddress.push(p.label, null);
            }
          } else {
            curAddress.push(null, null);
          }
        }
        setUserInfo({
          birthday: curBirthday,
          address: address ? curAddress : null,
          ...values,
        });
      })
      .catch((err) => {
        message.error(`获取用户信息失败:${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Spin spinning={isLoading}>
      <div className="min-w-[954px]">
        {userId && userInfo && (
          <DetailProfile userId={userId} userInfo={userInfo} />
        )}
        <EnergyBurned />
        <Target />
      </div>
    </Spin>
  );
};

export default Info;
