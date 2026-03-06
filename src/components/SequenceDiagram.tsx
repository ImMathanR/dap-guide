"use client";

import React from "react";

type Message = {
  from: "client" | "adapter";
  to: "client" | "adapter";
  label: string;
  type: "request" | "response" | "event";
  note?: string;
};

const LIFELINE_COLORS = {
  client: "#58a6ff",
  adapter: "#bc8cff",
};

const TYPE_COLORS = {
  request: "#58a6ff",
  response: "#3fb950",
  event: "#f0883e",
};

export default function SequenceDiagram({
  title,
  messages,
}: {
  title: string;
  messages: Message[];
}) {
  const leftX = 120;
  const rightX = 580;
  const startY = 80;
  const rowHeight = 50;
  const height = startY + messages.length * rowHeight + 40;

  return (
    <div className="my-6 overflow-x-auto">
      <svg
        viewBox={`0 0 700 ${height}`}
        className="w-full max-w-3xl mx-auto"
        style={{ minWidth: "500px" }}
      >
        <defs>
          <filter id="seqGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Title */}
        <text x="350" y="25" textAnchor="middle" fill="#e6edf3" fontSize="14" fontWeight="600">
          {title}
        </text>

        {/* Participant boxes */}
        <rect x={leftX - 55} y="40" width="110" height="30" rx="6" fill="rgba(88,166,255,0.15)" stroke="#58a6ff" strokeWidth="1" />
        <text x={leftX} y="60" textAnchor="middle" fill="#58a6ff" fontSize="12" fontWeight="600">Client (IDE)</text>

        <rect x={rightX - 65} y="40" width="130" height="30" rx="6" fill="rgba(188,140,255,0.15)" stroke="#bc8cff" strokeWidth="1" />
        <text x={rightX} y="60" textAnchor="middle" fill="#bc8cff" fontSize="12" fontWeight="600">Debug Adapter</text>

        {/* Lifelines */}
        <line x1={leftX} y1="70" x2={leftX} y2={height - 10} stroke="#58a6ff" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
        <line x1={rightX} y1="70" x2={rightX} y2={height - 10} stroke="#bc8cff" strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />

        {/* Messages */}
        {messages.map((msg, i) => {
          const y = startY + i * rowHeight;
          const color = TYPE_COLORS[msg.type];
          const isLeftToRight = msg.from === "client";
          const x1 = isLeftToRight ? leftX : rightX;
          const x2 = isLeftToRight ? rightX : leftX;

          return (
            <g key={i}>
              {/* Arrow line */}
              <line
                x1={x1 + (isLeftToRight ? 5 : -5)}
                y1={y}
                x2={x2 + (isLeftToRight ? -10 : 10)}
                y2={y}
                stroke={color}
                strokeWidth="1.5"
                opacity="0.8"
              />
              {/* Arrowhead */}
              <polygon
                points={
                  isLeftToRight
                    ? `${x2 - 10},${y - 4} ${x2 - 1},${y} ${x2 - 10},${y + 4}`
                    : `${x2 + 10},${y - 4} ${x2 + 1},${y} ${x2 + 10},${y + 4}`
                }
                fill={color}
                opacity="0.8"
              />
              {/* Label */}
              <text
                x={350}
                y={y - 8}
                textAnchor="middle"
                fill={color}
                fontSize="11"
                fontWeight="500"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {msg.label}
              </text>
              {/* Type badge */}
              {msg.note && (
                <text
                  x={350}
                  y={y + 16}
                  textAnchor="middle"
                  fill="#8b949e"
                  fontSize="9"
                >
                  {msg.note}
                </text>
              )}
              {/* Dots on lifelines */}
              <circle cx={x1} cy={y} r="3" fill={LIFELINE_COLORS[msg.from]} />
              <circle cx={x2} cy={y} r="3" fill={LIFELINE_COLORS[msg.to]} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
