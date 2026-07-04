import type { InquiryType } from "@/lib/db/schema";

export const inquiryTypeLabels: Record<
  InquiryType,
  { zh: string; en: string }
> = {
  development: {
    zh: "企业定制开发",
    en: "Custom Development",
  },
  ai: {
    zh: "AI / Agent 落地",
    en: "AI / Agent Implementation",
  },
  infrastructure: {
    zh: "基础设施与网络",
    en: "Infrastructure & Network",
  },
  on_site: {
    zh: "现场故障响应",
    en: "On-site Support",
  },
  other: {
    zh: "其他合作",
    en: "Other",
  },
};

export const inquiryStatusLabels: Record<
  string,
  { zh: string; en: string }
> = {
  new: { zh: "新咨询", en: "New" },
  reviewing: { zh: "评估中", en: "Reviewing" },
  quoted: { zh: "已报价", en: "Quoted" },
  accepted: { zh: "已接受", en: "Accepted" },
  closed: { zh: "已关闭", en: "Closed" },
  spam: { zh: "垃圾", en: "Spam" },
};

export const workWithMeServices = [
  {
    id: "development",
    title: {
      zh: "企业级定制开发与数字化交付",
      en: "Enterprise Custom Development & Digital Delivery",
    },
    description: {
      zh: "从架构设计到生产部署 — ERP 集成、AI 平台、内部工具、运维系统与 RAG 知识库。Web、API、小程序与移动端作为交付形态，而非卖点。",
      en: "From architecture to production — ERP integration, AI platforms, internal tools, ops systems, and RAG knowledge bases. Web, API, mini-programs, and mobile as delivery channels, not the headline.",
    },
    highlights: {
      zh: [
        "Discovery → Architecture → Build → Deploy → Handover",
        "懂基础设施，也懂 AI 与制造业 IT 场景",
        "适合有明确业务目标的企业项目",
      ],
      en: [
        "Discovery → Architecture → Build → Deploy → Handover",
        "Infrastructure depth + AI + manufacturing IT context",
        "For engagements with clear business outcomes",
      ],
    },
  },
  {
    id: "on_site",
    title: {
      zh: "关键故障响应与现场技术支援",
      en: "Critical Incident Response & On-site Support",
    },
    description: {
      zh: "网络、机房、服务器与 AI 生产环境紧急问题 — 远程诊断或东南亚现场支援。适合需要快速恢复业务的制造业与园区 IT 场景。",
      en: "Network, datacenter, server, and production AI emergencies — remote diagnosis or on-site support in Southeast Asia. For manufacturing campuses that need fast recovery.",
    },
    highlights: {
      zh: [
        "24 小时内响应咨询",
        "海外园区与跨境 IT 经验",
        "评估后提供 scope 与报价，非固定价目表",
      ],
      en: [
        "Inquiry response within 24 hours",
        "Overseas campus & cross-border IT experience",
        "Scope and quote after assessment — no public rate card",
      ],
    },
  },
] as const;

export const workWithMeProcess = {
  zh: [
    { step: "01", title: "咨询", desc: "提交需求，简要说明场景与目标" },
    { step: "02", title: "评估", desc: "24 小时内回复，确认 scope 与可行性" },
    { step: "03", title: "方案", desc: "架构思路、时间线与报价（如适用）" },
    { step: "04", title: "交付", desc: "开发、现场支援或顾问式合作" },
  ],
  en: [
    { step: "01", title: "Inquiry", desc: "Share context, goals, and constraints" },
    { step: "02", title: "Assessment", desc: "Response within 24h; confirm scope" },
    { step: "03", title: "Proposal", desc: "Architecture, timeline, and quote if applicable" },
    { step: "04", title: "Delivery", desc: "Build, on-site support, or advisory engagement" },
  ],
};

export const workWithMeFaq = {
  zh: [
    {
      q: "这是外包接单吗？",
      a: "不是按件计价的开发外包。这是面向企业的 consulting & delivery engagement — 我参与架构与关键交付，适合需要基础设施与 AI 复合能力的项目。",
    },
    {
      q: "支持哪些地区现场支援？",
      a: "目前以东南亚（含越南）为主，远程支持全球时区。具体是否可现场需根据项目评估。",
    },
    {
      q: "如何报价？",
      a: "根据 scope、时间线与交付形式在评估后报价，不提供公开价目表。",
    },
  ],
  en: [
    {
      q: "Is this freelance gig work?",
      a: "No. These are enterprise consulting & delivery engagements — I own architecture and critical delivery, ideal when you need infrastructure plus AI in one practitioner.",
    },
    {
      q: "Where is on-site support available?",
      a: "Primarily Southeast Asia (including Vietnam), with remote support globally. On-site availability is confirmed after scoping.",
    },
    {
      q: "How is pricing handled?",
      a: "Quoted after assessment based on scope, timeline, and delivery model. No public rate card.",
    },
  ],
};

export const budgetRangeOptions = {
  zh: [
    { value: "", label: "暂不透露" },
    { value: "under-5k", label: "5 万以内 (CNY)" },
    { value: "5k-20k", label: "5–20 万 (CNY)" },
    { value: "20k-50k", label: "20–50 万 (CNY)" },
    { value: "50k+", label: "50 万以上 (CNY)" },
  ],
  en: [
    { value: "", label: "Prefer not to say" },
    { value: "under-5k", label: "Under $5k USD" },
    { value: "5k-20k", label: "$5k – $20k USD" },
    { value: "20k-50k", label: "$20k – $50k USD" },
    { value: "50k+", label: "$50k+ USD" },
  ],
};
