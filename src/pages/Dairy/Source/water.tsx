import WaterDrink from "../../../assets/water.svg";
import CommonCard from "../../../components/CommonCard";

const Water: React.FC = () => {
  return (
    <CommonCard className="ml-6 w-1/2">
      <div className="flex items-center">
        <img src={WaterDrink} className="w-8" />
        <div className="ml-1.5 text-[15px] font-semibold">饮水</div>
      </div>
    </CommonCard>
  );
};

export default Water;
