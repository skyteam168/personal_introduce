export type ProficiencyLevel = "expert" | "advanced" | "intermediate";

export interface Skill {
  name: string;
  icon: string;
  category: "ops" | "network" | "ai" | "dev" | "tool";
}

export interface CapabilityDomain {
  id: string;
  level: ProficiencyLevel;
  technologies: string[];
}

export interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  stage: "network" | "infra" | "leader" | "ai";
  story: { zh: string; en: string };
  achievements: { zh: string; en: string }[];
  businessImpact: { zh: string; en: string }[];
  leadership: { zh: string; en: string }[];
  techEvolution: { zh: string; en: string }[];
}

export interface Project {
  slug: string;
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  businessValue: { zh: string; en: string };
  challenges: { zh: string; en: string }[];
  solutions: { zh: string; en: string }[];
  result: { zh: string; en: string };
  tags: string[];
  featured: boolean;
  stars: number;
  github?: string;
  video?: string;
  demo?: string;
  blogSlug?: string;
  coverImage?: string;
  architecture: string[];
  tech: string[];
  screenshots?: { src: string; alt: { zh: string; en: string } }[];
}

export interface AchievementStat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: { zh: string; en: string };
}

export interface Certificate {
  name: { zh: string; en: string };
  issuer: { zh: string; en: string };
  year?: string;
  status: "active" | "planned";
}

export const personalInfo = {
  name: { zh: "杨晓伟", en: "Xiaowei Yang" },
  email: "jamesyang@benlutech.com",
  github: "https://github.com/skyteam168",
  facebook: "https://www.facebook.com/profile.php?id=100009203928990",
  linkedin: "https://www.linkedin.com/in/james-yang-88a940413/",
  wechatQr: "/images/wechatqr.png",
  wecomQr: "/images/wecom-qr.png",
  photo: "/avatar.svg",
  resume: "/resume.pdf",
  location: { zh: "越南 · 远程可用", en: "Vietnam · Open to Remote" },
};

export const availability = {
  openToWork: true,
  remote: true,
  relocation: true,
  consulting: true,
};

export const achievementStats: AchievementStat[] = [
  { value: 9, suffix: "+", label: { zh: "年行业经验", en: "Years Experience" } },
  { value: 300, suffix: "+", label: { zh: "服务器管理", en: "Servers Managed" } },
  { value: 1000, suffix: "+", label: { zh: "网络设备", en: "Network Devices" } },
  { value: 20, suffix: "+", label: { zh: "企业级项目", en: "Enterprise Projects" } },
  { value: 24, suffix: "×7", label: { zh: "基础设施保障", en: "Infrastructure Uptime" } },
];

export const achievementTextStat = {
  value: "Millions",
  label: { zh: "生产环境请求", en: "Production Requests" },
};

export const capabilityDomains: CapabilityDomain[] = [
  {
    id: "infrastructure",
    level: "expert",
    technologies: ["Linux", "VMware", "Windows Server", "Datacenter", "Storage"],
  },
  {
    id: "networking",
    level: "expert",
    technologies: ["Cisco", "Huawei", "Firewall", "SD-WAN", "Enterprise LAN/WAN"],
  },
  {
    id: "cloud",
    level: "advanced",
    technologies: ["Docker", "Nginx", "CI/CD", "Cloud Architecture", "High Availability"],
  },
  {
    id: "ai",
    level: "advanced",
    technologies: ["AI Agent", "RAG", "MCP", "LLM Orchestration", "Production AI"],
  },
  {
    id: "architecture",
    level: "advanced",
    technologies: ["Solution Design", "ERP Integration", "System Architecture", "Digital Transformation"],
  },
  {
    id: "automation",
    level: "expert",
    technologies: ["Python", "Shell", "Zabbix", "Grafana", "Ops Automation"],
  },
  {
    id: "programming",
    level: "advanced",
    technologies: ["Python", "FastAPI", "Vue", "Redis", "PostgreSQL"],
  },
];

export const skillCategories: Skill["category"][] = [
  "ops",
  "network",
  "ai",
  "dev",
  "tool",
];

export const skills: Skill[] = [
  { name: "Linux", icon: "linux", category: "ops" },
  { name: "VMware", icon: "vmware", category: "ops" },
  { name: "Docker", icon: "docker", category: "ops" },
  { name: "Zabbix", icon: "zabbix", category: "ops" },
  { name: "Windows Server", icon: "windows", category: "ops" },
  { name: "Shell", icon: "shell", category: "ops" },
  { name: "Cisco", icon: "cisco", category: "network" },
  { name: "Huawei", icon: "huawei", category: "network" },
  { name: "Firewall", icon: "firewall", category: "network" },
  { name: "Nginx", icon: "nginx", category: "network" },
  { name: "VPN / SD-WAN", icon: "vpn", category: "network" },
  { name: "OpenAI", icon: "openai", category: "ai" },
  { name: "Claude", icon: "claude", category: "ai" },
  { name: "DeepSeek", icon: "deepseek", category: "ai" },
  { name: "Qwen", icon: "qwen", category: "ai" },
  { name: "Python", icon: "python", category: "dev" },
  { name: "FastAPI", icon: "fastapi", category: "dev" },
  { name: "Vue", icon: "vue", category: "dev" },
  { name: "Redis", icon: "redis", category: "dev" },
  { name: "Git", icon: "git", category: "tool" },
];

export const experience: ExperienceItem[] = [
  {
    year: "2020 — Present",
    role: "IT Leader",
    company: "Shenzhou International",
    stage: "ai",
    story: {
      zh: "从一线基础设施负责人，到推动 AI 进入生产环境的 IT 领导者。",
      en: "From hands-on infrastructure owner to IT leader bringing AI into production.",
    },
    achievements: [
      { zh: "主导海外园区网络架构与跨境专线落地", en: "Led overseas campus network architecture & cross-border dedicated lines" },
      { zh: "构建 7×24 监控告警与容灾体系", en: "Built 7×24 monitoring, alerting & disaster recovery" },
      { zh: "推动 AI Platform 与 ERP/MES 智能化改造", en: "Drove AI Platform & ERP/MES intelligence initiatives" },
    ],
    businessImpact: [
      { zh: "支撑海外制造园区稳定运行，降低网络与系统故障停机", en: "Kept overseas manufacturing campuses running with fewer outages" },
      { zh: "将 AI Agent 引入审批与运维流程，缩短响应时间", en: "Introduced AI Agents into approval & ops workflows, faster response" },
    ],
    leadership: [
      { zh: "海外 IT 团队负责人，统筹网络、服务器、机房与业务系统", en: "Led overseas IT team across network, servers, datacenter & business systems" },
      { zh: "跨部门推动数字化与 AI 落地", en: "Drove digital & AI initiatives across departments" },
    ],
    techEvolution: [
      { zh: "基础设施 → 自动化运维 → AI Agent 生产落地", en: "Infrastructure → Ops automation → Production AI Agents" },
    ],
  },
  {
    year: "2017 — 2020",
    role: "Senior IT Engineer",
    company: "Manufacturing Enterprise",
    stage: "infra",
    story: {
      zh: "深入服务器、网络与机房一线，建立自动化运维能力。",
      en: "Deep in servers, networks & datacenter — building automation muscle.",
    },
    achievements: [
      { zh: "Linux/Windows 服务器运维与性能调优", en: "Linux/Windows server ops & performance tuning" },
      { zh: "核心交换机、防火墙策略与故障排查", en: "Core switch, firewall policies & troubleshooting" },
      { zh: "Python/Shell 自动化脚本体系", en: "Python/Shell automation scripting" },
    ],
    businessImpact: [
      { zh: "提升系统稳定性，减少重复性人工运维", en: "Improved stability, reduced manual repetitive ops" },
    ],
    leadership: [
      { zh: "作为技术骨干支撑多厂区 IT 运维", en: "Technical backbone for multi-site IT operations" },
    ],
    techEvolution: [
      { zh: "运维工程师 → 基础设施工程师", en: "Ops Engineer → Infrastructure Engineer" },
    ],
  },
  {
    year: "2015 — 2017",
    role: "Network Engineer",
    company: "Enterprise IT",
    stage: "network",
    story: {
      zh: "从布线、交换机到三层架构 — 企业网络的起点。",
      en: "From cabling and switches to three-tier architecture — where it all started.",
    },
    achievements: [
      { zh: "企业三层网络架构规划与分阶段实施", en: "Enterprise three-tier network planning & phased rollout" },
      { zh: "路由器、交换机、无线 AP 部署与调试", en: "Router, switch & wireless AP deployment" },
      { zh: "通过软考网络工程师（中级）认证", en: "Earned Network Engineer (Intermediate) certification" },
    ],
    businessImpact: [
      { zh: "为后续大规模基础设施扩展奠定网络底座", en: "Laid network foundation for later infrastructure scale-up" },
    ],
    leadership: [],
    techEvolution: [
      { zh: "网络工程师 — 职业起点", en: "Network Engineer — career foundation" },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "ai-agent-os",
    title: { zh: "AI Agent OS", en: "AI Agent OS" },
    description: {
      zh: "企业级 AI Agent 操作系统 — 规划、工具调用与记忆管理的生产级编排平台。",
      en: "Enterprise AI Agent operating system — production-grade orchestration for planning, tool use, and memory.",
    },
    businessValue: {
      zh: "让 AI 从实验走向可复用的企业工作流，降低集成成本。",
      en: "Move AI from experiments to reusable enterprise workflows with lower integration cost.",
    },
    challenges: [
      { zh: "多模型、多工具、多会话的状态管理与可靠性", en: "State management & reliability across models, tools, and sessions" },
      { zh: "生产环境对延迟与可观测性的要求", en: "Production demands for latency and observability" },
    ],
    solutions: [
      { zh: "Planner + MCP + Skills 分层架构，Redis 持久化记忆", en: "Planner + MCP + Skills layered architecture with Redis-backed memory" },
      { zh: "FastAPI 服务化部署，支持多 Agent 编排", en: "FastAPI service deployment with multi-agent orchestration" },
    ],
    result: {
      zh: "支撑内部 AI 自动化场景，Agent 可稳定调用企业工具链。",
      en: "Powers internal AI automation — Agents reliably invoke enterprise toolchains.",
    },
    tags: ["FastAPI", "Redis", "MCP", "LLM", "Agent"],
    featured: true,
    stars: 5,
    github: "https://github.com/yangxiaowei/ai-agent-os",
    architecture: ["User", "Agent", "Planner", "MCP", "Skills", "Memory", "LLM", "Output"],
    tech: ["Python", "FastAPI", "Redis", "MCP", "OpenAI", "Claude"],
    screenshots: [
      {
        src: "/images/projects/ai-agent-os/screenshot-1.png",
        alt: { zh: "AI Agent OS 架构界面", en: "AI Agent OS architecture UI" },
      },
    ],
  },
  {
    slug: "rag",
    title: { zh: "RAG 知识库系统", en: "RAG Knowledge System" },
    description: {
      zh: "企业文档检索增强生成 — 让组织知识可被 AI 安全、准确地调用。",
      en: "Enterprise retrieval-augmented generation — organizational knowledge, safely accessible to AI.",
    },
    businessValue: {
      zh: "将分散的企业文档转化为可对话的知识资产。",
      en: "Turn scattered enterprise documents into conversational knowledge assets.",
    },
    challenges: [
      { zh: "文档质量参差与检索准确率", en: "Variable document quality and retrieval accuracy" },
      { zh: "多轮对话中的上下文一致性", en: "Context consistency in multi-turn conversations" },
    ],
    solutions: [
      { zh: "向量化管道 + 语义检索 + 重排序", en: "Vectorization pipeline + semantic search + reranking" },
      { zh: "FastAPI 服务层与多模型适配", en: "FastAPI service layer with multi-model support" },
    ],
    result: {
      zh: "支撑内部知识问答与运维文档检索场景。",
      en: "Powers internal Q&A and ops documentation retrieval.",
    },
    tags: ["RAG", "Vector DB", "Embedding", "LLM"],
    featured: true,
    stars: 4,
    architecture: ["Documents", "Embedding", "Vector Store", "Retriever", "LLM", "Answer"],
    tech: ["Python", "FastAPI", "Qwen", "ChromaDB"],
  },
  {
    slug: "infra-platform",
    title: { zh: "企业基础设施平台", en: "Enterprise Infrastructure Platform" },
    description: {
      zh: "制造业园区级基础设施 — 网络、虚拟化、存储、机房与统一监控。",
      en: "Manufacturing campus infrastructure — network, virtualization, storage, datacenter & unified monitoring.",
    },
    businessValue: {
      zh: "为海外制造业务提供稳定、可扩展的 IT 底座。",
      en: "Stable, scalable IT foundation for overseas manufacturing operations.",
    },
    challenges: [
      { zh: "跨境网络延迟与多园区互联", en: "Cross-border latency and multi-campus connectivity" },
      { zh: "7×24 监控与快速故障定位", en: "7×24 monitoring and rapid fault isolation" },
    ],
    solutions: [
      { zh: "三层网络 + 专线 + 防火墙策略体系", en: "Three-tier network + dedicated lines + firewall policies" },
      { zh: "VMware 集群 + Zabbix/Grafana 统一监控", en: "VMware clusters + Zabbix/Grafana unified monitoring" },
    ],
    result: {
      zh: "支撑 300+ 服务器与 1000+ 网络设备稳定运行。",
      en: "Supports 300+ servers and 1000+ network devices in production.",
    },
    tags: ["Network", "VMware", "Datacenter", "Zabbix"],
    featured: true,
    stars: 5,
    architecture: ["Network Core", "Firewall", "VM Cluster", "Storage", "Monitor", "Backup"],
    tech: ["Cisco", "Huawei", "VMware", "Linux", "Zabbix", "Nginx"],
  },
  {
    slug: "itsm",
    title: { zh: "ITSM 智能运维", en: "ITSM Intelligent Ops" },
    description: {
      zh: "覆盖服务器、网络、硬件的全栈 IT 服务管理平台。",
      en: "Full-stack IT service platform for servers, networks, and hardware.",
    },
    businessValue: {
      zh: "缩短故障恢复时间，将运维经验沉淀为可复用知识。",
      en: "Shorter MTTR — operational knowledge captured and reused.",
    },
    challenges: [
      { zh: "告警风暴与工单流转效率", en: "Alert storms and ticket workflow efficiency" },
    ],
    solutions: [
      { zh: "监控告警 + AI 辅助排障 + 知识库", en: "Monitoring + AI-assisted diagnosis + knowledge base" },
    ],
    result: {
      zh: "提升一线运维响应速度与问题闭环率。",
      en: "Faster first response and higher issue closure rate.",
    },
    tags: ["ITSM", "Zabbix", "AI Agent"],
    featured: false,
    stars: 4,
    architecture: ["Monitor", "Alert", "Ticket", "AI Diagnosis", "Resolution"],
    tech: ["Python", "Zabbix", "Linux", "FastAPI", "Redis"],
  },
  {
    slug: "erp",
    title: { zh: "ERP 智能化改造", en: "ERP Intelligence Upgrade" },
    description: {
      zh: "制造业 ERP 的 AI 增强 — 报表自动化、智能审批与数据洞察。",
      en: "AI-enhanced manufacturing ERP — automated reporting, smart approvals, data insights.",
    },
    businessValue: {
      zh: "减少手工报表与审批延迟，提升决策效率。",
      en: "Less manual reporting and approval delay — faster decisions.",
    },
    challenges: [
      { zh: "ERP 系统封闭与数据孤岛", en: "Closed ERP systems and data silos" },
    ],
    solutions: [
      { zh: "AI 中间层 + 自动化报表 + 审批 Agent", en: "AI middleware + automated reports + approval Agents" },
    ],
    result: {
      zh: "关键报表生成时间从小时级降至分钟级。",
      en: "Key report generation from hours to minutes.",
    },
    tags: ["ERP", "Automation", "AI"],
    featured: false,
    stars: 4,
    architecture: ["ERP Core", "AI Layer", "Automation", "Dashboard"],
    tech: ["Python", "Vue", "PostgreSQL"],
  },
  {
    slug: "production-ai",
    title: { zh: "Production AI", en: "Production AI" },
    description: {
      zh: "生产环境 AI 部署 — 模型服务、监控告警与高可用架构。",
      en: "Production AI deployment — model serving, monitoring, and high availability.",
    },
    businessValue: {
      zh: "让 AI 服务具备企业级 SLA 与可运维性。",
      en: "AI services with enterprise SLA and operability.",
    },
    challenges: [
      { zh: "模型服务的稳定性与扩缩容", en: "Model serving stability and scaling" },
    ],
    solutions: [
      { zh: "容器化部署 + 负载均衡 + 监控告警", en: "Containerized deployment + load balancing + monitoring" },
    ],
    result: {
      zh: "AI 服务可 7×24 稳定对外提供 API。",
      en: "AI services available 24×7 via stable APIs.",
    },
    tags: ["MLOps", "Docker", "Monitoring"],
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
    name: { zh: "英语 CET-4", en: "English CET-4" },
    issuer: { zh: "工作语言，听说读写熟练", en: "Fluent in English, speaking, reading, and writing" },
    status: "active",
  },
  {
    name: { zh: "越南语 B1", en: "Vietnamese B1" },
    issuer: { zh: "工作语言，听说读写熟练", en: "Fluent in Vietnamese, speaking, reading, and writing" },
    status: "active",
  },
  {
    name: { zh: "阿里云 AIGC 认证", en: "Alibaba Cloud AIGC Certification" },
    issuer: { zh: "阿里云", en: "Alibaba Cloud" },
    status: "active",
  },
];

export const nowItems = {
  focus: [
    { zh: "企业 AI Agent 生产落地与架构设计", en: "Production AI Agent architecture & deployment" },
    { zh: "RAG 知识系统与企业工作流集成", en: "RAG knowledge systems & enterprise workflow integration" },
    { zh: "基础设施自动化与可观测性", en: "Infrastructure automation & observability" },
  ],
  learning: [
    { zh: "Solution Architecture 与云原生最佳实践", en: "Solution architecture & cloud-native best practices" },
    { zh: "Enterprise AI 治理与安全", en: "Enterprise AI governance & security" },
  ],
  openTo: [
    { zh: "Enterprise AI Solutions Architect 角色", en: "Enterprise AI Solutions Architect roles" },
    { zh: "AI 基础设施与数字化咨询", en: "AI infrastructure & digital transformation consulting" },
  ],
};

export const architectureLayers = [
  {
    id: "enterprise-network",
    label: { en: "Enterprise Network", zh: "企业网络" },
    nodes: [
      { id: "wan", label: "WAN / SD-WAN", x: 50, y: 12 },
      { id: "core", label: "Core Switch", x: 50, y: 32 },
      { id: "fw", label: "Firewall", x: 25, y: 52 },
      { id: "dc", label: "Datacenter", x: 75, y: 52 },
      { id: "access", label: "Access Layer", x: 50, y: 72 },
      { id: "monitor", label: "Monitoring", x: 50, y: 92 },
    ],
    edges: [
      ["wan", "core"],
      ["core", "fw"],
      ["core", "dc"],
      ["fw", "access"],
      ["dc", "access"],
      ["access", "monitor"],
    ],
  },
  {
    id: "ai-agent",
    label: { en: "AI Agent Workflow", zh: "AI Agent 工作流" },
    nodes: [
      { id: "user", label: "User", x: 50, y: 10 },
      { id: "agent", label: "Agent", x: 50, y: 30 },
      { id: "planner", label: "Planner", x: 25, y: 50 },
      { id: "mcp", label: "MCP Tools", x: 75, y: 50 },
      { id: "memory", label: "Memory", x: 25, y: 72 },
      { id: "llm", label: "LLM", x: 75, y: 72 },
      { id: "out", label: "Output", x: 50, y: 92 },
    ],
    edges: [
      ["user", "agent"],
      ["agent", "planner"],
      ["agent", "mcp"],
      ["planner", "memory"],
      ["mcp", "llm"],
      ["memory", "out"],
      ["llm", "out"],
    ],
  },
  {
    id: "rag",
    label: { en: "RAG Architecture", zh: "RAG 架构" },
    nodes: [
      { id: "docs", label: "Documents", x: 20, y: 20 },
      { id: "embed", label: "Embedding", x: 50, y: 20 },
      { id: "vector", label: "Vector DB", x: 80, y: 20 },
      { id: "query", label: "Query", x: 20, y: 55 },
      { id: "retrieve", label: "Retriever", x: 50, y: 55 },
      { id: "gen", label: "LLM", x: 80, y: 55 },
      { id: "answer", label: "Answer", x: 50, y: 88 },
    ],
    edges: [
      ["docs", "embed"],
      ["embed", "vector"],
      ["query", "retrieve"],
      ["vector", "retrieve"],
      ["retrieve", "gen"],
      ["gen", "answer"],
    ],
  },
  {
    id: "infrastructure",
    label: { en: "Infrastructure", zh: "基础设施" },
    nodes: [
      { id: "lb", label: "Load Balancer", x: 50, y: 12 },
      { id: "app", label: "App Servers", x: 30, y: 38 },
      { id: "db", label: "Database", x: 70, y: 38 },
      { id: "cache", label: "Redis", x: 30, y: 62 },
      { id: "storage", label: "Storage", x: 70, y: 62 },
      { id: "obs", label: "Observability", x: 50, y: 88 },
    ],
    edges: [
      ["lb", "app"],
      ["lb", "db"],
      ["app", "cache"],
      ["db", "storage"],
      ["cache", "obs"],
      ["storage", "obs"],
    ],
  },
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
