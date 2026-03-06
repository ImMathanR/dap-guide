"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

type FlowStep = {
  direction: "right" | "left";
  label: string;
  type: "request" | "response" | "event";
  delay: number;
};

const TYPE_COLORS = {
  request: { bg: "rgba(88,166,255,0.12)", border: "#58a6ff", text: "#58a6ff", dot: "#58a6ff" },
  response: { bg: "rgba(63,185,80,0.12)", border: "#3fb950", text: "#3fb950", dot: "#3fb950" },
  event: { bg: "rgba(240,136,62,0.12)", border: "#f0883e", text: "#f0883e", dot: "#f0883e" },
};

export default function MessageFlowAnimation({
  steps,
  title,
}: {
  steps: FlowStep[];
  title?: string;
}) {
  const [activeStep, setActiveStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const play = useCallback(() => {
    setIsPlaying(true);
    setActiveStep(-1);

    let current = 0;
    const advance = () => {
      if (current < steps.length) {
        setActiveStep(current);
        current++;
        timeoutRef.current = setTimeout(advance, steps[current - 1]?.delay || 800);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsPlaying(false);
          setActiveStep(-1);
        }, 1500);
      }
    };
    timeoutRef.current = setTimeout(advance, 400);
  }, [steps]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="my-6 p-4 bg-dap-surface border border-dap-border rounded-xl">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-dap-text">{title}</h4>
          <button
            onClick={play}
            disabled={isPlaying}
            className="px-3 py-1.5 text-xs font-medium bg-dap-request/20 text-dap-request border border-dap-request/30 rounded-lg hover:bg-dap-request/30 transition-colors disabled:opacity-50"
          >
            {isPlaying ? "Playing..." : "▶ Play"}
          </button>
        </div>
      )}

      {/* Flow container */}
      <div className="relative">
        {/* Client / Adapter labels */}
        <div className="flex justify-between mb-3 px-2">
          <span className="text-xs font-medium text-dap-request">Client</span>
          <span className="text-xs font-medium text-dap-accent">Adapter</span>
        </div>

        {/* Messages */}
        <div className="space-y-2">
          {steps.map((step, i) => {
            const colors = TYPE_COLORS[step.type];
            const isActive = i <= activeStep;
            const isCurrent = i === activeStep;

            return (
              <div
                key={i}
                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-500 ${
                  isActive ? "opacity-100" : "opacity-30"
                } ${isCurrent ? "scale-[1.02]" : ""}`}
                style={{
                  background: isActive ? colors.bg : "transparent",
                  borderLeft: isActive ? `2px solid ${colors.border}` : "2px solid transparent",
                }}
              >
                {step.direction === "right" ? (
                  <>
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors.dot }}
                    />
                    <span
                      className="text-xs font-mono flex-1"
                      style={{ color: colors.text }}
                    >
                      {step.label}
                    </span>
                    <svg width="20" height="12" className="flex-shrink-0">
                      <line x1="0" y1="6" x2="16" y2="6" stroke={colors.border} strokeWidth="1.5" />
                      <polygon points="14,2 20,6 14,10" fill={colors.border} />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg width="20" height="12" className="flex-shrink-0">
                      <polygon points="6,2 0,6 6,10" fill={colors.border} />
                      <line x1="4" y1="6" x2="20" y2="6" stroke={colors.border} strokeWidth="1.5" />
                    </svg>
                    <span
                      className="text-xs font-mono flex-1 text-right"
                      style={{ color: colors.text }}
                    >
                      {step.label}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors.dot }}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
