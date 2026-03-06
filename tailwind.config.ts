import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dap: {
          bg: "#0d1117",
          surface: "#161b22",
          border: "#30363d",
          text: "#e6edf3",
          muted: "#8b949e",
          request: "#58a6ff",
          response: "#3fb950",
          event: "#f0883e",
          accent: "#bc8cff",
          highlight: "#1f6feb",
        },
      },
      animation: {
        "slide-right": "slideRight 1.5s ease-in-out infinite",
        "slide-left": "slideLeft 1.5s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "msg-flow": "msgFlow 2s ease-in-out forwards",
        "msg-flow-back": "msgFlowBack 2s ease-in-out forwards",
        "bounce-in": "bounceIn 0.6s ease-out",
      },
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        slideLeft: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(88,166,255,0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(88,166,255,0.6)" },
        },
        msgFlow: {
          "0%": { left: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { left: "calc(100% - 12px)", opacity: "0" },
        },
        msgFlowBack: {
          "0%": { right: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { right: "calc(100% - 12px)", opacity: "0" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
