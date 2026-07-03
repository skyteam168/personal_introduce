import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

interface RichTextContentProps {
  content: object;
  className?: string;
}

export function RichTextContent({ content, className }: RichTextContentProps) {
  const html = generateHTML(content, [
    StarterKit,
    Link,
    Underline,
  ]);

  return (
    <article
      className={`prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-foreground prose-code:rounded prose-code:bg-surface prose-code:px-1 prose-pre:bg-surface ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
