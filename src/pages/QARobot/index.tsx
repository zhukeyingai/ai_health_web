import HistoryList from "./HistoryList";
import ModelChat from "./ModelChat";

const QARobot: React.FC = () => {
  return (
    <div className="flex h-full w-full gap-6">
      <HistoryList />
      <ModelChat />
    </div>
  );
};

export default QARobot;
