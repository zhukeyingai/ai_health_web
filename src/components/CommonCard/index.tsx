import React, { ReactNode, memo } from "react";

interface CommonCardProps {
  children: ReactNode;
  className?: string;
}

const CommonCard: React.FC<CommonCardProps> = memo(
  ({ children, className }) => {
    return (
      <div
        className={`bg-white rounded-lg p-4 ${className}`}
        style={{ boxShadow: "#7779861a 0 3px 20px" }}
      >
        {children}
      </div>
    );
  }
);

export default CommonCard;
