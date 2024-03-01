import React, { ReactNode, memo } from "react";
import { Button } from "antd";

interface CommonCardProps {
  className?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
  buttonName?: string;
  children?: ReactNode;
}

const CommonCard: React.FC<CommonCardProps> = memo(
  ({ className, title, description, onClick, buttonName, children }) => {
    return (
      <div
        className={`bg-white rounded-lg p-4 ${className}`}
        style={{ boxShadow: "#7779861a 0 3px 20px" }}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-base font-semibold">{title}</div>
            {description && (
              <div className="mt-1 text-xs text-gray-500">{description}</div>
            )}
          </div>
          {buttonName && (
            <Button
              className="p-0 text-xs ml-5 h-0"
              type="link"
              onClick={onClick}
            >
              {buttonName}
            </Button>
          )}
        </div>
        {children}
      </div>
    );
  }
);

export default CommonCard;
