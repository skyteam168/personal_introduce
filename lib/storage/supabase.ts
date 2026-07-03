import { nanoid } from "nanoid";

const BUCKET = "blog-images";

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

async function ensureBucket(url: string, key: string) {
  const res = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: BUCKET, public: true }),
  });
  if (res.ok || res.status === 409) return;
  const text = await res.text();
  throw new Error(`无法创建存储桶: ${text}`);
}

export async function uploadBlogImage(
  bytes: Buffer,
  mimeType: string,
  originalName: string
): Promise<string> {
  const config = getSupabaseConfig();
  if (!config) {
    throw new Error("SUPABASE_STORAGE_NOT_CONFIGURED");
  }

  await ensureBucket(config.url, config.key);

  const ext =
    mimeType.split("/")[1]?.replace("jpeg", "jpg") ??
    originalName.split(".").pop()?.toLowerCase() ??
    "jpg";
  const path = `blog/${nanoid(12)}.${ext}`;

  const uploadRes = await fetch(
    `${config.url}/storage/v1/object/${BUCKET}/${path}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.key}`,
        "Content-Type": mimeType,
        "x-upsert": "true",
      },
      body: new Uint8Array(bytes),
    }
  );

  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    throw new Error(`图片上传失败: ${text}`);
  }

  return `${config.url}/storage/v1/object/public/${BUCKET}/${path}`;
}

export function isSupabaseStorageConfigured(): boolean {
  return getSupabaseConfig() !== null;
}
