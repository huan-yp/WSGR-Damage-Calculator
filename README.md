# WSGR 伤害计算器

战舰少女 R 伤害计算器 - 使用 TypeScript 重写的现代化版本

## 🌐 在线访问

**正式版本**: [https://huan-yp.github.io/WSGR-Damage-Calculator/](https://huan-yp.github.io/WSGR-Damage-Calculator/)

## ✨ 功能特性

- ✅ 支持 13 种攻击类型计算
- ✅ 18 种计算功能（伤害、穿深、击破率等）
- ✅ 属性下限计算
- ✅ 昼战导弹伤害计算（使用版头机制简介公式）
- ✅ 现代化 TypeScript 架构
- ✅ 完全模块化设计

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

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📦 技术栈

- **语言**: TypeScript 5.3
- **构建工具**: Webpack 5
- **开发服务器**: webpack-dev-server
- **样式**: CSS3
- **部署**: GitHub Pages

## 🏗️ 项目结构

```
├── src/                      # 源代码目录
│   ├── index.ts             # 应用入口
│   ├── constants.ts         # 游戏数据常量
│   ├── models.ts            # TypeScript 类型定义
│   ├── calculator.ts        # 核心计算函数
│   ├── damage-calculator.ts # 伤害计算逻辑
│   ├── ui-manager.ts        # UI 管理
│   ├── index.html           # HTML 模板
│   └── styles.css           # 样式表
├── .github/workflows/       # GitHub Actions
│   └── deploy.yml           # 自动部署配置
├── dist/                    # 构建输出（不提交到 master）
├── docs/                    # 文档
├── package.json             # 项目配置
├── webpack.config.js        # Webpack 配置
└── tsconfig.json            # TypeScript 配置
```

## 📚 文档

- [构建指南](BUILD.md) - 详细的构建和开发文档
- [快速开始](QUICK_START.md) - 5 分钟上手指南
- [技术架构](ARCHITECTURE.md) - 架构设计和扩展指南
- [GitHub Pages 部署](GITHUB_PAGES.md) - 部署到 GitHub Pages 的完整指南

## 🔄 分支说明

- **master 分支**: 源代码（开发分支）
- **gh-pages 分支**: 构建产物（自动部署分支）

## 📝 使用方式

按照页面提示填写数据即可计算：

1. 选择攻击类型
2. 填写攻击属性参数
3. 设置各种系数
4. 输入目标信息
5. 点击计算按钮查看结果

## 🎯 未来计划

- [ ] 导入部分深海数据，无需查阅资料直接计算
- [ ] 添加图像绘制功能，根据装甲值自动绘图
- [ ] 整合现有计算器，整理数据，减少查阅

## 🛠️ 开发和部署

### 开发流程

```bash
# 1. 修改代码
# 2. 本地测试
npm run dev

# 3. 提交代码
git add .
git commit -m "Your changes"
git push origin master
```

### 部署方式

**方式 1: 自动部署（推荐）**
```bash
# 推送到 master 分支，GitHub Actions 自动构建并部署
git push origin master
```

**方式 2: 手动部署**
```bash
# 使用部署脚本
./deploy.sh
```

详见 [GitHub Pages 部署指南](GITHUB_PAGES.md)

## 📄 更新日志

### V1.5 (2026-01-08) - TypeScript 重构

- ✅ 使用 TypeScript 完全重写
- ✅ 模块化架构设计（8 个独立模块）
- ✅ 添加完整的类型定义
- ✅ Webpack 5 构建系统
- ✅ 修复中破率/大破率/击沉率负数显示 bug
- ✅ 支持开发热重载（HMR）
- ✅ 生产环境代码优化
- ✅ 完整的文档和部署指南
- ✅ GitHub Actions 自动部署

### V1.4 - 昼战导弹更新

- 更改了昼战导弹伤害计算方式
- 现在使用版头机制简介中的公式
- 增加了属性下限计算功能

## 🙏 致谢

- 感谢 [starcatmeow](https://github.com/starcatmeow) 指导 HTML 排版
- 感谢原伤害计算器作者 [hjmwwsshh](https://github.com/hjmwwsshh)

## 📜 许可证

本项目遵循 MIT 许可证

---

**访问地址**: https://huan-yp.github.io/WSGR-Damage-Calculator/

