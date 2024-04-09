import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash-es";
import { message } from "antd";
import PageLayout from "../../layout/PageLayout";
import PageArticleList from "./components/pageArticleList";
import ArticleEdit from "./components/articleEdit";
import articleApi from "../../services/article";
import { useUserId } from "../../common/utils/useUserId";
import {
  ArticleRecord,
  Article as ArticleResponse,
  QueryArticleRequest,
} from "../../interface/article";
import ArticleDetail from "./components/articleDetail";
import { searchByValues } from "../../common/utils/searchByValues";

enum OperType {
  edit = "edit",
  detail = "detail",
  default = "list",
}

const Article: React.FC = () => {
  const { userId } = useUserId();
  const [loading, setLoading] = useState<boolean>(false);
  const [operType, setOperType] = useState<OperType>(OperType.default);
  const [createdList, setCreatedList] = useState<ArticleRecord[]>([]);
  const [starredList, setStarredList] = useState<ArticleRecord[]>([]);
  const [currentArticle, setCurrentArticle] = useState<
    ArticleResponse | undefined
  >(undefined);
  const [articleEdit, setArticleEdit] = useState<ArticleRecord | undefined>(
    undefined
  );
  const [filterSearch, setFilterSearch] = useState<string>("");

  useEffect(() => {
    if (!userId) return;
    getArticleList(userId);
  }, [userId]);

  const debounceSearch = useCallback(
    debounce((e) => setFilterSearch(e.target.value?.trim()), 300),
    []
  );

  const createdData = useMemo(() => {
    const filteredData = searchByValues(createdList, filterSearch);
    return filteredData;
  }, [createdList, filterSearch]);

  const starredData = useMemo(() => {
    const filteredData = searchByValues(starredList, filterSearch);
    return filteredData;
  }, [starredList, filterSearch]);

  const onDetail = (id: number) => {
    setOperType(OperType.detail);
    onFetchArticle(id);
  };

  const onEdit = (article?: ArticleRecord) => {
    if (!article) return;
    setOperType(OperType.edit);
    setArticleEdit(article);
  };

  const onBackToList = () => {
    setOperType(OperType.default);
    setCurrentArticle(undefined);
    setArticleEdit(undefined);
    userId && getArticleList(userId);
  };

  const getArticleList = (user_id: string) => {
    setLoading(true);
    articleApi
      .queryArticles({ user_id })
      .then(({ data }: any) => {
        const { created, starred } = data;
        setCreatedList(created);
        setStarredList(starred);
      })
      .catch((err) => message.error(`查询文章失败：${err}`))
      .finally(() => setLoading(false));
  };

  // 从列表点入看详情
  const onFetchArticle = (article_id: number) => {
    if (!userId) return;
    const params: QueryArticleRequest = {
      user_id: userId,
      article_id,
    };
    articleApi
      .incrementViewCount(params)
      .then(() => {
        return articleApi.queryCurrentArticle(params);
      })
      .then(({ data }) => {
        setCurrentArticle(data);
      })
      .catch((err) => message.error(`获取文章失败：${err}`));
  };

  // 详情内部进行点赞收藏操作的刷新
  const onRefreshArticle = (article_id: number) => {
    if (!userId) return;
    const params: QueryArticleRequest = {
      user_id: userId,
      article_id,
    };
    articleApi.queryCurrentArticle(params).then(({ data }) => {
      setCurrentArticle(data);
    });
  };

  const onLike = (id?: number) => {
    if (!userId || !id) return;
    const params: QueryArticleRequest = {
      user_id: userId,
      article_id: id,
    };
    articleApi.incrementLikeCount(params).then(() => onRefreshArticle(id));
  };

  const onStar = (id?: number) => {
    if (!userId || !id) return;
    const params: QueryArticleRequest = {
      user_id: userId,
      article_id: id,
    };
    articleApi.incrementStarCount(params).then(() => onRefreshArticle(id));
  };

  const onRemove = (id: number) => {
    if (!userId) return;
    const params: QueryArticleRequest = {
      user_id: userId,
      article_id: id,
    };
    articleApi
      .deleteArticle(params)
      .then((res) => {
        if (res.data) {
          message.success("文章删除成功");
          userId && getArticleList(userId);
        }
      })
      .catch((err) => message.error(`文章删除失败：${err}`));
  };

  const genContent = () => {
    if (operType === OperType.edit) {
      return <ArticleEdit onBackToList={onBackToList} article={articleEdit} />;
    } else if (operType === OperType.detail) {
      return (
        <ArticleDetail
          currentArticle={currentArticle}
          onBackToList={onBackToList}
          onLike={onLike}
          onStar={onStar}
          onEdit={onEdit}
        />
      );
    }
    return (
      <PageLayout
        onSearch={debounceSearch}
        mainBtnTxt="撰写文章"
        onMain={() => setOperType(OperType.edit)}
        content={
          <PageArticleList
            loading={loading}
            createdList={createdData}
            starredList={starredData}
            onDetail={onDetail}
            onRemove={onRemove}
          />
        }
      />
    );
  };

  return <>{genContent()}</>;
};

export default Article;
