export interface Skill {
  name: string;
  icon: string;
  category: "ops" | "network" | "ai" | "dev" | "tool";
}

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  milestones: { zh: string; en: string }[];
}

export interface Project {
  slug: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  tags: string[];
  featured: boolean;
  stars: number;
  github?: string;
  video?: string;
  architecture: string[];
  tech: string[];
}

export interface Certificate {
  name: { zh: string; en: string };
  issuer: { zh: string; en: string };
  year?: string;
  status: "active" | "planned";
}

export interface TechProficiency {
  name: string;
  level: number;
}

export const personalInfo = {
  email: "jamesyang@benlutech.com",
  phone: "+86 18206827894",
  github: "https://github.com/skyteam168",
  linkedin: "https://www.linkedin.com/in/james-yang-88a940413/",
  wechatQr: "/images/wechatqr.png",
  resumePdf: "/resume.pdf",
};

export const skillCategories: Skill["category"][] = [
  "ops",
  "network",
  "ai",
  "dev",
  "tool",
];

export const skills: Skill[] = [
  // 运维与基础设施
  { name: "Linux", icon: "linux", category: "ops" },
  { name: "VMware", icon: "vmware", category: "ops" },
  { name: "Docker", icon: "docker", category: "ops" },
  { name: "Zabbix", icon: "zabbix", category: "ops" },
  { name: "Windows Server", icon: "windows", category: "ops" },
  { name: "Shell", icon: "shell", category: "ops" },
  // 网络工程
  { name: "Cisco", icon: "cisco", category: "network" },
  { name: "Huawei", icon: "huawei", category: "network" },
  { name: "Firewall", icon: "firewall", category: "network" },
  { name: "Nginx", icon: "nginx", category: "network" },
  { name: "VPN / SD-WAN", icon: "vpn", category: "network" },
  // AI 与大模型
  { name: "OpenAI", icon: "openai", category: "ai" },
  { name: "Claude", icon: "claude", category: "ai" },
  { name: "DeepSeek", icon: "deepseek", category: "ai" },
  { name: "Qwen", icon: "qwen", category: "ai" },
  // 开发技术
  { name: "Python", icon: "python", category: "dev" },
  { name: "FastAPI", icon: "fastapi", category: "dev" },
  { name: "Vue", icon: "vue", category: "dev" },
  { name: "Redis", icon: "redis", category: "dev" },
  // 工具
  { name: "Git", icon: "git", category: "tool" },
];

export const techProficiency: TechProficiency[] = [
  { name: "Linux Server Ops", level: 95 },
  { name: "Network Architecture", level: 92 },
  { name: "Python", level: 95 },
  { name: "Server Virtualization", level: 90 },
  { name: "AI Agent", level: 90 },
  { name: "Hardware & Datacenter", level: 88 },
  { name: "Monitoring & Alerting", level: 88 },
  { name: "Docker / Container", level: 88 },
  { name: "Cloud Infrastructure", level: 85 },
  { name: "Vue / React", level: 90 },
  { name: "Database (MySQL/PG)", level: 82 },
  { name: "Automation Scripting", level: 92 },
];

export const experience: ExperienceItem[] = [
  {
    year: "2020 — Present",
    role: "IT Leader",
    company: "Shenzhou International",
    milestones: [
      { zh: "海外园区网络架构设计与跨境专线落地", en: "Overseas campus network design & cross-border dedicated line deployment" },
      { zh: "服务器虚拟化、存储与容灾体系规划建设", en: "Server virtualization, storage & disaster recovery infrastructure" },
      { zh: "机房硬件采购、上架调试与生命周期维护", en: "Datacenter hardware procurement, rack deployment & lifecycle maintenance" },
      { zh: "7×24 监控告警体系（Zabbix / Grafana）搭建", en: "Built 7×24 monitoring & alerting with Zabbix / Grafana" },
      { zh: "AI Platform 架构与生产环境落地", en: "AI Platform architecture & production deployment" },
      { zh: "ERP / MES 系统集成与 AI Agent 智能化改造", en: "ERP / MES integration & AI Agent intelligence upgrade" },
    ],
  },
  {
    year: "2017 — 2020",
    role: "Senior IT Engineer",
    company: "Manufacturing Enterprise",
    milestones: [
      { zh: "Linux / Windows 服务器运维与性能调优", en: "Linux / Windows server operations & performance tuning" },
      { zh: "核心交换机、防火墙策略配置与故障排查", en: "Core switch & firewall policy configuration, troubleshooting" },
      { zh: "存储阵列、UPS 与机房环境日常巡检维护", en: "Storage arrays, UPS & datacenter environment routine maintenance" },
      { zh: "VLAN 划分、路由协议与无线网络覆盖部署", en: "VLAN segmentation, routing protocols & wireless network deployment" },
      { zh: "Python / Shell 自动化运维脚本开发", en: "Python / Shell automation scripting for IT operations" },
    ],
  },
  {
    year: "2015 — 2017",
    role: "Network Engineer",
    company: "Enterprise IT",
    milestones: [
      { zh: "企业三层网络架构规划与分阶段实施", en: "Enterprise three-tier network architecture planning & phased rollout" },
      { zh: "路由器、交换机、无线 AP 选型部署与调试", en: "Router, switch & wireless AP selection, deployment & commissioning" },
      { zh: "网络布线、机柜整理与硬件资产台账管理", en: "Structured cabling, rack organization & hardware asset management" },
      { zh: "网络故障诊断、链路优化与安全策略落地", en: "Network fault diagnosis, link optimization & security policy implementation" },
      { zh: "通过软考网络工程师（中级）认证", en: "Earned Network Engineer (Intermediate) certification" },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "ai-agent-os",
    title: { zh: "AI Agent OS", en: "AI Agent OS" },
    description: {
      zh: "自研 AI Agent 操作系统，集成 Planner、MCP、Skills 与 Redis Memory，支持多模型编排与工具调用。",
      en: "Self-built AI Agent operating system with Planner, MCP, Skills, and Redis Memory — supporting multi-model orchestration and tool calling.",
    },
    tags: ["FastAPI", "Redis", "MCP", "OpenClaw", "LLM"],
    featured: true,
    stars: 5,
    github: "https://github.com/yangxiaowei/ai-agent-os",
    architecture: [
      "User",
      "AI Agent",
      "Planner",
      "MCP",
      "Skills",
      "Redis Memory",
      "LLM",
      "Result",
    ],
    tech: ["Python", "FastAPI", "Redis", "MCP", "OpenAI", "Claude"],
  },
  {
    slug: "rag",
    title: { zh: "RAG 知识库系统", en: "RAG Knowledge System" },
    description: {
      zh: "企业级 RAG 检索增强生成系统，支持文档向量化、语义检索与多轮对话。",
      en: "Enterprise RAG system with document vectorization, semantic search, and multi-turn conversations.",
    },
    tags: ["RAG", "Vector DB", "Embedding", "LLM"],
    featured: true,
    stars: 4,
    architecture: ["Documents", "Embedding", "Vector Store", "Retriever", "LLM", "Answer"],
    tech: ["Python", "FastAPI", "Qwen", "ChromaDB"],
  },
  {
    slug: "erp",
    title: { zh: "ERP 智能化改造", en: "ERP Intelligence Upgrade" },
    description: {
      zh: "制造业 ERP 系统 AI 增强，自动化报表、智能审批与数据洞察。",
      en: "AI-enhanced manufacturing ERP with automated reporting, smart approvals, and data insights.",
    },
    tags: ["ERP", "Automation", "AI"],
    featured: false,
    stars: 4,
    architecture: ["ERP Core", "AI Layer", "Automation", "Dashboard"],
    tech: ["Python", "Vue", "PostgreSQL"],
  },
  {
    slug: "itsm",
    title: { zh: "ITSM 智能运维", en: "ITSM Intelligent Ops" },
    description: {
      zh: "覆盖服务器、网络、硬件全栈的 IT 服务管理平台，集成监控告警、工单流转、AI 自动排障与运维知识库。",
      en: "Full-stack IT service platform covering servers, networks & hardware — with monitoring, ticketing, AI auto-troubleshooting & ops knowledge base.",
    },
    tags: ["ITSM", "Zabbix", "Network", "AI Agent"],
    featured: false,
    stars: 4,
    architecture: ["Monitor", "Alert", "Ticket", "AI Diagnosis", "Auto-Fix", "Resolution"],
    tech: ["Python", "Zabbix", "Linux", "FastAPI", "Redis"],
  },
  {
    slug: "infra-platform",
    title: { zh: "企业基础设施平台", en: "Enterprise Infrastructure Platform" },
    description: {
      zh: "制造业园区级基础设施建设项目：网络架构、服务器集群、存储备份、机房硬件与统一监控运维体系。",
      en: "Manufacturing campus infrastructure: network architecture, server clusters, storage & backup, datacenter hardware & unified monitoring.",
    },
    tags: ["Network", "VMware", "Datacenter", "Zabbix"],
    featured: false,
    stars: 5,
    architecture: ["Network Core", "Firewall", "VM Cluster", "Storage", "Monitor", "Backup"],
    tech: ["Cisco", "Huawei", "VMware", "Linux", "Zabbix", "Nginx"],
  },
  {
    slug: "production-ai",
    title: { zh: "Production AI", en: "Production AI" },
    description: {
      zh: "生产环境 AI 部署方案，涵盖模型服务、监控告警与高可用架构。",
      en: "Production AI deployment with model serving, monitoring, alerting, and high-availability architecture.",
    },
    tags: ["MLOps", "Docker", "Monitoring", "Cloud"],
    featured: false,
    stars: 5,
    architecture: ["Model", "API Gateway", "Load Balancer", "Monitor", "Alert"],
    tech: ["Docker", "Nginx", "Python", "Grafana"],
  },
];

export const certificates: Certificate[] = [
  {
    name: { zh: "网络工程师(中级)", en: "Network Engineer (Intermediate)" },
    issuer: { zh: "软考（中国）", en: "China Computer Technology" },
    year: "2024",
    status: "active",
  },
  {
    name: { zh: "软件设计师(中级)", en: "Software Designer (Intermediate)" },
    issuer: { zh: "软考（中国）", en: "China Computer Technology" },
    year: "2025",
    status: "active",
  },
  {
    name: { zh: "网络规划设计师(高级)", en: "Network Planning Designer (Advanced)" },
    issuer: { zh: "软考（中国）", en: "China Computer Technology" },
    year: "2026",
    status: "planned",
  },
  {
    name: { zh: "信息安全工程师(中级)", en: "Information Security Engineer (Intermediate)" },
    issuer: { zh: "软考（中国）", en: "China Computer Technology" },
    year: "2027",
    status: "planned",
  },
  {
    name: { zh: "英语CET-4", en: "English CET-4" },
    issuer: { zh: "工作语言", en: "Working Language" },
    status: "active",
  },
  {
    name: { zh: "越南语B1", en: "Vietnamese B1" },
    issuer: { zh: "工作语言", en: "Working Language" },
    status: "active",
  },
  {
    name: { zh: "AWS 认证", en: "AWS Certification" },
    issuer: { zh: "Amazon Web Services", en: "Amazon Web Services" },
    status: "planned",
  },
  {
    name: { zh: "阿里云 AIGC 认证", en: "Alibaba Cloud AIGC Certification" },
    issuer: { zh: "阿里云", en: "Alibaba Cloud" },
    status: "active",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
