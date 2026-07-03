export type Locale = "zh" | "en";

export const translations = {
  zh: {
    nav: {
      about: "关于",
      skills: "技能",
      experience: "经历",
      projects: "项目",
      blog: "博客",
      certificates: "证书",
      contact: "联系",
    },
    hero: {
      name: "杨晓伟",
      title: "AI Infrastructure Engineer",
      tagline: "Building AI Infrastructure for the Next Generation.",
      tags: ["Linux", "Network", "Server Ops", "AI Agent", "Python", "Cloud"],
      cta: "查看项目",
      ctaSecondary: "阅读博客",
    },
    about: {
      label: "About Me",
      headline: "9+ 年企业 IT 基础设施、网络工程、运维管理与 AI 自动化经验",
      description:
        "从网络工程师到海外制造业 IT 负责人，我既懂机柜里的交换机，也懂生产环境的 AI Agent。擅长网络架构设计落地、服务器与机房运维、硬件全生命周期管理，同时将 Python 自动化与 AI 技术融入日常运维与业务系统建设。基础设施是我的根基，AI 是我的加速器。",
      highlights: [
        "海外制造业 IT 负责人",
        "网络架构设计与落地",
        "服务器与机房运维",
        "硬件采购与生命周期管理",
        "AI Agent 开发与落地",
        "Python 自动化运维",
      ],
    },
    skills: {
      label: "Skills",
      title: "技术栈",
      subtitle: "从网络工程、服务器运维到 AI 应用开发的综合能力",
      categories: {
        ops: "运维与基础设施",
        network: "网络工程",
        ai: "AI 与大模型",
        dev: "开发技术",
        tool: "工具",
      },
    },
    experience: {
      label: "Experience",
      title: "工作经历",
      subtitle: "从网络工程师到 IT 负责人 — 基础设施与智能化的完整演进",
    },
    projects: {
      label: "Projects",
      title: "项目作品",
      subtitle: "涵盖 AI 平台、基础设施运维与企业智能化建设",
      viewDetails: "查看详情",
      featured: "核心项目",
    },
    techStack: {
      label: "Tech Stack",
      title: "能力分布",
    },
    certificates: {
      label: "Certificates",
      title: "证书与语言",
      subtitle: "持续学习与专业认证",
    },
    contact: {
      label: "Contact",
      title: "联系方式",
      subtitle: "欢迎通过邮件或微信联系，我会在 24 小时内回复",
      email: "邮箱",
      facebook: "Facebook",
      github: "GitHub",
      linkedin: "LinkedIn",
      wechat: "微信",
      wechatHint: "扫码添加，优先沟通渠道",
    },
    footer: {
      rights: "保留所有权利",
      built: "使用 Next.js 构建",
    },
    aiChat: {
      title: "Ask Xiaowei AI",
      placeholder: "问我任何问题，例如：杨晓伟做过哪些项目？",
      greeting: "你好！我是 Xiaowei AI，可以帮你了解杨晓伟的技术背景和项目经历。",
      send: "发送",
      thinking: "思考中...",
    },
    architecture: {
      title: "系统架构",
    },
    scrollToTop: {
      label: "回到顶部",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      blog: "Blog",
      certificates: "Certificates",
      contact: "Contact",
    },
    hero: {
      name: "Xiaowei Yang",
      title: "AI Infrastructure Engineer",
      tagline: "Building AI Infrastructure for the Next Generation.",
      tags: ["Linux", "Network", "Server Ops", "AI Agent", "Python", "Cloud"],
      cta: "View Projects",
      ctaSecondary: "Read Blog",
    },
    about: {
      label: "About Me",
      headline:
        "9+ years in Enterprise IT Infrastructure, Network Engineering, IT Operations & AI Automation",
      description:
        "From Network Engineer to overseas manufacturing IT Leader — I know the switches in the rack and the AI Agents in production. Expert in network architecture design & deployment, server & datacenter operations, hardware lifecycle management, plus Python automation and AI integration into daily ops and business systems. Infrastructure is my foundation; AI is my accelerator.",
      highlights: [
        "Overseas Manufacturing IT Leader",
        "Network Architecture Design & Deployment",
        "Server & Datacenter Operations",
        "Hardware Procurement & Lifecycle Management",
        "AI Agent Development & Deployment",
        "Python Automation for IT Ops",
      ],
    },
    skills: {
      label: "Skills",
      title: "Tech Stack",
      subtitle: "Comprehensive capabilities from network engineering & server ops to AI development",
      categories: {
        ops: "Operations & Infrastructure",
        network: "Network Engineering",
        ai: "AI & LLM",
        dev: "Development",
        tool: "Tools",
      },
    },
    experience: {
      label: "Experience",
      title: "Work Experience",
      subtitle: "From Network Engineer to IT Leader — infrastructure meets intelligence",
    },
    projects: {
      label: "Projects",
      title: "Projects",
      subtitle: "AI platforms, infrastructure operations & enterprise digital transformation",
      viewDetails: "View Details",
      featured: "Featured",
    },
    techStack: {
      label: "Tech Stack",
      title: "Proficiency",
    },
    certificates: {
      label: "Certificates",
      title: "Certifications & Languages",
      subtitle: "Continuous learning and professional credentials",
    },
    contact: {
      label: "Contact",
      title: "Get in Touch",
      subtitle: "Reach out via email or WeChat — I typically reply within 24 hours",
      email: "Email",
      facebook: "Facebook",
      github: "GitHub",
      linkedin: "LinkedIn",
      wechat: "WeChat",
      wechatHint: "Scan to connect — preferred channel",
    },
    footer: {
      rights: "All rights reserved",
      built: "Built with Next.js",
    },
    aiChat: {
      title: "Ask Xiaowei AI",
      placeholder: "Ask me anything, e.g.: What projects has Xiaowei built?",
      greeting:
        "Hi! I'm Xiaowei AI. I can help you learn about Xiaowei's technical background and project experience.",
      send: "Send",
      thinking: "Thinking...",
    },
    architecture: {
      title: "Architecture",
    },
    scrollToTop: {
      label: "Back to top",
    },
  },
} as const;

export type TranslationKey = typeof translations.zh;
