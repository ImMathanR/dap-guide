"use client";

import React from "react";

export default function ArchitectureDiagram() {
  return (
    <div className="my-8 overflow-x-auto">
      <svg
        viewBox="0 0 900 320"
        className="w-full max-w-4xl mx-auto"
        style={{ minWidth: "600px" }}
      >
        <defs>
          <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#58a6ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#58a6ff" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="adapterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bc8cff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#bc8cff" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="debuggeeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3fb950" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3fb950" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <marker id="arrowRight" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#58a6ff" opacity="0.8" />
          </marker>
          <marker id="arrowLeft" markerWidth="10" markerHeight="10" refX="1" refY="5" orient="auto">
            <path d="M10,0 L0,5 L10,10 z" fill="#3fb950" opacity="0.8" />
          </marker>
        </defs>

        {/* Client Box */}
        <rect x="30" y="60" width="220" height="200" rx="12" fill="url(#clientGrad)" stroke="#58a6ff" strokeWidth="1.5" opacity="0.9" />
        <text x="140" y="100" textAnchor="middle" fill="#58a6ff" fontSize="16" fontWeight="700">Development Tool</text>
        <text x="140" y="125" textAnchor="middle" fill="#8b949e" fontSize="12">(IDE / Editor)</text>

        {/* Client internals */}
        <rect x="55" y="145" width="170" height="30" rx="6" fill="rgba(88,166,255,0.1)" stroke="#58a6ff" strokeWidth="0.5" />
        <text x="140" y="165" textAnchor="middle" fill="#e6edf3" fontSize="11">Debug UI / Controls</text>
        <rect x="55" y="185" width="170" height="30" rx="6" fill="rgba(88,166,255,0.1)" stroke="#58a6ff" strokeWidth="0.5" />
        <text x="140" y="205" textAnchor="middle" fill="#e6edf3" fontSize="11">DAP Client Library</text>
        <rect x="55" y="225" width="170" height="22" rx="6" fill="rgba(88,166,255,0.08)" stroke="#58a6ff" strokeWidth="0.5" />
        <text x="140" y="240" textAnchor="middle" fill="#8b949e" fontSize="10">VS Code, Neovim, Emacs...</text>

        {/* Adapter Box */}
        <rect x="340" y="60" width="220" height="200" rx="12" fill="url(#adapterGrad)" stroke="#bc8cff" strokeWidth="1.5" opacity="0.9" />
        <text x="450" y="100" textAnchor="middle" fill="#bc8cff" fontSize="16" fontWeight="700">Debug Adapter</text>
        <text x="450" y="125" textAnchor="middle" fill="#8b949e" fontSize="12">(Intermediary)</text>

        <rect x="365" y="145" width="170" height="30" rx="6" fill="rgba(188,140,255,0.1)" stroke="#bc8cff" strokeWidth="0.5" />
        <text x="450" y="165" textAnchor="middle" fill="#e6edf3" fontSize="11">Protocol Translation</text>
        <rect x="365" y="185" width="170" height="30" rx="6" fill="rgba(188,140,255,0.1)" stroke="#bc8cff" strokeWidth="0.5" />
        <text x="450" y="205" textAnchor="middle" fill="#e6edf3" fontSize="11">DAP ↔ Native Debug API</text>
        <rect x="365" y="225" width="170" height="22" rx="6" fill="rgba(188,140,255,0.08)" stroke="#bc8cff" strokeWidth="0.5" />
        <text x="450" y="240" textAnchor="middle" fill="#8b949e" fontSize="10">kotlin-debug-adapter, java-debug</text>

        {/* Debuggee Box */}
        <rect x="650" y="60" width="220" height="200" rx="12" fill="url(#debuggeeGrad)" stroke="#3fb950" strokeWidth="1.5" opacity="0.9" />
        <text x="760" y="100" textAnchor="middle" fill="#3fb950" fontSize="16" fontWeight="700">Debuggee</text>
        <text x="760" y="125" textAnchor="middle" fill="#8b949e" fontSize="12">(Target Program)</text>

        <rect x="675" y="145" width="170" height="30" rx="6" fill="rgba(63,185,80,0.1)" stroke="#3fb950" strokeWidth="0.5" />
        <text x="760" y="165" textAnchor="middle" fill="#e6edf3" fontSize="11">Application Code</text>
        <rect x="675" y="185" width="170" height="30" rx="6" fill="rgba(63,185,80,0.1)" stroke="#3fb950" strokeWidth="0.5" />
        <text x="760" y="205" textAnchor="middle" fill="#e6edf3" fontSize="11">JVM / Runtime</text>
        <rect x="675" y="225" width="170" height="22" rx="6" fill="rgba(63,185,80,0.08)" stroke="#3fb950" strokeWidth="0.5" />
        <text x="760" y="240" textAnchor="middle" fill="#8b949e" fontSize="10">Kotlin/Java Application</text>

        {/* DAP Protocol Arrow */}
        <line x1="255" y1="155" x2="335" y2="155" stroke="#58a6ff" strokeWidth="1.5" markerEnd="url(#arrowRight)" strokeDasharray="4,3">
          <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="335" y1="170" x2="255" y2="170" stroke="#3fb950" strokeWidth="1.5" markerEnd="url(#arrowLeft)" strokeDasharray="4,3">
          <animate attributeName="stroke-dashoffset" from="0" to="14" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Label: DAP */}
        <rect x="268" y="130" width="48" height="18" rx="4" fill="#161b22" stroke="#30363d" strokeWidth="1" />
        <text x="292" y="143" textAnchor="middle" fill="#58a6ff" fontSize="10" fontWeight="600">DAP</text>

        {/* Native API Arrow */}
        <line x1="565" y1="155" x2="645" y2="155" stroke="#bc8cff" strokeWidth="1.5" markerEnd="url(#arrowRight)" strokeDasharray="4,3">
          <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="645" y1="170" x2="565" y2="170" stroke="#f0883e" strokeWidth="1.5" markerEnd="url(#arrowLeft)" strokeDasharray="4,3">
          <animate attributeName="stroke-dashoffset" from="0" to="14" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Label: Native */}
        <rect x="572" y="130" width="62" height="18" rx="4" fill="#161b22" stroke="#30363d" strokeWidth="1" />
        <text x="603" y="143" textAnchor="middle" fill="#bc8cff" fontSize="10" fontWeight="600">JDWP/JDI</text>

        {/* Protocol labels below arrows */}
        <text x="292" y="195" textAnchor="middle" fill="#8b949e" fontSize="9">JSON messages</text>
        <text x="292" y="207" textAnchor="middle" fill="#8b949e" fontSize="9">over stdio/socket</text>
        <text x="603" y="195" textAnchor="middle" fill="#8b949e" fontSize="9">Native debug API</text>
        <text x="603" y="207" textAnchor="middle" fill="#8b949e" fontSize="9">(JVM Debug Interface)</text>

        {/* Flowing dots */}
        <circle r="3" fill="#58a6ff" filter="url(#glow)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M260,155 L330,155" />
          <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="3" fill="#3fb950" filter="url(#glow)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M330,170 L260,170" />
          <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="3" fill="#bc8cff" filter="url(#glow)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M570,155 L640,155" />
          <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle r="3" fill="#f0883e" filter="url(#glow)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M640,170 L570,170" />
          <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Title */}
        <text x="450" y="30" textAnchor="middle" fill="#e6edf3" fontSize="14" fontWeight="600">DAP Architecture</text>
        <text x="450" y="48" textAnchor="middle" fill="#8b949e" fontSize="11">The three-actor model of the Debug Adapter Protocol</text>

        {/* Bottom legend */}
        <circle cx="270" cy="290" r="4" fill="#58a6ff" />
        <text x="280" y="294" fill="#8b949e" fontSize="10">Request</text>
        <circle cx="340" cy="290" r="4" fill="#3fb950" />
        <text x="350" y="294" fill="#8b949e" fontSize="10">Response</text>
        <circle cx="420" cy="290" r="4" fill="#f0883e" />
        <text x="430" y="294" fill="#8b949e" fontSize="10">Event</text>
        <circle cx="490" cy="290" r="4" fill="#bc8cff" />
        <text x="500" y="294" fill="#8b949e" fontSize="10">Native API</text>
      </svg>
    </div>
  );
}
