# Agent 开发备忘

## 图片资源规范

- `pictures/` 文件夹已被 `.gitignore` 忽略，**不会同步到 GitHub Pages**。
- 网站中实际使用到的图片必须放在 `images/` 文件夹下，这样才能被 Git 跟踪并部署到线上。
- 如果需要从 `pictures/` 引用新图片，请先将其复制到 `images/` 对应子目录，再在代码中引用 `images/...` 路径。
