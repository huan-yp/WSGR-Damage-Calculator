#!/bin/bash

# 战舰少女 R 伤害计算器 - GitHub Pages 部署脚本
# 
# 功能：将构建产物从 master 分支推送到 gh-pages 分支
# 用法：./deploy.sh

set -e  # 遇到错误立即退出

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 战舰少女 R 伤害计算器 - 部署到 GitHub Pages"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查是否在 git 仓库中
if [ ! -d ".git" ]; then
    echo "❌ 错误：当前目录不是 Git 仓库"
    exit 1
fi

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 当前分支: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "master" ]; then
    echo "⚠️  警告: 当前不在 master 分支"
    read -p "是否继续部署? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 部署已取消"
        exit 1
    fi
fi

# 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
    echo "⚠️  警告: 有未提交的更改"
    git status -s
    echo ""
    read -p "是否继续部署? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 部署已取消"
        echo "💡 提示: 先提交更改后再部署，或使用 GitHub Actions 自动部署"
        exit 1
    fi
fi

# 安装依赖（如果需要）
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败！"
    exit 1
fi

echo "✅ 构建成功"
echo ""

# 检查 dist 目录
if [ ! -d "dist" ]; then
    echo "❌ 错误：dist 目录不存在"
    exit 1
fi

# 显示构建产物
echo "📄 构建产物："
ls -lh dist/ | grep -E '\.(html|js|css)$' | awk '{printf "   %s  %s\n", $5, $9}'
echo ""

# 进入 dist 目录
cd dist

# 初始化 git（临时仓库）
echo "🔧 准备 gh-pages 分支..."
git init -q
git add -A

# 提交
COMMIT_MSG="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -q -m "$COMMIT_MSG"

# 推送到 gh-pages 分支
echo "⬆️  推送到 gh-pages 分支..."

# 尝试 SSH 推送
if git push -f git@github.com:huan-yp/WSGR-Damage-Calculator.git HEAD:gh-pages 2>/dev/null; then
    echo "✅ 推送成功 (SSH)"
else
    echo "⚠️  SSH 推送失败，尝试 HTTPS..."
    # 尝试 HTTPS 推送
    if git push -f https://github.com/huan-yp/WSGR-Damage-Calculator.git HEAD:gh-pages; then
        echo "✅ 推送成功 (HTTPS)"
    else
        echo "❌ 推送失败！"
        echo ""
        echo "可能的原因："
        echo "1. 没有配置 SSH 密钥或 Git 凭据"
        echo "2. 没有仓库的写权限"
        echo ""
        echo "💡 建议："
        echo "- 使用 GitHub Actions 自动部署（推荐）"
        echo "- 配置 SSH 密钥: https://docs.github.com/cn/authentication/connecting-to-github-with-ssh"
        cd ..
        exit 1
    fi
fi

# 返回项目根目录
cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 部署完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 访问你的网站:"
echo "   https://huan-yp.github.io/WSGR-Damage-Calculator/"
echo ""
echo "📊 查看部署历史:"
echo "   https://github.com/huan-yp/WSGR-Damage-Calculator/deployments"
echo ""
echo "⚙️  如果是首次部署，请确保已启用 GitHub Pages:"
echo "   https://github.com/huan-yp/WSGR-Damage-Calculator/settings/pages"
echo "   → Source: gh-pages 分支"
echo "   → Folder: / (root)"
echo ""
echo "💡 后续更新推荐使用 GitHub Actions 自动部署"
echo "   只需: git push origin master"
echo ""
