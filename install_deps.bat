@echo off
echo ========================================
echo    个人博客网站 - 依赖安装脚本
echo ========================================
echo.

echo 检查Node.js版本...
node --version
if %errorlevel% neq 0 (
    echo 错误：Node.js未安装或未在PATH中
    pause
    exit /b 1
)

echo.
echo 检查npm版本...
npm --version
if %errorlevel% neq 0 (
    echo 错误：npm未安装或未在PATH中
    pause
    exit /b 1
)

echo.
echo 开始安装依赖...
echo 这可能需要几分钟时间，请耐心等待...
echo.

:: 设置临时环境变量绕过限制
set NODE_OPTIONS=--max-old-space-size=4096

:: 安装依赖
call npm install --no-audit --no-fund --loglevel=error

if %errorlevel% neq 0 (
    echo.
    echo 依赖安装失败！
    echo 请尝试以下解决方案：
    echo 1. 以管理员身份运行此脚本
    echo 2. 检查网络连接
    echo 3. 清理npm缓存：npm cache clean --force
    pause
    exit /b 1
)

echo.
echo ========================================
echo    依赖安装成功！
echo ========================================
echo.
echo 接下来可以运行：
echo 1. 开发模式：npm run dev
echo 2. 构建项目：npm run build
echo 3. 启动项目：npm start
echo.
echo 按任意键退出...
pause >nul