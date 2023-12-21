import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin, Button, Avatar, Divider, message } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import CommonCard from "../../components/CommonCard";
import { USER_ID_KEY } from "../../constant/localStorageKey";
import { UserInfo } from "../../interface/user";
import authApi from "../../services/auth";
import DataAccount from "./dataAccount";
import Notice from "./notice";
import Privacy from "./privacy";
import Profile from "./profile";
import FQA from "./FQA";
import "./index.css";

const { deleteUser, getUserInfo } = authApi;

const Account: React.FC = () => {
  const navigate = useNavigate();
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

  const onDelete = () => {
    if (userId) {
      setIsLoading(true);
      deleteUser({ user_id: userId })
        .then(() => {
          message.success("注销账号成功");
          localStorage.clear();
          navigate("/register");
        })
        .catch((err) => {
          message.error(`注销账号失败:${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const genMe = useMemo(() => {
    if (userInfo) {
      const { avatar_url, user_name, created_time } = userInfo;
      const days = dayjs().diff(dayjs(created_time), "day");
      const hours = dayjs().diff(dayjs(created_time).add(days, "day"), "hour");
      const minutes = dayjs().diff(
        dayjs(created_time).add(days, "day").add(hours, "hour"),
        "minute"
      );
      return (
        <div className="mt-4 flex flex-col items-center">
          {avatar_url ? (
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
          <div className="mb-2 text-base text-black">{user_name}</div>
          <div className="text-[#78ae2c] text-xs">
            成为会员：
            {`${days} 天 ${hours} 小时 ${minutes} 分`}
          </div>
        </div>
      );
    }
  }, [userInfo]);

  const genAccount = useMemo(() => {
    if (userInfo) {
      const { email } = userInfo;
      return (
        <CommonCard>
          <div className="text-base font-semibold">账号信息</div>
          <Divider />
          <div className="text-gray-500 flex font-medium justify-between">
            <div className="flex items-center">
              <span className="w-[110px]">电子邮箱</span>
              <span className="text-black">{email}</span>
            </div>
            <Button
              className="p-0 text-xs ml-5"
              type="link"
              onClick={() => console.log("@编辑电子邮箱")}
            >
              <EditOutlined />
              编辑
            </Button>
          </div>
          <Divider />
          <div className="text-gray-500 flex font-medium justify-between">
            <div className="flex items-center">
              <span className="w-[110px]">密码</span>
              <span className="text-black">**********</span>
            </div>
            <Button
              className="p-0 text-xs ml-5"
              type="link"
              onClick={() => console.log("@编辑密码")}
            >
              <EditOutlined />
              编辑
            </Button>
          </div>
        </CommonCard>
      );
    }
  }, [userInfo]);

  return (
    <Spin wrapperClassName="account" spinning={isLoading}>
      <div className="w-[260px] flex-shrink-0">
        {genMe}
        <Profile userInfo={userInfo} />
        <FQA />
      </div>
      <div className="ml-4 flex-grow flex-shrink-0">
        {genAccount}
        <Notice />
        <Privacy />
        <DataAccount onDelete={onDelete} />
      </div>
    </Spin>
  );
};

export default Account;
