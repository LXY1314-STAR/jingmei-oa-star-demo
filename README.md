# 精美印务 OA + 观星台 Demo

在线演示：https://lxy1314-star.github.io/jingmei-oa-star-demo/

## 修改代码就能修改 demo

本仓库 `main` 分支根目录就是 demo 源码，GitHub Pages 直接发布根目录的 `index.html`。
在 GitHub 网页上编辑下面这些根目录文件并提交到 `main`，约 1 分钟后刷新演示地址即可看到变化：

- `index.html`：页面骨架、菜单入口、资源引用（新增 js/css 后要在这里加引用，并同步 `?v=` 版本号）
- `app.js`：全局演示状态与页面切换
- `navigation-v2.js` / `navigation-v2.css`：顶部部门导航与二三级菜单
- `star-brief / star-command / star-theme / star-energy / star-gov`：观星台各模块（经营简报、指挥看板、主题数据、能源分析、指标/会议/数据资产/风险治理）
- `*-workspace.js / *-definitions.js`：党政、审计、信息工程、人力资源等模块
- `style.css`：公共样式

`dist/` 是本地构建产物，GitHub Pages 不使用它；只改 `dist/` 不会改变线上 demo。

## 本地预览

在仓库根目录执行：

```bash
python -m http.server 8000
```

然后打开 http://127.0.0.1:8000 。

## 说明

纯静态演示原型，数据写在 JS 定义里；操作在当前会话内模拟回写，刷新后恢复基线，不代表真实系统接口已联调。
