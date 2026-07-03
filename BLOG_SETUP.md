# Blog 系统配置指南

## 1. 创建 Supabase 数据库

1. 打开 [supabase.com](https://supabase.com) 注册项目
2. **Settings → Database → Connection string → URI** 复制连接串
3. 填入 `.env` 的 `DATABASE_URL`

## 2. 推送数据库表结构

```bash
cp .env.example .env
# 编辑 .env 填入 DATABASE_URL 等

npm run db:push
```

## 3. 配置 Google 登录

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) 创建 OAuth 客户端
2. 授权重定向 URI 添加：
   - `http://localhost:3000/api/auth/callback/google`
   - `https://你的域名/api/auth/callback/google`
3. 填入 `GOOGLE_CLIENT_ID` 和 `GOOGLE_CLIENT_SECRET`

## 4. 生成 AUTH_SECRET

```bash
openssl rand -base64 32
```

填入 `.env` 和 Vercel 环境变量。

## 5. 设置管理员邮箱

```env
ADMIN_EMAILS=jamesyang@benlutech.com
```

只有此邮箱登录后可访问 `/admin` 发文。

## 6. Vercel 环境变量

在 Vercel Project → Settings → Environment Variables 添加：

- `DATABASE_URL`
- `AUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ADMIN_EMAILS`
- `NEXT_PUBLIC_SITE_URL`

## 使用说明

| 路径 | 说明 |
|------|------|
| `/blog` | 公开博客列表 |
| `/blog/[slug]` | 文章详情（点赞/评论需登录） |
| `/admin/posts` | 你的发文后台 |
| `/admin/categories` | 分类管理 |
| `/login` | Google 登录 |

## 功能说明

- **发文**：仅 `ADMIN_EMAILS` 中的账号
- **点赞/评论**：任意 Google 登录用户
- **转发**：复制链接并累计转发数
- **简历下载**：已移除
