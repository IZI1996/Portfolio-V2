"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { BriefcaseIcon, WrenchIcon, LightningIcon } from "./icons";

export default function About() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);

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

        .peek-avatar {
          position: fixed !important;
          left: -110px  !important;
          bottom: 0  !important;
          z-index: 9999 !important;
          pointer-events: none;
          animation: peekInOut 10s ease-in-out 1s infinite !important;
          display: block !important;
        }

        .peek-avatar img {
          display: block;
          width: clamp(300px, 24vw, 320px);
          height: auto;
          filter: drop-shadow(5px 106px 24px rgba(139,92,246,0.6));
        }

        #about {
          position: relative;
          padding-bottom: clamp(60px, 10vw, 140px);
        }
      `}</style>

      {/* ── Avatar ── */}
      <div className="peek-avatar" ref={wrapperRef}>
        <img ref={imgRef} src="/assets/test.gif" alt="avatar" />
      </div>

      <section id="about">
        <div className="wrapper">

          <Reveal>
            <div className="section-tag">// about me</div>
            <h2 className="section-title">Who <span>Am I?</span></h2>
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
                  I&apos;m <strong>Kaoutar Izi</strong>, a passionate Fullstack Developer who believes
                  every project should carry a meaningful purpose beyond just lines of code.
                  Whether it&apos;s preserving cultural values, simplifying access to knowledge,
                  or enhancing user experiences — I build solutions that truly matter.
                </p>
                <p className="about-para">
                  My technical expertise covers both frontend and backend development. On the frontend,
                  I&apos;m skilled in HTML, CSS, JavaScript, and frameworks like Bootstrap and React.
                  On the backend, I work with PHP, MySQL, and RESTful APIs. Currently expanding
                  with Angular and TypeScript.
                </p>
                <p className="about-para">
                  During my internships at <strong>Souriau</strong> and <strong>MK Aero</strong>,
                  I contributed to full‑cycle projects — from designing user interfaces to implementing
                  backend logic and deploying applications.
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