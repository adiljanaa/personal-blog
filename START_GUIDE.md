# 本地启动指南

## 方法一：使用批处理文件（推荐）

### 步骤1：以管理员权限运行
1. 右键点击 `install_deps.bat`
2. 选择"以管理员身份运行"
3. 按照提示完成依赖安装

### 步骤2：启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

### 步骤3：访问网站
打开浏览器访问：http://localhost:3000

## 方法二：手动安装（如果批处理文件失败）

### 步骤1：打开PowerShell（管理员权限）
右键点击开始菜单 → Windows PowerShell (管理员)

### 步骤2：更改执行策略
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 步骤3：导航到项目目录
```powershell
cd "C:\Users\Administrator\CodeBuddy\20260330213404"
```

### 步骤4：安装依赖
```powershell
npm install
```

### 步骤5：启动项目
```powershell
npm run dev
```

## 方法三：使用VSCode启动

### 步骤1：用VSCode打开项目
```bash
code "C:\Users\Administrator\CodeBuddy\20260330213404"
```

### 步骤2：打开终端
按 `Ctrl + `` 打开终端

### 步骤3：安装依赖
```bash
npm install
```

### 步骤4：启动开发服务器
```bash
npm run dev
```

## 常见问题解决

### 问题1：权限错误
**错误信息**：`无法加载文件...在此系统上禁止运行脚本`

**解决方案**：
```powershell
# 以管理员身份运行PowerShell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
# 或
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 问题2：网络超时
**解决方案**：
```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com
# 或使用yarn
npm install -g yarn
yarn install
```

### 问题3：Node.js版本问题
**要求**：Node.js 18.x 或更高版本

**检查版本**：
```bash
node --version
```

**安装Node.js**：
1. 访问 https://nodejs.org/
2. 下载LTS版本
3. 安装时选择"Add to PATH"

### 问题4：端口占用
**解决方案**：
```bash
# 停止占用3000端口的进程
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 快速启动命令汇总

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 检查类型错误
npx tsc --noEmit
```

## 验证安装成功

安装完成后，检查以下目录是否存在：
- `node_modules/` - 依赖包目录
- `.next/` - Next.js构建目录（运行后生成）

## 访问地址

- **开发环境**：http://localhost:3000
- **生产环境**：http://localhost:3000（运行 `npm start` 后）

## 功能验证

成功启动后，您可以测试以下功能：

1. ✅ 首页加载
2. ✅ 多语言切换（右上角）
3. ✅ 主题切换（亮色/暗色）
4. ✅ 文章列表浏览
5. ✅ 文章详情查看
6. ✅ 标签分类导航
7. ✅ 关于页面

## 如需帮助

如果遇到任何问题，请：
1. 查看错误日志
2. 检查Node.js和npm版本
3. 确保以管理员权限运行
4. 检查网络连接

**祝您启动顺利！** 🚀