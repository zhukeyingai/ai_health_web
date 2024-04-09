import { memo, ReactNode } from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CommonCard from "../../components/CommonCard";

interface Props {
  onSearch?: (e: any) => void;
  mainBtnTxt?: string;
  onMain?: () => void;
  content: ReactNode;
}

const PageLayout: React.FC<Props> = memo(
  ({ onSearch, mainBtnTxt, onMain, content }) => {
    return (
      <CommonCard className="h-full min-w-[600px]">
        <div className="flex flex-col h-full w-full overflow-hidden p-2">
          <div className="flex justify-between items-center">
            {onSearch ? (
              <Input
                allowClear
                onChange={onSearch}
                placeholder="搜索"
                className="w-[320px]"
                prefix={<SearchOutlined />}
              />
            ) : null}
            {mainBtnTxt ? (
              <Button type="primary" onClick={onMain}>
                {mainBtnTxt}
              </Button>
            ) : null}
          </div>
          <div className="flex-1 mt-4 overflow-auto">
            <div className="w-full h-full overflow-auto">{content}</div>
          </div>
        </div>
      </CommonCard>
    );
  }
);

export default PageLayout;
