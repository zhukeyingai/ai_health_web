import { useState } from "react";
import { Button, Calendar, Table, Tabs, TabsProps } from "antd";
import PlanningCard from "../../components/PlanningCard";
import CommonCard from "../../components/CommonCard";
import styles from "./index.module.scss";
import PlanRow from "../../components/PlanningCard/planRow";
import { getRandomColor } from "../../common/utils/getRandomColor";
import KeepSvg from "../../assets/keep.svg";
import dayjs from "dayjs";
import PlanModal from "./PlanModal";
import FeedbackModal from "./FeedbackModal";

const exercise = {
  name: "跑步",
  time: 60,
  heat: 200,
};
const todayExerciseList = [
  {
    name: "跑步",
    time: 60,
    heat: 200,
  },
  {
    name: "跑步",
    time: 30,
    heat: 200,
  },
  {
    name: "跑步",
    time: 80,
    heat: 200,
  },
];
const monthExerciseList = [
  {
    day: "2024-04-29",
    exercise: [
      {
        name: "跑步",
        time: 60,
      },
      {
        name: "跑步",
        time: 30,
      },
      {
        name: "跑步",
        time: 80,
      },
    ],
  },
  {
    day: "2024-04-30",
    exercise: [
      {
        name: "跑步",
        time: 60,
      },
      {
        name: "跑步",
        time: 30,
      },
      {
        name: "跑步",
        time: 80,
      },
    ],
  },
];
const monthPlanning = [
  {
    monday: JSON.stringify(exercise),
    tuesday: JSON.stringify(exercise),
    wednesday: JSON.stringify(exercise),
    thursday: JSON.stringify(exercise),
    friday: JSON.stringify(exercise),
    saturday: JSON.stringify(exercise),
    sunday: JSON.stringify(exercise),
  },
  {
    monday: JSON.stringify(exercise),
    tuesday: JSON.stringify(exercise),
    wednesday: JSON.stringify(exercise),
    thursday: JSON.stringify(exercise),
    friday: JSON.stringify(exercise),
    saturday: JSON.stringify(exercise),
    sunday: JSON.stringify(exercise),
  },
  {
    monday: JSON.stringify(exercise),
    tuesday: JSON.stringify(exercise),
    wednesday: JSON.stringify(exercise),
    thursday: JSON.stringify(exercise),
    friday: JSON.stringify(exercise),
    saturday: JSON.stringify(exercise),
    sunday: JSON.stringify(exercise),
  },
];

const genWeekPlan = (value: any) => {
  const { name, time, heat } = JSON.parse(value);
  return (
    <PlanRow
      className="flex-col"
      bg={getRandomColor()}
      name={name}
      time={time}
      heat={heat}
    />
  );
};

const genMonthPlan = (current: any) => {
  const dateStr = `${current.year()}-${current.format("MM")}-${current.format("DD")}`;
  const matchedExercises = monthExerciseList.find(
    (item) => item.day === dateStr
  )?.exercise;
  if (matchedExercises) {
    return (
      <div className="flex flex-col gap-1">
        {matchedExercises.map((exercise, index) => (
          <PlanRow
            className="ml-3"
            key={`${dateStr}-${index}`}
            bg={getRandomColor()}
            name={exercise.name}
            time={exercise.time}
          />
        ))}
      </div>
    );
  }
  return null;
};

const MotionPlanning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [showPlanModal, setShowPlanModal] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const columns: any[] = [
    {
      title: "星期一",
      dataIndex: "monday",
      key: "monday",
      align: "center",
      render: (value: any) => genWeekPlan(value),
    },
    {
      title: "星期二",
      dataIndex: "tuesday",
      key: "tuesday",
      align: "center",
      render: (value: any) => genWeekPlan(value),
    },
    {
      title: "星期三",
      dataIndex: "wednesday",
      key: "wednesday",
      align: "center",
      render: (value: any) => genWeekPlan(value),
    },
    {
      title: "星期四",
      dataIndex: "thursday",
      key: "thursday",
      align: "center",
      render: (value: any) => genWeekPlan(value),
    },
    {
      title: "星期五",
      dataIndex: "friday",
      key: "friday",
      align: "center",
      render: (value: any) => genWeekPlan(value),
    },
    {
      title: "星期六",
      dataIndex: "saturday",
      key: "saturday",
      align: "center",
      render: (value: any) => genWeekPlan(value),
    },
    {
      title: "星期日",
      dataIndex: "sunday",
      key: "sunday",
      align: "center",
      render: (value: any) => genWeekPlan(value),
    },
  ];
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "周计划",
      children: (
        <div className="h-full overflow-auto">
          <Table
            columns={columns}
            dataSource={monthPlanning}
            pagination={false}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "月计划",
      children: (
        <div className="h-full overflow-auto flex flex-col items-center gap-6">
          <div className="text-lg font-medium">{dayjs().format("M")}月</div>
          <Calendar headerRender={() => null} cellRender={genMonthPlan} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex justify-between gap-6">
        <div className="flex flex-1 gap-6">
          <PlanningCard title="今日运动" list={todayExerciseList} />
          <PlanningCard title="明日运动" list={todayExerciseList} />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-center">
            <img className="w-[40px]" src={KeepSvg} />
          </div>
          <Button type="primary" onClick={() => setShowPlanModal(true)}>
            运动定制
          </Button>
          <Button type="primary" onClick={() => setShowFeedbackModal(true)}>
            反馈
          </Button>
        </div>
      </div>
      <CommonCard
        className={`flex-1 h-full overflow-hidden ${styles.planningTabs}`}
      >
        <div className="py-2 pr-2 h-full">
          <Tabs
            className="h-full"
            activeKey={activeTab}
            onChange={setActiveTab}
            items={items}
            tabPosition="left"
          />
        </div>
      </CommonCard>
      {showPlanModal && (
        <PlanModal
          onCancel={() => setShowPlanModal(false)}
          onSuccess={() => setShowPlanModal(false)}
        />
      )}
      {showFeedbackModal && (
        <FeedbackModal
          onCancel={() => setShowFeedbackModal(false)}
          onSuccess={() => setShowFeedbackModal(false)}
        />
      )}
    </div>
  );
};

export default MotionPlanning;
