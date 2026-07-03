import type { Locale } from "./i18n";
import { personalInfo } from "./data";

interface KnowledgeEntry {
  keywords: string[];
  answer: { zh: string; en: string };
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["项目", "project", "做过", "built", "portfolio", "作品"],
    answer: {
      zh: "杨晓伟的核心项目包括：\n\n1. **AI Agent OS** — 自研 Agent 操作系统\n2. **RAG 知识库系统** — 企业级检索增强生成\n3. **企业基础设施平台** — 网络、服务器、机房硬件与监控运维\n4. **ITSM 智能运维** — 覆盖服务器/网络/硬件的全栈运维平台\n5. **ERP 智能化改造** — 制造业 ERP AI 增强\n6. **Production AI** — 生产环境 AI 部署方案\n\n他同时具备深厚的 AI 开发能力与扎实的 IT 基础设施运维背景。",
      en: "Xiaowei's core projects include:\n\n1. **AI Agent OS** — Self-built Agent operating system\n2. **RAG Knowledge System** — Enterprise retrieval-augmented generation\n3. **Enterprise Infrastructure Platform** — Network, servers, datacenter & monitoring\n4. **ITSM Intelligent Ops** — Full-stack ops platform for servers/network/hardware\n5. **ERP Intelligence Upgrade** — AI-enhanced manufacturing ERP\n6. **Production AI** — Production-grade AI deployment\n\nHe combines deep AI development skills with solid IT infrastructure operations background.",
    },
  },
  {
    keywords: ["agent", "ai agent", "agent os", "智能体"],
    answer: {
      zh: "杨晓伟的 **AI Agent OS** 是一个完整的 Agent 操作系统：\n\n架构：User → AI Agent → Planner → MCP → Skills → Redis Memory → LLM → Result\n\n技术栈：Python、FastAPI、Redis、MCP、OpenClaw\n\n支持多模型编排、工具调用、记忆管理与 Skills 扩展。",
      en: "Xiaowei's **AI Agent OS** is a complete Agent operating system:\n\nArchitecture: User → AI Agent → Planner → MCP → Skills → Redis Memory → LLM → Result\n\nTech: Python, FastAPI, Redis, MCP, OpenClaw\n\nSupports multi-model orchestration, tool calling, memory management, and Skills extension.",
    },
  },
  {
    keywords: ["技能", "skill", "技术", "tech", "stack", "能力"],
    answer: {
      zh: "主要技术能力：\n\n**运维与基础设施**\n- Linux / Windows Server 运维\n- VMware 虚拟化、Docker 容器\n- Zabbix 监控告警、Shell/Python 自动化\n\n**网络工程**\n- Cisco / Huawei 交换机、路由器、防火墙\n- 网络架构设计、VLAN、VPN / SD-WAN\n- Nginx 反向代理与负载均衡\n\n**AI 与开发**\n- AI Agent、RAG、MCP\n- Python、FastAPI、Vue、Redis\n- OpenAI、Claude、DeepSeek、Qwen\n\n9+ 年经验，从网络工程师成长为 IT 负责人。",
      en: "Main technical capabilities:\n\n**Operations & Infrastructure**\n- Linux / Windows Server operations\n- VMware virtualization, Docker containers\n- Zabbix monitoring, Shell/Python automation\n\n**Network Engineering**\n- Cisco / Huawei switches, routers, firewalls\n- Network architecture, VLAN, VPN / SD-WAN\n- Nginx reverse proxy & load balancing\n\n**AI & Development**\n- AI Agent, RAG, MCP\n- Python, FastAPI, Vue, Redis\n- OpenAI, Claude, DeepSeek, Qwen\n\n9+ years, from Network Engineer to IT Leader.",
    },
  },
  {
    keywords: ["运维", "ops", "服务器", "server", "机房", "datacenter", "硬件", "hardware"],
    answer: {
      zh: "杨晓伟在 IT 运维与基础设施方面的经验：\n\n- **服务器运维**：Linux / Windows 日常管理、性能调优、补丁升级\n- **虚拟化**：VMware 集群规划、资源分配、容灾备份\n- **机房硬件**：服务器上架、存储阵列、UPS、机柜布线与资产台账\n- **监控告警**：Zabbix + Grafana 7×24 监控体系搭建\n- **自动化**：Python / Shell 脚本实现批量部署、巡检、故障自愈\n\n现任海外制造业 IT 负责人，管理园区级基础设施。",
      en: "Xiaowei's IT operations & infrastructure experience:\n\n- **Server Ops**: Linux / Windows administration, tuning, patching\n- **Virtualization**: VMware cluster planning, resource allocation, DR backup\n- **Datacenter Hardware**: Server racking, storage arrays, UPS, cabling & asset management\n- **Monitoring**: Built 7×24 monitoring with Zabbix + Grafana\n- **Automation**: Python / Shell scripts for batch deployment, inspection & auto-healing\n\nCurrently IT Leader for overseas manufacturing campus infrastructure.",
    },
  },
  {
    keywords: ["网络", "network", "网工", "交换机", "switch", "防火墙", "firewall", "路由"],
    answer: {
      zh: "杨晓伟的网络工程能力：\n\n- 持有**软考网络工程师（中级）**认证\n- 企业三层网络架构规划与分阶段落地\n- Cisco / Huawei 核心交换机、路由器、防火墙配置\n- VLAN 划分、路由协议、无线网络覆盖\n- 跨境专线、VPN / SD-WAN 组网\n- 网络故障诊断、链路优化与安全策略\n\n从 2015 年网络工程师起步，网络是他的技术根基之一。",
      en: "Xiaowei's network engineering capabilities:\n\n- **Network Engineer (Intermediate)** certification\n- Enterprise three-tier network architecture planning & deployment\n- Cisco / Huawei core switches, routers, firewall configuration\n- VLAN segmentation, routing protocols, wireless coverage\n- Cross-border dedicated lines, VPN / SD-WAN\n- Network fault diagnosis, link optimization & security policies\n\nStarted as Network Engineer in 2015 — networking is one of his technical foundations.",
    },
  },
  {
    keywords: ["经历", "experience", "工作", "work", "职业", "career", "背景"],
    answer: {
      zh: "职业经历：\n\n- **2020 — 至今 | 申洲国际 IT Leader**\n  网络架构、服务器虚拟化、机房硬件、监控运维、AI Platform、ERP/MES\n\n- **2017 — 2020 | 高级 IT 工程师**\n  Linux/Windows 运维、交换机防火墙、存储 UPS 维护、自动化脚本\n\n- **2015 — 2017 | 网络工程师**\n  三层网络规划、设备部署调试、布线机柜、软考网工认证\n\n从机柜布线到 AI Agent，完整的基础设施 + 智能化演进路径。",
      en: "Career path:\n\n- **2020 — Present | IT Leader, Shenzhou International**\n  Network architecture, server virtualization, datacenter hardware, monitoring, AI Platform, ERP/MES\n\n- **2017 — 2020 | Senior IT Engineer**\n  Linux/Windows ops, switch/firewall, storage/UPS maintenance, automation scripts\n\n- **2015 — 2017 | Network Engineer**\n  Three-tier network planning, device deployment, cabling/racks, Network Engineer certification\n\nFrom rack cabling to AI Agents — a complete infrastructure + intelligence evolution.",
    },
  },
  {
    keywords: ["联系", "contact", "邮箱", "email", "github", "微信", "wechat"],
    answer: {
      zh: `联系方式：\n\n- 📧 Email: ${personalInfo.email}\n- 🔗 GitHub: ${personalInfo.github}\n- 📘 Facebook: ${personalInfo.facebook}\n- 💬 微信：页面底部 Contact 区域扫码添加\n\n建议优先邮件或微信联系。`,
      en: `Contact info:\n\n- 📧 Email: ${personalInfo.email}\n- 🔗 GitHub: ${personalInfo.github}\n- 📘 Facebook: ${personalInfo.facebook}\n- 💬 WeChat: scan QR code in the Contact section\n\nEmail or WeChat is preferred.`,
    },
  },
  {
    keywords: ["证书", "certificate", "认证", "语言", "language", "软考"],
    answer: {
      zh: "证书与语言：\n\n- 网络工程师（中级，软考）\n- 软件设计师（中级，软考）\n- 系统架构设计师（高级，备考中）\n- 英语 CET-4、越南语 B1\n- AWS 认证（计划中）",
      en: "Certifications & Languages:\n\n- Network Engineer Intermediate (China)\n- Software Designer Intermediate (China)\n- System Architect Advanced (in progress)\n- English CET-4, Vietnamese B1\n- AWS Certification (planned)",
    },
  },
  {
    keywords: ["架构", "architecture", "设计", "design", "mcp", "redis"],
    answer: {
      zh: "AI Agent OS 架构设计：\n\n```\nUser → AI Agent → Planner → MCP → Skills → Redis Memory → LLM → Result\n```\n\n基础设施方面，他主导过园区网络（核心层-汇聚层-接入层）、VMware 虚拟化集群、存储备份与 Zabbix 统一监控的完整架构落地。",
      en: "AI Agent OS architecture:\n\n```\nUser → AI Agent → Planner → MCP → Skills → Redis Memory → LLM → Result\n```\n\nFor infrastructure, he led campus network (core-aggregation-access), VMware clusters, storage/backup & unified Zabbix monitoring deployments.",
    },
  },
  {
    keywords: ["谁", "who", "介绍", "about", "是谁", "杨晓伟"],
    answer: {
      zh: "杨晓伟（Xiaowei Yang）是一位 **AI Infrastructure Engineer**，拥有 9+ 年企业 IT 经验。\n\n从网络工程师起步，现任海外制造业 IT 负责人。既精通网络架构设计、服务器运维、机房硬件管理，也擅长 AI Agent 开发与 Python 自动化。\n\n座右铭：Building AI Infrastructure for the Next Generation.",
      en: "Xiaowei Yang is an **AI Infrastructure Engineer** with 9+ years of enterprise IT experience.\n\nStarted as Network Engineer, now overseas manufacturing IT Leader. Expert in network architecture, server operations, datacenter hardware, plus AI Agent development & Python automation.\n\nMotto: Building AI Infrastructure for the Next Generation.",
    },
  },
];

const defaultAnswer = {
  zh: "感谢提问！我可以帮你了解杨晓伟的项目、运维与网络经验、AI 技能、工作经历和联系方式。试试问：「服务器运维经验？」或「网络架构做过什么？」",
  en: "Thanks for asking! I can help with Xiaowei's projects, IT ops & network experience, AI skills, career path and contact info. Try: \"Server operations experience?\" or \"What network projects has he done?\"",
};

export function getAIResponse(query: string, locale: Locale): string {
  const normalized = query.toLowerCase().trim();

  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.answer[locale];
  }

  return defaultAnswer[locale];
}
