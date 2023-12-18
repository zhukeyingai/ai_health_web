import React, { useEffect, useMemo, useState } from "react";
import { Spin, message } from "antd";
import CommonCard from "../../components/CommonCard";
import { USER_ID_KEY } from "../../constant/localStorageKey";
import authApi from "../../services/auth";
import { UserInfo } from "../../interface/uesr";

const { getUserInfo } = authApi;

const Account: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const currentUserId = localStorage.getItem(USER_ID_KEY);
    setUserId(currentUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getUser = () => {
    if (userId) {
      setIsLoading(true);
      const params = { user_id: userId };
      getUserInfo(params)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          message.error(`获取用户信息失败:${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const genTitle = useMemo(() => {
    if (userInfo) {
      const { user_name } = userInfo;
      return (
        <CommonCard>
          <div>
            你好，<span className="text-[#78ae2c]">{user_name}</span>
          </div>
        </CommonCard>
      );
    }
  }, [userInfo]);

  const genAccount = useMemo(() => {
    if (userInfo) {
      const { email, password } = userInfo;
      console.log("@email", email);
      console.log("@password", password);
      return (
        <CommonCard className="mt-4">
          <div>安全邮箱</div>
          <div>账号密码</div>
        </CommonCard>
      );
    }
  }, [userInfo]);

  return (
    <Spin wrapperClassName="h-full" spinning={isLoading}>
      {genTitle}
      {genAccount}
    </Spin>
  );
};

export default Account;
