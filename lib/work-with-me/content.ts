import type { InquiryType } from "@/lib/db/schema";

export const inquiryTypeLabels: Record<
  InquiryType,
  { zh: string; en: string }
> = {
  development: {
    zh: "数字化与定制开发",
    en: "Digital Platforms & Custom Build",
  },
  ai: {
    zh: "AI / Agent 生产落地",
    en: "AI / Agent in Production",
  },
  infrastructure: {
    zh: "网络架构与基础设施规划",
    en: "Network & Infrastructure Design",
  },
  on_site: {
    zh: "现场支援与故障响应",
    en: "On-site Support & Incidents",
  },
  other: {
    zh: "综合咨询 / 其他",
    en: "Advisory / Other",
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
    id: "architecture",
    title: {
      zh: "企业网络架构与基础设施规划设计",
      en: "Enterprise Network Architecture & Infrastructure Design",
    },
    description: {
      zh: "从现状评估到可落地的拓扑与实施路径 — 覆盖园区网、工厂产线网络、数据中心互联、安全域划分与跨境链路设计。输出可执行的架构方案，而非堆叠设备清单。",
      en: "From current-state assessment to implementable topology — campus LAN, factory/production networks, datacenter interconnect, security zones, and cross-border connectivity. Deliverable is an architecture you can build, not a vendor slide deck.",
    },
    highlights: {
      zh: [
        "三层网络、VLAN、路由策略、防火墙与 SD-WAN / 专线规划",
        "工厂车间、办公区、仓储与海外园区多场景网络设计",
        "9+ 年网络工程与 IT 负责人一线落地经验",
      ],
      en: [
        "Three-tier design, VLANs, routing, firewall policy, SD-WAN & dedicated lines",
        "Office, factory floor, warehouse & overseas campus network patterns",
        "9+ years from network engineering to IT leadership in production",
      ],
    },
  },
  {
    id: "datacenter",
    title: {
      zh: "海外中心机房与园区 IT 建设交付",
      en: "Overseas Datacenter & Campus IT Build-out",
    },
    description: {
      zh: "协助企业在海外新建或扩容中心机房与 IT 基础设施 — 机柜规划、服务器与存储部署、虚拟化平台、结构化布线、监控告警基线与容灾考量。适合制造业出海、海外工厂投产的 IT 底座建设。",
      en: "Greenfield or expansion of overseas hub datacenters and campus IT — rack planning, compute/storage rollout, virtualization, structured cabling, monitoring baseline, and DR considerations. Built for manufacturers going global and new overseas plant IT foundations.",
    },
    highlights: {
      zh: [
        "机房选址协助、机柜/UPS/布线规范与硬件上架调试",
        "VMware 集群、备份存储、Zabbix / Grafana 统一监控",
        "跨境网络接入与总部互联的整体协同设计",
      ],
      en: [
        "Site readiness, rack/UPS/cabling standards, hardware racking & commissioning",
        "VMware clusters, backup storage, Zabbix / Grafana unified monitoring",
        "Cross-border access coordinated with HQ interconnect design",
      ],
    },
  },
  {
    id: "digital",
    title: {
      zh: "企业数字化平台与 AI 生产落地",
      en: "Digital Platforms & Production AI Delivery",
    },
    description: {
      zh: "在可靠的基础设施之上交付业务系统 — ERP / MES 集成、内部运维平台、AI Agent、RAG 知识库与自动化工作流。从架构到上线运维，覆盖制造业与企业 IT 常见场景。",
      en: "Business systems on reliable infrastructure — ERP/MES integration, internal ops platforms, AI Agents, RAG knowledge bases, and automation workflows. Architecture through production operations for manufacturing and enterprise IT.",
    },
    highlights: {
      zh: [
        "Discovery → Architecture → Build → Deploy → Handover",
        "Python / FastAPI / Vue 与企业现有系统对接",
        "AI 能力嵌入审批、运维、报表等真实业务流程",
      ],
      en: [
        "Discovery → Architecture → Build → Deploy → Handover",
        "Python / FastAPI / Vue integrated with existing enterprise systems",
        "AI embedded in approvals, ops, reporting — real workflows",
      ],
    },
  },
  {
    id: "operations",
    title: {
      zh: "运维保障、故障响应与现场技术支援",
      en: "Operations Support, Incident Response & On-site Assistance",
    },
    description: {
      zh: "网络中断、服务器故障、存储异常、AI 服务不可用 — 远程诊断或东南亚现场排查。亦可在割接、搬迁、新厂上线等关键窗口提供驻场保障，缩短业务停机时间。",
      en: "Network outages, server failures, storage issues, AI service downtime — remote triage or on-site assistance in Southeast Asia. Also available for cutovers, relocations, and new-factory go-live windows to minimize business downtime.",
    },
    highlights: {
      zh: [
        "咨询 24 小时内响应，紧急事件优先处理",
        "覆盖网络、虚拟化、机房硬件与生产环境 AI 服务",
        "评估后明确 scope、时间与报价，无公开价目表",
      ],
      en: [
        "Inquiry response within 24 hours; urgent events prioritized",
        "Network, virtualization, datacenter hardware & production AI",
        "Scope, timeline, and quote after assessment — no public rate card",
      ],
    },
  },
] as const;

export const workWithMeProcess = {
  zh: [
    { step: "01", title: "咨询", desc: "说明业务场景、现有环境与目标" },
    { step: "02", title: "评估", desc: "24 小时内回复，确认范围与可行性" },
    { step: "03", title: "方案", desc: "架构设计、实施路径、时间线与报价" },
    { step: "04", title: "交付", desc: "规划设计、建设落地、开发上线或现场支援" },
  ],
  en: [
    {
      step: "01",
      title: "Inquiry",
      desc: "Share business context, current environment, and goals",
    },
    {
      step: "02",
      title: "Assessment",
      desc: "Response within 24h; confirm scope and feasibility",
    },
    {
      step: "03",
      title: "Proposal",
      desc: "Architecture, implementation path, timeline, and quote",
    },
    {
      step: "04",
      title: "Delivery",
      desc: "Design, build-out, software rollout, or on-site support",
    },
  ],
};

export const workWithMeFaq = {
  zh: [
    {
      q: "这是外包接单吗？",
      a: "不是按件计价的开发或运维外包。这是面向企业的 consulting & delivery engagement — 我负责架构设计、关键交付与质量把关，适合需要「网络 + 机房 + 开发 + AI」复合能力的项目。",
    },
    {
      q: "可以只做网络规划，不负责施工吗？",
      a: "可以。可提供纯咨询与架构设计交付物（拓扑、IP 规划、设备选型建议、实施 checklist），也可全程参与落地与验收。",
    },
    {
      q: "海外机房建设支持哪些地区？",
      a: "以东南亚（含越南）为主，具备海外制造业园区 IT 建设与跨境互联经验。其他地区可远程规划设计，现场需评估后确认。",
    },
    {
      q: "如何报价？",
      a: "根据项目范围、现场次数、时间线与交付责任在评估后报价，不提供公开价目表。",
    },
  ],
  en: [
    {
      q: "Is this freelance gig work?",
      a: "No. These are enterprise consulting & delivery engagements — I own architecture, critical delivery, and quality. Ideal when you need network, datacenter, software, and AI in one practitioner.",
    },
    {
      q: "Architecture-only engagements?",
      a: "Yes. Deliverables can include topology, IP plan, device guidance, and implementation checklists — or full build-out and acceptance support.",
    },
    {
      q: "Where do you support datacenter build-outs?",
      a: "Primarily Southeast Asia (including Vietnam), with overseas manufacturing campus experience. Other regions: remote design; on-site after scoping.",
    },
    {
      q: "How is pricing handled?",
      a: "Quoted after assessment based on scope, site visits, timeline, and delivery responsibility. No public rate card.",
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
