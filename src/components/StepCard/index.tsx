import { memo } from "react";

interface Props {
  step: number;
  content: string;
}

const StepCard: React.FC<Props> = memo(({ step, content }) => {
  return (
    <div>
      <div className="bg-[#fafafa] rounded-t-lg py-4 px-8 w-[300px] font-medium">
        第{step}步
      </div>
      <div
        className="bg-[#e9f6dc] rounded-tr-lg rounded-b-lg py-4 px-8"
        style={{ boxShadow: "#7779861a 0 3px 20px" }}
      >
        {content}
      </div>
    </div>
  );
});

export default StepCard;
