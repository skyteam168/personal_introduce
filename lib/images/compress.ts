/** Compress image in browser before upload (keeps payload small). */
export async function compressImageFile(
  file: File,
  options?: { maxWidth?: number; maxHeight?: number; quality?: number; maxBytes?: number }
): Promise<File> {
  const {
    maxWidth = 1280,
    maxHeight = 1280,
    quality = 0.82,
    maxBytes = 450_000,
  } = options ?? {};

  if (!file.type.startsWith("image/")) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let q = quality;
  let blob = await canvasToBlob(canvas, "image/jpeg", q);

  while (blob.size > maxBytes && q > 0.45) {
    q -= 0.08;
    blob = await canvasToBlob(canvas, "image/jpeg", q);
  }

  if (blob.size > maxBytes) {
    throw new Error(
      `图片压缩后仍有 ${(blob.size / 1024).toFixed(0)}KB，请换更小的图片或使用图片 URL`
    );
  }

  const base = file.name.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("压缩失败"))),
      type,
      quality
    );
  });
}
