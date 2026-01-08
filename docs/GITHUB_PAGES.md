# GitHub Pages 部署指南

## 双分支策略说明

本项目采用**源码分支**和**部署分支**独立的策略：

- **master 分支**：存放源代码（TypeScript、配置文件、文档等）
- **gh-pages 分支**：仅存放构建后的静态文件（HTML、JS、CSS）

这样做的好处：
- ✅ 保持部署分支简洁，只包含必要的静态文件
- ✅ 源代码和构建产物分离，便于管理
- ✅ GitHub Pages 自动从 gh-pages 分支部署
- ✅ 支持自动化 CI/CD 流程

---

## 方法 1：手动部署（使用脚本）

### 快速部署

```bash
./deploy.sh
```

脚本会自动：
1. 构建项目（npm run build）
2. 将 dist/ 目录内容推送到 gh-pages 分支
3. 提示访问部署后的网站

### 首次部署额外步骤

1. **在 GitHub 仓库设置中启用 Pages**
   - 打开：https://github.com/huan-yp/WSGR-Damage-Calculator/settings/pages
   - Source 选择 `gh-pages` 分支
   - Root 选择 `/ (root)`
   - 点击 Save

2. **等待 1-2 分钟后访问**
   - URL: https://huan-yp.github.io/WSGR-Damage-Calculator/

---

## 方法 2：自动部署（GitHub Actions，推荐）

### 工作流已配置

本项目已包含 `.github/workflows/deploy.yml` 文件，会在以下情况自动部署：
- 推送代码到 master 分支
- 手动触发（在 Actions 页面点击 "Run workflow"）

### 工作流程

1. **推送代码到 master**
```bash
git add .
git commit -m "Update code"
git push origin master
```

2. **GitHub Actions 自动运行**
   - 安装依赖
   - 构建项目（npm run build）
   - 将 dist/ 内容推送到 gh-pages 分支
   - GitHub Pages 自动部署

3. **查看部署状态**
   - 访问：https://github.com/huan-yp/WSGR-Damage-Calculator/actions
   - 等待绿色 ✓ 表示部署成功

### 首次启用步骤

1. **确保工作流文件已提交**
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deploy workflow"
git push origin master
```

2. **在 GitHub 仓库设置中启用 Pages**
   - 打开：https://github.com/huan-yp/WSGR-Damage-Calculator/settings/pages
   - Source 选择 `gh-pages` 分支
   - Root 选择 `/ (root)`
   - 点击 Save

3. **等待 Actions 完成部署**
   - 访问：https://github.com/huan-yp/WSGR-Damage-Calculator/actions
   - 等待第一次部署完成（约 1-2 分钟）

---

## 方法 3：从主分支的 docs 目录部署

###分支管理

### master 分支（源码分支）

包含的内容：
- `src/` - TypeScript 源代码
- `package.json` - 依赖配置
- `webpack.config.js` - 构建配置
- `tsconfig.json` - TypeScript 配置
- `.github/workflows/` - CI/CD 配置
- 文档文件（README.md, BUILD.md 等）

**不包含**：
- `dist/` - 构建产物（在 .gitignore 中）
- `node_modules/` - 依赖包

### gh-pages 分支（部署分支）

仅包含的内容：
- `index.html` - 主页面
- `index.js` - 打包后的 JavaScript
- `styles.css` - 样式表

**特点**：
- 纯静态文件，无源代码
- 由 GitHub Actions 或部署脚本自动生成
- **不要手动编辑此分支**

### 工作流程

```
开发流程:
  编辑源代码 (master)
    ↓
  git commit & push
    ↓
  GitHub Actions 触发
    ↓
  自动构建项目
    ↓
  推送到 gh-pages 分支
    ↓
  GitHub Pages 自动部署
    ↓
  网站更新完成
---

## 验证部署

部署完成后，访问以下 URL 验证：
- **主页**: https://huan-yp.github.io/WSGR-Damage-Calculator/
- **直接文件**: https://huan-yp.github.io/WSGR-Damage-Calculator/index.html

---

## 故障排查

### 1. 404 错误

**问题**: 访问页面显示 404  
**解决**:
- 确认 Settings → Pages 中 Source 设置正确
- 检查分支名称是否匹配
- 等待 1-2 分钟让 GitHub 处理部署

### 2. 样式/脚本加载失败

**问题**: 页面显示但样式或功能不正常  
**解决**:
- 检查浏览器控制台的错误信息
- 确认 dist/ 目录包含所有文件（index.html, index.js, styles.css）
- 清除浏览器缓存后重试

### 3. 构建失败

**问题**: npm run build 报错  
**解决**:
```bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装依赖
npm install

# 再次构建
npm run build
```

---

## 更新内容流程

每次修改代码后：

1. **本地测试**
```bash
npm run dev  # 在浏览器中测试
```

2. **构建生产版本**
```bash
npm run build
```

3. **部署**
```bash
./deploy.sh  # 使用部署脚本
# 或手动执行方法 1 的步骤 2-3
```

---

## 自定义域名（可选）

如果你有自己的域名：

1. 日常开发流程

### 1. 本地开发和测试

```bash
# 启动开发服务器
npm run dev

# 在浏览器中打开 http://localhost:8080 测试
```

### 2. 提交代码

```bash
# 添加修改的文件
git add .

# 提交
git commit -m "描述你的修改"

# 推送到 master 分支
git push origin master
```

### 3. 自动部署（推荐）

推送后，GitHub Actions 会自动：
- ✅ 安装依赖
- ✅ 构建项目
- ✅ 部署到 gh-pages
- ✅ 更新网站

查看部署状态：https://github.com/huan-yp/WSGR-Damage-Calculator/actions

### 4. 手动部署（可选）

如果需要立即部署而不提交代码：

```bash
./deploy.sh
部署所需的文件：
- ✅ `index.html` - 主页面（必需）
- ✅ `index.js` - JavaScript 代码（必需）
- ✅ `styles.css` - 样式表（必需）
- ❌ `*.d.ts` - TypeScript 类型定义（不需要，但不影响运行）

`.d.ts` 文件可以在 webpack 配置中排除，但保留它们也不会影响部署。
