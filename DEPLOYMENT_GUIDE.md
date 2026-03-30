# 个人博客网站部署指南

## 📋 部署方案概览

根据您的项目技术栈（Next.js + TypeScript），推荐以下部署方案：

| 方案 | 适合场景 | 难度 | 成本 | 推荐度 |
|------|----------|------|------|--------|
| Vercel | 快速部署、自动CI/CD | ⭐☆☆☆☆ | 免费/付费 | ★★★★★ |
| Docker | 可控性强、环境一致 | ⭐⭐☆☆☆ | 中等 | ★★★★☆ |
| 传统服务器 | 完全控制、自定义 | ⭐⭐⭐☆☆ | 低 | ★★★☆☆ |
| 云平台 | 弹性伸缩、企业级 | ⭐⭐⭐⭐☆ | 高 | ★★☆☆☆ |

## 🚀 方案一：Vercel部署（推荐）

Vercel是Next.js官方推荐的部署平台，提供最佳集成体验。

### 部署步骤

#### 步骤1：准备项目
确保项目可以本地构建：
```bash
npm run build
```

#### 步骤2：上传到GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/personal-blog.git
git push -u origin main
```

#### 步骤3：Vercel部署
1. 访问 https://vercel.com
2. 使用GitHub登录
3. 点击"New Project"
4. 导入您的仓库
5. 配置设置：
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. 点击"Deploy"

#### 步骤4：配置域名
1. 在Vercel项目设置中，选择"Domains"
2. 添加您的域名
3. 按照提示配置DNS

### Vercel配置

创建 `vercel.json`：
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://your-domain.com"
  }
}
```

### 优势
- ✅ 自动SSL证书
- ✅ 全球CDN
- ✅ 自动CI/CD
- ✅ 预览部署
- ✅ 免费套餐足够个人博客使用

## 🐳 方案二：Docker部署

### 创建Docker配置文件

#### Dockerfile
```dockerfile
# 使用Node.js官方镜像
FROM node:18-alpine AS base

# 安装依赖阶段
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 生产阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 创建非root用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制必要的文件
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  blog:
    build: .
    container_name: personal-blog
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_SITE_URL=https://your-domain.com
    volumes:
      - ./logs:/app/logs
    networks:
      - blog-network

  nginx:
    image: nginx:alpine
    container_name: nginx-proxy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
      - ./logs/nginx:/var/log/nginx
    depends_on:
      - blog
    networks:
      - blog-network

networks:
  blog-network:
    driver: bridge
```

#### nginx.conf
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # 日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
    error_log   /var/log/nginx/error.log warn;

    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # 上游服务
    upstream blog_backend {
        server blog:3000;
    }

    # HTTP重定向到HTTPS
    server {
        listen 80;
        server_name your-domain.com www.your-domain.com;
        return 301 https://$server_name$request_uri;
    }

    # HTTPS服务器
    server {
        listen 443 ssl http2;
        server_name your-domain.com www.your-domain.com;

        # SSL证书路径
        ssl_certificate /etc/nginx/ssl/your-domain.com.crt;
        ssl_certificate_key /etc/nginx/ssl/your-domain.com.key;

        # SSL配置
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # 安全头
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";

        # 静态文件缓存
        location /_next/static {
            alias /app/.next/static;
            expires 365d;
            access_log off;
            add_header Cache-Control "public, immutable";
        }

        location /public {
            alias /app/public;
            expires 30d;
            access_log off;
            add_header Cache-Control "public, max-age=2592000";
        }

        # 代理到Next.js应用
        location / {
            proxy_pass http://blog_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 60s;
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
        }
    }
}
```

### 部署步骤

#### 步骤1：构建Docker镜像
```bash
docker build -t personal-blog .
```

#### 步骤2：启动容器
```bash
docker-compose up -d
```

#### 步骤3：查看日志
```bash
docker-compose logs -f
```

#### 步骤4：停止服务
```bash
docker-compose down
```

### 优势
- ✅ 环境一致性
- ✅ 易于扩展
- ✅ 隔离性好
- ✅ 支持CI/CD

## 🖥️ 方案三：传统服务器部署

### 服务器要求
- Ubuntu 20.04/22.04 LTS
- Node.js 18+
- Nginx
- PM2（进程管理）
- 至少1GB RAM

### 部署脚本

创建 `deploy.sh`：
```bash
#!/bin/bash

# 个人博客部署脚本
set -e

echo "========================================"
echo "   个人博客网站部署脚本"
echo "========================================"

# 配置变量
REPO_URL="git@github.com:yourusername/personal-blog.git"
APP_DIR="/var/www/personal-blog"
BACKUP_DIR="/var/backups/personal-blog"
LOG_DIR="/var/log/personal-blog"
BRANCH="main"

# 创建目录
echo "创建必要目录..."
sudo mkdir -p $APP_DIR $BACKUP_DIR $LOG_DIR
sudo chown -R $USER:$USER $APP_DIR $BACKUP_DIR $LOG_DIR

# 备份现有应用
if [ -d "$APP_DIR/.git" ]; then
    echo "备份现有应用..."
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" -C $APP_DIR .
fi

# 克隆/更新代码
if [ -d "$APP_DIR/.git" ]; then
    echo "更新代码库..."
    cd $APP_DIR
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
else
    echo "克隆代码库..."
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
    git checkout $BRANCH
fi

# 安装依赖
echo "安装依赖..."
npm ci --only=production

# 构建应用
echo "构建应用..."
npm run build

# 配置环境变量
echo "配置环境变量..."
cat > $APP_DIR/.env.production << EOF
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
PORT=3000
HOSTNAME=0.0.0.0
EOF

# 使用PM2管理进程
echo "配置PM2..."
if ! command -v pm2 &> /dev/null; then
    echo "安装PM2..."
    npm install -g pm2
fi

# 重启应用
echo "重启应用..."
pm2 delete personal-blog 2>/dev/null || true
pm2 start npm --name "personal-blog" -- start
pm2 save
pm2 startup

echo "部署完成！"
echo "应用运行在：http://localhost:3000"
echo "PM2状态：pm2 status"
echo "查看日志：pm2 logs personal-blog"
```

### Nginx配置

创建 `/etc/nginx/sites-available/personal-blog`：
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL证书路径
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # 安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # 日志
    access_log /var/log/nginx/personal-blog.access.log;
    error_log /var/log/nginx/personal-blog.error.log;

    # 静态文件缓存
    location /_next/static {
        alias /var/www/personal-blog/.next/static;
        expires 365d;
        access_log off;
        add_header Cache-Control "public, immutable";
    }

    location /public {
        alias /var/www/personal-blog/public;
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
    }

    # 代理到Next.js应用
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # 超时设置
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
    }

    # 健康检查
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### SSL证书配置

使用Let's Encrypt获取免费SSL证书：
```bash
# 安装Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

### 系统服务配置

创建 `/etc/systemd/system/personal-blog.service`：
```ini
[Unit]
Description=Personal Blog Next.js Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/personal-blog
Environment=NODE_ENV=production
Environment=NEXT_PUBLIC_SITE_URL=https://your-domain.com
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=personal-blog

[Install]
WantedBy=multi-user.target
```

### 优势
- ✅ 完全控制
- ✅ 成本较低
- ✅ 自定义程度高
- ✅ 适合学习

## 🔄 自动化部署（GitHub Actions）

创建 `.github/workflows/deploy.yml`：
```yaml
name: Deploy Personal Blog

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type check
      run: npx tsc --noEmit
    
    - name: Build
      run: npm run build
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
    
    - name: Deploy to Server
      if: ${{ false }}  # 设为true启用服务器部署
      uses: appleboy/ssh-action@v0.1.4
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USERNAME }}
        key: ${{ secrets.SERVER_SSH_KEY }}
        script: |
          cd /var/www/personal-blog
          git pull origin main
          npm ci --only=production
          npm run build
          pm2 restart personal-blog
```

## 📊 部署检查清单

### 部署前检查
- [ ] 本地构建成功：`npm run build`
- [ ] 类型检查通过：`npx tsc --noEmit`
- [ ] 所有测试通过（如果有）
- [ ] 环境变量配置正确
- [ ] 数据库连接正常（如果有）
- [ ] SSL证书已准备

### 部署后检查
- [ ] 网站可访问：https://your-domain.com
- [ ] 多语言切换正常
- [ ] 主题切换正常
- [ ] 所有页面加载正常
- [ ] 移动端适配正常
- [ ] SSL证书有效
- [ ] 404页面正常
- [ ] 性能监控正常

## 🛡️ 安全配置

### 防火墙配置
```bash
# 允许必要端口
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### 安全加固
1. **禁用root登录**
2. **使用SSH密钥登录**
3. **定期更新系统**
4. **配置fail2ban**
5. **启用自动安全更新**

## 📈 监控和维护

### 日志监控
```bash
# 查看应用日志
pm2 logs personal-blog

# 查看Nginx日志
tail -f /var/log/nginx/personal-blog.access.log

# 查看错误日志
tail -f /var/log/nginx/personal-blog.error.log
```

### 性能监控
- 使用Vercel Analytics（Vercel部署）
- 使用PM2 Monitor（服务器部署）
- 配置Google Analytics
- 使用Lighthouse进行性能测试

### 备份策略
```bash
# 每日备份
0 2 * * * /usr/bin/tar -czf /var/backups/personal-blog/backup_$(date +\%Y\%m\%d).tar.gz -C /var/www/personal-blog .
```

## 🆘 故障排除

### 常见问题

#### 问题1：构建失败
**解决方案**：
```bash
# 清理缓存
rm -rf .next node_modules
npm cache clean --force
npm install
npm run build
```

#### 问题2：端口占用
**解决方案**：
```bash
# 查找占用端口的进程
sudo lsof -i :3000
# 杀死进程
sudo kill -9 <PID>
```

#### 问题3：内存不足
**解决方案**：
```bash
# 增加Node.js内存限制
export NODE_OPTIONS=--max-old-space-size=4096
npm run build
```

#### 问题4：SSL证书问题
**解决方案**：
```bash
# 更新证书
sudo certbot renew --force-renewal
# 重启Nginx
sudo systemctl restart nginx
```

## 📞 技术支持

如需技术支持，请：
1. 查看应用日志
2. 检查服务器状态
3. 验证配置文件
4. 检查网络连接

## 🎯 推荐方案

根据您的需求，我推荐：

### 初学者/快速上线
**选择Vercel部署**：
- 零配置，五分钟上线
- 免费套餐足够使用
- 自动SSL和CDN
- 无需服务器管理

### 开发者/学习目的  
**选择Docker部署**：
- 学习容器化技术
- 环境一致性保证
- 便于本地开发和测试
- 为未来扩展做准备

### 企业/生产环境
**选择传统服务器+自动化部署**：
- 完全控制权
- 成本可控
- 自定义监控
- 高可用性保证

---

**祝您部署顺利！** 🚀

*部署完成后，请测试所有功能，确保多语言切换、主题切换等核心功能正常工作。*