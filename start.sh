#!/bin/bash

# 个人博客网站启动脚本
# 作者：个人博客项目
# 日期：2024-03-30

echo "========================================"
echo "   个人博客网站 - 启动脚本"
echo "========================================"

# 检查Node.js版本
echo "检查Node.js版本..."
node_version=$(node --version)
if [[ $node_version != v18.* && $node_version != v20.* ]]; then
    echo "警告：推荐使用Node.js 18.x或20.x版本"
    echo "当前版本：$node_version"
fi

# 检查npm版本
echo "检查npm版本..."
npm_version=$(npm --version)
echo "npm版本：$npm_version"

# 安装依赖
echo "安装依赖包..."
npm install

# 检查安装是否成功
if [ $? -eq 0 ]; then
    echo "依赖安装成功！"
else
    echo "依赖安装失败，请检查网络连接和权限"
    exit 1
fi

# 构建项目
echo "构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "项目构建成功！"
else
    echo "项目构建失败，请检查错误信息"
    exit 1
fi

# 启动服务器
echo "启动开发服务器..."
echo "========================================"
echo "   服务器将在 http://localhost:3000 启动"
echo "   按 Ctrl+C 停止服务器"
echo "========================================"

npm start

# 脚本结束
echo "服务器已停止"
echo "========================================"