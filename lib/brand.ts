import type { Localized } from "@/lib/locale";

/** Personal brand constants — single source of truth for positioning */
export const BRAND = {
  title: "Enterprise AI Solutions Architect",
  titleShort: "Enterprise AI Solutions Architect",
  tagline: {
    en: "From the datacenter to production AI",
    zh: "从机房到 AI 生产环境",
    vi: "Từ phòng máy chủ đến AI production",
  } satisfies Localized,
  valueProposition: {
    en: "Trustworthy enterprise infrastructure with LLMs, Agents, and RAG in production — nine years from datacenters to digitalization leadership.",
    zh: "可信赖的企业基础设施，大模型与 Agent 生产落地 — 九年从数据中心到企业数字化主导。",
    vi: "Hạ tầng doanh nghiệp đáng tin cậy, triển khai LLM và Agent trong production — chín năm từ trung tâm dữ liệu đến lãnh đạo số hóa.",
  } satisfies Localized,
  differentiator: {
    en: "Dual-stack architect: operable infrastructure and deployable AI — LLMs, Agents, and RAG in production, with reliability and security built in.",
    zh: "双栈架构视角：可运维的基础设施与可上线的 AI 能力 — 将大模型、Agent 与 RAG 带入生产，兼顾可靠性与安全边界。",
    vi: "Kiến trúc sư dual-stack: hạ tầng vận hành được và AI triển khai được — LLM, Agent và RAG trong production, đảm bảo độ tin cậy và an toàn.",
  } satisfies Localized,
} as const;

export const CAREER_STAGES = [
  {
    key: "infra",
    label: {
      en: "Infrastructure Engineer",
      zh: "基础设施工程师",
      vi: "Kỹ sư hạ tầng",
    },
    hint: { en: "Systems Administrator", zh: "网管", vi: "Quản trị hệ thống" },
    future: false,
  },
  {
    key: "leader",
    label: { en: "IT Leader", zh: "IT 负责人", vi: "Trưởng nhóm IT" },
    future: false,
  },
  {
    key: "network",
    label: { en: "Network Engineer", zh: "网络工程师", vi: "Kỹ sư mạng" },
    future: false,
  },
  {
    key: "ai",
    label: { en: "AI R&D Engineer", zh: "AI 研发工程师", vi: "Kỹ sư R&D AI" },
    future: false,
  },
  {
    key: "digital",
    label: {
      en: "Head of Enterprise Digitalization & IT",
      zh: "企业数字化与信息化主导人",
      vi: "Lãnh đạo số hóa & CNTT doanh nghiệp",
    },
    future: true,
  },
] as const;
