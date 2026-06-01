"use client";
import { useState } from "react";
import Reveal from "./Reveal";
const IMG_FAZAA = ("./assets/images/fazaa.png");
const IMG_BIOLOOP = ("./assets/images/bioloop.png");
const IMG_BOOK = ("./assets/images/book.png");
const IMG_FOOD = ("./assets/images/food.png");
const IMG_DIRECTION = ("./assets/images/direction.png");
const IMG_NFT = ("./assets/images/nft.png");
const IMG_MIZA = ("./assets/images/miza.png");
const IMG_TODO = ("./assets/images/todo.png");
const IMG_CALCULATOR = ("./assets/images/calculator.png");
const IMG_GUIDANCE = ("./assets/images/guidance.png");
const IMG_WONDER_REALM = ("./assets/images/movieKids.png");


const LIVE_FAZAA = ("./assets/vedios/testvid.mp4");
const LIVE_BOOK = ("./assets/vedios/book.mp4");
const LIVE_DIRECTION = ("./assets/vedios/derction.mp4");
const LIVE_NFT = ("./assets/vedios/nft.mp4");
const LIVE_MIZA = ("./assets/vedios/MISA.mp4");
const LIVE_TODO = ("./assets/vedios/todo.mp4");
const LIVE_GUIDANCE = ("./assets/vedios/guide.mp4");
const LIVE_CALCULATOR = ("./assets/vedios/Calculator.mp4");
const LIVE_MovieKids = ("./assets/vedios/movieKids.mp4");
const LIVE_FOOD = ("./assets/vedios/food.mp4");




const projects = [
  {
    id: 1,
    category: "WebCreations",
    bg: "linear-gradient(135deg,#3d9cff,#9b5dff)",
    image: IMG_FAZAA,
    title: "Fazaa — AI Skincare Advisor",
    desc: "Arabic-first AI platform that analyzes real reviews from Amazon SA, X, and Instagram to deliver trusted, data-backed skincare recommendations — matching each user's concern to verified experiences from people with the same problem.",
    tags: ["Next.js", "Claude API", "Groq LLaMA", "n8n", "Arabic NLP", "SerpAPI"],
    live: LIVE_FAZAA, github: "#",
  },
  {
    id: 2,
    category: "WebCreations",
    bg: "linear-gradient(135deg,#22c55e,#16a34a)",
    image: IMG_BIOLOOP,
    title: "BIOLOOP — Smart Waste Management",
    desc: "Bilingual (FR/AR) landing page for an IoT smart waste management startup. Features dark mode, appointment modal with EmailJS, team showcase, and RTL support.",
    tags: ["Angular 19", "TypeScript", "Tailwind CSS", "EmailJS", "i18n"],
    live: "https://smartbinn.github.io/FE_TEST/", github: "https://github.com/SMARTBINN/FE_TEST/tree/dev",
  },
  {
    id: 3,
    category: "WebCreations",
    bg: "linear-gradient(135deg,#f97316,#ef4444)",
    image: IMG_BOOK,
    title: "Old Book Management System",
    desc: "A platform for buying and selling used books with reader notes to preserve cultural value and promote knowledge exchange.",
    tags: ["React", "PHP", "MySQL", "API", "Bootstrap"],
     live:LIVE_BOOK,github: "https://github.com/IZI1996/book-nest",
  },
  {
     id: 4,
  category: "Full Stack",
  bg: "linear-gradient(135deg, #818cf8, #6366f1, #4f46e5)",
  image: IMG_WONDER_REALM,
  title: "Wonder Realm",
  desc: "A safe and joyful digital world for children — designed with passion, featuring smart age-based content filtering, smooth animations, and a trustworthy experience for both kids and parents.",
  tags: ["React.js", "SCSS", "API", "CSS Animations"],
 live: LIVE_MovieKids, github: "https://lnkd.in/eQx3hN98",
},
  {
    id: 5,
    category: "WebCreations",
    bg: "linear-gradient(135deg,#facc15,#f97316)",
    image: IMG_FOOD,
    title: "FlavorFusion",
    desc: "An app to explore dishes via API, display ingredients, save favorites, and discover new culinary experiences.",
    tags: ["React", "CSS", "API", "PHP", "SQL"],
     live: LIVE_FOOD ,github: "https://github.com/IZI1996/Food",
  },
  {
    id: 6,
    category: "WebCreations",
    bg: "linear-gradient(135deg,#60a5fa,#6366f1)",
    image: IMG_DIRECTION,
    title: "Direction",
    desc: "An inspiring platform to help people discover their passion and connect with like-minded individuals on their journey.",
    tags: ["React", "HTML", "CSS", "API", "PHP"],
    live: LIVE_DIRECTION, github: "https://github.com/IZI1996/fil-rouge/blob/master/guide/views/index.php",
  },
  {
    id: 7,
    category: "WebCreations",
    bg: "linear-gradient(135deg,#34d399,#14b8a6)",
    image: IMG_GUIDANCE,
    title: "Guidance Platform",
    desc: "A complementary platform to the passion discovery app helping users take the next step in their journey with guidance and clarity.",
    tags: ["React", "HTML", "API", "PHP", "SQL"],
    live: LIVE_GUIDANCE, github: "https://github.com/IZI1996/fil-rouge/tree/master/guide/views",
  },
  {
    id: 8,
    category: "WebCreations",
    bg: "linear-gradient(135deg,#a855f7,#ec4899)",
    image: IMG_NFT,
    title: "NFT Showcase",
    desc: "A demo site showcasing color harmony, 3D images, and modern UI design principles for digital assets.",
    tags: ["React", "HTML", "CSS", "PHP", "SQL"],
     live: LIVE_NFT ,github: "https://github.com/IZI1996/nft",
  },
  {
    id: 9,
    category: "WebCreations",
    bg: "linear-gradient(135deg,#38bdf8,#3b82f6)",
    image: IMG_MIZA,
    title: "AI Misa Solutions",
    desc: "Landing page for an AI robot product — Misa at the service of humans. Communicates, plays, educates, and protects children.",
    tags: ["React", "HTML", "CSS", "API", "PHP"],
     live: LIVE_MIZA, github: "https://github.com/IZI1996/miisa",
  },
  {
    id: 10,
    category: "Lightweight",
    bg: "linear-gradient(135deg,#22d3ee,#3b82f6)",
    image: IMG_TODO,
    title: "ToDo List Application",
    desc: "A simple yet functional ToDo List application to manage daily tasks efficiently with a clean, intuitive interface.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      live: LIVE_TODO ,github: "https://github.com/IZI1996/todo-react",
  },
  {
    id: 11,
    category: "Lightweight",
    bg: "linear-gradient(135deg,#94a3b8,#64748b)",
    image: IMG_CALCULATOR,
    title: "Basic Calculator",
    desc: "A small project for a calculator capable of performing basic arithmetic operations with a clean design.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
     live:LIVE_CALCULATOR,
     github: "https://github.com/IZI1996/Calculator-main",
  },
  

 
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = project.desc.length > 110;

  return (
    <div className="project-card" data-category={project.category}>

      {/* ── Thumbnail ── */}
      <div className="project-thumb">
        <img src={project.image} alt={project.title} />
        <div className="project-thumb-overlay" />
        <div className="project-actions">
          <a href={project.live} className="project-action-btn" target="_blank" rel="noopener noreferrer" aria-label="Live preview">↗</a>
          <a href={project.github} className="project-action-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">⌥</a>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="project-body">
        <div className="project-cat">{project.category}</div>
        <h3 className="project-title">{project.title}</h3>

        <div className="project-desc-wrapper">
          <p className={`project-desc${expanded ? " expanded" : ""}`}>
            {project.desc}
          </p>
          {isLong && (
            <button
              className={`read-more-btn${expanded ? " expanded" : ""}`}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");

  return (
    <section id="projects">
      <div className="wrapper">
        <div className="projects-header">
          <div>
            <div className="section-tag">// my projects</div>
            <h2 className="section-title">Selected <span>Work</span></h2>
            <div className="section-line" />
          </div>
          <div className="filters">
            {[
              { key: "all",          label: "All"         },
              { key: "WebCreations", label: "Web Apps"    },
              { key: "Lightweight",  label: "Lightweight" },
            ].map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((proj, i) => {
            const visible = filter === "all" || proj.category === filter;
            return (
              <div
                key={proj.id}
                style={{ display: visible ? "contents" : "none" }}
              >
                <Reveal className={`reveal-delay-${(i % 3) + 1}`}>
                  <ProjectCard project={proj} />
                </Reveal>
              </div>
            );
          })}
        </div>

        {projects.filter(
          (p) => filter === "all" || p.category === filter
        ).length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#fff" }}>
            No projects match the selected filter.
          </div>
        )}
      </div>
    </section>
  );
}
