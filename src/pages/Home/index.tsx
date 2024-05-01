import { useEffect, useState } from "react";
import { message } from "antd";
import { useUserId } from "../../common/utils/useUserId";
import authApi from "../../services/auth";
import homeApi from "../../services/home";
import WeightModal from "./weightModal";
import { EChartRequest, HeatIn, HeatOut } from "../../interface/home";
import { Weight } from "../../interface/user";
import WeightEChart from "./components/weightEChart";
import HeatBar from "./components/heatBar";
import Analysis from "./components/analysis";

const { queryDailyWeight } = authApi;
const { queryWeightAllDays, queryHeatIntake, queryHeatConsume } = homeApi;

const Home: React.FC = () => {
  const { userId } = useUserId();
  const [showWeightModal, setShowWeightModal] = useState<boolean>(true);
  const [weightDays, setWeightDays] = useState<number>(7);
  const [weightLoading, setWeightLoading] = useState<boolean>(false);
  const [weightList, setWeightList] = useState<Weight[]>([]);
  const [heatLoading, setHeatLoading] = useState<boolean>(false);
  const [heatIn, setHeatIn] = useState<HeatIn | undefined>(undefined);
  const [heatOut, setHeatOut] = useState<HeatOut | undefined>(undefined);

  useEffect(() => {
    if (!userId) return;
    queryWeight(userId);
    queryWeightList();
    queryHeatIn();
    queryHeatOut();
  }, [userId]);

  useEffect(() => {
    queryWeightList();
  }, [weightDays]);

  const queryWeight = (user_id: string) => {
    queryDailyWeight({ user_id })
      .then(({ data }) => {
        data ? setShowWeightModal(false) : setShowWeightModal(true);
      })
      .catch((err) => message.error(`查询今日体重失败：${err}`));
  };

  const queryWeightList = () => {
    if (!userId) return;
    setWeightLoading(true);
    const params: EChartRequest = {
      user_id: userId,
      days: weightDays,
    };
    queryWeightAllDays(params)
      .then(({ data }) => {
        setWeightList(data);
      })
      .catch((err) => message.error(`获取体重数据失败：${err}`))
      .finally(() => setWeightLoading(false));
  };

  const queryHeatIn = () => {
    if (!userId) return;
    setHeatLoading(true);
    queryHeatIntake({ user_id: userId })
      .then((res: any) => {
        setHeatIn(res.data);
      })
      .catch((err) => message.error(`获取热量摄入数据失败：${err}`))
      .finally(() => setHeatLoading(false));
  };

  const queryHeatOut = () => {
    if (!userId) return;
    setHeatLoading(true);
    queryHeatConsume({ user_id: userId })
      .then((res: any) => {
        setHeatOut(res.data);
      })
      .catch((err) => message.error(`获取热量摄入数据失败：${err}`))
      .finally(() => setHeatLoading(false));
  };

  const onSuccess = (id: string) => {
    setShowWeightModal(false);
    queryWeight(id);
    queryWeightList();
    queryHeatIn();
    queryHeatOut();
  };

  return (
    <div className="h-full">
      <WeightEChart
        weightList={weightList}
        loading={weightLoading}
        onChangeDays={setWeightDays}
      />
      <div className="h-[calc(100%-404px)] mt-6 flex">
        <HeatBar loading={heatLoading} dataIn={heatIn} dataOut={heatOut} />
        <Analysis />
      </div>
      {showWeightModal && <WeightModal onSuccess={onSuccess} />}
    </div>
  );
};

export default Home;
