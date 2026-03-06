"use client";

import React, { useState, useEffect } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "messages", label: "Messages" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "requests", label: "Requests" },
  { id: "events", label: "Events" },
  { id: "session", label: "Live Session" },
];

export default function Navbar() {
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el?.offsetTop ?? 0 };
      });

      const scrollPos = window.scrollY + 150;
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (scrollPos >= offsets[i].top) {
          setActive(offsets[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "bg-dap-bg/90 backdrop-blur-xl border-b border-dap-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => scrollTo("overview")}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-dap-request to-dap-accent flex items-center justify-center">
              <span className="text-white text-xs font-bold">D</span>
            </div>
            <span className="text-sm font-bold text-dap-text">
              DAP<span className="text-dap-muted font-normal ml-1">Guide</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  active === s.id
                    ? "bg-dap-request/15 text-dap-request"
                    : "text-dap-muted hover:text-dap-text hover:bg-dap-surface"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-dap-muted hover:text-dap-text"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-dap-border space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`block w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  active === s.id
                    ? "bg-dap-request/15 text-dap-request"
                    : "text-dap-muted hover:text-dap-text hover:bg-dap-surface"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
