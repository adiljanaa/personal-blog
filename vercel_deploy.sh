#!/bin/bash
# Vercel快速部署脚本
echo "🚀 开始部署个人博客到Vercel..."

# 1. 初始化Git仓库
echo "📦 初始化Git仓库..."
git init
git add .
git commit -m "部署到Vercel $(date +'%Y-%m-%d %H:%M:%S')"

# 2. 创建GitHub仓库说明
echo ""
echo "========================================="
echo "📌 接下来需要手动操作："
echo "1. 访问 https://github.com 创建新仓库"
echo "2. 仓库名：personal-blog"
echo "3. 设为Public"
echo "4. 复制仓库SSH地址"
echo ""
echo "5. 执行以下命令："
echo "   git remote add origin YOUR_REPO_URL"
echo "   git push -u origin main"
echo ""
echo "6. 访问 https://vercel.com"
echo "7. 登录GitHub账号"
echo "8. 导入刚刚创建的仓库"
echo "9. 点击'Deploy'"
echo "========================================="

# 3. 生成Vercel部署命令
echo ""
echo "📋 也可以使用Vercel CLI："
echo "npm i -g vercel"
echo "vercel login"
echo "vercel --prod"