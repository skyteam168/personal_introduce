import { uploadBlogImage } from "@/lib/storage/supabase";

type TiptapNode = {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
};

/** Replace base64 image nodes with uploaded URLs before saving to DB. */
export async function externalizeContentImages(
  content: TiptapNode
): Promise<TiptapNode> {
  return processNode(content);
}

async function processNode(node: TiptapNode): Promise<TiptapNode> {
  if (node.type === "image" && typeof node.attrs?.src === "string") {
    const src = node.attrs.src;
    if (src.startsWith("data:image/")) {
      const uploaded = await uploadDataUrl(src);
      return { ...node, attrs: { ...node.attrs, src: uploaded } };
    }
  }

  if (!node.content?.length) return node;

  const content = await Promise.all(node.content.map(processNode));
  return { ...node, content };
}

async function uploadDataUrl(dataUrl: string): Promise<string> {
  const match = dataUrl.match(/^data:(image\/[a-z+]+);base64,(.+)$/i);
  if (!match) throw new Error("无效的图片数据");

  const mimeType = match[1];
  const bytes = Buffer.from(match[2], "base64");

  if (bytes.length > 2 * 1024 * 1024) {
    throw new Error("内嵌图片过大，请压缩后重试");
  }

  return uploadBlogImage(bytes, mimeType, "inline.jpg");
}
