import { memo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import ViewSvg from "./../../../assets/view.svg";
import LikeSvg from "./../../../assets/like_click.svg";
import StarSvg from "./../../../assets/star_click.svg";
import { ArticleRecord } from "../../../interface/article";
import AvatarWithTooltip from "../../../components/AvatarWithTooltip";
import { clearHTML } from "../../../common/utils/clearHtml";
import { Button, Popconfirm, Tooltip } from "antd";
import { useUserId } from "../../../common/utils/useUserId";

interface Props {
  data: ArticleRecord;
  onCLick: () => void;
  onRemove: () => void;
}

const ArticleCard: React.FC<Props> = memo(({ data, onCLick, onRemove }) => {
  const {
    article_id,
    title,
    content,
    user,
    view_count,
    like_count,
    star_count,
  } = data;
  const { userId } = useUserId();

  return (
    <div
      key={article_id}
      className="overflow-hidden cursor-pointer rounded-lg bg-[#f1f8ea] hover:shadow-md hover:transition-all"
      onClick={onCLick}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center w-[calc(100%-40px)] h-12 px-5 text-base font-medium">
          <Tooltip title={title} placement="topLeft">
            <div className="truncate w-full h-6">{title}</div>
          </Tooltip>
        </div>
        {userId === user?.user_id ? (
          <Popconfirm
            title="确认删除该文章吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={(e) => {
              e?.stopPropagation();
              onRemove();
            }}
          >
            <Button
              className="mr-2 z-10"
              type="link"
              icon={<DeleteOutlined />}
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        ) : null}
      </div>
      <div
        className="h-[120px] w-[calc(100%-40px)] my-3 mx-5 text-xs truncate"
        dangerouslySetInnerHTML={{ __html: clearHTML(content) }}
      />
      <div className="flex h-12 px-5 items-center justify-between">
        <AvatarWithTooltip user={user} />
        <div className="flex items-center">
          <img className="h-5 w-5 mr-1" src={ViewSvg} />
          <span className="text-xs mr-3">{view_count}</span>
          <img className="h-5 w-5 mr-1" src={LikeSvg} />
          <span className="text-xs mr-3">{like_count}</span>
          <img className="h-5 w-5 mr-1" src={StarSvg} />
          <span className="text-xs">{star_count}</span>
        </div>
      </div>
    </div>
  );
});

export default ArticleCard;
