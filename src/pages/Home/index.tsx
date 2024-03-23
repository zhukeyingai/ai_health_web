import { useEffect, useState } from "react";
import { message } from "antd";
import { useUserId } from "../../common/utils/useUserId";
import authApi from "../../services/auth";
import homeApi from "../../services/home";
import WeightModal from "./weightModal";
import { EChartRequest } from "../../interface/home";
import { Weight } from "../../interface/user";
import WeightEChart from "./ECahrts/weightEChart";

const { queryDailyWeight } = authApi;
const { queryWeightAllDays } = homeApi;

const Home: React.FC = () => {
  const { userId } = useUserId();
  const [showWeightModal, setShowWeightModal] = useState<boolean>(true);
  const [weightDays, setWeightDays] = useState<number>(7);
  const [weightLoading, setWeightLoading] = useState<boolean>(false);
  const [weightList, setWeightList] = useState<Weight[]>([]);

  useEffect(() => {
    if (!userId) return;
    queryWeight(userId);
    queryWeightList();
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

  const onSuccess = (id: string) => {
    setShowWeightModal(false);
    queryWeight(id);
  };

  return (
    <div>
      <WeightEChart
        weightList={weightList}
        loading={weightLoading}
        onChangeDays={setWeightDays}
      />
      {showWeightModal && <WeightModal onSuccess={onSuccess} />}
    </div>
  );
};

export default Home;
