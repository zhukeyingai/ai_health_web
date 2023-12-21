import { useState, useEffect } from "react";
import { Spin, message } from "antd";
import { USER_ID_KEY } from "../../constant/localStorageKey";
import { UserInfo } from "../../interface/user";
import authApi from "../../services/auth";
import DetailProfile from "./detailProfile";
import "./index.css";

const { getUserInfo } = authApi;

const Info: React.FC = () => {
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

  return (
    <Spin spinning={isLoading}>
      {userInfo && <DetailProfile userInfo={userInfo} />}
    </Spin>
  );
};

export default Info;
