import { User } from "./user";

export interface ArticleRequest {
  user_id: string;
  title: string;
  content: string;
}

export interface ArticleRecord {
  article_id: number; // 文章id
  title: string; // 文章标题
  content: string; // 文章内容
  user_id: string;
  user?: User; // 发布用户
  view_count: number; // 浏览量
  like_count: number; // 点赞量
  star_count: number; // 收藏量
  created_time: string; // 发布时间
  updated_time?: string; // 修改时间
}

export interface Article {
  article: ArticleRecord;
  isLike: boolean;
  isStar: boolean;
}

export interface QueryArticleRequest {
  user_id: string;
  article_id: number; // 文章id
}

export interface ArticleUpdateRequest extends ArticleRequest {
  article_id: number; // 文章id
}
