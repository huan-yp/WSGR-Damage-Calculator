# 双分支部署策略详解

## 概述

本项目采用 **master（源码）** + **gh-pages（部署）** 双分支独立策略。

## 分支结构

```
huan-yp/WSGR-Damage-Calculator
├── master 分支         ← 源代码，开发在这里进行
│   ├── src/           (TypeScript 源码)
│   ├── package.json   (依赖配置)
│   ├── webpack.config.js
│   ├── .github/workflows/
│   └── 文档文件
│
└── gh-pages 分支      ← 静态文件，自动生成
    ├── index.html     (构建后的页面)
    ├── index.js       (打包后的 JS)
    └── styles.css     (样式表)
```

## 工作流程

### 📊 流程图

```
┌─────────────────────────────────────────────────────────────┐
│  开发者                                                      │
└───────┬─────────────────────────────────────────────────────┘
        │
        │ 1. 编辑源代码
        ▼
┌─────────────────┐
│  master 分支    │
│  (源码分支)     │
└───────┬─────────┘
        │
        │ 2. git push origin master
        ▼
┌─────────────────────────────────────┐
│  GitHub Actions                     │
│  ┌──────────────────────────────┐  │
│  │ 1. 检出代码                   │  │
│  │ 2. 安装依赖 (npm ci)          │  │
│  │ 3. 构建项目 (npm run build)   │  │
│  │ 4. 推送到 gh-pages 分支       │  │
│  └──────────────────────────────┘  │
└───────┬─────────────────────────────┘
        │
        │ 3. 自动推送构建产物
        ▼
┌─────────────────┐
│  gh-pages 分支  │
│  (部署分支)     │
└───────┬─────────┘
        │
        │ 4. GitHub Pages 自动部署
        ▼
┌─────────────────────────────────────┐
│  https://huan-yp.github.io/        │
│  WSGR-Damage-Calculator/           │
└─────────────────────────────────────┘
```

## 详细说明

### 1️⃣ master 分支（源码分支）

**用途**: 存放所有开发文件和源代码

**包含内容**:
- ✅ `src/` - TypeScript 源代码
- ✅ `package.json` - NPM 配置
- ✅ `webpack.config.js` - 构建配置
- ✅ `tsconfig.json` - TypeScript 配置
- ✅ `.github/workflows/` - CI/CD 配置
- ✅ 文档文件 (README.md, BUILD.md 等)
- ✅ `.gitignore` - 忽略 dist/ 和 node_modules/

**不包含**:
- ❌ `dist/` - 构建产物（在 .gitignore 中）
- ❌ `node_modules/` - 依赖包

**开发者操作**:
```bash
# 克隆仓库（默认 master 分支）
git clone https://github.com/huan-yp/WSGR-Damage-Calculator.git
cd WSGR-Damage-Calculator

# 安装依赖
npm install

# 开发和测试
npm run dev

# 提交更改
git add .
git commit -m "Update features"
git push origin master  # 推送后自动触发部署
```

### 2️⃣ gh-pages 分支（部署分支）

**用途**: 仅存放 GitHub Pages 需要的静态文件

**包含内容**:
- ✅ `index.html` - 主页面（构建后）
- ✅ `index.js` - JavaScript 代码（打包和压缩后）
- ✅ `styles.css` - 样式表（提取后）

**特点**:
- 🤖 由 GitHub Actions 或部署脚本自动生成
- 🚫 **不要手动编辑此分支**
- 🔄 每次 master 分支更新时自动覆盖
- 📦 体积小，只包含必要的静态文件

**查看部署分支**:
```bash
# 切换到 gh-pages 分支查看（只读）
git fetch origin gh-pages
git checkout gh-pages

# 查看文件
ls -la

# 返回 master 分支
git checkout master
```

## 自动化部署（推荐）

### GitHub Actions 工作流

文件位置: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]  # 监听 master 分支推送
  workflow_dispatch:      # 允许手动触发

permissions:
  contents: write  # 允许推送到 gh-pages

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v4
        
      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: 安装依赖
        run: npm ci
        
      - name: 构建项目
        run: npm run build
        
      - name: 部署到 gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: gh-pages
```

### 触发条件

1. **自动触发**: 推送到 master 分支
   ```bash
   git push origin master  # 自动触发部署
   ```

2. **手动触发**: 
   - 访问 https://github.com/huan-yp/WSGR-Damage-Calculator/actions
   - 选择 "Deploy to GitHub Pages"
   - 点击 "Run workflow"

### 查看部署状态

- **Actions 页面**: https://github.com/huan-yp/WSGR-Damage-Calculator/actions
- **部署历史**: https://github.com/huan-yp/WSGR-Damage-Calculator/deployments

## 手动部署（备选）

如果需要在本地手动部署：

```bash
# 使用部署脚本
./deploy.sh
```

脚本会：
1. 构建项目 (`npm run build`)
2. 进入 dist/ 目录
3. 初始化临时 Git 仓库
4. 强制推送到 gh-pages 分支

## 首次设置

### 1. 启用 GitHub Pages

1. 访问仓库设置: https://github.com/huan-yp/WSGR-Damage-Calculator/settings/pages
2. 配置 Source:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
3. 点击 **Save**

### 2. 等待部署

- 首次部署需要 1-2 分钟
- 访问 https://huan-yp.github.io/WSGR-Damage-Calculator/ 查看效果

### 3. 验证部署

检查以下内容：
- ✅ 页面正常显示
- ✅ 样式正确加载
- ✅ JavaScript 功能正常
- ✅ 没有 404 错误

## 常见问题

### Q1: 推送到 master 后没有自动部署？

**检查**:
1. 访问 Actions 页面查看工作流是否运行
2. 检查 `.github/workflows/deploy.yml` 是否存在
3. 确认 GitHub Actions 已启用（Settings → Actions → General）

**解决**:
```bash
# 手动触发部署
# 访问 Actions 页面，点击 "Run workflow"

# 或使用部署脚本
./deploy.sh
```

### Q2: gh-pages 分支被误删除？

**不用担心**，下次推送到 master 会自动重建：
```bash
git push origin master
```

### Q3: 想要回退到之前的版本？

**方法 1**: Git 回退
```bash
# 回退 master 分支
git checkout master
git log  # 查找要回退的提交
git revert <commit-hash>
git push origin master  # 自动重新部署
```

**方法 2**: 手动部署旧版本
```bash
# 切换到旧提交
git checkout <old-commit-hash>

# 手动部署
./deploy.sh

# 返回当前版本
git checkout master
```

### Q4: 如何测试部署但不发布到正式环境？

使用本地开发服务器：
```bash
npm run dev  # 启动开发服务器
# 访问 http://localhost:8080 测试
```

或构建后本地预览：
```bash
npm run build
cd dist
python3 -m http.server 8000
# 访问 http://localhost:8000 预览
```

## 最佳实践

### ✅ 推荐做法

1. **所有开发在 master 分支进行**
   ```bash
   git checkout master  # 确保在 master 分支
   ```

2. **使用 GitHub Actions 自动部署**
   ```bash
   git push origin master  # 自动触发部署
   ```

3. **提交前本地测试**
   ```bash
   npm run dev  # 本地测试
   npm run build  # 确保构建成功
   ```

4. **写清晰的提交信息**
   ```bash
   git commit -m "Add: 新功能描述"
   git commit -m "Fix: 修复 bug 描述"
   git commit -m "Update: 更新内容描述"
   ```

### ❌ 避免做法

1. **不要直接修改 gh-pages 分支**
   ```bash
   # ❌ 错误做法
   git checkout gh-pages
   # 编辑文件...
   git push origin gh-pages  # 下次部署会被覆盖
   ```

2. **不要提交 dist/ 到 master 分支**
   ```bash
   # dist/ 已在 .gitignore 中
   # 不需要手动添加
   ```

3. **不要同时在多个分支开发**
   ```bash
   # 统一在 master 分支开发
   ```

## 部署时间线

```
时刻              操作                    状态
─────────────────────────────────────────────────
00:00             git push origin master  推送代码
00:00:05          GitHub 接收推送         触发 Actions
00:00:10          Actions 开始运行        构建开始
00:00:15          安装依赖                npm ci
00:00:30          构建项目                npm run build
00:00:35          推送到 gh-pages         部署文件
00:00:40          GitHub Pages 处理       更新网站
00:01:00          部署完成                ✅ 网站已更新
```

平均部署时间: **约 1 分钟**

## 监控和日志

### 查看构建日志

1. 访问 Actions: https://github.com/huan-yp/WSGR-Damage-Calculator/actions
2. 点击最近的工作流运行
3. 查看每个步骤的详细日志

### 查看部署历史

访问 https://github.com/huan-yp/WSGR-Damage-Calculator/deployments

## 总结

| 项目 | master 分支 | gh-pages 分支 |
|------|------------|---------------|
| **用途** | 源代码开发 | 网站部署 |
| **内容** | TypeScript、配置文件、文档 | HTML、JS、CSS |
| **大小** | 较大（包含所有开发文件） | 较小（仅静态文件） |
| **编辑** | ✅ 开发者直接编辑 | ❌ 自动生成，不要手动编辑 |
| **更新** | 手动 git push | 自动或脚本更新 |
| **提交历史** | 完整开发历史 | 仅部署记录 |

---

**核心原则**: 
- 📝 在 master 开发
- 🤖 让自动化处理部署
- 🚫 不要手动修改 gh-pages
