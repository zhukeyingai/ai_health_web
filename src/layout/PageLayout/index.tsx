import { memo, ReactNode } from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CommonCard from "../../components/CommonCard";

interface Props {
  name?: string;
  className?: string;
  onSearch?: (e: any) => void;
  mainBtnTxt?: string;
  onMain?: () => void;
  content: ReactNode;
}

const PageLayout: React.FC<Props> = memo(
  ({ name, className, onSearch, mainBtnTxt, onMain, content }) => {
    return (
      <CommonCard
        className={`h-full min-w-[600px] overflow-hidden ${className || ""}`}
      >
        <div className="flex flex-col h-full w-full overflow-hidden p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {name ? <div className="text-lg font-medium">{name}</div> : null}
              {onSearch ? (
                <Input
                  allowClear
                  onChange={onSearch}
                  placeholder="搜索"
                  className="w-[320px]"
                  prefix={<SearchOutlined />}
                />
              ) : null}
            </div>
            {mainBtnTxt ? (
              <Button type="primary" onClick={onMain}>
                {mainBtnTxt}
              </Button>
            ) : null}
          </div>
          <div className="h-[calc(100%-48px)] mt-4 overflow-auto">
            <div className="w-full h-full overflow-auto">{content}</div>
          </div>
        </div>
      </CommonCard>
    );
  }
);

export default PageLayout;
