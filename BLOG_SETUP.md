# Blog 系统配置指南

按顺序完成以下步骤。本地已生成 `.env` 和 `AUTH_SECRET`，你主要需要完成 **Supabase** 和 **Google OAuth** 两项。

---

## 步骤 1：创建 Supabase 数据库（约 5 分钟）

1. 打开 https://supabase.com ，用 GitHub 登录
2. 点击 **New project**（你已完成：`personal-introduce-blog`）
3. 记下创建时设的 **Database Password**

### 获取连接串（新版界面）

**不在** Settings → Database（该菜单已移除）。请按下面操作：

1. 回到项目**首页**（点左上角项目名 `personal-introduce-blog`）
2. 页面**右上角**找到绿色 **Connect** 按钮，点击
3. 在弹出面板中选择连接方式：
   - **Transaction pooler**（端口 `6543`）→ 适合 Vercel / 线上运行
   - **Session pooler** 或 **Direct**（端口 `5432`）→ 适合本地 `npm run db:push` 建表
4. 复制 **URI** 连接串，把 `[YOUR-PASSWORD]` 换成你的数据库密码
5. 末尾加上 `?sslmode=require`（若没有）
6. 粘贴到 `.env` 的 `DATABASE_URL=`

### 根据你的项目信息手动拼接（备用）

从你的截图可知：
- **Project ID**：`xvlddutijhqqbdbplcgd`
- **Region**：`ap-southeast-1`（Singapore）

把 `你的密码` 换成创建项目时设的 Database Password。

> **密码含特殊字符**（如 `*` `?` `,`）时，在 URI 里必须 URL 编码：`*`→`%2A`，`,`→`%2C`，`?`→`%3F`

> **Pooler 主机名**以 Connect 面板为准，不一定是 `aws-0`，新加坡项目可能是 `aws-1-ap-southeast-1`。

```bash
# 推荐：Session pooler（端口 5432，用户名 postgres.项目ID）
postgresql://postgres.xvlddutijhqqbdbplcgd:编码后密码@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres?sslmode=require
```

---

## 步骤 2：推送数据库表结构

在项目目录执行：

```bash
node scripts/check-env.mjs   # 确认 DATABASE_URL 已填
npm run db:push                # 创建 user / post / comment 等表
```

看到 `Changes applied` 即成功。

---

## 步骤 3：配置 Google 登录（约 5 分钟）

1. 打开 https://console.cloud.google.com/apis/credentials
2. 顶部选一个项目（没有就 **新建项目** → 名称如 `personal-introduce`）
3. 若提示配置 OAuth 同意屏幕：
   - **User Type**：外部
   - **应用名称**：Personal Introduce Blog
   - **用户支持邮箱**：你的邮箱
   - **开发者联系信息**：你的邮箱 → 保存
4. **凭据** → **创建凭据** → **OAuth 客户端 ID**
   - **应用类型**：Web 应用
   - **名称**：Blog Auth
   - **已获授权的重定向 URI** 添加两条：
     ```
     http://localhost:3000/api/auth/callback/google
     https://personalintroduce-ten.vercel.app/api/auth/callback/google
     ```
5. 创建后复制 **客户端 ID** 和 **客户端密钥** 到 `.env`：
   ```
   GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-xxxx
   ```

---

## 步骤 4：本地验证

```bash
node scripts/check-env.mjs
npm run dev
```

1. 打开 http://localhost:3000/login → 用 Google 登录
2. 用 `jamesyang@benlutech.com` 登录后访问 http://localhost:3000/admin/posts
3. 先建分类 `/admin/categories`，再 `/admin/posts/new` 发一篇测试文

---

## 步骤 5：同步到 Vercel 并重新部署

把 `.env` 里这些变量加到 Vercel → **Settings → Environment Variables**（Production + Preview）：

| 变量名 | 说明 |
|--------|------|
| `DATABASE_URL` | Supabase 连接串 |
| `AUTH_SECRET` | 与本地 `.env` 相同 |
| `GOOGLE_CLIENT_ID` | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `ADMIN_EMAILS` | `jamesyang@benlutech.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://personalintroduce-ten.vercel.app` |

或在项目目录执行（把值换成你的）：

```bash
npx vercel env pull .env.vercel
# 手动在 Vercel 网页添加后：
npx vercel --prod
```

---

## 已预填项（无需再生成）

- `AUTH_SECRET` 已在本地 `.env` 中生成
- `ADMIN_EMAILS=jamesyang@benlutech.com`（仅你可发文）

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
