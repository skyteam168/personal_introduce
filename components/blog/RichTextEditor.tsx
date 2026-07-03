"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  name?: string;
  defaultContent?: object;
  onChange?: (json: object) => void;
  className?: string;
}

export function RichTextEditor({
  name = "content",
  defaultContent,
  onChange,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "开始写作…" }),
    ],
    content: defaultContent ?? { type: "doc", content: [{ type: "paragraph" }] },
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral dark:prose-invert max-w-none min-h-[320px] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
  });

  useEffect(() => {
    if (editor && defaultContent) {
      editor.commands.setContent(defaultContent);
    }
  }, [editor, defaultContent]);

  if (!editor) return null;

  const json = JSON.stringify(editor.getJSON());

  return (
    <div className={cn("rounded-xl border border-border bg-background", className)}>
      <div className="flex flex-wrap gap-1 border-b border-border p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="B"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="I"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          label="U"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="H2"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="• List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="1. List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label="❝"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          label="</>"
        />
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={json} readOnly />
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-foreground text-background"
          : "text-muted hover:bg-surface hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
