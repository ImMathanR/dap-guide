"use client";

import React, { useState } from "react";

export default function Tabs({
  tabs,
}: {
  tabs: { label: string; content: React.ReactNode }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="my-4">
      <div className="flex border-b border-dap-border overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              active === i
                ? "text-dap-request border-b-2 border-dap-request"
                : "text-dap-muted hover:text-dap-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 msg-slide-in" key={active}>
        {tabs[active].content}
      </div>
    </div>
  );
}
