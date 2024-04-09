import { memo, useState } from "react";
import { ArticleRecord } from "../../../interface/article";
import { Spin, Tabs } from "antd";
import type { TabsProps } from "antd";
import ArticleCard from "./articleCard";
import "../../../common/style/article.scss";

interface Props {
  loading: boolean;
  createdList?: ArticleRecord[];
  starredList?: ArticleRecord[];
  onDetail: (id: number) => void;
  onRemove: (id: number) => void;
}

const PageArticleList: React.FC<Props> = memo(
  ({ loading, createdList, starredList, onDetail, onRemove }) => {
    const [activeTab, setActiveTab] = useState<string>("1");
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "全部文章",
      },
      {
        key: "2",
        label: "我的文章",
      },
      {
        key: "3",
        label: "收藏文章",
      },
    ];

    const genContent = () => {
      let list: ArticleRecord[] = [];
      switch (activeTab) {
        case "1":
          list = [];
          break;
        case "2":
          list = createdList || [];
          break;
        case "3":
          list = starredList || [];
          break;
        default:
          list = [];
          break;
      }
      return (
        <div className="grid gap-6 overflow-hidden pb-5 sm:grid-cols-2 md:lg:xl:grid-cols-3 2xl:grid-cols-3">
          {list?.length > 0
            ? list.map((item) => (
                <ArticleCard
                  data={item}
                  onCLick={() => onDetail(item.article_id)}
                  onRemove={() => onRemove(item.article_id)}
                />
              ))
            : null}
        </div>
      );
    };

    return (
      <div className="h-full w-full article-list">
        <Spin
          spinning={loading}
          className="article-list"
          rootClassName="h-full w-full"
          wrapperClassName="h-full"
        >
          <div className="h-full">
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
            <div className="h-[calc(100%-62px)] overflow-auto">
              {genContent()}
            </div>
          </div>
        </Spin>
      </div>
    );
  }
);

export default PageArticleList;
