"use client";

import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { href: "#home", label: "Home", num: "01." },
  { href: "#about", label: "About", num: "02." },
  { href: "#skills", label: "Skills", num: "03." },
  { href: "#projects", label: "Projects", num: "04." },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Scroll listener ────────────────────────────
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60);

      const sections = ["home", "about", "skills", "projects", "contact"];
      let current = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id;
        }
      });
      setActiveSection(current);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Smooth scroll ──────────────────────────────
  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    document.body.style.overflow = "";
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // ── Mobile menu body lock ──────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="wrapper nav-inner">
          <a
            href="#home"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
          >
            &#x3C;KI /&#x3E;
          </a>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-num={link.num}
                className={activeSection === link.href.slice(1) ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
          >
            Contact Me
          </a>

          <div
            className={`hamburger ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        {[...navLinks, { href: "#contact", label: "Contact", num: "05." }].map(
          (link) => (
            <a
              key={link.href}
              href={link.href}
              style={
                link.href === "#contact"
                  ? { color: "var(--accent1)" }
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
            >
              {link.label}
            </a>
          )
        )}
      </div>
    </>
  );
}