import request from "./request";
import {
  ArticleRequest,
  QueryArticleRequest,
  ArticleUpdateRequest,
} from "../interface/article";

export default {
  // 用户创建自己的文章
  async createArticle(data: ArticleRequest) {
    return await request.post("/article/createArticle", data);
  },
  // 查询文章
  async queryArticles(data: { user_id: string }) {
    return await request.get("/article/queryArticles", { params: data });
  },
  // 删除文章
  async deleteArticle(data: QueryArticleRequest) {
    return await request.post("/article/deleteArticle", data);
  },
  // 增加文章浏览量
  async incrementViewCount(data: QueryArticleRequest) {
    return await request.post("/article/incrementViewCount", data);
  },
  // 文章点赞
  async incrementLikeCount(data: QueryArticleRequest) {
    return await request.post("/article/incrementLikeCount", data);
  },
  // 文章收藏
  async incrementStarCount(data: QueryArticleRequest) {
    return await request.post("/article/incrementStarCount", data);
  },
  // 查询当前文章
  async queryCurrentArticle(data: QueryArticleRequest) {
    return await request.get("/article/queryCurrentArticle", { params: data });
  },
  // 修改文章
  async updateArticle(data: ArticleUpdateRequest) {
    return await request.post("/article/updateArticle", data);
  },
};
