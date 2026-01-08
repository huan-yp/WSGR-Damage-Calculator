# WSGR 伤害计算器

战舰少女 R 伤害计算器 - 使用 TypeScript 重写的现代化多页面应用

## 🌐 在线访问

**正式版本**: [https://huan-yp.github.io/WSGR-Damage-Calculator/](https://huan-yp.github.io/WSGR-Damage-Calculator/)

## ✨ 功能特性

### 伤害计算
- ✅ 支持 13 种攻击类型
- ✅ 实时计算（带防抖优化）
- ✅ 穿甲伤害计算
- ✅ 中破率/大破率/击沉率（使用二分查找精确计算）
- ✅ 航空战减伤机制
- ✅ 导弹战特殊计算

### 属性下限计算
- ✅ 白字/暴击击沉下限
- ✅ 支持 8 种攻击类型（夜战类型）
- ✅ 实时计算
- ✅ 20 种阵形×航向组合结果

### 技术特性
- ✅ TypeScript 5.3 类型安全
- ✅ 模块化架构设计
- ✅ 深色主题 UI
- ✅ 响应式设计
- ✅ 自动部署到 GitHub Pages

## 🚀 快速开始

### 在线使用

直接访问：[https://huan-yp.github.io/WSGR-Damage-Calculator/](https://huan-yp.github.io/WSGR-Damage-Calculator/)

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/huan-yp/WSGR-Damage-Calculator.git
cd WSGR-Damage-Calculator

# 安装依赖
npm install

# 启动开发服务器（支持热重载）
npm run dev
# 访问 http://localhost:8080

# 构建生产版本
npm run build
```

## 📦 技术栈

- **语言**: TypeScript 5.3
- **构建工具**: Webpack 5
- **开发服务器**: webpack-dev-server 4
- **样式**: CSS3（深色主题）
- **部署**: GitHub Pages + GitHub Actions

## 🏗️ 项目结构

```
├── src/
│   ├── core/                    # 核心计算模块
│   │   ├── damage/              # 伤害计算
│   │   │   ├── coefficient.ts   # 系数计算
│   │   │   ├── penetration.ts   # 穿甲伤害
│   │   │   ├── percent.ts       # 伤害率（中破/大破/击沉）
│   │   │   ├── limit.ts         # 属性下限
│   │   │   └── airstrike.ts     # 航空战减伤
│   │   ├── shared/              # 共享模块
│   │   │   ├── models.ts        # 类型定义
│   │   │   ├── constants.ts     # 游戏常量
│   │   │   └── calculator.ts    # 通用计算函数
│   │   └── ui/                  # UI 管理
│   │       └── ui-manager.ts
│   ├── entries/                 # 页面入口
│   │   ├── home.ts              # 首页
│   │   ├── damage/              # 伤害计算页面
│   │   │   ├── index.ts
│   │   │   ├── event-handlers.ts
│   │   │   ├── ui-updater.ts
│   │   │   └── result-renderer.ts
│   │   └── limit/               # 属性下限页面
│   │       ├── index.ts
│   │       ├── calculator.ts
│   │       ├── ui-updater.ts
│   │       └── result-renderer.ts
│   ├── pages/                   # HTML 模板
│   │   ├── home.html
│   │   ├── damage.html
│   │   └── limit.html
│   └── styles/                  # 样式文件
│       └── main.css
├── .github/workflows/           # CI/CD
│   └── deploy.yml               # 自动部署
├── dist/                        # 构建输出
├── package.json
├── webpack.config.js
└── tsconfig.json
```

## 🎯 架构特点

### 模块化设计
- **分层架构**: core（核心）→ entries（入口）→ pages（页面）
- **职责分离**: 计算逻辑 / UI 更新 / 事件处理 / 结果渲染
- **文件大小控制**: 所有文件 < 260 行

### 计算优化
- **二分查找**: 精确计算伤害率阈值（替代线性估算）
- **实时计算**: 防抖优化，输入即计算
- **性能优化**: 模块化按需加载

## 📝 使用方式

### 伤害计算
1. 选择攻击类型（炮击/雷击/航空战/导弹战等）
2. 填写基础攻击力参数（火力/雷装/轰炸等）
3. 设置战斗系数（制空/阵形/舰损/技能等）
4. 输入目标信息（装甲/HP）
5. 查看实时计算结果

### 属性下限计算
1. 选择夜战攻击类型
2. 输入目标伤害值和装甲
3. 设置暴击和技能系数
4. 查看所有阵形×航向组合下的属性下限

## 🔄 分支说明

- **master**: 源代码分支（主开发分支）
- **gh-pages**: 自动部署分支（由 GitHub Actions 维护）

## 🛠️ 开发和部署

### 本地开发

```bash
# 启动开发服务器（支持热重载）
npm run dev

# 构建
npm run build

# 监听模式（自动重新构建）
npm run watch
```

### 自动部署到 GitHub Pages

推送到 master 分支后，GitHub Actions 会自动执行以下步骤：
1. ✅ 安装依赖
2. ✅ 构建项目
3. ✅ 部署到 gh-pages 分支
4. ✅ 更新 GitHub Pages

**部署方式非常简单**：
```bash
git add .
git commit -m "feat: your changes"
git push origin master
```

部署完成后可在以下地址查看更新：
🌐 https://huan-yp.github.io/WSGR-Damage-Calculator/

## 📄 更新日志

### V1.5 (2026-01-08) - TypeScript 重构

**架构改进**
- ✅ 使用 TypeScript 5.3 完全重写
- ✅ 模块化架构：core 拆分为 damage/shared/ui 三大模块
- ✅ entries 拆分为 damage/limit 独立页面
- ✅ 所有文件控制在 260 行以内

**计算优化**
- ✅ 伤害率计算改用二分查找（精确计算浮动系数阈值）
- ✅ 实现实时计算（带防抖）
- ✅ 添加航空战减伤机制

**UI 改进**
- ✅ 深色主题界面
- ✅ 优化属性下限展示（"白字确保击沉下限"）
- ✅ 伤害值显示为区间（min~max）

**工程化**
- ✅ Webpack 5 构建系统
- ✅ 开发热重载（HMR）
- ✅ GitHub Actions 自动部署
- ✅ 生产环境代码压缩优化

### V1.4 - 昼战导弹更新
- 更改了昼战导弹伤害计算方式
- 使用版头机制简介中的公式
- 增加了属性下限计算功能

## 🙏 致谢

- 感谢 [starcatmeow](https://github.com/starcatmeow) 指导 HTML 排版
- 感谢原伤害计算器作者 [hjmwwsshh](https://github.com/hjmwwsshh)

## 📜 许可证

MIT License

---

**项目地址**: https://github.com/huan-yp/WSGR-Damage-Calculator  
**在线访问**: https://huan-yp.github.io/WSGR-Damage-Calculator/
