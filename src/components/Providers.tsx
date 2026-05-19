"use client";

import { useEffect, useRef, useCallback } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const bttRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  // Custom cursor
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX + "px";
      cursorRef.current.style.top = e.clientY + "px";
    }
  }, []);

  const animateRing = useCallback(() => {
    const { x: mx, y: my } = mouseRef.current;
    ringPosRef.current.x += (mx - ringPosRef.current.x) * 0.1;
    ringPosRef.current.y += (my - ringPosRef.current.y) * 0.1;
    if (ringRef.current) {
      ringRef.current.style.left = ringPosRef.current.x + "px";
      ringRef.current.style.top = ringPosRef.current.y + "px";
    }
    requestAnimationFrame(animateRing);
  }, []);

  // Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    interface Particle {
      x: number; y: number; r: number; vx: number; vy: number;
      alpha: number; color: string; reset: () => void;
    }
    const particles: Particle[] = [];
    const colors = ["rgba(61,156,255,", "rgba(155,93,255,", "rgba(0,245,160,"];

    function createParticle(): Particle {
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        reset() {
          this.x = Math.random() * W; this.y = Math.random() * H;
          this.r = Math.random() * 1.2 + 0.2;
          this.vx = (Math.random() - 0.5) * 0.25;
          this.vy = (Math.random() - 0.5) * 0.25;
          this.alpha = Math.random() * 0.5 + 0.1;
          this.color = colors[Math.floor(Math.random() * colors.length)];
        },
      };
    }

    for (let i = 0; i < 120; i++) particles.push(createParticle());

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = W; canvas!.height = H;
    }
    window.addEventListener("resize", resize);

    function animate() {
      ctx!.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -5 || p.x > W + 5 || p.y < -5 || p.y > H + 5) p.reset();
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color + p.alpha + ")";
        ctx!.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (progressRef.current) progressRef.current.style.width = scrollPct * 100 + "%";
      if (bttRef.current) bttRef.current.classList.toggle("visible", window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cursor hover
  useEffect(() => {
    const targets = document.querySelectorAll("a, button, .soft-card, .project-card, .stat-card, .skill-group");
    function onEnter() {
      if (cursorRef.current) {
        cursorRef.current.style.width = "20px";
        cursorRef.current.style.height = "20px";
        cursorRef.current.style.background = "var(--accent2)";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "60px";
        ringRef.current.style.height = "60px";
        ringRef.current.style.borderColor = "rgba(155,93,255,0.5)";
      }
    }
    function onLeave() {
      if (cursorRef.current) {
        cursorRef.current.style.width = "12px";
        cursorRef.current.style.height = "12px";
        cursorRef.current.style.background = "var(--accent1)";
      }
      if (ringRef.current) {
        ringRef.current.style.width = "40px";
        ringRef.current.style.height = "40px";
        ringRef.current.style.borderColor = "rgba(61,156,255,0.5)";
      }
    }
    targets.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => {
      targets.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    animateRing();
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, animateRing]);

  return (
    <>
      {/* Global UI */}
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
      <div id="progress-bar" ref={progressRef} />
      <canvas id="particle-canvas" ref={canvasRef} />
      <div className="noise-overlay" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div
        id="back-to-top"
        ref={bttRef}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </div>

      {/* Page content */}
      {children}
    </>
  );
}