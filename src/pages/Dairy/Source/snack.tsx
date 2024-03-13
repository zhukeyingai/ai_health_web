import SnackFood from "../../../assets/snack.svg";
import CommonCard from "../../../components/CommonCard";

const Snack: React.FC = () => {
  return (
    <CommonCard className="w-1/2">
      <div className="flex items-center">
        <img src={SnackFood} className="w-8" />
        <div className="ml-1.5 text-[15px] font-semibold">零食</div>
      </div>
    </CommonCard>
  );
};

export default Snack;
