"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Skill {
  name: string;
  icon: string;
}

interface ProjectData {
  desktop: string;
  url: string;
}

const skills: Skill[] = [
  {
    name: "Liferay",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "WordPress",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Photoshop",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
  },
   {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
];

const projectMockups: Record<number, ProjectData> = {
  0: {
    desktop: "/src/1.png",
    url: "https://ptg.melaka.gov.my/portal/ms/",
  },
  1: {
    desktop: "/src/2.png",
    url: "https://ipoh.mboutiquehotels.com/",
  },
  2: {
    desktop: "/src/3.png",
    url: "https://www.ellarockqueen.com/",
  },
  3: {
    desktop: "/src/4.png",
    url: "https://vcyberiz.com/",
  },
};

export default function Page() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [currentProjectIdx, setCurrentProjectIdx] = useState<number>(0);
  const [imgOpacity, setImgOpacity] = useState<number>(1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  // Cursor states
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });

  // Hero Dotted Circle
  const dottedCircleRef = useRef<HTMLDivElement | null>(null);

  // Projects Section Ref
  const brikkenHeroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());

    // Scroll Handlers
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Header scrolled state
      setIsScrolled(scrollY > 40);

      // Back to top visibility
      setShowBackToTop(scrollY > 300);

      // Hero dotted circle parallax
      if (dottedCircleRef.current) {
        dottedCircleRef.current.style.transform = `translateY(${
          scrollY * 0.15
        }px) rotate(${scrollY * 0.2}deg)`;
      }

      // Featured Projects Scroll Sequence
      if (brikkenHeroRef.current) {
        const heroRect = brikkenHeroRef.current.getBoundingClientRect();
        const heroHeight = brikkenHeroRef.current.offsetHeight - window.innerHeight;

        if (heroHeight > 0) {
          let progress = -heroRect.top / heroHeight;
          progress = Math.max(0, Math.min(1, progress));

          const activeIndex = Math.min(
            Math.floor(progress * 4),
            3
          );

          if (activeIndex !== currentProjectIdx) {
            setCurrentProjectIdx(activeIndex);
            setImgOpacity(0.3);
            setTimeout(() => {
              setImgOpacity(1);
            }, 150);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for Reveal Class
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Custom Cursor Movement
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateCursor = () => {
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.1;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.1;

      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${glowPos.current.x}px`;
        cursorGlowRef.current.style.top = `${glowPos.current.y}px`;
      }
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    if (window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
      animationFrameId = requestAnimationFrame(animateCursor);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [currentProjectIdx]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentProject = projectMockups[currentProjectIdx];

  return (
    <>
      {/* Custom Gradient Glow Cursor */}
      <div className="cursor-glow" id="cursorGlow" ref={cursorGlowRef}></div>
      <div className="cursor-dot" id="cursorDot" ref={cursorDotRef}></div>

      {/* Header */}
      <header className={`header ${isScrolled ? "scrolled" : ""}`} id="header">
        <div className="container header__inner">
          <a href="#home" className="logo">
            MA<span>.</span>
          </a>
          <nav className="nav">
            <a href="#about" className="nav__link">
              About
            </a>
            <a href="#skills" className="nav__link">
              Skills
            </a>
            <a href="#projects" className="nav__link">
              Work
            </a>
            <a href="#contact" className="nav__link btn--nav">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* SECTION 1: HERO / INTRODUCTION */}
        <section className="hero-intro" id="home">
          <div className="container hero-intro__grid">
            <div className="hero-intro__text reveal">
              <span className="hero__tag">Web Developer · UI/UX Designer</span>
              <h1 className="hero__title">
                Hi, I'm <span className="highlight">Mirza Afrina</span>
              </h1>
              <p className="hero__sub">
                Crafting immersive web experiences with Liferay DXP, WordPress, and clean modern frontend interactions.
              </p>
              <div className="hero__actions">
                <a href="#projects" className="btn btn--primary">
                  View My Work ↓
                </a>
                <a href="#contact" className="btn btn--outline">
                  Contact Me
                </a>
              </div>
            </div>

            {/* Center Portrait with Animated Dotted Circle Parallax */}
            <div className="hero-intro__visual reveal">
              <div className="dotted-circle" id="dottedCircle" ref={dottedCircleRef}></div>
              <div className="portrait-container">
                <img src="/src/afrina2.png" alt="Mirza Afrina" className="hero-portrait" />
              </div>
              <div className="floating-badge floating-badge--2">
                ✨ Liferay, WP & Front-end Developer
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01 — PROFILE / ABOUT ME */}
        <section className="section" id="about">
          <div className="container">
            <div className="section__header reveal">
              <span className="section__tag">01 — Profile</span>
              <h2 className="section__title">About Me</h2>
            </div>

            <div className="glass-grid">
              {/* Glassmorphism Card 1 */}
              <div className="glass-card reveal">
                <div className="glass-card__icon">🎯</div>
                <h3>Objective</h3>
                <p>
                  Passionate Web Developer committed to creating functional, visually captivating digital solutions that deliver memorable user experiences.
                </p>
              </div>

              {/* Glassmorphism Card 2 */}
              <div className="glass-card reveal">
                <div className="glass-card__icon">💼</div>
                <h3>Current Role</h3>
                <div className="role-badge">Web Developer</div>
                <h4 className="company-name">Puncak Tegap Sdn Bhd</h4>
                <p>
                  Specializing in building state government portals and commercial hospitality platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02 — STACK */}
        <section className="section" id="skills">
          <div className="container">
            <div className="section__header reveal">
              <span className="section__tag">02 — Stack</span>
              <h2 className="section__title">Tools & Tech</h2>
            </div>
            <div className="skills-grid" id="skillsGrid">
              {skills.map((s, idx) => (
                <div key={idx} className="skill-chip reveal">
                  <img src={s.icon} alt={s.name} />
                  <span>{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 03 — FEATURED PROJECTS */}
        <section className="brikken-hero" id="projects" ref={brikkenHeroRef}>
          <div className="brikken-sticky">
            {/* Left Side: Interactive Typography Stack */}
            <div className="brikken-left">
              <span className="section__tag">03 — Featured Work</span>
              <div className="project-titles-stack">
                <h1 className={`p-title ${currentProjectIdx === 0 ? "active" : ""}`} data-index="0">
                  STATE PORTALS
                </h1>
                <h1 className={`p-title ${currentProjectIdx === 1 ? "active" : ""}`} data-index="1">
                  HOTEL PLATFORMS
                </h1>
                <h1 className={`p-title ${currentProjectIdx === 2 ? "active" : ""}`} data-index="2">
                  ELLA ROCK QUEEN
                </h1>
                <h1 className={`p-title ${currentProjectIdx === 3 ? "active" : ""}`} data-index="3">
                  VCYBERIZ
                </h1>
              </div>
              <p className="brikken-sub">Scroll down to explore project details and mockups.</p>
            </div>

            {/* Right Side: Device Frame Mockup + Floating Glass Cards */}
            <div className="brikken-right">
              <div className="brikken-interactive-stage">
                {/* Interactive Image Mockup Display */}
                <div className="mockup-frame desktop-view" id="mockupFrame">
                  <div className="mockup-header">
                    <div className="window-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <div className="mockup-url-bar" id="mockupUrlBar">
                      {currentProject.url}
                    </div>
                  </div>
                  <div className="mockup-body">
                    <img
                      id="mockupImg"
                      src={currentProject.desktop}
                      alt="Project Preview Mockup"
                      className="mockup-screen-img"
                      style={{ opacity: imgOpacity, transition: "opacity 0.3s ease" }}
                    />
                  </div>
                </div>

                {/* Floating Glassmorphism Cards Stack */}
                <div className="brikken-cards-container">
                  {/* Card 01 */}
                  <div
                    className={`brikken-card ${currentProjectIdx === 0 ? "active" : ""}`}
                    id="card-0"
                    data-url="https://ptg.melaka.gov.my/portal/ms/"
                  >
                    <div className="card-header-flex">
                      <span className="card-num">01 / 04</span>
                    </div>
                    <h3>PTG & PDT State Portals</h3>
                    <p>Government portal solutions engineered for Melaka, Perak, Kedah, and Wilayah Persekutuan.</p>
                    <div className="tech-tags">
                      <span className="tech-tag">Liferay DXP</span>
                      <span className="tech-tag">CSS3</span>
                      <span className="tech-tag">JS</span>
                    </div>
                    <a
                      href="https://ptg.melaka.gov.my/portal/ms/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      Visit Official Site ↗
                    </a>
                  </div>

                  {/* Card 02 */}
                  <div
                    className={`brikken-card ${currentProjectIdx === 1 ? "active" : ""}`}
                    id="card-1"
                    data-url="https://ipoh.mboutiquehotels.com/"
                  >
                    <div className="card-header-flex">
                      <span className="card-num">02 / 04</span>
                    </div>
                    <h3>M Boutique Hotel</h3>
                    <p>Responsive, luxury hotel showcase sites built with interactive features and booking focus.</p>
                    <div className="tech-tags">
                      <span className="tech-tag">WordPress</span>
                      <span className="tech-tag">UI/UX</span>
                    </div>
                    <a
                      href="https://ipoh.mboutiquehotels.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      Visit Official Site ↗
                    </a>
                  </div>

                  {/* Card 03 */}
                  <div
                    className={`brikken-card ${currentProjectIdx === 2 ? "active" : ""}`}
                    id="card-2"
                    data-url="https://www.ellarockqueen.com/"
                  >
                    <div className="card-header-flex">
                      <span className="card-num">03 / 04</span>
                    </div>
                    <h3>Ella Rock Queen</h3>
                    <p>Official e-commerce and brand platform tailored for rock-inspired fashion apparel.</p>
                    <div className="tech-tags">
                      <span className="tech-tag">WordPress</span>
                      <span className="tech-tag">E-Commerce</span>
                    </div>
                    <a
                      href="https://www.ellarockqueen.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      Visit Official Site ↗
                    </a>
                  </div>

                  {/* Card 04 */}
                  <div
                    className={`brikken-card ${currentProjectIdx === 3 ? "active" : ""}`}
                    id="card-3"
                    data-url="https://vcyberiz.com/"
                  >
                    <div className="card-header-flex">
                      <span className="card-num">04 / 04</span>
                    </div>
                    <h3>VCyberiz</h3>
                    <p>Cybersecurity agency web platform prototype and full production build.</p>
                    <div className="tech-tags">
                      <span className="tech-tag">Figma</span>
                      <span className="tech-tag">WordPress</span>
                    </div>
                    <a
                      href="https://vcyberiz.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      Visit Official Site ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04 — GET IN TOUCH */}
        <section className="section" id="contact">
          <div className="container">
            <div className="section__header reveal">
              <span className="section__tag">04 — Get in Touch</span>
              <h2 className="section__title">Let's Connect</h2>
            </div>

            <div className="contact-glass-card reveal">
              <div className="contact-glass__info">
                <h3>Contact Details</h3>
                <p>
                  <strong>Name:</strong> Mirza Afrina Binti Yusof
                </p>
                <p>
                  <strong>Role:</strong> Web Developer
                </p>
                <p>
                  <strong>Company:</strong> Puncak Tegap Sdn Bhd
                </p>
              </div>

              <form id="contactForm" action="https://formspree.io/f/xwlepwnb" method="POST">
                <div className="form-row">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required placeholder="Your name" />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required placeholder="you@example.com" />
                </div>
                <div className="form-row">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={4} required placeholder="Say hello..."></textarea>
                </div>
                <button type="submit" id="submitBtn" className="btn btn--primary btn--full">
                  Send Message
                </button>
                <p className="form-note" id="formNote" hidden></p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <a href="#home" className="logo">
              MA<span>.</span>
            </a>
            <p>Crafting modern web experiences with pastel polish.</p>
          </div>

          <div className="footer__links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Work</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer__bottom">
            <p>© <span id="year">{year}</span> Mirza Afrina Binti Yusof. Built with Next.js & CSS.</p>
            <a href="#home" className="footer__top-link">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Back To Top Button */}
      <button
        id="backToTop"
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}