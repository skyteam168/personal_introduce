/** Personal brand constants — single source of truth for positioning */
export const BRAND = {
  title: "Enterprise AI Solutions Architect",
  titleShort: "Enterprise AI Solutions Architect",
  tagline: {
    en: "From the datacenter to production AI",
    zh: "从机房到 AI 生产环境",
  },
  valueProposition: {
    en: "Trustworthy enterprise infrastructure with LLMs, Agents, and RAG in production — nine years from datacenters to digitalization leadership.",
    zh: "可信赖的企业基础设施，大模型与 Agent 生产落地 — 九年从数据中心到企业数字化主导。",
  },
  differentiator: {
    en: "Dual-stack architect: operable infrastructure and deployable AI — LLMs, Agents, and RAG in production, with reliability and security built in.",
    zh: "双栈架构视角：可运维的基础设施与可上线的 AI 能力 — 将大模型、Agent 与 RAG 带入生产，兼顾可靠性与安全边界。",
  },
} as const;

export const CAREER_STAGES = [
  {
    key: "infra",
    label: { en: "Infrastructure Engineer", zh: "基础设施工程师" },
    hint: { en: "Systems Administrator", zh: "网管" },
    future: false,
  },
  {
    key: "leader",
    label: { en: "IT Leader", zh: "IT 负责人" },
    future: false,
  },
  {
    key: "network",
    label: { en: "Network Engineer", zh: "网络工程师" },
    future: false,
  },
  {
    key: "ai",
    label: { en: "AI R&D Engineer", zh: "AI 研发工程师" },
    future: false,
  },
  {
    key: "digital",
    label: {
      en: "Head of Enterprise Digitalization & IT",
      zh: "企业数字化与信息化主导人",
    },
    future: true,
  },
] as const;
