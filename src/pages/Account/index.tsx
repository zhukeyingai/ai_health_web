import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { USER_ID_KEY } from "../../constant/localStorageKey";
import { UserInfo } from "../../interface/user";
import authApi from "../../services/auth";
import Me from "./LeftComponents/me";
import Profile from "./LeftComponents/profile";
import FQA from "./LeftComponents/FQA";
import DetailAccount from "./RightComponents/detailAccount";
import Notice from "./RightComponents/notice";
import Privacy from "./RightComponents/privacy";
import DataAccount from "./RightComponents/dataAccount";
import ModalUpdatePwd from "./modalUpdatePwd";
import "./index.css";

const { deleteUser, getUserInfo } = authApi;

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUpdatePwdModal, setShowUpdatePwdModal] = useState<boolean>(false);

  useEffect(() => {
    const currentUserId = localStorage.getItem(USER_ID_KEY);
    if (currentUserId) {
      setUserId(currentUserId);
    }
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

  return (
    <Spin wrapperClassName="account" spinning={isLoading}>
      <div className="w-[260px] flex-shrink-0">
        {userInfo && <Me userInfo={userInfo} />}
        <Profile userInfo={userInfo} />
        <FQA />
      </div>
      <div className="ml-6 flex-grow flex-shrink-0">
        {userInfo && (
          <DetailAccount
            userInfo={userInfo}
            changePassword={() => setShowUpdatePwdModal(true)}
          />
        )}
        <Notice />
        <Privacy />
        <DataAccount onDelete={onDelete} />
      </div>
      {showUpdatePwdModal && (
        <ModalUpdatePwd
          userId={userId}
          onCancel={() => setShowUpdatePwdModal(false)}
          onSuccess={() => setShowUpdatePwdModal(false)}
        />
      )}
    </Spin>
  );
};

export default Account;
