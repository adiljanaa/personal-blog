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
USERNAME=$(whoami)

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否是root用户
check_root() {
    if [ "$EUID" -ne 0 ]; then 
        print_warning "建议使用sudo运行此脚本"
        read -p "是否继续？(y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# 检查必要工具
check_tools() {
    print_info "检查必要工具..."
    
    local tools=("git" "node" "npm")
    for tool in "${tools[@]}"; do
        if ! command -v $tool &> /dev/null; then
            print_error "$tool 未安装"
            exit 1
        fi
        print_info "$tool 版本: $($tool --version)"
    done
}

# 创建目录
create_directories() {
    print_info "创建必要目录..."
    
    sudo mkdir -p $APP_DIR $BACKUP_DIR $LOG_DIR
    sudo chown -R $USERNAME:$USERNAME $APP_DIR $BACKUP_DIR $LOG_DIR
    sudo chmod 755 $APP_DIR $BACKUP_DIR $LOG_DIR
    
    print_success "目录创建完成"
}

# 备份现有应用
backup_existing() {
    if [ -d "$APP_DIR/.git" ]; then
        print_info "备份现有应用..."
        TIMESTAMP=$(date +%Y%m%d_%H%M%S)
        tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" -C $APP_DIR .
        print_success "备份完成: $BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
    else
        print_info "未发现现有应用，跳过备份"
    fi
}

# 克隆/更新代码
update_code() {
    print_info "更新代码..."
    
    if [ -d "$APP_DIR/.git" ]; then
        cd $APP_DIR
        git fetch origin
        git checkout $BRANCH
        git pull origin $BRANCH
    else
        git clone $REPO_URL $APP_DIR
        cd $APP_DIR
        git checkout $BRANCH
    fi
    
    print_success "代码更新完成"
}

# 安装依赖
install_dependencies() {
    print_info "安装依赖..."
    
    cd $APP_DIR
    npm ci --only=production
    
    print_success "依赖安装完成"
}

# 构建应用
build_application() {
    print_info "构建应用..."
    
    cd $APP_DIR
    npm run build
    
    print_success "应用构建完成"
}

# 配置环境变量
configure_environment() {
    print_info "配置环境变量..."
    
    cd $APP_DIR
    cat > .env.production << EOF
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
PORT=3000
HOSTNAME=0.0.0.0
EOF
    
    print_success "环境变量配置完成"
}

# 配置PM2
configure_pm2() {
    print_info "配置PM2..."
    
    if ! command -v pm2 &> /dev/null; then
        print_info "安装PM2..."
        npm install -g pm2
    fi
    
    # 创建PM2配置文件
    cat > $APP_DIR/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'personal-blog',
    script: 'npm',
    args: 'start',
    cwd: '$APP_DIR',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_SITE_URL: 'https://your-domain.com'
    },
    error_file: '$LOG_DIR/personal-blog-error.log',
    out_file: '$LOG_DIR/personal-blog-out.log',
    log_file: '$LOG_DIR/personal-blog-combined.log',
    time: true
  }]
};
EOF
    
    # 重启应用
    cd $APP_DIR
    pm2 delete personal-blog 2>/dev/null || true
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
    
    print_success "PM2配置完成"
}

# 配置Nginx
configure_nginx() {
    print_info "配置Nginx..."
    
    if ! command -v nginx &> /dev/null; then
        print_error "Nginx未安装，跳过配置"
        return
    fi
    
    # 创建Nginx配置
    sudo tee /etc/nginx/sites-available/personal-blog > /dev/null << 'EOF'
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL证书路径 - 需要替换为实际路径
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
EOF
    
    # 启用站点
    sudo ln -sf /etc/nginx/sites-available/personal-blog /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    
    print_success "Nginx配置完成"
}

# 配置SSL证书
configure_ssl() {
    print_info "配置SSL证书..."
    
    if ! command -v certbot &> /dev/null; then
        print_warning "Certbot未安装，跳过SSL配置"
        print_info "可以手动安装: sudo apt install certbot python3-certbot-nginx"
        return
    fi
    
    read -p "是否要配置SSL证书？(y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sudo certbot --nginx -d your-domain.com -d www.your-domain.com
        print_success "SSL证书配置完成"
    else
        print_info "跳过SSL证书配置"
    fi
}

# 显示部署信息
show_deploy_info() {
    echo ""
    echo "========================================"
    echo "        部署完成！"
    echo "========================================"
    echo ""
    echo "应用信息："
    echo "  - 应用目录: $APP_DIR"
    echo "  - 日志目录: $LOG_DIR"
    echo "  - 备份目录: $BACKUP_DIR"
    echo ""
    echo "访问地址："
    echo "  - 本地访问: http://localhost:3000"
    echo "  - 域名访问: https://your-domain.com"
    echo ""
    echo "管理命令："
    echo "  - 查看状态: pm2 status"
    echo "  - 查看日志: pm2 logs personal-blog"
    echo "  - 重启应用: pm2 restart personal-blog"
    echo "  - 停止应用: pm2 stop personal-blog"
    echo ""
    echo "Nginx命令："
    echo "  - 测试配置: sudo nginx -t"
    echo "  - 重启服务: sudo systemctl restart nginx"
    echo "  - 查看日志: sudo tail -f /var/log/nginx/personal-blog.access.log"
    echo ""
    echo "========================================"
}

# 主函数
main() {
    print_info "开始部署个人博客..."
    
    check_root
    check_tools
    create_directories
    backup_existing
    update_code
    install_dependencies
    build_application
    configure_environment
    configure_pm2
    configure_nginx
    configure_ssl
    show_deploy_info
    
    print_success "部署完成！"
}

# 执行主函数
main "$@"