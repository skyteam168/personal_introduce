import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

interface RichTextContentProps {
  content: object;
  className?: string;
}

const extensions = [
  StarterKit.configure({ horizontalRule: false }),
  Link,
  Underline,
  HorizontalRule,
  Image.configure({ inline: false, allowBase64: true }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
];

function parseContent(content: object): object {
  if (typeof content === "string") {
    return JSON.parse(content) as object;
  }
  return content;
}

export function RichTextContent({ content, className }: RichTextContentProps) {
  let html = "";

  try {
    html = generateHTML(parseContent(content), extensions);
  } catch {
    return (
      <p className="text-sm text-muted">
        正文渲染失败，请返回后台重新编辑保存。
      </p>
    );
  }

  return (
    <article
      className={`prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-foreground prose-img:rounded-lg prose-code:rounded prose-code:bg-surface prose-code:px-1 prose-pre:bg-surface ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
