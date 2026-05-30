import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
//  JSON CONFIG — Edit everything here
// ═══════════════════════════════════════════════════════════
const DATA = {
  meta: {
    name: "Guru Murthy M",
    initials: "GM",
    role: "Senior .NET Full-Stack Developer",
    badge: "AI Tools Integrator · 8+ Yrs",
    location: "Bengaluru, India",
    email: "abbayi12guru@gmail.com",
    phone: "+91 8333004100",
    linkedin: "linkedin.com/in/gurumurthym",
    github: "github.com/gurumurthym",
    tagline: "Engineering enterprise SaaS at the intersection of .NET microservices, Micro-Frontend architecture, and AI-powered automation.",
    availability: "Open to opportunities"
  },
  stats: [
    { value: "8+", label: "Years", icon: "📅" },
    { value: "6+", label: "Projects", icon: "🚀" },
    { value: "70%", label: "Less Manual Entry", icon: "⚡" },
    { value: "40%", label: "Faster Consolidation", icon: "📉" }
  ],
  skills: [
    { cat: "Back-End", level: 95, color: "#38bdf8", items: [".NET 8", ".NET Core", "C#", "ASP.NET Web API", "REST API", "Microservices", "EF Core", "Dapper", "CQRS", "DDD", "SignalR", "xUnit", "NUnit"] },
    { cat: "Front-End", level: 90, color: "#a78bfa", items: ["React.js", "Angular v2–17", "TypeScript", "JavaScript ES6+", "Tailwind CSS", "Material UI", "Micro-Frontend", "Module Federation", "Redux", "NgRx", "React Hooks"] },
    { cat: "Databases", level: 85, color: "#34d399", items: ["PostgreSQL", "SQL Server 2008–2019", "MongoDB", "Stored Procedures", "Query Optimization", "EF Core Migrations", "Dapper ORM", "Views & Indexing"] },
    { cat: "Cloud & DevOps", level: 80, color: "#fbbf24", items: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS RDS", "CloudWatch", "CodePipeline", "CI/CD", "Docker", "Kubernetes", "GitHub Actions"] },
    { cat: "AI & Automation", level: 88, color: "#f472b6", items: ["Claude (Anthropic)", "Cursor IDE", "GitHub Copilot", "OpenAI API", "OCR/NLP Pipelines", "LLM Prompt Engineering", "Vibe Coding", "Anthropic Artifacts"] },
    { cat: "Security & Quality", level: 82, color: "#fb923c", items: ["SonarQube", "Snyk", "OWASP ZAP", "JWT", "OAuth 2.0", "RBAC", "SOLID Principles", "TDD", "Clean Architecture", "DDD"] }
  ],
  experience: [
    {
      id: "acuity",
      role: "Senior Software Developer",
      company: "Acuity Knowledge Partners",
      period: "Apr 2021 – Present",
      tenure: "4+ years",
      domain: "Fintech · PE/VC SaaS",
      color: "#38bdf8",
      accent: "rgba(56,189,248,0.08)",
      border: "rgba(56,189,248,0.2)",
      product: "FolioSure",
      summary: "Lead engineer on FolioSure — a cloud-native SaaS platform for global PE/VC fund managers.",
      achievements: [
        { metric: "70%", desc: "reduction in manual data entry via OCR+NLP pipeline" },
        { metric: "40%", desc: "faster data consolidation through microservices redesign" },
        { metric: "90s", desc: "end-to-end processing of a 50-page fund report" },
        { metric: "3 yrs", desc: "zero critical security vulnerabilities in production" }
      ],
      points: [
        "Architected Micro-Frontend: Angular shell + React.js extraction micro-frontend (Module Federation)",
        "Built AI-powered OCR+NLP citation engine — every financial figure traced to page, paragraph, sentence",
        "Designed .NET 8 microservices aggregating data from multiple sources into a unified auditable pipeline",
        "ESG reporting module: SFDR, GRI, SASB compliance — reports in hours, not days",
        "Full AWS setup: EC2, S3, RDS, CodePipeline, Docker — zero-downtime blue/green deployments",
        "Mentored 2 junior developers; drove SOLID + DDD adoption across the team"
      ],
      tech: [".NET 8", "React.js", "Angular", "PostgreSQL", "AWS", "Docker", "OpenAI API", "OCR/NLP", "Reveal BI"]
    },
    {
      id: "miramed",
      role: "Programmer Analyst",
      company: "Miramed Ajuba Solutions",
      period: "May 2019 – Apr 2021",
      tenure: "2 years",
      domain: "Healthcare · RCM",
      color: "#a78bfa",
      accent: "rgba(167,139,250,0.08)",
      border: "rgba(167,139,250,0.2)",
      product: "Palette",
      summary: "Full-stack development for US healthcare RCM workflows including medical coding and billing systems.",
      achievements: [
        { metric: "30%", desc: "improvement in Angular page load via lazy-loading" },
        { metric: "3", desc: "full-stack applications built and shipped end-to-end" }
      ],
      points: [
        "Built Palette — medical coding platform for ICD-10/CPT assignments, claim queues, and productivity tracking",
        "Developed Help Desk 2.0 — ticketing + project management platform with real-time notifications",
        "Built Asset Requisition System (ARS) — procurement workflow with configurable approval chains",
        "JWT RBAC for coder, supervisor, QA, and admin access tiers",
        "Complex PostgreSQL stored procedures for high-volume medical records processing"
      ],
      tech: [".NET Core", "Angular 9", "PostgreSQL", "SQL Server", "JWT", "Bootstrap", "SVN"]
    },
    {
      id: "cmots",
      role: "Software Programmer",
      company: "CMOTS Internet Technologies",
      period: "Apr 2017 – May 2019",
      tenure: "2 years",
      domain: "Fintech · Stock Market",
      color: "#34d399",
      accent: "rgba(52,211,153,0.08)",
      border: "rgba(52,211,153,0.2)",
      product: "Godwill",
      summary: "Core financial web applications in stock analysis, lead management, and e-signature domains.",
      achievements: [
        { metric: "5K+", desc: "active leads managed in LMS for Trade Plus Online" },
        { metric: "<1s", desc: "SQL query performance for real-time stock dashboards" }
      ],
      points: [
        "Developed Godwill — stock analysis & portfolio monitoring with candlestick charts and real-time market data",
        "Built LMS managing 5,000+ active leads; intelligent auto-assignment cut distribution time ~80%",
        "Worked on Cameo e-signature platform for banking and corporate clients",
        "Sub-second stored procedure performance for high-frequency stock data ingestion"
      ],
      tech: [".NET Framework", "Angular", "SQL Server", "REST API", "ADO.NET", "Bootstrap"]
    }
  ],
  projects: [
    {
      id: 1, name: "FolioSure", emoji: "📊",
      tagline: "PE/VC Portfolio Monitoring SaaS",
      company: "Acuity Knowledge Partners", period: "2021–Present", team: 8,
      color: "#38bdf8", glow: "rgba(56,189,248,0.15)",
      description: "Cloud-native SaaS serving global PE/VC fund managers. Micro-Frontend architecture with Angular shell and React.js extraction micro-frontend. AI-powered PDF citation engine with inline source traceability.",
      highlights: ["OCR+NLP: 50-page report processed in 90s", "Inline citations: page · para · sentence per data point", "Dynamic KPI Builder — no-code formula engine", "ESG reporting: SFDR, GRI, SASB compliant", "Reveal BI dashboards with drill-down analytics", "Excel plug-in for seamless KPI extraction"],
      tech: [".NET 8", "React.js", "Angular", "PostgreSQL", "AWS", "OpenAI API", "Docker", "Reveal BI"]
    },
    {
      id: 2, name: "Palette", emoji: "🏥",
      tagline: "Medical Coding & Workflow Platform",
      company: "Miramed Ajuba", period: "2019–2021", team: 4,
      color: "#a78bfa", glow: "rgba(167,139,250,0.15)",
      description: "Healthcare RCM platform for US medical coding teams. ICD-10/CPT code assignments, claim queue management, productivity tracking and compliance reporting.",
      highlights: ["Coder workflow queues with fast filterable interfaces", "JWT RBAC: coder, supervisor, QA, admin roles", "Audit trail for every code change and review", "Productivity dashboards with error-rate tracking"],
      tech: [".NET Core", "Angular 9", "PostgreSQL", "JWT", "EF Core", "Bootstrap"]
    },
    {
      id: 3, name: "Help Desk 2.0", emoji: "🎫",
      tagline: "Project Management & Ticketing",
      company: "Miramed Ajuba", period: "2020–2021", team: 2,
      color: "#fbbf24", glow: "rgba(251,191,36,0.15)",
      description: "Internal web platform managing both customer support tickets and development projects. One-click feature request → project conversion with full lifecycle visibility.",
      highlights: ["Full ticket lifecycle with escalation and SLAs", "Feature request → structured project in one click", "Real-time in-app and email notifications", "Sprint management with deadline tracking"],
      tech: [".NET Core", "Angular 9", "PostgreSQL", "SignalR", "Bootstrap"]
    },
    {
      id: 4, name: "LMS", emoji: "📋",
      tagline: "Lead Management System",
      company: "CMOTS · Trade Plus Online", period: "2017–2019", team: 3,
      color: "#f472b6", glow: "rgba(244,114,182,0.15)",
      description: "Full-cycle lead management for Trade Plus Online handling 5,000+ active leads from multi-channel acquisition through conversion with intelligent automated distribution.",
      highlights: ["Multi-channel ingestion: web, email, call center", "Auto-assignment cut distribution time by ~80%", "Follow-up scheduling + escalation workflows", "Real-time conversion funnel dashboard"],
      tech: [".NET Framework", "Angular", "SQL Server", "ADO.NET", "Bootstrap"]
    },
    {
      id: 5, name: "Godwill", emoji: "📈",
      tagline: "Stock Analysis & Portfolio Monitor",
      company: "CMOTS Internet Technologies", period: "2017–2019", team: 3,
      color: "#34d399", glow: "rgba(52,211,153,0.15)",
      description: "Stock market analysis tool for retail and institutional investors with real-time data, interactive candlestick charts, portfolio tracking, and performance analytics.",
      highlights: ["Real-time market data: prices, indices, volumes", "Interactive candlestick + moving average charts", "Portfolio P&L tracking with sector allocation", "Configurable watchlists and price alerts"],
      tech: [".NET Framework", "Angular", "SQL Server", "REST API", "Chart.js"]
    },
    {
      id: 6, name: "Asset Requisition", emoji: "🏢",
      tagline: "Procurement Workflow Platform",
      company: "Miramed Ajuba", period: "2019–2020", team: 2,
      color: "#fb923c", glow: "rgba(251,146,60,0.15)",
      description: "Internal procurement platform managing the full lifecycle of asset requisition from submission through approval, vendor selection, and financial closure.",
      highlights: ["Multi-step requisition with configurable approval chain", "Vendor registry with pricing history and scoring", "Department-level budget utilization reports", "Full audit trail for financial compliance"],
      tech: [".NET Core", "Angular 9", "PostgreSQL", "SQL Server", "Bootstrap"]
    }
  ],
  aiStack: [
    { name: "Claude", org: "Anthropic", use: "Architecture, code review, prompt-driven development, documentation", color: "#f472b6", bg: "rgba(244,114,182,0.08)" },
    { name: "Cursor IDE", org: "Anysphere", use: "Multi-file AI edits, codebase-aware refactoring, intelligent autocomplete", color: "#38bdf8", bg: "rgba(56,189,248,0.08)" },
    { name: "GitHub Copilot", org: "GitHub", use: "Inline AI suggestions in Visual Studio and VS Code", color: "#34d399", bg: "rgba(52,211,153,0.08)" },
    { name: "OpenAI API", org: "OpenAI", use: "Production GPT integrations, prompt engineering for business logic automation", color: "#fbbf24", bg: "rgba(251,191,36,0.08)" }
  ]
};

// ═══════════════════════════════════════════════════════════
//  CANVAS PARTICLE HERO
// ═══════════════════════════════════════════════════════════
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let anim, W, H;
    const particles = [];
    const COLORS = ["#38bdf8", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"];
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56,189,248,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      anim = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(anim); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

// ═══════════════════════════════════════════════════════════
//  CURSOR GLOW EFFECT
// ═══════════════════════════════════════════════════════════
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const move = e => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} style={{
    position: "fixed", pointerEvents: "none", zIndex: 0,
    width: 400, height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
    transform: "translate(-50%, -50%)",
    transition: "left 0.15s ease, top 0.15s ease"
  }} />;
}

// ═══════════════════════════════════════════════════════════
//  TYPEWRITER
// ═══════════════════════════════════════════════════════════
function Typewriter({ phrases }) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = phrases[wi];
    const t = setTimeout(() => {
      if (!del) {
        if (ci < word.length) { setText(word.slice(0, ci + 1)); setCi(c => c + 1); }
        else setTimeout(() => setDel(true), 2000);
      } else {
        if (ci > 0) { setText(word.slice(0, ci - 1)); setCi(c => c - 1); }
        else { setDel(false); setWi(i => (i + 1) % phrases.length); }
      }
    }, del ? 30 : 70);
    return () => clearTimeout(t);
  }, [ci, del, wi]);
  return (
    <span style={{ color: "#38bdf8" }}>
      {text}
      <span style={{ animation: "blink 0.9s infinite", display: "inline-block", width: 2, height: "0.85em", background: "#38bdf8", verticalAlign: "middle", marginLeft: 2 }} />
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
//  ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════
function Counter({ value }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
      const suffix = value.replace(/[0-9.]/g, "");
      let start = 0;
      const step = numeric / 40;
      const tick = () => {
        start += step;
        if (start >= numeric) { setDisplay(value); return; }
        setDisplay(Math.floor(start) + suffix);
        requestAnimationFrame(tick);
      };
      tick();
      observer.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{display}</span>;
}

// ═══════════════════════════════════════════════════════════
//  SKILL BAR
// ═══════════════════════════════════════════════════════════
function SkillBar({ level, color }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setW(level), 150); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);
  return (
    <div ref={ref} style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: w + "%", background: color, borderRadius: 2, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${color}60` }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  GLASS CARD
// ═══════════════════════════════════════════════════════════
const Glass = ({ children, style = {}, onClick, hover = true }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: hov ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        backdropFilter: "blur(12px)",
        transition: "all 0.25s",
        transform: hov && onClick ? "translateY(-3px)" : "none",
        cursor: onClick ? "pointer" : "default",
        ...style
      }}
    >{children}</div>
  );
};

// ═══════════════════════════════════════════════════════════
//  NAV
// ═══════════════════════════════════════════════════════════
const SECTIONS = ["Home", "About", "Skills", "Experience", "Projects", "Contact"];

function Nav({ active, scrollTo }) {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const h = () => setScroll(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 60,
      background: scroll ? "rgba(6,6,12,0.9)" : "transparent",
      backdropFilter: scroll ? "blur(20px)" : "none",
      borderBottom: scroll ? "1px solid rgba(255,255,255,0.05)" : "none",
      transition: "all 0.3s",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px"
    }}>
      <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.01em" }}>
        <span style={{ color: "#38bdf8" }}>Guru</span>
        <span style={{ color: "rgba(255,255,255,0.35)" }}>.dev</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {SECTIONS.map((s, i) => (
          <button key={s} onClick={() => scrollTo(i)} style={{
            padding: "6px 16px", borderRadius: 8, border: "none",
            background: active === i ? "rgba(56,189,248,0.12)" : "transparent",
            color: active === i ? "#38bdf8" : "rgba(255,255,255,0.45)",
            fontWeight: active === i ? 600 : 400,
            fontSize: 13, cursor: "pointer", transition: "all 0.2s",
            letterSpacing: "0.01em"
          }}>{s}</button>
        ))}
      </div>
      <div style={{
        fontSize: 11, color: "#34d399", fontWeight: 600,
        padding: "5px 12px", borderRadius: 20,
        border: "1px solid rgba(52,211,153,0.3)",
        background: "rgba(52,211,153,0.08)",
        letterSpacing: "0.06em", textTransform: "uppercase"
      }}>
        ● {DATA.meta.availability}
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════
//  HERO
// ═══════════════════════════════════════════════════════════
function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 48px", position: "relative", overflow: "hidden" }}>
      <ParticleCanvas />
      {/* Gradient orbs */}
      <div style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28,
          padding: "7px 16px", borderRadius: 40,
          border: "1px solid rgba(56,189,248,0.25)",
          background: "rgba(56,189,248,0.06)",
          fontSize: 12, color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em"
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block", boxShadow: "0 0 6px #34d399" }} />
          📍 {DATA.meta.location} &nbsp;·&nbsp; {DATA.meta.badge}
        </div>

        {/* Name */}
        <h1 style={{ fontSize: "clamp(52px, 8vw, 88px)", fontWeight: 900, margin: 0, lineHeight: 1, letterSpacing: "-0.04em", color: "#fff" }}>
          {DATA.meta.name.split(" ")[0]}
          <br />
          <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)", color: "transparent" }}>
            {DATA.meta.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        {/* Typewriter role */}
        <div style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 500, marginTop: 20, height: 40, display: "flex", alignItems: "center" }}>
          <Typewriter phrases={[DATA.meta.role, "Micro-Frontend Architect", "AI Tools Integrator", "Clean Code Evangelist", ".NET SaaS Platform Builder"]} />
        </div>

        {/* Tagline */}
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.8, maxWidth: 580, marginTop: 20, marginBottom: 40 }}>
          {DATA.meta.tagline}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href={`mailto:${DATA.meta.email}`} style={{
            padding: "14px 32px", borderRadius: 10, background: "#38bdf8",
            color: "#020c14", fontWeight: 700, fontSize: 14, textDecoration: "none",
            letterSpacing: "0.04em", boxShadow: "0 0 32px rgba(56,189,248,0.25)",
            transition: "all 0.2s"
          }}>Hire Me →</a>
          <a href={`https://${DATA.meta.github}`} target="_blank" rel="noreferrer" style={{
            padding: "14px 32px", borderRadius: 10,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none"
          }}>GitHub ↗</a>
          <a href={`https://${DATA.meta.linkedin}`} target="_blank" rel="noreferrer" style={{
            padding: "14px 32px", borderRadius: 10,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none"
          }}>LinkedIn ↗</a>
        </div>

        {/* Contact row */}
        <div style={{ display: "flex", gap: 24, marginTop: 36, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
          <span>📧 {DATA.meta.email}</span>
          <span>📱 {DATA.meta.phone}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.3 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "#fff", textTransform: "uppercase" }}>scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #fff, transparent)" }} />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  ABOUT
// ═══════════════════════════════════════════════════════════
function About() {
  return (
    <section style={{ padding: "100px 48px", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#38bdf8", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>— About Me</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
        <div>
          <h2 style={{ fontSize: 38, fontWeight: 800, margin: "0 0 20px", color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
            Building the future of<br /><span style={{ color: "#38bdf8" }}>financial tech</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>
            Senior .NET Full-Stack Developer with 8+ years designing and deploying enterprise SaaS across fintech, healthcare, and operations. Currently lead engineer on FolioSure — a cloud-native PE/VC portfolio monitoring platform at Acuity Knowledge Partners.
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1.85 }}>
            I specialize in Micro-Frontend architectures, AI-powered automation pipelines, and clean .NET microservices. An active daily user of Claude, Cursor IDE, and GitHub Copilot — I bring vibe coding workflows into every project.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {DATA.stats.map(s => (
              <Glass key={s.label} style={{ padding: "20px", textAlign: "center" }} hover={false}>
                <div style={{ fontSize: 11, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#38bdf8", lineHeight: 1, letterSpacing: "-0.03em" }}><Counter value={s.value} /></div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </Glass>
            ))}
          </div>
          {/* AI Stack */}
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 8 }}>Daily AI Stack</div>
          {DATA.aiStack.map(a => (
            <div key={a.name} style={{
              padding: "14px 18px", borderRadius: 12, display: "flex", gap: 16, alignItems: "flex-start",
              background: a.bg, border: `1px solid ${a.color}20`
            }}>
              <div style={{ fontWeight: 700, color: a.color, fontSize: 14, minWidth: 90 }}>{a.name}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{a.use}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  SKILLS
// ═══════════════════════════════════════════════════════════
function Skills() {
  const [active, setActive] = useState(0);
  const skill = DATA.skills[active];
  return (
    <section style={{ padding: "100px 48px", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#38bdf8", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>— Skills</div>
      <h2 style={{ fontSize: 38, fontWeight: 800, margin: "0 0 48px", color: "#fff", letterSpacing: "-0.02em" }}>Technical Expertise</h2>
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 32 }}>
        {/* Category list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {DATA.skills.map((s, i) => (
            <button key={s.cat} onClick={() => setActive(i)} style={{
              padding: "14px 18px", borderRadius: 12, border: "none", cursor: "pointer",
              textAlign: "left", display: "flex", flexDirection: "column", gap: 8,
              background: i === active ? s.color + "18" : "rgba(255,255,255,0.02)",
              borderLeft: i === active ? `3px solid ${s.color}` : "3px solid transparent",
              transition: "all 0.2s"
            }}>
              <div style={{ color: i === active ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: 13 }}>{s.cat}</div>
              <SkillBar level={s.level} color={s.color} />
              <div style={{ fontSize: 11, color: i === active ? s.color : "rgba(255,255,255,0.25)" }}>{s.level}% proficiency</div>
            </button>
          ))}
        </div>
        {/* Tag cloud */}
        <Glass style={{ padding: "32px" }} hover={false}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.cat}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", borderLeft: `1px solid rgba(255,255,255,0.1)`, paddingLeft: 14 }}>
              {skill.items.length} technologies
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {skill.items.map((item, i) => (
              <span key={item} style={{
                padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                background: `${skill.color}12`, color: skill.color,
                border: `1px solid ${skill.color}30`,
                animation: `fadeInUp 0.3s ease ${i * 0.04}s both`
              }}>{item}</span>
            ))}
          </div>
          <style>{`
            @keyframes fadeInUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
          `}</style>
        </Glass>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  EXPERIENCE
// ═══════════════════════════════════════════════════════════
function Experience() {
  const [active, setActive] = useState(0);
  const exp = DATA.experience[active];
  return (
    <section style={{ padding: "100px 48px", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#38bdf8", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>— Experience</div>
      <h2 style={{ fontSize: 38, fontWeight: 800, margin: "0 0 40px", color: "#fff", letterSpacing: "-0.02em" }}>Career Journey</h2>

      {/* Timeline tabs */}
      <div style={{ display: "flex", gap: 0, position: "relative", marginBottom: 40 }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.08)" }} />
        {DATA.experience.map((e, i) => (
          <button key={e.id} onClick={() => setActive(i)} style={{
            padding: "14px 24px", border: "none", background: "transparent", cursor: "pointer",
            borderBottom: i === active ? `2px solid ${e.color}` : "2px solid transparent",
            transition: "all 0.2s", position: "relative", zIndex: 1
          }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: i === active ? "#fff" : "rgba(255,255,255,0.4)", marginBottom: 2 }}>{e.company.split(" ")[0]}</div>
            <div style={{ fontSize: 11, color: i === active ? e.color : "rgba(255,255,255,0.2)" }}>{e.period.split(" – ")[0]} – {e.period.split(" – ")[1]}</div>
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Main info */}
        <Glass style={{ padding: "32px", background: exp.accent, borderColor: exp.border }} hover={false}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 4 }}>{exp.role}</div>
              <div style={{ color: exp.color, fontWeight: 600, fontSize: 15 }}>{exp.company}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{exp.period}</div>
              <div style={{ fontSize: 11, color: exp.color, marginTop: 4, padding: "3px 10px", borderRadius: 12, background: exp.accent, border: `1px solid ${exp.border}`, display: "inline-block" }}>{exp.domain}</div>
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{exp.summary}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {exp.points.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: exp.color, fontSize: 12, marginTop: 3, flexShrink: 0 }}>▸</span>
                <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.6 }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {exp.tech.map(t => <span key={t} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}>{t}</span>)}
          </div>
        </Glass>

        {/* Metrics */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {exp.achievements.map((a, i) => (
            <Glass key={i} style={{ padding: "24px 28px", display: "flex", alignItems: "center", gap: 20 }} hover={false}>
              <div style={{ fontSize: 36, fontWeight: 900, color: exp.color, letterSpacing: "-0.04em", lineHeight: 1, minWidth: 80 }}><Counter value={a.metric} /></div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{a.desc}</div>
            </Glass>
          ))}
          {/* Product badge */}
          <Glass style={{ padding: "24px 28px", marginTop: 4 }} hover={false}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Flagship Product</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{exp.product}</div>
            <div style={{ fontSize: 12, color: exp.color, marginTop: 4 }}>{exp.domain}</div>
          </Glass>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  PROJECTS
// ═══════════════════════════════════════════════════════════
function Projects() {
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("All");
  const domains = ["All", "Fintech", "Healthcare", "Operations"];

  return (
    <section style={{ padding: "100px 48px", minHeight: "100vh" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#38bdf8", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>— Projects</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
        <h2 style={{ fontSize: 38, fontWeight: 800, margin: 0, color: "#fff", letterSpacing: "-0.02em" }}>Featured Work</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
        {DATA.projects.map((p, i) => (
          <Glass key={p.id} onClick={() => setModal(p)} style={{
            padding: "26px 24px",
            boxShadow: `0 0 0 0 ${p.glow}`,
            transition: "all 0.3s"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                background: p.glow, border: `1px solid ${p.color}30`, fontSize: 22
              }}>{p.emoji}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "right" }}>
                <div>{p.period}</div>
                <div style={{ color: p.color, marginTop: 2 }}>👥 {p.team}</div>
              </div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#fff", marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: p.color, fontWeight: 600, marginBottom: 14 }}>{p.tagline}</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: 18 }}>
              {p.description.slice(0, 100)}…
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.tech.slice(0, 4).map(t => <span key={t} style={{ padding: "3px 9px", borderRadius: 6, fontSize: 10, fontWeight: 600, background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25` }}>{t}</span>)}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
              <span style={{ color: p.color, fontSize: 18 }}>→</span>
            </div>
          </Glass>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 500,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 24
        }} onClick={() => setModal(null)}>
          <div
            style={{
              background: "#0d0d1a", border: `1px solid ${modal.color}30`, borderRadius: 20,
              padding: "40px 36px", maxWidth: 580, width: "100%", maxHeight: "85vh", overflowY: "auto",
              position: "relative", boxShadow: `0 0 80px ${modal.glow}`
            }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setModal(null)} style={{ position: "absolute", top: 18, right: 22, background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 20, cursor: "pointer", width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            <div style={{ fontSize: 40, marginBottom: 18 }}>{modal.emoji}</div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 6px" }}>{modal.name}</h3>
            <div style={{ color: modal.color, fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{modal.tagline}</div>
            <div style={{ display: "flex", gap: 20, marginBottom: 24, flexWrap: "wrap" }}>
              {[["Company", modal.company], ["Period", modal.period], ["Team", modal.team + " devs"]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>{v}</div>
                </div>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>{modal.description}</p>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: modal.color, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Key Highlights</div>
              {modal.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: modal.color, flexShrink: 0, marginTop: 2 }}>▸</span>
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {modal.tech.map(t => <span key={t} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: `${modal.color}12`, color: modal.color, border: `1px solid ${modal.color}30` }}>{t}</span>)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  CONTACT
// ═══════════════════════════════════════════════════════════
function Contact() {
  const links = [
    { icon: "📧", label: "Email", val: DATA.meta.email, href: `mailto:${DATA.meta.email}`, color: "#38bdf8" },
    { icon: "📱", label: "Phone", val: DATA.meta.phone, href: `tel:${DATA.meta.phone}`, color: "#a78bfa" },
    { icon: "🔗", label: "LinkedIn", val: DATA.meta.linkedin, href: `https://${DATA.meta.linkedin}`, color: "#34d399" },
    { icon: "💻", label: "GitHub", val: DATA.meta.github, href: `https://${DATA.meta.github}`, color: "#fbbf24" }
  ];
  return (
    <section style={{ padding: "100px 48px 80px", minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#38bdf8", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>— Contact</div>
      <h2 style={{ fontSize: 48, fontWeight: 900, margin: "0 0 12px", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
        Let's build<br /><span style={{ color: "#38bdf8" }}>something great.</span>
      </h2>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 460, lineHeight: 1.8, marginBottom: 48 }}>
        Open to senior engineering roles, SaaS product collaborations, and AI integration consulting.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14, maxWidth: 680 }}>
        {links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <Glass style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 26 }}>{l.icon}</span>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l.label}</div>
                <div style={{ fontSize: 13, color: l.color, fontWeight: 600, marginTop: 3 }}>{l.val}</div>
              </div>
            </Glass>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 72, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: 12, color: "rgba(255,255,255,0.15)", display: "flex", justifyContent: "space-between", maxWidth: 680 }}>
        <span>© 2025 {DATA.meta.name}</span>
        <span>Built with React · JSON-driven config</span>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  SIDE DOT NAV
// ═══════════════════════════════════════════════════════════
function SideNav({ active, scrollTo }) {
  return (
    <div style={{ position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)", zIndex: 150, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      {SECTIONS.map((s, i) => (
        <button key={s} title={s} onClick={() => scrollTo(i)} style={{
          width: active === i ? 24 : 7,
          height: 7, borderRadius: 4, border: "none", cursor: "pointer", padding: 0,
          background: active === i ? "#38bdf8" : "rgba(255,255,255,0.2)",
          transition: "all 0.3s",
          boxShadow: active === i ? "0 0 8px rgba(56,189,248,0.5)" : "none"
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════
const SECTION_COMPONENTS = [Hero, About, Skills, Experience, Projects, Contact];

export default function App() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  const scrollTo = useCallback((i) => {
    refs.current[i]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const i = refs.current.indexOf(e.target);
          if (i !== -1) setActive(i);
        }
      }),
      { threshold: 0.35 }
    );
    refs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "#06060f", color: "#fff", fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #06060f; }
        ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 2px; }
      `}</style>

      <CursorGlow />
      <Nav active={active} scrollTo={scrollTo} />
      <SideNav active={active} scrollTo={scrollTo} />

      {SECTION_COMPONENTS.map((Comp, i) => (
        <div key={i} ref={el => refs.current[i] = el}>
          <Comp />
        </div>
      ))}
    </div>
  );
}