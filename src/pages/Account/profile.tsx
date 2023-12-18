import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
import Ip from "../../assets/ip.svg";
import Sex from "../../assets/sex.svg";
import Birthday from "../../assets/birthday.svg";
import Profession from "../../assets/profession.svg";
import CommonCard from "../../components/CommonCard";
import { SEX_MAP } from "../../constant/user";
import { UserInfo } from "../../interface/user";

interface ProfileProps {
  userInfo?: UserInfo;
}

const Profile: React.FC<ProfileProps> = ({ userInfo }) => {
  const navigate = useNavigate();

  return (
    <>
      <CommonCard className="mt-4">
        <div className="flex font-medium justify-center">
          <div className="mr-6 flex flex-col items-center cursor-pointer hover:text-[#9ad14b]">
            <div>关注了</div>
            <div className="mt-1">0</div>
          </div>
          <Divider type="vertical" className="top-[7px] h-[26.2px]" />
          <div className="ml-6 flex flex-col items-center cursor-pointer hover:text-[#9ad14b]">
            <div>关注者</div>
            <div className="mt-1">0</div>
          </div>
        </div>
        <div
          className="mt-4 py-2 rounded-lg bg-[#fef8ec] text-center cursor-pointer"
          onClick={() => navigate("/info")}
        >
          编辑个人信息
        </div>
      </CommonCard>
      {userInfo && (
        <CommonCard className="mt-4">
          <div className="text-base font-semibold">个人简介</div>
          <div className="mt-4 leading-5 flex items-center">
            <img className="h-4 w-4" src={Ip} />
            <span className="ml-2">
              {userInfo.login_last_ip ? userInfo.login_last_ip : "无"}
            </span>
          </div>
          <div className="mt-2.5 leading-5 flex items-center">
            <img className="h-4 w-4" src={Sex} />
            <span className="ml-2">
              {SEX_MAP[userInfo.sex as keyof typeof SEX_MAP]}
            </span>
          </div>
          <div className="mt-2.5 leading-5 flex items-center">
            <img className="h-4 w-4" src={Profession} />
            <span className="ml-2">{userInfo.job ? userInfo.job : "无"}</span>
          </div>
          <div className="mt-2.5 leading-5 flex items-center">
            <img className="h-4 w-4" src={Birthday} />
            <span className="ml-2">{userInfo.birthday}</span>
          </div>
        </CommonCard>
      )}
    </>
  );
};

export default Profile;
