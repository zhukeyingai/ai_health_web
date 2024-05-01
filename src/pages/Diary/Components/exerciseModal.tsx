import { useEffect, useState } from "react";
import { Modal, Radio, Tabs, message } from "antd";
import type { TabsProps } from "antd";
import { ExerciseRequest, SportKey } from "../../../interface/diary";
import diaryApi from "../../../services/diary";
import {
  normalExerciseList,
  ballGamesList,
  gymList,
  SportLabeLMap,
} from "../constant";
import { amountOptions } from "../../../constant/amountOptions";

const { createExerciseRecords } = diaryApi;

interface Props {
  userId?: string;
  onCancel: () => void;
  onSuccess?: () => void;
}

const ExerciseModal: React.FC<Props> = ({ userId, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tabKey, setTabKey] = useState<SportKey>(SportKey.normalExercise);
  const [sport, setSport] = useState<
    | {
        label: string;
        value: string;
      }
    | undefined
  >(undefined);
  const [amount, setAmount] = useState<number>(3);

  useEffect(() => {
    setSport(undefined);
  }, [tabKey]);

  const genExerciseItems = (list: any[]) => {
    return (
      <div className="bg-[#f5f5f5] rounded-lg p-4 flex flex-wrap">
        {list.map((item) => (
          <div
            className="w-[128px] h-[100px] flex flex-col items-center justify-center bg-[#ffffff] rounded-lg mx-4 my-3 cursor-pointer shadow-md hover:shadow-lg duration-300 transition-shadow"
            key={item.value}
            onClick={() => setSport({ label: item.label, value: item.value })}
          >
            <img src={item.src} width={40} />
            <div className="text-[#262a3b] text-[13px] font-medium mt-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: SportKey.normalExercise,
      label: SportLabeLMap[SportKey.normalExercise].label,
      children: genExerciseItems(normalExerciseList),
    },
    {
      key: SportKey.ballGames,
      label: SportLabeLMap[SportKey.ballGames].label,
      children: genExerciseItems(ballGamesList),
    },
    {
      key: SportKey.gym,
      label: SportLabeLMap[SportKey.gym].label,
      children: genExerciseItems(gymList),
    },
  ];

  const onSubmit = () => {
    if (!userId) return;
    if (!sport?.value) {
      message.error("当前并没有选中要记录的运动类型");
    }
    setLoading(true);
    const params: ExerciseRequest = {
      user_id: userId,
      type: tabKey,
      sport: sport?.value as string,
      amount,
    };
    createExerciseRecords(params)
      .then(({ data }) => {
        if (data) {
          message.success("伤锻炼信息上传成功");
          onSuccess?.();
        }
      })
      .catch((err) => message.error(`上传锻炼信息失败：${err}`))
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      title="记录锻炼"
      centered
      open={true}
      okText="添加"
      cancelText="取消"
      onOk={onSubmit}
      onCancel={onCancel}
      width={880}
      confirmLoading={loading}
    >
      <Tabs
        activeKey={tabKey}
        items={items}
        onChange={(key) => setTabKey(key as SportKey)}
      />
      {sport ? (
        <div className="bg-[#f5f5f5] rounded-lg my-6 px-8 py-7 flex justify-between">
          <div>
            <span className="font-medium mr-4">运动类型</span>
            <span className="text-[#9ad14b]">{sport?.label}</span>
          </div>
          <div>
            <span className="font-medium mr-4">运动时长</span>
            <Radio.Group
              options={amountOptions}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default ExerciseModal;
