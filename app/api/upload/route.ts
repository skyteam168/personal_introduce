import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/auth-utils";
import { uploadBlogImage, isSupabaseStorageConfigured } from "@/lib/storage/supabase";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

const MAX_SIZE = 2 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  try {
    if (isSupabaseStorageConfigured()) {
      const url = await uploadBlogImage(bytes, file.type, file.name);
      return NextResponse.json({ url });
    }

    if (process.env.VERCEL) {
      return NextResponse.json(
        {
          error:
            "线上图片存储未配置。请在 Vercel 添加 NEXT_PUBLIC_SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY。",
        },
        { status: 503 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const filename = `${nanoid(12)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "blog");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), bytes);

    return NextResponse.json({ url: `/uploads/blog/${filename}` });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
