import React, { ReactNode, memo } from "react";
import { Divider } from "antd";

interface PieceContentProps {
  header?: string;
  description?: string;
  children?: ReactNode;
}

const PieceContent: React.FC<PieceContentProps> = memo(
  ({ header, description, children }) => {
    return (
      <>
        <Divider />
        <div className="flex justify-between">
          <div className="flex flex-col w-[450px] mr-5">
            <div className="font-medium">{header}</div>
            <div className="mt-1 text-xs text-gray-500 whitespace-pre-line">{description}</div>
          </div>
          {children}
        </div>
      </>
    );
  }
);

export default PieceContent;
