## 前端技术栈

[React](https://react.dev/)、[Ant Design](https://ant.design/)、[Vite](https://vitejs.dev/)、[TypeScript](https://github.com/microsoft/TypeScript)

## 环境和依赖

> 推荐本项目使用 [pnpm](https://github.com/pnpm/pnpm/) 包管理工具

## 开发流程

- 本地feat分支，推送至远程feat分支
- 远程feat分支合并入master分支

## 项目运行

1. 拉取项目代码

```bash
git clone https://github.com/woshizhukeyingai/ai_health_web.git
cd ai_health_web
```

2. 安装依赖

```bash
npm install -g pnpm
pnpm install
```

- 开发模式运行

```bash
pnpm run dev
```

- 生产环境运行

```bash
pnpm build
```

## 插件

- `https://www.wangeditor.com/v5/editor-config.html#placeholder`

## 小记

- 先安装 pnpm
  - `npm install pnpm`
- 创建 vite
  - `pnpm create vite`
  - 输入项目名称 ai-health
  - 选择 react
  - 选择 typescript
- 运行 vite
  - `cd ai-health`
  - `pnpm install`
  - `pnpm run dev`
- 生产环境
  - `pnpm run build`
- 配置 prettier-plugin-tailwindcs
  - `pnpm install prettier-plugin-tailwindcss`
- 配置 Tailwind CSS
  - `pnpm add -D tailwindcss postcss autoprefixer`
  - `npx tailwindcss init -p`
- 安装 antd 组件库
  - `pnpm install antd`
  - `pnpm install @ant-design/icons`
  - `pnpm i @ant-design/pro-components`
- 安装邮箱校验库
  - `pnpm install email-validator`
- 安装 axios
  - `pnpm i axios`
- 安装 react route
  - `pnpm i react-router-dom`
- 安装 dayjs
  - `pnpm i dayjs`
- 安装裁剪图片
  - `pnpm i antd-img-crop`
- 安装lodash
  - `pnpm i lodash-es @types/lodash-es`
- 安装富文本编辑器
  - `pnpm i @wangeditor/editor @wangeditor/editor-for-react`
- 安装HTML清理库
  - `pnpm i dompurify @types/dompurify`
