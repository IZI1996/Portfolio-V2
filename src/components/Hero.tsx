"use client";

import { useEffect, useRef, useState } from "react";

/* ── Rotating roles ── */
const roles = [
  "Full Stack Developer",
  "Problem Solver",
  "Creative Coder",
  "UI Enthusiast",
];

/* ── Code lines (developer object) ── */
const CODE_LINES = [
  [
    { t: "kw", v: "const " },
    { t: "var", v: "developer" },
    { t: "op", v: " = " },
    { t: "br", v: "{" },
  ],
  [
    { t: "indent2", v: "" },
    { t: "def", v: "role" },
    { t: "op", v: ": " },
    { t: "str", v: "'Full Stack Developer'" },
    { t: "def", v: "," },
  ],
  [
    { t: "indent2", v: "" },
    { t: "def", v: "skills" },
    { t: "op", v: ": " },
    { t: "arr", v: "['React','TypeScript','PHP','Laravel']" },
    { t: "def", v: "," },
  ],
  [
    { t: "indent2", v: "" },
    { t: "def", v: "passion" },
    { t: "op", v: ": " },
    { t: "str", v: "'Building user-centric apps'" },
    { t: "def", v: "," },
  ],
  [
    { t: "indent2", v: "" },
    { t: "def", v: "status" },
    { t: "op", v: ": " },
    { t: "str", v: "'Open to opportunities ✨'" },
  ],
  [{ t: "br", v: "}" }, { t: "def", v: ";" }],
  [],
  [
    { t: "cm", v: "// let's see what she's made of 👇" },
  ],
  [
    { t: "var", v: "developer" },
    { t: "def", v: "." },
    { t: "fn", v: "init" },
    { t: "def", v: "();" },
  ],
];

/* ── Console output lines ── */
const CONSOLE_LINES = [
  { type: "cmd", text: "$ initializing developer profile..." },
  { type: "ok",  text: "✓ role        → Full Stack Developer" },
  { type: "ok",  text: "✓ skills      → React · TypeScript · PHP · Laravel" },
  { type: "ok",  text: "✓ passion     → Building user-centric apps" },
  { type: "ok",  text: "✓ status      → Open to opportunities " },
  { type: "done", text: " Ready. Let's build something amazing." },
];

type CodeChar = { lineIdx: number; tokenIdx: number; charIdx: number };

function buildCharSequence() {
  const seq: CodeChar[] = [];
  CODE_LINES.forEach((line, li) => {
    line.forEach((token, ti) => {
      if (token.t === "indent2" || token.t === "indent4") return;
      [...token.v].forEach((_, ci) => {
        seq.push({ lineIdx: li, tokenIdx: ti, charIdx: ci });
      });
    });
    seq.push({ lineIdx: li, tokenIdx: -1, charIdx: -1 });
  });
  return seq;
}

export default function Hero() {
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);

  const hasRun = useRef(false);

  const [typedText,    setTypedText]    = useState("");
  const [revealed,     setRevealed]     = useState<number[][]>(
    CODE_LINES.map(line => line.map(() => 0))
  );
  const [codeFinished, setCodeFinished] = useState(false);
  const [running,      setRunning]      = useState(false);
  const [consoleLines, setConsoleLines] = useState<typeof CONSOLE_LINES>([]);
  const [runClicked,   setRunClicked]   = useState(false);
  const [particles,    setParticles]    = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const particleId = useRef(0);

  type MousePhase = "idle" | "moving" | "clicking" | "done";
  const [mousePhase, setMousePhase] = useState<MousePhase>("idle");
  const [mousePos,   setMousePos]   = useState({ x: 0, y: 0 });

  /* ── Typing animation ── */
  useEffect(() => {
    let ri = 0, ci = 0, deleting = false;
    let t: ReturnType<typeof setTimeout>;
    function tick() {
      const cur = roles[ri];
      if (!deleting) {
        ci++;
        setTypedText(cur.slice(0, ci));
        if (ci === cur.length) { deleting = true; t = setTimeout(tick, 1600); return; }
        t = setTimeout(tick, 95);
      } else {
        ci--;
        setTypedText(cur.slice(0, ci));
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
        t = setTimeout(tick, 48);
      }
    }
    tick();
    return () => clearTimeout(t);
  }, []);

  /* ── 3D tilt ── */
  useEffect(() => {
    const wrap = cardWrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${y * -12}deg) rotateY(${x * 14}deg) translateY(-6px)`;
      card.style.transition = "none";
    };
    const onLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      card.style.transition = "transform 0.6s cubic-bezier(0.22,0.61,0.36,1)";
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => { wrap.removeEventListener("mousemove", onMove); wrap.removeEventListener("mouseleave", onLeave); };
  }, []);

  /* ── Code typing ── */
  useEffect(() => {
    const seq = buildCharSequence();
    let idx = 0;
    function typeNext() {
      if (idx >= seq.length) { setCodeFinished(true); return; }
      const { lineIdx, tokenIdx, charIdx } = seq[idx];
      idx++;
      if (tokenIdx === -1) { setTimeout(typeNext, 30); return; }
      setRevealed(prev => {
        const next = prev.map(l => [...l]);
        next[lineIdx][tokenIdx] = charIdx + 1;
        return next;
      });
      const ch = CODE_LINES[lineIdx][tokenIdx].v[charIdx];
      const delay = /[\s;,(){}]/.test(ch) ? 18 : 48;
      setTimeout(typeNext, delay);
    }
    const t = setTimeout(typeNext, 800);
    return () => clearTimeout(t);
  }, []);

  /* ── Mouse animation ── */
  useEffect(() => {
    if (!codeFinished) return;
    const runBtn = document.getElementById("hero-run-btn");
    const card   = cardRef.current;
    if (!runBtn || !card) return;
    const cardRect = card.getBoundingClientRect();
    const btnRect  = runBtn.getBoundingClientRect();
    const targetX = btnRect.left - cardRect.left + btnRect.width / 2;
    const targetY = btnRect.top  - cardRect.top  + btnRect.height / 2;
    const startX = 60, startY = 50;
    setMousePos({ x: startX, y: startY });
    setMousePhase("moving");
    let startTime: number | null = null;
    const duration = 1000;
    function animateMove(ts: number) {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const ep = 1 - Math.pow(1 - p, 3);
      setMousePos({ x: startX + (targetX - startX) * ep, y: startY + (targetY - startY) * ep });
      if (p < 1) { requestAnimationFrame(animateMove); }
      else {
        setTimeout(() => {
          setMousePhase("clicking");
          setTimeout(() => { setMousePhase("done"); handleRun(); }, 350);
        }, 120);
      }
    }
    const tid = setTimeout(() => requestAnimationFrame(animateMove), 500);
    return () => clearTimeout(tid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeFinished]);

  /* ── Console lines ── */
  useEffect(() => {
    if (!running) return;
    let i = 0;
    function addLine() {
      if (i >= CONSOLE_LINES.length) return;
      setConsoleLines(prev => [...prev, CONSOLE_LINES[i]]);
      i++;
      setTimeout(addLine, 380);
    }
    const t = setTimeout(addLine, 200);
    return () => clearTimeout(t);
  }, [running]);

  /* ── Burst particles on run ── */
  function spawnParticles(x: number, y: number) {
    const colors = ["#3d9cff", "#9b5dff", "#00f5a0", "#ffbd2e", "#ff6b6b"];
    const newParticles = Array.from({ length: 12 }, () => ({
      id: particleId.current++,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)));
    }, 900);
  }

  function handleRun() {
    if (hasRun.current) return;
    hasRun.current = true;
    setRunClicked(true);
    setRunning(true);
    const btn = document.getElementById("hero-run-btn");
    if (btn) {
      const r = btn.getBoundingClientRect();
      const card = cardRef.current;
      if (card) {
        const cr = card.getBoundingClientRect();
        spawnParticles(r.left - cr.left + r.width / 2, r.top - cr.top + r.height / 2);
      }
    }
    setTimeout(() => setRunClicked(false), 400);
  }

  function renderToken(lineIdx: number, token: (typeof CODE_LINES)[0][0], tokenIdx: number) {
    if (token.t === "indent2") return <span key={tokenIdx} style={{ display: "inline-block", width: 24 }} />;
    if (token.t === "indent4") return <span key={tokenIdx} style={{ display: "inline-block", width: 48 }} />;
    const charsRevealed = revealed[lineIdx]?.[tokenIdx] ?? 0;
    const visible = token.v.slice(0, charsRevealed);
    if (!visible) return null;
    const cls: Record<string, string> = {
      kw: "c-kw", fn: "c-fn", var: "c-var", op: "c-op",
      str: "c-str", arr: "c-arr", cm: "c-cm", def: "c-def", br: "c-br",
    };
    return <span key={tokenIdx} className={cls[token.t] ?? "c-def"}>{visible}</span>;
  }

  return (
    <>
      <style>{`
        :root {
          --bg:#04040d;--bg2:#07071a;--border:rgba(255,255,255,0.08);
          --a1:#3d9cff;--a2:#9b5dff;--a3:#00f5a0;--a4:#ff6b6b;
          --text:#c8d0e0;--dim:#5a6478;--white:#fff;
          --mono:'JetBrains Mono',monospace;
        }

        .c-kw{color:#c792ea}
        .c-var{color:#82aaff}
        .c-op{color:#89ddff}
        .c-str{color:#c3e88d}
        .c-arr{color:#f78c6c}
        .c-cm{color:#546e7a;font-style:italic}
        .c-fn{color:#ffcb6b}
        .c-br{color:#f78c6c}
        .c-def{color:var(--text)}

        .code-card {
          position: relative;
          width: 100%;
          max-width: 560px;
          border-radius: 22px;
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          overflow: hidden;
          background: rgba(7,7,20,0.98);
          font-family: var(--mono);
        }
        .code-card-glow {
          position: absolute;
          inset: -1px;
          border-radius: 23px;
          z-index: -1;
          background: linear-gradient(135deg,rgba(61,156,255,0.25),rgba(155,93,255,0.25));
          filter: blur(14px);
          opacity: 0.6;
        }

        .code-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-bottom: 1px solid var(--border);
          background: rgba(10,10,22,0.95);
        }
        .dots { display:flex; gap:6px; }
        .dot { width:11px; height:11px; border-radius:50%; }
        .dot.red    { background:#ff5f57; box-shadow:0 0 5px rgba(255,95,87,0.4); }
        .dot.yellow { background:#ffbd2e; box-shadow:0 0 5px rgba(255,189,46,0.4); }
        .dot.green  { background:#28ca41; box-shadow:0 0 5px rgba(40,202,65,0.4); }
        .code-filename {
          margin: 0 auto;
          font-size: 11px;
          color: var(--dim);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .fname-dot {
          width:8px; height:8px; border-radius:50%;
          background:var(--a3);
          box-shadow:0 0 7px rgba(0,245,160,0.5);
        }

        .code-body {
          padding: 18px 0 18px;
          font-size: 12.5px;
          line-height: 1.95;
          min-height: 200px;
        }
        .code-line {
          display: flex;
          align-items: flex-start;
          padding: 0;
          transition: background .2s;
        }
        .code-line:hover { background: rgba(255,255,255,0.015); }
        .ln {
          min-width: 44px;
          text-align: right;
          padding-right: 14px;
          color: rgba(255,255,255,0.1);
          user-select: none;
          font-size: 11px;
          line-height: 1.95;
        }

        .hero-console {
          border-top: 1px solid var(--border);
          background: rgba(4,4,13,0.95);
          overflow: hidden;
        }
        .hero-console-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          border-bottom: 1px solid var(--border);
        }
        .hero-console-label {
          font-size: 10px;
          color: var(--dim);
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .hero-console-clear {
          font-size: 10px;
          color: var(--dim);
          cursor: pointer;
          transition: color .2s;
        }
        .hero-console-clear:hover { color: var(--a4); }
        .hero-console-output {
          padding: 10px 16px 14px;
          font-size: 11.5px;
          min-height: 48px;
          line-height: 1.8;
        }
        .con-line {
          display: flex;
          gap: 8px;
          align-items: baseline;
          opacity: 0;
          transform: translateY(5px);
          animation: conFadeIn .35s forwards;
        }
        @keyframes conFadeIn {
          to { opacity:1; transform:none; }
        }
        .con-arrow { color: var(--a1); }
        .con-arrow.ok { color: var(--a3); }
        .con-arrow.done { color: #ffbd2e; }
        .con-text-ok { color: var(--a3); }
        .con-text-cmd { color: var(--dim); font-style: italic; }
        .con-text-done { color: #ffbd2e; font-weight: 600; }

        .hero-run-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 12px;
          border-radius: 6px;
          border: none;
          background: var(--a3);
          color: #0a0a0a;
          font-size: 11px;
          font-weight: 700;
          font-family: var(--mono);
          cursor: pointer;
          opacity: 0;
          transform: scale(0.85) translateY(-2px);
          transition: opacity .3s ease, transform .3s ease, background .15s, box-shadow .15s;
          letter-spacing: .04em;
          box-shadow: 0 0 0 0 rgba(0,245,160,0);
          position: relative;
          overflow: hidden;
        }
        .hero-run-btn.visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        .hero-run-btn:hover {
          background: #1ffdb0;
          box-shadow: 0 0 16px rgba(0,245,160,0.5);
        }
        .hero-run-btn.pressed,
        .hero-run-btn:active {
          background: #00cc88;
          transform: scale(0.92) translateY(1px);
          box-shadow: 0 0 24px rgba(0,245,160,0.7);
        }
        .hero-run-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, transparent 70%);
          opacity: 0;
          transition: opacity .2s;
        }
        .hero-run-btn.pressed::after { opacity: 1; }

        .orb { position:absolute; border-radius:50%; pointer-events:none; }
        .orb1 { width:400px;height:400px;top:-120px;left:-100px;background:radial-gradient(circle,rgba(61,156,255,0.18) 0%,transparent 70%);filter:blur(70px); }
        .orb2 { width:320px;height:320px;bottom:-80px;right:-60px;background:radial-gradient(circle,rgba(155,93,255,0.15) 0%,transparent 70%);filter:blur(70px); }
        .orb3 { width:260px;height:260px;top:40%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(0,245,160,0.08) 0%,transparent 70%);filter:blur(60px); }

        .statusbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 18px;
          border-top: 1px solid var(--border);
          background: rgba(10,10,22,0.9);
          font-size: 10px;
          color: var(--dim);
          font-family: var(--mono);
        }
        .status-dot {
          width:6px;height:6px;border-radius:50%;background:var(--a3);
          box-shadow:0 0 0 0 rgba(0,245,160,0.5);
          animation:pulse-dot 2s infinite;
          display:inline-block;margin-right:5px;
        }
        @keyframes pulse-dot {
          0%,100%{box-shadow:0 0 0 0 rgba(0,245,160,0.5)}
          50%{box-shadow:0 0 0 4px rgba(0,245,160,0)}
        }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          pointer-events: none;
          animation: particleBurst .85s ease-out forwards;
        }
        @keyframes particleBurst {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(var(--dx),var(--dy)) scale(0); opacity: 0; }
        }

        @keyframes mouseRipple {
          from { transform: translate(-50%,-50%) scale(0.5); opacity:1; }
          to   { transform: translate(-50%,-50%) scale(2.5); opacity:0; }
        }

        .type-cur {
          display:inline-block;width:2px;height:.9em;
          background:var(--a1);vertical-align:middle;margin-left:1px;
          animation:blink 1s step-end infinite;
        }
      `}</style>

      <section id="home" style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", alignItems: "center", padding: "90px 24px 32px 24px", position: "relative", overflow: "hidden", fontFamily: "var(--mono)" }}>
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />

        <div className="wrapper" style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>

            <div>
              <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", fontSize: 12, color: "var(--a1)", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--a3)", boxShadow: "0 0 7px rgba(0,245,160,0.5)", display: "inline-block" }} />
                {"// welcome to my portfolio"}
              </div>

              <h1 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, color: "var(--white)", lineHeight: 1.15, marginBottom: 16, fontFamily: "'Oxanium', var(--mono)" }}>
                Hey, I&apos;m <br />
                <span style={{ background: "linear-gradient(135deg,var(--a1),var(--a2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Kaoutar IZI
                </span>
              </h1>

              <p style={{ fontSize: "1.1rem", color: "var(--text)", marginBottom: 16, minHeight: 28 }}>
                I&apos;m a{" "}
                <span style={{ color: "var(--a1)", fontWeight: 500 }}>{typedText}</span>
                <span style={{ animation: "blink 1s step-end infinite", display: "inline-block", width: 2, height: "1em", background: "var(--a1)", verticalAlign: "middle", marginLeft: 2 }} />
              </p>

              <p style={{ fontSize: "0.9rem", color: "var(--dim)", lineHeight: 1.8, maxWidth: 440, marginBottom: 32 }}>
                I design and code elegant solutions that transform ideas into seamless digital experiences. Driven by adaptability and a passion for building intuitive, user-centric applications.
              </p>

              <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
                <a href="KaoutarIziCv.pdf" download style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 10, background: "var(--a1)", color: "#0a0a0a", fontWeight: 700, fontSize: 13, textDecoration: "none", fontFamily: "var(--mono)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download CV
                </a>
                <a href="#projects" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 22px", borderRadius: 10, border: "1px solid var(--border)", color: "var(--text)", fontWeight: 600, fontSize: 13, textDecoration: "none", fontFamily: "var(--mono)", background: "rgba(255,255,255,0.03)" }}>
                  View Projects <span>→</span>
                </a>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { label: "GitHub", url: "https://github.com/kaoutarizi", icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
                  { label: "LinkedIn", url: "https://linkedin.com/in/kaoutar-izi", icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { label: "Email", url: "mailto:kaoutar.izi@example.com", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg> },
                ].map(s => (
<<<<<<< HEAD
                  <a key={s.label} href="instagram.com" aria-label={s.label} style={{ width: 40, height: 40, borderRadius: 10, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dim)", background: "rgba(255,255,255,0.02)", transition: "color .2s, border-color .2s, background .2s" }}
=======
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ width: 40, height: 40, borderRadius: 10, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--dim)", background: "rgba(255,255,255,0.02)", transition: "color .2s, border-color .2s, background .2s" }}
>>>>>>> f08aeb4 (update)
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--a1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,156,255,0.35)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--dim)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div ref={cardWrapRef} style={{ display: "flex", justifyContent: "center" }}>
              <div ref={cardRef} className="code-card">
                <div className="code-card-glow" />

                <div className="code-header">
                  <div className="dots">
                    <div className="dot red" />
                    <div className="dot yellow" />
                    <div className="dot green" />
                  </div>
                  <div className="code-filename">
                    <span className="fname-dot" />
                    developer.ts
                  </div>

                  <button
                    id="hero-run-btn"
                    className={`hero-run-btn${codeFinished ? " visible" : ""}${runClicked ? " pressed" : ""}`}
                    onClick={handleRun}
                    aria-label="Run code"
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><polygon points="2,1 11,6 2,11"/></svg>
                    Run
                  </button>
                </div>

                <div className="code-body">
                  {CODE_LINES.map((line, li) => (
                    <div key={li} className="code-line">
                      <span className="ln">{li + 1}</span>
                      {line.map((token, ti) => renderToken(li, token, ti))}
                      {!codeFinished && li === CODE_LINES.length - 1 && revealed[li]?.some(v => v > 0) && (
                        <span className="type-cur" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="hero-console">
                  <div className="hero-console-bar">
                    <span className="hero-console-label">Console</span>
                    <span className="hero-console-clear" onClick={() => {
                      setConsoleLines([]);
                      setRunning(false);
                      hasRun.current = false;
                    }}>
                      clear ✕
                    </span>
                  </div>
                  <div className="hero-console-output">
                    {consoleLines.length === 0 && (
                      <span style={{ color: "rgba(255,255,255,0.1)", fontSize: "0.72rem" }}>
                        {codeFinished ? "Click ▶ Run to execute…" : ""}
                      </span>
                    )}
                    {consoleLines.filter(Boolean).map((line, i) => (
                      <div key={i} className="con-line" style={{ animationDelay: `${i * 0.04}s` }}>
                        <span className={`con-arrow${line.type === "ok" ? " ok" : line.type === "done" ? " done" : ""}`}>
                          {line.type === "cmd" ? "$" : line.type === "done" ? "★" : "›"}
                        </span>
                        <span className={line.type === "ok" ? "con-text-ok" : line.type === "done" ? "con-text-done" : "con-text-cmd"}>
                          {line.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="statusbar">
                  <div>
                    <span className="status-dot" />
                    developer.ts · TypeScript
                  </div>
                  <div style={{ color: "var(--a3)" }}>UTF-8 · TS</div>
                </div>

                {particles.map((p, idx) => {
                  const angle = (idx / 12) * Math.PI * 2;
                  const dist = 40 + Math.random() * 30;
                  const dx = Math.cos(angle) * dist;
                  const dy = Math.sin(angle) * dist;
                  return (
                    <div
                      key={p.id}
                      className="particle"
                      style={{
                        left: p.x - 3,
                        top: p.y - 3,
                        background: p.color,
                        boxShadow: `0 0 6px ${p.color}`,
                        ["--dx" as string]: `${dx}px`,
                        ["--dy" as string]: `${dy}px`,
                        animationDelay: `${Math.random() * 0.1}s`,
                      } as React.CSSProperties}
                    />
                  );
                })}

                {(mousePhase === "moving" || mousePhase === "clicking") && (
                  <div
                    style={{
                      position: "absolute",
                      left: mousePos.x,
                      top: mousePos.y,
                      pointerEvents: "none",
                      zIndex: 50,
                      transform: "translate(-4px,-2px)",
                    }}
                  >
                    <svg width="22" height="26" viewBox="0 0 22 26" fill="none"
                      style={{
                        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
                        transform: mousePhase === "clicking" ? "scale(0.85)" : "scale(1)",
                        transition: "transform .15s ease",
                      }}
                    >
                      <path d="M4 2L17 12L10.5 13.5L14.5 21.5L11.5 23L7.5 15L4 18.5V2Z" fill="white" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                    {mousePhase === "clicking" && (
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 28, height: 28, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.6)", animation: "mouseRipple 0.4s ease-out forwards" }} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
