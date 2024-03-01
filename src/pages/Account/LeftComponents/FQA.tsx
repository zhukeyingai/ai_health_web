import { Button } from "antd";
import CommonCard from "../../../components/CommonCard";

const FQA: React.FC = () => {
  return (
    <CommonCard className="mt-6" title="经常问的问题">
      <Button
        className="mt-2.5 p-0 h-[22px]"
        type="link"
        onClick={() => console.log("@哪个计划适合我？")}
      >
        哪个计划适合我？
      </Button>
      <Button
        className="mt-2.5 p-0 h-[22px]"
        type="link"
        onClick={() => console.log("@AI Health的安全性如何？")}
      >
        AI Health的安全性如何？
      </Button>
      <Button
        className="mt-2.5 p-0 h-[22px]"
        type="link"
        onClick={() => console.log("@如何取消或更改我的订阅？")}
      >
        如何取消或更改我的订阅？
      </Button>
    </CommonCard>
  );
};

export default FQA;
