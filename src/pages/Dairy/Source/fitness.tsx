import Exercise from "../../../assets/exercise.svg";
import CommonCard from "../../../components/CommonCard";

const Fitness: React.FC = () => {
  return (
    <CommonCard className="ml-6 w-1/2">
      <div className="flex items-center">
        <img src={Exercise} className="w-8" />
        <div className="ml-1.5 text-[15px] font-semibold">锻炼</div>
      </div>
    </CommonCard>
  );
};

export default Fitness;
