"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { BriefcaseIcon, WrenchIcon, LightningIcon } from "./icons";

export default function About() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img     = imgRef.current;
    if (!wrapper || !img) return;
    const restartGif = () => {
      const src = img.src;
      img.src   = "";
      img.src   = src;
    };
    wrapper.addEventListener("animationiteration", restartGif);
    return () => wrapper.removeEventListener("animationiteration", restartGif);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFlipped(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes peekInOut {
          0%   { transform: translateX(-100%); }
          18%  { transform: translateX(-2%);   }
          65%  { transform: translateX(-2%);   }
          70%  { transform: translateX(-12%);  }
          76%  { transform: translateX(-2%);   }
          90%  { transform: translateX(-2%);   }
          100% { transform: translateX(-100%); }
        }

        @keyframes peekInOutRight {
          0%   { transform: translateX(100%); }
          18%  { transform: translateX(2%);   }
          65%  { transform: translateX(2%);   }
          70%  { transform: translateX(12%);  }
          76%  { transform: translateX(2%);   }
          90%  { transform: translateX(2%);   }
          100% { transform: translateX(100%); }
        }

        .peek-avatar {
          position: fixed !important;
          bottom: 0 !important;
          z-index: 9999 !important;
          pointer-events: none;
          display: block !important;
        }

        .peek-avatar.from-left {
          left: -110px !important;
          right: auto !important;
          animation: peekInOut 10s ease-in-out 1s infinite !important;
        }

        .peek-avatar.from-right {
          right: -100px !important;
          left: auto !important;
          animation: peekInOutRight 10s ease-in-out 1s infinite !important;
        }

        .peek-avatar img {
          display: block;
          width: clamp(300px, 24vw, 320px);
          height: auto;
          filter: drop-shadow(2px 21px 24px rgba(139,92,246,0.6));
        }

        .peek-avatar.from-right img {
          transform: scaleX(-1);
        }

        #about {
          position: relative;
          padding-bottom: clamp(60px, 10vw, 140px);
        }
      `}</style>

      {/* ── Avatar ── */}
      <div
        className={`peek-avatar ${flipped ? "from-right" : "from-left"}`}
        ref={wrapperRef}
      >
        <img ref={imgRef} src="/assets/test.gif" alt="avatar" />
      </div>

      <section id="about" ref={sectionRef}>
        <div className="wrapper">

          <Reveal>
            <div className="section-tag">// about me</div>
            <h2 className="section-title">Who  <span>Am I?</span></h2>
            <div className="section-line" />
          </Reveal>

          <div className="about-grid" style={{ marginTop: 56 }}>

            <Reveal className="reveal-delay-1">
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div className="profile-header-text">
                    <h3>Profile Data</h3>
                    <span>// instance.json</span>
                  </div>
                </div>

                <div className="code-data">
                  <div className="code-row">
                    <span className="c-kw"  style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>const</span>
                    <span className="c-var" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>fullName</span>
                    <span className="c-str" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>&quot;Kaoutar IZI&quot;</span>
                  </div>
                  <div className="code-row">
                    <span className="c-kw"  style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>const</span>
                    <span className="c-var" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>role</span>
                    <span className="c-str" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>&quot;Fullstack Dev&quot;</span>
                  </div>
                  <div className="code-row">
                    <span className="c-kw"  style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>const</span>
                    <span className="c-var" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>location</span>
                    <span className="c-str" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>&quot;Tanger, Morocco&quot;</span>
                  </div>
                  <div className="code-row">
                    <span className="c-kw"  style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>let</span>
                    <span className="c-var" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>learning</span>
                    <span className="c-arr" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:".78rem"}}>[&quot;Angular&quot;,&quot;TS&quot;]</span>
                  </div>
                </div>

                <div className="motto-block">
                  <div className="motto-comment">// Motto</div>
                  <div className="motto-text">&quot;Living, learning, &amp; Purpose-driven code, human-first solutions...&quot;</div>
                </div>
              </div>
            </Reveal>

            <Reveal className="reveal-delay-2">
              <div className="about-text-block">
<p className="about-para">
  I&apos;m <strong>Kaoutar Izi</strong> — a Full-Stack Developer
  who believes code should solve real problems,
  not just run without errors.
</p>

<p className="about-para">
  I&apos;ve built complete production systems for companies
  in aviation and industrial manufacturing — alone,
  from the first meeting to the final deployment.
</p>

<p className="about-para">
  At <strong>MK Aero</strong>, I automated an entire HR training process
  — cutting 15+ hours of manual work weekly.
  At <strong>Souriau</strong>, everything lived in Excel and VBA sheets.
  I built a proper defect tracking system from scratch —
  centralized storage, instant search, and clear comparisons.
</p>

<p className="about-para">
  Currently building <strong>Fazaa</strong> — an AI-powered platform
  that analyzes thousands of product reviews
  and turns them into clear decisions.
</p>

<p className="about-para">
  I don&apos;t wait to be told what to build.
  I understand the problem first.
</p>

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon"><BriefcaseIcon /></div>
                    <div className="stat-num">3+</div>
                    <div className="stat-label">Years Exp.</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon"><WrenchIcon /></div>
                    <div className="stat-num">8+</div>
                    <div className="stat-label">Projects</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon"><LightningIcon /></div>
                    <div className="stat-num">8+</div>
                    <div className="stat-label">Technologies</div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </>
  );
}