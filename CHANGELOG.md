# Changelog

本项目的所有重要变更都会记录在此文件中。

## [Unreleased]

### Added
- 滚动切换背景图：利用 `images/landscape/` 中的 6 张风景图，每滑动到一个页面模块时背景平滑过渡到另一张图片（交叉淡入淡出）
- 新增 `agent.md` 开发备忘，记录图片资源规范

### Changed
- 背景图片从 `pictures/` 复制至 `images/landscape/`，确保 GitHub Pages 可正常加载
- `body` 背景样式从静态单图改为双图层动态切换

## [1.2.0] - 2026-03-01

### Added
- 博客系统：支持 Markdown / Typst 文章渲染
- 博客列表页与文章详情页 (`post.html`)
- `blog_data.js` 博客数据管理，`build_blog.py` 博客构建脚本

## [1.1.0] - 2026-03-01

### Added
- 英文版内容支持
- 中英文语言切换按钮

### Changed
- 默认语言设为英文
- 页面布局微调优化

## [1.0.0] - 2026-02-28

### Added
- 个人作品集网站初始版本
- 首屏 Hero 区域（头像、简介）
- 教育背景模块
- 专业技能网格展示
- 核心经历（实习 & 项目）
- 论文与专利列表
- 联系方式模块
- 自定义鼠标光标跟随效果
- 滚动淡入动画（Intersection Observer）
- 响应式布局适配
