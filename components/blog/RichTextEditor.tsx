"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { compressImageFile } from "@/lib/images/compress";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

interface RichTextEditorProps {
  name?: string;
  defaultContent?: object;
  onChange?: (json: object) => void;
  className?: string;
}

const defaultDoc = { type: "doc", content: [{ type: "paragraph" }] };

export function RichTextEditor({
  name = "content",
  defaultContent,
  onChange,
  className,
}: RichTextEditorProps) {
  const [contentJson, setContentJson] = useState(
    () => JSON.stringify(defaultContent ?? defaultDoc)
  );
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ horizontalRule: false }),
      Underline,
      HorizontalRule,
      Image.configure({ inline: false, allowBase64: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "开始写作…" }),
    ],
    content: defaultContent ?? defaultDoc,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral dark:prose-invert max-w-none min-h-[360px] px-4 py-3 focus:outline-none [&_img]:max-w-full [&_img]:rounded-lg",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setContentJson(JSON.stringify(json));
      onChange?.(json);
    },
  });

  useEffect(() => {
    if (editor && defaultContent) {
      editor.commands.setContent(defaultContent);
      setContentJson(JSON.stringify(defaultContent));
    }
  }, [editor, defaultContent]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("链接地址", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImageByUrl = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("图片地址", "https://");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const uploadImage = useCallback(() => {
    if (!editor || uploading) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/gif,image/webp";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      if (file.size > MAX_IMAGE_SIZE) {
        window.alert("图片不能超过 2MB，请压缩后重试");
        return;
      }

      setUploading(true);
      try {
        const compressed = await compressImageFile(file);
        const formData = new FormData();
        formData.append("file", compressed);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = (await res.json()) as { url?: string; error?: string };

        if (!res.ok || !data.url) {
          window.alert(
            data.error ??
              "图片上传失败。请在 Supabase 配置存储，或使用「图片URL」插入网络图片。"
          );
          return;
        }

        editor.chain().focus().setImage({ src: data.url }).run();
      } catch (error) {
        window.alert(
          error instanceof Error ? error.message : "图片处理失败"
        );
      } finally {
        setUploading(false);
      }
    };
    input.click();
  }, [editor, uploading]);

  if (!editor) return null;

  return (
    <div className={cn("rounded-xl border border-border bg-background", className)}>
      <div className="flex flex-wrap gap-1 border-b border-border p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          label="撤销"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          label="重做"
        />
        <Divider />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          label="H1"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="H2"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          label="H3"
        />
        <Divider />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="B"
          bold
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="I"
          italic
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          label="U"
          underline
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          label="S"
          strike
        />
        <Divider />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          label="左"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          label="中"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          label="右"
        />
        <Divider />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="• 列表"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="1. 列表"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label="引用"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          label="代码"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          label="分割线"
        />
        <Divider />
        <ToolbarButton onClick={setLink} active={editor.isActive("link")} label="链接" />
        <ToolbarButton onClick={uploadImage} label={uploading ? "上传中…" : "上传图片"} />
        <ToolbarButton onClick={addImageByUrl} label="图片URL" />
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={contentJson} readOnly />
    </div>
  );
}

function Divider() {
  return <span className="mx-0.5 w-px self-stretch bg-border" />;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  bold,
  italic,
  underline,
  strike,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-40",
        active
          ? "bg-foreground text-background"
          : "text-muted hover:bg-surface hover:text-foreground",
        bold && "font-bold",
        italic && "italic",
        underline && "underline",
        strike && "line-through"
      )}
    >
      {label}
    </button>
  );
}
