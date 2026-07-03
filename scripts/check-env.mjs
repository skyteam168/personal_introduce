import "dotenv/config";

const required = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "ADMIN_EMAILS",
  "NEXT_PUBLIC_SITE_URL",
];

const missing = required.filter((key) => !process.env[key]?.trim());

if (missing.length) {
  console.error("❌ 缺少环境变量:", missing.join(", "));
  console.error("   请编辑 .env 后重试，参考 BLOG_SETUP.md");
  process.exit(1);
}

console.log("✅ 环境变量已齐全");
console.log("   ADMIN_EMAILS:", process.env.ADMIN_EMAILS);
console.log("   SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);
