"use client";

import React from "react";

function highlightKotlin(code: string): string {
  const keywords = [
    "fun", "val", "var", "if", "else", "when", "return", "class", "object",
    "package", "import", "for", "while", "do", "in", "is", "as", "try",
    "catch", "finally", "throw", "override", "open", "abstract", "sealed",
    "data", "companion", "suspend", "tailrec", "private", "public",
    "protected", "internal", "const", "lateinit", "by", "lazy",
  ];

  let result = code;

  // Comments
  result = result.replace(/(\/\/.*$)/gm, '<span class="kt-comment">$1</span>');

  // Strings
  result = result.replace(/("(?:\\.|[^"\\])*")/g, '<span class="kt-string">$1</span>');

  // Annotations
  result = result.replace(/@(\w+)/g, '<span class="kt-annotation">@$1</span>');

  // Numbers
  result = result.replace(/\b(\d+[Ll]?)\b/g, '<span class="kt-number">$1</span>');

  // Keywords
  keywords.forEach((kw) => {
    const re = new RegExp(`\\b(${kw})\\b`, "g");
    result = result.replace(re, '<span class="kt-keyword">$1</span>');
  });

  // Types (capitalized words that aren't in strings/comments)
  result = result.replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="kt-type">$1</span>');

  // Function names after fun keyword
  result = result.replace(
    /(<span class="kt-keyword">fun<\/span>\s+)(\w+)/g,
    '$1<span class="kt-function">$2</span>'
  );

  return result;
}

export default function KotlinBlock({
  code,
  title,
  lineNumbers = true,
}: {
  code: string;
  title?: string;
  lineNumbers?: boolean;
}) {
  const lines = code.split("\n");
  const highlighted = highlightKotlin(code);
  const highlightedLines = highlighted.split("\n");

  return (
    <div className="code-block border border-dap-border my-4">
      {title && (
        <div className="px-4 py-2 border-b border-dap-border flex items-center gap-2 text-sm">
          <span className="text-dap-accent text-xs font-medium px-2 py-0.5 rounded-full bg-dap-accent/10 border border-dap-accent/30">
            Kotlin
          </span>
          <span className="text-dap-muted font-mono">{title}</span>
        </div>
      )}
      <pre
        className="p-4 overflow-x-auto text-sm"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {highlightedLines.map((line, i) => (
          <div key={i} className="flex">
            {lineNumbers && (
              <span className="text-dap-muted/50 select-none w-8 text-right mr-4 flex-shrink-0">
                {i + 1}
              </span>
            )}
            <span dangerouslySetInnerHTML={{ __html: line || " " }} />
          </div>
        ))}
      </pre>
    </div>
  );
}
