"use client";

import React from "react";

function highlightJson(json: string): string {
  return json.replace(
    /("(?:\\.|[^"\\])*")\s*:/g,
    '<span class="json-key">$1</span>:'
  ).replace(
    /:\s*("(?:\\.|[^"\\])*")/g,
    ': <span class="json-string">$1</span>'
  ).replace(
    /:\s*(\d+(?:\.\d+)?)/g,
    ': <span class="json-number">$1</span>'
  ).replace(
    /:\s*(true|false)/g,
    ': <span class="json-boolean">$1</span>'
  ).replace(
    /:\s*(null)/g,
    ': <span class="json-null">$1</span>'
  );
}

export default function JsonBlock({
  json,
  title,
  type,
}: {
  json: string;
  title?: string;
  type?: "request" | "response" | "event";
}) {
  const borderColor =
    type === "request"
      ? "border-dap-request/30"
      : type === "response"
      ? "border-dap-response/30"
      : type === "event"
      ? "border-dap-event/30"
      : "border-dap-border";

  const glowClass =
    type === "request"
      ? "glow-request"
      : type === "response"
      ? "glow-response"
      : type === "event"
      ? "glow-event"
      : "";

  return (
    <div className={`code-block ${glowClass} border ${borderColor} my-4`}>
      {title && (
        <div
          className={`px-4 py-2 border-b ${borderColor} flex items-center gap-2 text-sm`}
        >
          {type && (
            <span
              className={`badge-${type} px-2 py-0.5 rounded-full text-xs font-medium`}
            >
              {type.toUpperCase()}
            </span>
          )}
          <span className="text-dap-muted font-mono">{title}</span>
        </div>
      )}
      <pre
        className="p-4 overflow-x-auto text-sm"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        dangerouslySetInnerHTML={{ __html: highlightJson(json) }}
      />
    </div>
  );
}
