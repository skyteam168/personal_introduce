/** Personal brand constants — single source of truth for positioning */
export const BRAND = {
  title: "Enterprise AI Solutions Architect",
  titleShort: "Enterprise AI Solutions Architect",
  tagline: {
    en: "Bridging Enterprise Infrastructure and Artificial Intelligence.",
    zh: "连接企业基础设施与人工智能。",
  },
  valueProposition: {
    en: "I design and deliver enterprise-grade infrastructure, then apply AI to make organizations faster, smarter, and more resilient.",
    zh: "我负责企业级基础设施的设计与落地，并用 AI 让组织更高效、更智能、更具韧性。",
  },
  differentiator: {
    en: "Rare combination: datacenter-to-desktop IT leadership, network architecture, production AI systems, and enterprise digital transformation — in one person.",
    zh: "罕见组合：从机房到桌面的一线 IT 负责人经验、网络架构、生产级 AI 系统与企业数字化落地 —— 集于一身。",
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
