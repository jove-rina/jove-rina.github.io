# jove-rina.github.io

Jove Rina 品牌站（https://app.jove-rina.top）。纯静态多页站点，Vite 8 + TypeScript + Less，
图标在构建期由 lucide 内联成 SVG —— 浏览器不加载图标运行时，也没有前端框架。

## 开发

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm typecheck
pnpm build      # 输出 dist/，可直接静态托管
pnpm preview    # 预览构建产物
```

## 结构

```text
index.html                    首页入口（只有 head + <!--APP--> 占位）
projects/<slug>/index.html    项目页入口（同样只有占位）
src/
  data/home.ts                首页全部文案与项目分组
  data/projects/<slug>.ts     每个项目页的完整内容
  lib/pages.ts                页面注册表：路径 → 数据 → 渲染
  lib/render-home.ts          首页渲染
  lib/render-project.ts       项目页渲染
  lib/sections.ts             区块渲染（features / steps / qa / stats / screenshots …）
  lib/icons.ts                构建期把 lucide 图标节点序列化成内联 SVG
  lib/i18n.ts                 运行时语言切换（zh / en）
  lib/shell.ts                背景光场、导航、滚动显现、打字机、星云初始化
  styles/                     tokens / layout / home / project / fx（Less）
  entries/                    浏览器入口（引入样式 + boot）
public/                       CNAME、图片等原样复制到 dist 的静态资源
```

视觉层在 `src/styles/fx.less`：噪点、网格、滚动进度条、区块编号、卡片聚光、
项目页光晕与截图缩放。背景是 `motion` 驱动的光场（`src/lib/shell.ts`）：
三团缓慢漂移的极光光晕 + 旋转光带 + 滚动视差 + 指针光斑，全部只动 transform/opacity；
数字滚动、面板行入场、按钮磁吸也走 Motion。`prefers-reduced-motion` 下背景静止、
进度条与动效不初始化。

项目页安装框带复制按钮（复制的是 `install.copy` 里的纯命令，不是页面上的装饰文本），
页尾有上一个/下一个项目导航。

## Hero 背景（WebGL 星云）

首屏是实时 WebGL 渲染的星云：域扭曲 fbm 生成紫/品红云带，中心橙色裂隙、右侧青色星团，
上方星场、底部两层山脊剪影；指针移动带来轻微视差，滚动时星云缓慢上移。整个背景没有
视频、图片或 three.js 依赖，只有一段 GLSL。

- 着色器：`src/lib/nebula-shader.ts`（GLSL ES 1.0，单文件）
- 渲染器：`src/lib/nebula.ts` — 全屏三角形；内部渲染分辨率为 CSS 尺寸 ×0.5（移动端 ×0.42，
  最宽 1280）；每 90 帧统计一次平均帧时，超过 26ms 自动降到 0.82 倍（下限 0.42）。
- 生命周期：`IntersectionObserver` 离屏暂停，`visibilitychange` 后台暂停；
  `prefers-reduced-motion` 下只渲染一帧静态星云，不启动 rAF。
- 降级：拿不到 WebGL 上下文时，canvas 自身的 CSS 径向渐变作为背景。

页面 HTML 在构建时由 `vite.config.ts` 里的 `transformIndexHtml` 插件注入：把数据渲染成
静态 HTML 写进入口，因此产物仍是纯静态页面（SEO 不依赖 JS）。

## 新增一个项目页

1. 新建 `src/data/projects/<slug>.ts`，导出 `ProjectPage`（参考现有文件）。
2. 在 `src/lib/pages.ts` 的 `projects` 数组里注册。
3. 建 `projects/<slug>/index.html`：复制任意现有项目入口即可（内容由插件注入）。
4. 在 `src/data/home.ts` 的 `projects.groups[].items` 里加卡片。
5. 图片放 `public/projects/<slug>/`，页面里用 `/projects/<slug>/xxx.png` 引用。

`pnpm dev` 与 `pnpm build` 共用同一套渲染逻辑，改数据即改页面。

## i18n

所有文案类型是 `L10n = { zh, en }`。渲染时自动生成 `data-i18n` key 与页面级字典
（`#i18n-data`），切换语言只替换文本，不重载页面。新增区块 / 字段不需要手写字典。

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 构建并发布到 GitHub Pages。
仓库的 Pages Source 需设为 **GitHub Actions**。`public/CNAME` 保证自定义域名不变。
