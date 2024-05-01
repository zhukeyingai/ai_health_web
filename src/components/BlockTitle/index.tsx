import { memo, ReactNode } from "react";

interface Props {
  title: string;
  rightRender?: ReactNode;
  className?: string;
}

const BlockTitle: React.FC<Props> = memo(
  ({ title, rightRender, className }) => {
    return (
      <div className={`flex items-center justify-between ${className || ""}`}>
        <div className="flex items-center">
          <div className="mr-2 h-[14px] w-[2px] bg-[#9ad14b]" />
          <span className="text-[16px] font-medium"> {title}</span>
        </div>
        <div>{rightRender}</div>
      </div>
    );
  }
);

export default BlockTitle;
