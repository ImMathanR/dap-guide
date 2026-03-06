"use client";

import React from "react";

const TYPE_COLORS = {
  request: { dot: "bg-dap-request", ring: "ring-dap-request/30", line: "from-dap-request/50" },
  response: { dot: "bg-dap-response", ring: "ring-dap-response/30", line: "from-dap-response/50" },
  event: { dot: "bg-dap-event", ring: "ring-dap-event/30", line: "from-dap-event/50" },
};

export default function TimelineStep({
  type,
  title,
  description,
  children,
  isLast = false,
}: {
  type: "request" | "response" | "event";
  title: string;
  description?: string;
  children?: React.ReactNode;
  isLast?: boolean;
}) {
  const colors = TYPE_COLORS[type];

  return (
    <div className="relative flex gap-4 pb-8">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[0.6875rem] top-6 bottom-0 w-px bg-gradient-to-b from-dap-border to-transparent" />
      )}

      {/* Dot */}
      <div className="flex-shrink-0 pt-1">
        <div className={`w-3.5 h-3.5 rounded-full ${colors.dot} ring-4 ${colors.ring}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`badge-${type} px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider`}>
            {type}
          </span>
          <h4 className="text-sm font-semibold text-dap-text font-mono">{title}</h4>
        </div>
        {description && (
          <p className="text-sm text-dap-muted mt-1">{description}</p>
        )}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
}
