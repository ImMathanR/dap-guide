"use client";

import React, { useState } from "react";

export default function Collapsible({
  title,
  children,
  defaultOpen = false,
  badge,
  badgeType,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  badgeType?: "request" | "response" | "event";
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-dap-border rounded-lg my-3 overflow-hidden hover-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center gap-3 text-left bg-dap-surface hover:bg-dap-surface/80 transition-colors"
      >
        <svg
          className={`w-4 h-4 text-dap-muted transition-transform flex-shrink-0 ${
            open ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {badge && (
          <span
            className={`badge-${badgeType || "request"} px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0`}
          >
            {badge}
          </span>
        )}
        <span className="font-medium text-sm">{title}</span>
      </button>
      <div className={`collapsible-content ${open ? "expanded" : ""}`}>
        <div className="px-4 py-4 border-t border-dap-border">{children}</div>
      </div>
    </div>
  );
}
