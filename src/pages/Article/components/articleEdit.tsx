import { memo, useEffect, useState } from "react";
import { Breadcrumb, Button, Input, message } from "antd";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import CommonCard from "../../../components/CommonCard";
import { useUserId } from "../../../common/utils/useUserId";
import {
  ArticleRecord,
  ArticleRequest,
  ArticleUpdateRequest,
} from "../../../interface/article";
import articleApi from "../../../services/article";

interface Props {
  onBackToList: () => void;
  article?: ArticleRecord;
}

const ArticleEdit: React.FC<Props> = memo(({ onBackToList, article }) => {
  const { userId } = useUserId();
  const [editor, setEditor] = useState<IDomEditor | null>(null); // editor 实例
  const [html, setHtml] = useState<string>(article?.content || ""); // 编辑器内容
  const [title, setTitle] = useState<string>(article?.title || "");

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入文章内容...",
  };

  const items: any[] = [
    {
      title: "文章推荐",
      className: "cursor-pointer",
      onClick: () => onBackToList(),
    },
    {
      title: article ? "修改我的文章" : "创建我的文章",
    },
  ];

  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const onSubmit = () => {
    if (!userId) return;
    if (!title) {
      message.error("文章标题不能为空");
      return;
    }
    if (html === "<p><br></p>") {
      message.error("文章内容不能为空");
      return;
    }
    const params: any = {
      user_id: userId,
      title,
      content: html,
    };
    if (article) {
      params.article_id = article.article_id;
    }
    const api = article
      ? articleApi.updateArticle(params as ArticleUpdateRequest)
      : articleApi.createArticle(params as ArticleRequest);
    const text = article ? "更新" : "创建";
    api
      .then((res) => {
        if (res.data) {
          message.success(`文章${text}成功`);
          onBackToList();
        }
      })
      .catch((err) => message.error(`文章${text}失败：${err}`));
  };

  return (
    <CommonCard className="h-full overflow-hidden">
      <div className="px-2 py-1 h-full flex flex-col">
        <div className="flex justify-between">
          <Breadcrumb items={items} />
          <Button type="primary" onClick={() => onSubmit()}>
            发布
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <Input
            className="text-[24px] mt-8 font-medium"
            placeholder="请输入文章标题..."
            variant="borderless"
            maxLength={80}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div
            className="rounded-lg overflow-hidden mt-4"
            style={{ border: "1px solid #ccc", zIndex: 100 }}
          >
            <Toolbar
              editor={editor}
              //   defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: "1px solid #ccc" }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={(editor) => setHtml(editor.getHtml())}
              mode="default"
              style={{ height: "500px", overflowY: "hidden" }}
            />
          </div>
        </div>
      </div>
    </CommonCard>
  );
});

export default ArticleEdit;
