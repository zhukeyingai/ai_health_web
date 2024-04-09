import { memo, useEffect, useState } from "react";
import { Breadcrumb, Button, Descriptions, Divider } from "antd";
import type { DescriptionsProps, BreadcrumbProps } from "antd";
import LikeSvg from "../../../assets/like.svg";
import LikeClickSvg from "../../../assets/like_click.svg";
import StarSvg from "../../../assets/star.svg";
import StarClickSvg from "../../../assets/star_click.svg";
import { clearHTML } from "../../../common/utils/clearHtml";
import { Article, ArticleRecord } from "../../../interface/article";
import CommonCard from "../../../components/CommonCard";
import AvatarWithTooltip from "../../../components/AvatarWithTooltip";

interface Props {
  currentArticle?: Article;
  onBackToList: () => void;
  onLike: (id?: number) => void;
  onStar: (id?: number) => void;
  onEdit: (article?: ArticleRecord) => void;
}

const ArticleDetail: React.FC<Props> = memo(
  ({ currentArticle, onBackToList, onLike, onStar, onEdit }) => {
    const [htmlContent, setHtmlContent] = useState<any>(null);
    const [showLike, setShowLike] = useState<boolean>(false);
    const [showStar, setShowStar] = useState<boolean>(false);
    const [curArticle, setCurArticle] = useState<ArticleRecord | undefined>(
      undefined
    );

    const breadcrumbItems: BreadcrumbProps["items"] = [
      {
        title: "文章推荐",
        className: "cursor-pointer",
        onClick: () => onBackToList(),
      },
      {
        title: curArticle?.title || "",
      },
    ];

    const descriptionItems: DescriptionsProps["items"] = [
      {
        key: "1",
        label: "作者",
        children: <AvatarWithTooltip user={curArticle?.user} />,
      },
      {
        key: "2",
        label: "发布时间",
        children: curArticle?.created_time || "",
      },
      {
        key: "3",
        label: "修改时间",
        children: curArticle?.updated_time || "",
      },
      {
        key: "4",
        label: "浏览量",
        children: curArticle?.view_count || 0,
      },
      {
        key: "5",
        label: "点赞量",
        children: curArticle?.like_count || 0,
      },
      {
        key: "6",
        label: "收藏量",
        children: curArticle?.star_count || 0,
      },
    ];

    useEffect(() => {
      if (!currentArticle) return;
      const { article, isLike, isStar } = currentArticle;
      setCurArticle(article);
      setShowLike(isLike);
      setShowStar(isStar);
    }, [currentArticle]);

    useEffect(() => {
      if (!curArticle?.content) return;
      setHtmlContent(clearHTML(curArticle.content));
    }, [curArticle]);

    return (
      <CommonCard className="h-full overflow-hidden">
        <div className="px-2 py-1 h-full relative">
          <div className="flex justify-between">
            <Breadcrumb items={breadcrumbItems} />
            <Button type="primary" onClick={() => onEdit(curArticle)}>
              修改
            </Button>
          </div>
          <Descriptions
            className="mt-7"
            title={curArticle?.title || ""}
            items={descriptionItems}
          />
          <Divider />
          <div
            className="h-[calc(100%-257px)] overflow-auto"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          <div className="absolute bottom-0 left-2 flex my-3">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => onLike(curArticle?.article_id)}
            >
              <img
                className="h-5 w-5 mr-1"
                src={showLike ? LikeClickSvg : LikeSvg}
              />
              <span>点赞</span>
            </div>
            <div
              className="flex items-center ml-4 cursor-pointer"
              onClick={() => onStar(curArticle?.article_id)}
            >
              <img
                className="h-5 w-5 mr-1"
                src={showStar ? StarClickSvg : StarSvg}
              />
              <span>收藏</span>
            </div>
          </div>
        </div>
      </CommonCard>
    );
  }
);

export default ArticleDetail;
