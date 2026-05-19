"use client";
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

/* ─────────────────────────────────────────
   أيقونات فئات المهارات (SVG)
───────────────────────────────────────── */
function FrontendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function BackendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function SoftSkillsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   أيقونات الـ Soft Skills (SVG)
───────────────────────────────────────── */
function IconQuestion() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   البيانات
───────────────────────────────────────── */
const skillCategories = [
  {
    label: "Frontend",
    icon: <FrontendIcon />,
    accentColor: "rgba(61,156,255,0.15)",
    skills: [
      { name: "React",        color: "#61DAFB" },
      { name: "Next.js",      color: "#ffffff" },
      { name: "JavaScript",   color: "#F7DF1E" },
      { name: "TypeScript",   color: "#3178C6" },
      { name: "HTML / CSS",   color: "#E34F26" },
      { name: "Tailwind CSS", color: "#38BDF8" },
      { name: "Angular",      color: "#DD0031" },
      { name: "Bootstrap",    color: "#7952B3" },
    ],
  },
  {
    label: "Backend & Database",
    icon: <BackendIcon />,
    accentColor: "rgba(0,245,160,0.12)",
    skills: [
      { name: "PHP",         color: "#777BB4" },
      { name: "Laravel",     color: "#FF2D20" },
      { name: "MySQL",       color: "#4479A1" },
      { name: "REST APIs",   color: "#009688" },
      { name: "Claude API",  color: "#3d9cff" },
      { name: "Groq LLaMA",  color: "#f97316" },
    ],
  },
  {
    label: "Tools & Workflow",
    icon: <ToolsIcon />,
    accentColor: "rgba(155,93,255,0.12)",
    skills: [
      { name: "Git",        color: "#F05032" },
      { name: "n8n",        color: "#00f5a0" },
      { name: "SerpAPI",    color: "#e5c07b" },
      { name: "Arabic NLP", color: "#9b5dff" },
      { name: "i18n / RTL", color: "#2196F3" },
      { name: "EmailJS",    color: "#00d4c4" },
    ],
  },
];

const softSkills = [
  { name: "Problem Solving",      icon: <IconQuestion /> },
  { name: "Continuous Learning",  icon: <IconBook /> },
  { name: "Critical Thinking",    icon: <IconPencil /> },
  { name: "Adaptability",         icon: <IconRefresh /> },
  { name: "Teamwork & Collab",    icon: <IconUsers /> },
  { name: "Creativity",           icon: <IconStar /> },
];

// delays مختلفة لكل pill لتأثير طفو طبيعي
const floatDelays  = [0, 0.4, 0.8, 0.2, 1.0, 0.6, 1.2, 0.3, 0.7, 0.1, 0.9, 0.5];
const floatDurations = [4.1, 3.6, 5.0, 4.8, 3.9, 4.3, 5.2, 3.7, 4.6, 4.0, 5.4, 3.8];

/* ─────────────────────────────────────────
   المكوّن الرئيسي
───────────────────────────────────────── */
export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // نجوم الخلفية المتحركة
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    type Star = {
      x: number; y: number; r: number;
      a: number; v: number; phase: number; c: string;
    };
    let pts: Star[] = [];

    function init() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      pts = Array.from({ length: 90 }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: Math.random() * 0.9 + 0.2,
        a: Math.random() * 0.55 + 0.08,
        v: Math.random() * 0.35 + 0.1,
        phase: Math.random() * Math.PI * 2,
        c: ["rgba(61,156,255,", "rgba(155,93,255,", "rgba(0,245,160,"][
          Math.floor(Math.random() * 3)
        ],
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      const t = Date.now() / 1000;
      pts.forEach((p) => {
        const alpha = p.a * (0.5 + 0.5 * Math.sin(t * p.v + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + alpha + ")";
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <section id="skills">
      {/* نجوم الخلفية */}
      <canvas ref={canvasRef} className="skills-stars" aria-hidden="true" />

      <div className="wrapper" style={{ position: "relative", zIndex: 2 }}>

        {/* ── Header ── */}
        <Reveal>
          <div className="skills-intro">
            <div className="skills-intro-text">
              <div className="section-tag">// skills &amp; expertise</div>
              <h2 className="section-title">
                Technical <span>Arsenal</span>
              </h2>
              <div className="section-line" />
            </div>
            <p className="skills-intro-desc">
              A comprehensive overview of my technical stack — built across real projects, not tutorials.
            </p>
          </div>
        </Reveal>

        {/* ── Technical Categories ── */}
        {skillCategories.map((cat, ci) => (
          <Reveal key={cat.label} className={`reveal-delay-${ci + 1}`}>
            <div className="skills-cat-block">

              {/* عنوان الفئة */}
              <div className="skills-cat-header">
                <div className="skills-cat-icon" style={{ color: "var(--accent1)" }}>
                  {cat.icon}
                </div>
                <span className="skills-cat-label">{cat.label}</span>
              </div>

              {/* Pills */}
              <div className="skills-pills-row">
                {cat.skills.map((sk, si) => (
                  <div
                    key={sk.name}
                    className="skill-pill"
                    style={{
                      animationDelay:    `${floatDelays[si % floatDelays.length]}s`,
                      animationDuration: `${floatDurations[si % floatDurations.length]}s`,
                    }}
                  >
                    <span className="skill-dot" style={{ background: sk.color }} />
                    {sk.name}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        {/* ── Soft Skills ── */}
        <Reveal className="reveal-delay-1">
          <div className="skills-cat-block">

            <div className="skills-cat-header">
              <div className="skills-cat-icon" style={{ color: "var(--accent2)" }}>
                <SoftSkillsIcon />
              </div>
              <span className="skills-cat-label">Soft Skills</span>
            </div>

            <div className="skills-pills-row">
              {softSkills.map((sk, si) => (
                <div
                  key={sk.name}
                  className="skill-pill skill-pill--soft"
                  style={{
                    animationDelay:    `${floatDelays[si % floatDelays.length]}s`,
                    animationDuration: `${floatDurations[si % floatDurations.length]}s`,
                  }}
                >
                  <span className="skill-pill-icon">{sk.icon}</span>
                  {sk.name}
                </div>
              ))}
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}