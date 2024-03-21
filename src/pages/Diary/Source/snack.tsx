import { useState } from "react";
import { Dropdown, Empty, Button } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import SnackFood from "../../../assets/snack.svg";
import Snack1 from "../../../assets/snack_1.svg";
import Snack2 from "../../../assets/snack_2.svg";
import Snack3 from "../../../assets/snack_3.svg";
import Snack4 from "../../../assets/snack_4.svg";
import Snack5 from "../../../assets/snack_5.svg";
import CommonCard from "../../../components/CommonCard";
import { SnackRecord } from "../../../interface/diary";
import SnackModal from "../Components/snackModal";
import { amountOptions, genSubTitle } from "../constant";

interface SnackProps {
  userId?: string;
  onRefresh: (days: number) => void;
  snackList: SnackRecord[];
}

const Snack: React.FC<SnackProps> = ({ userId, onRefresh, snackList }) => {
  const [showSnackModal, setShowSnackModal] = useState<boolean>(false);
  const [days, setDays] = useState<number>(1);

  const genSnackIcon = (amount: number) => {
    let src;
    switch (amount) {
      case 1:
        src = Snack1;
        break;
      case 2:
        src = Snack2;
        break;
      case 3:
        src = Snack3;
        break;
      case 4:
        src = Snack4;
        break;
      case 5:
        src = Snack5;
        break;
      default:
        src = Snack3;
        break;
    }
    return <img src={src} width={50} />;
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setDays(1);
            onRefresh(1);
          }}
        >
          {genSubTitle(1)}记录
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setDays(3);
            onRefresh(3);
          }}
        >
          {genSubTitle(3)}记录
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            setDays(7);
            onRefresh(7);
          }}
        >
          {genSubTitle(7)}记录
        </div>
      ),
    },
  ];

  const genContent = () => {
    return (
      <div className="h-[calc(100%-64px)] overflow-auto">
        <div className="pl-3 py-5">
          {snackList.map(({ date, foods }) => {
            return (
              <div key={date}>
                <div className="mt-2 mb-2 ml-6 text-[#a1a1aa] text-sm">
                  {date}
                </div>
                <div className="flex flex-wrap">
                  {foods.map(({ foodName, amount }) => {
                    const matchedData = amountOptions.find(
                      (i) => i.value === amount
                    );
                    return (
                      <div
                        className="flex items-center py-2 px-3 bg-[#f6f7f9] rounded-lg m-2"
                        key={`${date}_${foodName}`}
                      >
                        {genSnackIcon(amount)}
                        <div className="ml-2">
                          <div className="font-medium">{foodName}</div>
                          <div className="text-[13px] mt-1 text-[#a6cf60]">
                            {matchedData ? matchedData.label : "未知"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Button
          className="absolute right-4 bottom-4"
          type="primary"
          onClick={() => setShowSnackModal(true)}
        >
          添加
        </Button>
      </div>
    );
  };

  return (
    <div className="w-1/2 overflow-hidden min-w-[350px]">
      <CommonCard className="h-full relative">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img src={SnackFood} className="w-8" />
            <div className="ml-1.5 text-[15px] font-semibold">零食</div>
          </div>
          <div className="flex items-center">
            <div className="text-[#a1a1aa] font-semibold mr-6">
              {genSubTitle(days)}
            </div>
            <Dropdown className="cursor-pointer" menu={{ items }}>
              <div className="text-[#a6cf60]">
                更多
                <MoreOutlined />
              </div>
            </Dropdown>
          </div>
        </div>
        {snackList.length > 0 ? (
          genContent()
        ) : (
          <Empty
            rootClassName="h-[calc(100%-32px)] flex flex-col justify-center"
            description={false}
          >
            <Button type="primary" onClick={() => setShowSnackModal(true)}>
              添加
            </Button>
          </Empty>
        )}
      </CommonCard>
      {showSnackModal && (
        <SnackModal
          userId={userId}
          onCancel={() => setShowSnackModal(false)}
          onSuccess={() => {
            setShowSnackModal(false);
            onRefresh(1);
          }}
        />
      )}
    </div>
  );
};

export default Snack;
