"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import SequenceDiagram from "@/components/SequenceDiagram";
import MessageFlowAnimation from "@/components/MessageFlowAnimation";
import JsonBlock from "@/components/JsonBlock";
import KotlinBlock from "@/components/KotlinBlock";
import Collapsible from "@/components/Collapsible";
import Tabs from "@/components/Tabs";
import ScrollReveal from "@/components/ScrollReveal";
import TimelineStep from "@/components/TimelineStep";

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{children}</h2>
      {sub && <p className="mt-2 text-dap-muted text-base md:text-lg">{sub}</p>}
    </div>
  );
}

function Pill({ type, children }: { type: "request" | "response" | "event"; children: React.ReactNode }) {
  return (
    <span className={`badge-${type} inline-flex px-2.5 py-1 rounded-full text-xs font-semibold`}>
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dap-request/5 via-transparent to-transparent" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-dap-request/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-dap-accent/5 rounded-full blur-3xl" />
        </div>
        <Section id="overview" className="pt-28 md:pt-36 pb-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-dap-surface border border-dap-border rounded-full text-xs text-dap-muted mb-6">
                <span className="w-1.5 h-1.5 bg-dap-response rounded-full animate-pulse" />
                Microsoft Debug Adapter Protocol v1.66
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Debug Adapter
                <br />
                <span className="bg-gradient-to-r from-dap-request via-dap-accent to-dap-response bg-clip-text text-transparent">
                  Protocol Guide
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-dap-muted leading-relaxed max-w-2xl mx-auto">
                A comprehensive visual reference to DAP&mdash;the JSON-based protocol that standardizes
                communication between development tools and debuggers. With Kotlin &amp; Java examples.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Pill type="request">Requests</Pill>
                <Pill type="response">Responses</Pill>
                <Pill type="event">Events</Pill>
              </div>
            </div>
          </ScrollReveal>
        </Section>
      </div>

      {/* WHAT IS DAP */}
      <Section id="what-is-dap">
        <ScrollReveal>
          <SectionTitle sub="How DAP eliminates the M x N debugger integration problem">
            What is the Debug Adapter Protocol?
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-sm text-dap-muted leading-relaxed">
              <p>
                The <strong className="text-dap-text">Debug Adapter Protocol (DAP)</strong> is a JSON-based protocol
                created by Microsoft that standardizes how development tools (IDEs and editors)
                communicate with debuggers.
              </p>
              <p>
                Before DAP, every IDE needed a custom integration for every debugger&mdash;creating an
                <strong className="text-dap-text"> M &times; N problem</strong>. With M editors and N debugger backends,
                you needed M&times;N integrations. DAP reduces this to <strong className="text-dap-text">M + N</strong>:
                each editor implements one DAP client, and each debugger provides one DAP adapter.
              </p>
              <p>
                DAP uses a <strong className="text-dap-text">request-response pattern</strong> with
                asynchronous events. Messages are JSON objects transported over stdin/stdout or TCP sockets,
                framed with HTTP-style <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded">Content-Length</code> headers.
              </p>
            </div>
            <div className="bg-dap-surface border border-dap-border rounded-xl p-5">
              <h4 className="text-sm font-semibold mb-4">Transport Framing</h4>
              <div className="code-block border border-dap-border">
                <pre className="p-4 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
{`Content-Length: 119\\r\\n
\\r\\n
{
  "seq": 1,
  "type": "request",
  "command": "initialize",
  "arguments": {
    "clientID": "vscode",
    "adapterID": "kotlin"
  }
}`}
                </pre>
              </div>
              <p className="mt-3 text-xs text-dap-muted">
                Each message is preceded by a header with <code className="text-dap-accent">Content-Length</code> followed by CRLFCRLF, then the JSON payload.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ARCHITECTURE */}
      <Section id="architecture">
        <ScrollReveal>
          <SectionTitle sub="Client, Adapter, Debuggee: the three-actor model">
            Architecture
          </SectionTitle>
          <ArchitectureDiagram />
          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              {
                title: "Client",
                desc: "The IDE or editor (VS Code, Neovim, IntelliJ). Provides debug UI for breakpoints, stepping, variable inspection. Sends DAP requests.",
                color: "text-dap-request",
              },
              {
                title: "Debug Adapter",
                desc: "The intermediary that translates DAP into native debug APIs. For Kotlin/JVM: the kotlin-debug-adapter or java-debug server using JDWP.",
                color: "text-dap-accent",
              },
              {
                title: "Debuggee",
                desc: "The target program being debugged. Runs on the JVM with the debug agent enabled (-agentlib:jdwp). Controlled via the adapter.",
                color: "text-dap-response",
              },
            ].map((item) => (
              <div key={item.title} className="bg-dap-surface border border-dap-border rounded-xl p-5 hover-card">
                <h4 className={`text-sm font-bold ${item.color} mb-2`}>{item.title}</h4>
                <p className="text-xs text-dap-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* MESSAGE TYPES */}
      <Section id="messages">
        <ScrollReveal>
          <SectionTitle sub="Three message types: Request, Response, and Event">
            Protocol Messages
          </SectionTitle>

          <Tabs
            tabs={[
              {
                label: "Request",
                content: (
                  <div>
                    <p className="text-sm text-dap-muted mb-4">
                      Requests are sent by the client to the adapter. Each request has a unique <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded">seq</code> number,
                      a <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded">command</code> name, and optional <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded">arguments</code>.
                    </p>
                    <JsonBlock
                      title="Request base structure"
                      type="request"
                      json={`{
  "seq": 1,
  "type": "request",
  "command": "initialize",
  "arguments": {
    "clientID": "vscode",
    "clientName": "Visual Studio Code",
    "adapterID": "kotlin",
    "pathFormat": "path",
    "linesStartAt1": true,
    "columnsStartAt1": true,
    "supportsVariableType": true,
    "supportsVariablePaging": true,
    "supportsRunInTerminalRequest": true
  }
}`}
                    />
                  </div>
                ),
              },
              {
                label: "Response",
                content: (
                  <div>
                    <p className="text-sm text-dap-muted mb-4">
                      Responses are sent from the adapter to the client. They reference the original request
                      via <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded">request_seq</code> and <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded">command</code>.
                    </p>
                    <JsonBlock
                      title="Response base structure"
                      type="response"
                      json={`{
  "seq": 1,
  "type": "response",
  "request_seq": 1,
  "command": "initialize",
  "success": true,
  "body": {
    "supportsConfigurationDoneRequest": true,
    "supportsFunctionBreakpoints": true,
    "supportsConditionalBreakpoints": true,
    "supportsEvaluateForHovers": true,
    "supportsSetVariable": true,
    "exceptionBreakpointFilters": [
      { "filter": "caught", "label": "Caught Exceptions" },
      { "filter": "uncaught", "label": "Uncaught Exceptions", "default": true }
    ]
  }
}`}
                    />
                  </div>
                ),
              },
              {
                label: "Event",
                content: (
                  <div>
                    <p className="text-sm text-dap-muted mb-4">
                      Events are sent asynchronously from the adapter to the client when something
                      noteworthy happens (breakpoint hit, program output, thread created, etc.).
                    </p>
                    <JsonBlock
                      title="Event base structure"
                      type="event"
                      json={`{
  "seq": 5,
  "type": "event",
  "event": "stopped",
  "body": {
    "reason": "breakpoint",
    "description": "Paused on breakpoint",
    "threadId": 1,
    "allThreadsStopped": true,
    "hitBreakpointIds": [1]
  }
}`}
                    />
                  </div>
                ),
              },
              {
                label: "Error Response",
                content: (
                  <div>
                    <p className="text-sm text-dap-muted mb-4">
                      When a request fails, the adapter sends a response with <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded">success: false</code>.
                    </p>
                    <JsonBlock
                      title="Error response"
                      type="response"
                      json={`{
  "seq": 12,
  "type": "response",
  "request_seq": 8,
  "command": "evaluate",
  "success": false,
  "message": "Cannot evaluate expression",
  "body": {
    "error": {
      "id": 2001,
      "format": "Cannot evaluate '{expression}' in current context",
      "variables": { "expression": "someUndefinedVar" }
    }
  }
}`}
                    />
                  </div>
                ),
              },
            ]}
          />
        </ScrollReveal>
      </Section>

      {/* LIFECYCLE */}
      <Section id="lifecycle">
        <ScrollReveal>
          <SectionTitle sub="From initialization to disconnect — the complete session lifecycle">
            Debug Session Lifecycle
          </SectionTitle>

          <SequenceDiagram
            title="Complete DAP Session Flow"
            messages={[
              { from: "client", to: "adapter", label: "initialize", type: "request", note: "Negotiate capabilities" },
              { from: "adapter", to: "client", label: "initialize response", type: "response", note: "Return adapter capabilities" },
              { from: "adapter", to: "client", label: "initialized event", type: "event", note: "Adapter is ready" },
              { from: "client", to: "adapter", label: "setBreakpoints", type: "request", note: "Set breakpoints in source files" },
              { from: "adapter", to: "client", label: "setBreakpoints response", type: "response" },
              { from: "client", to: "adapter", label: "setExceptionBreakpoints", type: "request" },
              { from: "adapter", to: "client", label: "setExceptionBreakpoints response", type: "response" },
              { from: "client", to: "adapter", label: "configurationDone", type: "request", note: "All configuration sent" },
              { from: "adapter", to: "client", label: "configurationDone response", type: "response" },
              { from: "client", to: "adapter", label: "launch", type: "request", note: "Start debuggee" },
              { from: "adapter", to: "client", label: "launch response", type: "response" },
              { from: "adapter", to: "client", label: "process event", type: "event", note: "Process started" },
              { from: "adapter", to: "client", label: "thread event", type: "event", note: "Thread started" },
              { from: "adapter", to: "client", label: "stopped event", type: "event", note: "Hit breakpoint!" },
              { from: "client", to: "adapter", label: "stackTrace", type: "request", note: "Inspect call stack" },
              { from: "adapter", to: "client", label: "stackTrace response", type: "response" },
              { from: "client", to: "adapter", label: "scopes", type: "request" },
              { from: "adapter", to: "client", label: "scopes response", type: "response" },
              { from: "client", to: "adapter", label: "variables", type: "request", note: "Get variable values" },
              { from: "adapter", to: "client", label: "variables response", type: "response" },
              { from: "client", to: "adapter", label: "continue", type: "request", note: "Resume execution" },
              { from: "adapter", to: "client", label: "continue response", type: "response" },
              { from: "adapter", to: "client", label: "terminated event", type: "event", note: "Program finished" },
              { from: "client", to: "adapter", label: "disconnect", type: "request" },
              { from: "adapter", to: "client", label: "disconnect response", type: "response" },
            ]}
          />

          <MessageFlowAnimation
            title="Session Initialization Flow"
            steps={[
              { direction: "right", label: "initialize request", type: "request", delay: 1000 },
              { direction: "left", label: "initialize response (capabilities)", type: "response", delay: 800 },
              { direction: "left", label: "initialized event", type: "event", delay: 600 },
              { direction: "right", label: "setBreakpoints", type: "request", delay: 800 },
              { direction: "left", label: "setBreakpoints response", type: "response", delay: 600 },
              { direction: "right", label: "configurationDone", type: "request", delay: 800 },
              { direction: "left", label: "configurationDone response", type: "response", delay: 600 },
              { direction: "right", label: "launch", type: "request", delay: 1000 },
              { direction: "left", label: "launch response", type: "response", delay: 600 },
              { direction: "left", label: "process event", type: "event", delay: 500 },
              { direction: "left", label: "thread event (started)", type: "event", delay: 500 },
            ]}
          />

          <div className="mt-8 bg-dap-surface border border-dap-border rounded-xl p-5">
            <h4 className="text-sm font-semibold mb-3">Lifecycle Phases</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { phase: "1. Initialize", desc: "Client and adapter negotiate capabilities", color: "text-dap-request" },
                { phase: "2. Configure", desc: "Set breakpoints, exception filters, function breakpoints", color: "text-dap-accent" },
                { phase: "3. Run / Debug", desc: "Launch or attach, then step/continue through code", color: "text-dap-response" },
                { phase: "4. Terminate", desc: "Disconnect, clean up debuggee process", color: "text-dap-event" },
              ].map((p) => (
                <div key={p.phase} className="p-3 rounded-lg bg-dap-bg border border-dap-border">
                  <h5 className={`text-xs font-bold ${p.color} mb-1`}>{p.phase}</h5>
                  <p className="text-xs text-dap-muted">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* REQUESTS REFERENCE */}
      <Section id="requests">
        <ScrollReveal>
          <SectionTitle sub="All major DAP request types with JSON examples">
            Request Reference
          </SectionTitle>

          <Collapsible title="initialize — Negotiate capabilities" badge="initialize" badgeType="request" defaultOpen>
            <p className="text-sm text-dap-muted mb-3">
              The first request sent by the client. Informs the adapter about client capabilities and receives
              adapter capabilities in return. Must be sent before any other request.
            </p>
            <Tabs tabs={[
              {
                label: "Request",
                content: (
                  <JsonBlock type="request" title="initialize request" json={`{
  "seq": 1,
  "type": "request",
  "command": "initialize",
  "arguments": {
    "clientID": "vscode",
    "clientName": "Visual Studio Code",
    "adapterID": "kotlin",
    "locale": "en-us",
    "linesStartAt1": true,
    "columnsStartAt1": true,
    "pathFormat": "path",
    "supportsVariableType": true,
    "supportsVariablePaging": true,
    "supportsRunInTerminalRequest": true,
    "supportsMemoryReferences": true,
    "supportsInvalidatedEvent": true
  }
}`} />
                ),
              },
              {
                label: "Response",
                content: (
                  <JsonBlock type="response" title="initialize response (capabilities)" json={`{
  "seq": 1,
  "type": "response",
  "request_seq": 1,
  "command": "initialize",
  "success": true,
  "body": {
    "supportsConfigurationDoneRequest": true,
    "supportsFunctionBreakpoints": true,
    "supportsConditionalBreakpoints": true,
    "supportsHitConditionalBreakpoints": true,
    "supportsEvaluateForHovers": true,
    "supportsSetVariable": true,
    "supportsStepBack": false,
    "supportsRestartFrame": false,
    "supportsCompletionsRequest": true,
    "supportsExceptionOptions": true,
    "supportsExceptionInfoRequest": true,
    "supportsTerminateRequest": true,
    "exceptionBreakpointFilters": [
      { "filter": "caught", "label": "Caught Exceptions" },
      { "filter": "uncaught", "label": "Uncaught Exceptions", "default": true }
    ]
  }
}`} />
                ),
              },
            ]} />
          </Collapsible>

          <Collapsible title="launch — Start debugging a program" badge="launch" badgeType="request">
            <p className="text-sm text-dap-muted mb-3">
              Asks the adapter to launch the debuggee. For Kotlin/JVM, this typically launches the JVM with debug instrumentation.
            </p>
            <KotlinBlock title="main.kt — The program to debug" code={`package com.example.debug

fun factorial(n: Int): Long {
    if (n <= 1) return 1L
    return n * factorial(n - 1)
}

fun main() {
    val number = 5
    println("Computing factorial of $number")
    val result = factorial(number)
    println("factorial($number) = $result")
}`} />
            <JsonBlock type="request" title="launch request (Kotlin)" json={`{
  "seq": 5,
  "type": "request",
  "command": "launch",
  "arguments": {
    "type": "kotlin",
    "name": "Launch Factorial",
    "request": "launch",
    "mainClass": "com.example.debug.MainKt",
    "projectRoot": "/home/dev/factorial-project",
    "classPaths": ["/home/dev/factorial-project/build/classes/kotlin/main"],
    "vmArguments": "-Xmx256m",
    "noDebug": false
  }
}`} />
          </Collapsible>

          <Collapsible title="attach — Attach to a running program" badge="attach" badgeType="request">
            <p className="text-sm text-dap-muted mb-3">
              Attaches to an already-running debuggee. The target JVM must have the JDWP agent listening.
            </p>
            <div className="code-block border border-dap-border my-3">
              <div className="px-4 py-2 border-b border-dap-border text-xs text-dap-muted">JVM launch command for remote debugging</div>
              <pre className="p-4 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                <span className="text-dap-response">java</span>{" -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=5005 -jar app.jar"}
              </pre>
            </div>
            <JsonBlock type="request" title="attach request" json={`{
  "seq": 5,
  "type": "request",
  "command": "attach",
  "arguments": {
    "type": "kotlin",
    "hostName": "localhost",
    "port": 5005,
    "timeout": 10000
  }
}`} />
          </Collapsible>

          <Collapsible title="setBreakpoints — Set breakpoints in a source file" badge="setBreakpoints" badgeType="request">
            <p className="text-sm text-dap-muted mb-3">
              Sets all breakpoints for a given source file. <strong className="text-dap-text">Replaces all previous breakpoints</strong> in that file.
            </p>
            <Tabs tabs={[
              {
                label: "Request",
                content: (
                  <JsonBlock type="request" title="setBreakpoints request" json={`{
  "seq": 3,
  "type": "request",
  "command": "setBreakpoints",
  "arguments": {
    "source": {
      "name": "main.kt",
      "path": "/home/dev/project/src/main/kotlin/main.kt"
    },
    "breakpoints": [
      { "line": 4 },
      { "line": 11, "condition": "number > 3" },
      { "line": 12, "hitCondition": "3", "logMessage": "Result: {result}" }
    ],
    "sourceModified": false
  }
}`} />
                ),
              },
              {
                label: "Response",
                content: (
                  <JsonBlock type="response" title="setBreakpoints response" json={`{
  "seq": 3,
  "type": "response",
  "request_seq": 3,
  "command": "setBreakpoints",
  "success": true,
  "body": {
    "breakpoints": [
      { "id": 1, "verified": true, "line": 4 },
      { "id": 2, "verified": true, "line": 11, "message": "Conditional: number > 3" },
      { "id": 3, "verified": true, "line": 12, "message": "Log: Result: {result}" }
    ]
  }
}`} />
                ),
              },
            ]} />
          </Collapsible>

          <Collapsible title="setFunctionBreakpoints — Break on function entry" badge="setFunctionBreakpoints" badgeType="request">
            <JsonBlock type="request" json={`{
  "seq": 4,
  "type": "request",
  "command": "setFunctionBreakpoints",
  "arguments": {
    "breakpoints": [
      { "name": "factorial" },
      { "name": "main", "condition": "args.size > 0" }
    ]
  }
}`} />
          </Collapsible>

          <Collapsible title="setExceptionBreakpoints — Break on exceptions" badge="setExceptionBreakpoints" badgeType="request">
            <p className="text-sm text-dap-muted mb-3">
              Configures which exceptions should cause the debugger to break. Filter IDs come from the
              <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded ml-1">exceptionBreakpointFilters</code> capability.
            </p>
            <JsonBlock type="request" json={`{
  "seq": 4,
  "type": "request",
  "command": "setExceptionBreakpoints",
  "arguments": {
    "filters": ["uncaught"],
    "filterOptions": [
      { "filterId": "caught", "condition": "java.lang.ArithmeticException" }
    ]
  }
}`} />
          </Collapsible>

          <Collapsible title="configurationDone — Signal configuration complete" badge="configurationDone" badgeType="request">
            <p className="text-sm text-dap-muted mb-3">
              Sent after all breakpoints and configuration. Tells the adapter to start or resume the debuggee.
            </p>
            <JsonBlock type="request" json={`{ "seq": 6, "type": "request", "command": "configurationDone" }`} />
          </Collapsible>

          <Collapsible title="threads — List all threads" badge="threads" badgeType="request">
            <JsonBlock type="response" title="threads response" json={`{
  "seq": 10,
  "type": "response",
  "request_seq": 9,
  "command": "threads",
  "success": true,
  "body": {
    "threads": [
      { "id": 1, "name": "main" },
      { "id": 2, "name": "Reference Handler" },
      { "id": 3, "name": "Finalizer" },
      { "id": 4, "name": "Signal Dispatcher" }
    ]
  }
}`} />
          </Collapsible>

          <Collapsible title="stackTrace — Get the call stack" badge="stackTrace" badgeType="request">
            <Tabs tabs={[
              {
                label: "Request",
                content: (
                  <JsonBlock type="request" json={`{
  "seq": 12,
  "type": "request",
  "command": "stackTrace",
  "arguments": { "threadId": 1, "startFrame": 0, "levels": 20 }
}`} />
                ),
              },
              {
                label: "Response",
                content: (
                  <JsonBlock type="response" json={`{
  "seq": 12,
  "type": "response",
  "request_seq": 12,
  "command": "stackTrace",
  "success": true,
  "body": {
    "stackFrames": [
      { "id": 1, "name": "factorial", "line": 4, "column": 5,
        "source": { "name": "main.kt", "path": "/home/dev/project/src/main/kotlin/main.kt" } },
      { "id": 2, "name": "factorial", "line": 5, "column": 12,
        "source": { "name": "main.kt", "path": "/home/dev/project/src/main/kotlin/main.kt" } },
      { "id": 3, "name": "main", "line": 11, "column": 18,
        "source": { "name": "main.kt", "path": "/home/dev/project/src/main/kotlin/main.kt" } }
    ],
    "totalFrames": 3
  }
}`} />
                ),
              },
            ]} />
          </Collapsible>

          <Collapsible title="scopes — Get variable scopes for a frame" badge="scopes" badgeType="request">
            <JsonBlock type="response" title="scopes response" json={`{
  "seq": 14,
  "type": "response",
  "request_seq": 13,
  "command": "scopes",
  "success": true,
  "body": {
    "scopes": [
      {
        "name": "Locals",
        "presentationHint": "locals",
        "variablesReference": 1001,
        "namedVariables": 2,
        "expensive": false
      }
    ]
  }
}`} />
          </Collapsible>

          <Collapsible title="variables — Get variable values" badge="variables" badgeType="request">
            <p className="text-sm text-dap-muted mb-3">
              Retrieves all child variables for a given <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded">variablesReference</code>.
            </p>
            <JsonBlock type="response" json={`{
  "seq": 16,
  "type": "response",
  "request_seq": 15,
  "command": "variables",
  "success": true,
  "body": {
    "variables": [
      { "name": "n", "value": "5", "type": "Int", "variablesReference": 0, "evaluateName": "n" },
      { "name": "this", "value": "MainKt", "type": "com.example.debug.MainKt", "variablesReference": 1002 }
    ]
  }
}`} />
          </Collapsible>

          <Collapsible title="evaluate — Evaluate an expression" badge="evaluate" badgeType="request">
            <p className="text-sm text-dap-muted mb-3">
              Evaluates an expression in the context of a stack frame. Used for debug console, hover tooltips, and watch expressions.
            </p>
            <Tabs tabs={[
              {
                label: "Watch",
                content: <JsonBlock type="request" json={`{
  "seq": 20,
  "type": "request",
  "command": "evaluate",
  "arguments": { "expression": "n * factorial(n - 1)", "frameId": 1, "context": "watch" }
}`} />,
              },
              {
                label: "Hover",
                content: <JsonBlock type="request" json={`{
  "seq": 21,
  "type": "request",
  "command": "evaluate",
  "arguments": { "expression": "n", "frameId": 1, "context": "hover" }
}`} />,
              },
              {
                label: "REPL",
                content: <JsonBlock type="request" json={`{
  "seq": 22,
  "type": "request",
  "command": "evaluate",
  "arguments": { "expression": "println(\\"Debug: n=$n\\")", "frameId": 1, "context": "repl" }
}`} />,
              },
            ]} />
          </Collapsible>

          <Collapsible title="continue / next / stepIn / stepOut — Execution control" badge="stepping" badgeType="request">
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { cmd: "continue", desc: "Resume until next breakpoint or end" },
                { cmd: "next", desc: "Step over — execute current line, stop at next" },
                { cmd: "stepIn", desc: "Step into — enter function calls" },
                { cmd: "stepOut", desc: "Step out — run until current function returns" },
              ].map((s) => (
                <div key={s.cmd} className="p-3 bg-dap-bg border border-dap-border rounded-lg">
                  <code className="text-dap-request text-xs font-bold">{s.cmd}</code>
                  <p className="text-xs text-dap-muted mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
            <JsonBlock type="request" title="next (step over) request" json={`{
  "seq": 25,
  "type": "request",
  "command": "next",
  "arguments": { "threadId": 1, "granularity": "statement" }
}`} />
          </Collapsible>

          <Collapsible title="pause — Pause a running thread" badge="pause" badgeType="request">
            <JsonBlock type="request" json={`{ "seq": 30, "type": "request", "command": "pause", "arguments": { "threadId": 1 } }`} />
          </Collapsible>

          <Collapsible title="setVariable — Modify a variable value" badge="setVariable" badgeType="request">
            <JsonBlock type="request" json={`{
  "seq": 35,
  "type": "request",
  "command": "setVariable",
  "arguments": { "variablesReference": 1001, "name": "n", "value": "10" }
}`} />
          </Collapsible>

          <Collapsible title="source — Retrieve source code" badge="source" badgeType="request">
            <p className="text-sm text-dap-muted mb-3">
              Retrieves source code for a source reference. Used when source is not available locally (e.g., decompiled bytecode).
            </p>
            <JsonBlock type="request" json={`{
  "seq": 40,
  "type": "request",
  "command": "source",
  "arguments": { "source": { "sourceReference": 1000 }, "sourceReference": 1000 }
}`} />
          </Collapsible>

          <Collapsible title="disconnect — End the debug session" badge="disconnect" badgeType="request">
            <p className="text-sm text-dap-muted mb-3">
              Ends the debug session. <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded">terminateDebuggee</code> controls whether the process is also killed.
            </p>
            <JsonBlock type="request" json={`{
  "seq": 50,
  "type": "request",
  "command": "disconnect",
  "arguments": { "restart": false, "terminateDebuggee": true }
}`} />
          </Collapsible>

          <Collapsible title="terminate — Request graceful termination" badge="terminate" badgeType="request">
            <JsonBlock type="request" json={`{ "seq": 48, "type": "request", "command": "terminate", "arguments": { "restart": false } }`} />
          </Collapsible>

          <Collapsible title="restart — Restart the debug session" badge="restart" badgeType="request">
            <JsonBlock type="request" json={`{ "seq": 55, "type": "request", "command": "restart", "arguments": {} }`} />
          </Collapsible>

          <Collapsible title="completions — Debug console autocomplete" badge="completions" badgeType="request">
            <JsonBlock type="request" json={`{
  "seq": 60,
  "type": "request",
  "command": "completions",
  "arguments": { "frameId": 1, "text": "fact", "column": 5 }
}`} />
            <JsonBlock type="response" title="completions response" json={`{
  "seq": 60,
  "type": "response",
  "request_seq": 60,
  "command": "completions",
  "success": true,
  "body": {
    "targets": [
      { "label": "factorial", "type": "function" },
      { "label": "factorialResult", "type": "variable" }
    ]
  }
}`} />
          </Collapsible>

          <Collapsible title="exceptionInfo — Get exception details" badge="exceptionInfo" badgeType="request">
            <JsonBlock type="response" json={`{
  "seq": 45,
  "type": "response",
  "request_seq": 44,
  "command": "exceptionInfo",
  "success": true,
  "body": {
    "exceptionId": "java.lang.StackOverflowError",
    "description": "Stack overflow in recursive call",
    "breakMode": "always",
    "details": {
      "message": "Stack overflow in recursive call",
      "typeName": "java.lang.StackOverflowError",
      "stackTrace": "at com.example.debug.MainKt.factorial(main.kt:5)\\n..."
    }
  }
}`} />
          </Collapsible>
        </ScrollReveal>
      </Section>

      {/* EVENTS */}
      <Section id="events">
        <ScrollReveal>
          <SectionTitle sub="Asynchronous notifications from the adapter to the client">
            Events Reference
          </SectionTitle>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
              { name: "initialized", desc: "Adapter is ready for configuration requests" },
              { name: "stopped", desc: "Execution stopped (breakpoint, step, exception, pause)" },
              { name: "continued", desc: "Execution has resumed" },
              { name: "exited", desc: "Debuggee has exited with an exit code" },
              { name: "terminated", desc: "Debugging session is finished" },
              { name: "thread", desc: "A thread has started or exited" },
              { name: "output", desc: "Program output (stdout, stderr, console)" },
              { name: "breakpoint", desc: "Breakpoint state changed (verified, moved)" },
              { name: "module", desc: "Module (JAR, class file) loaded/changed" },
              { name: "process", desc: "Debuggee process information" },
              { name: "capabilities", desc: "Adapter capabilities have changed" },
              { name: "loadedSource", desc: "Source file loaded, changed, or removed" },
            ].map((e) => (
              <div key={e.name} className="p-3 bg-dap-surface border border-dap-border rounded-lg hover-card">
                <span className="badge-event px-2 py-0.5 rounded-full text-[10px] font-bold">{e.name}</span>
                <p className="text-xs text-dap-muted mt-2">{e.desc}</p>
              </div>
            ))}
          </div>

          <Collapsible title="stopped — Execution paused" badge="stopped" badgeType="event" defaultOpen>
            <p className="text-sm text-dap-muted mb-3">
              The most important event. Fired when execution stops. The <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded">reason</code> field indicates why.
            </p>
            <Tabs tabs={[
              {
                label: "Breakpoint Hit",
                content: <JsonBlock type="event" title="stopped — breakpoint" json={`{
  "seq": 15,
  "type": "event",
  "event": "stopped",
  "body": {
    "reason": "breakpoint",
    "description": "Paused on breakpoint",
    "threadId": 1,
    "allThreadsStopped": true,
    "hitBreakpointIds": [1]
  }
}`} />,
              },
              {
                label: "Exception",
                content: <JsonBlock type="event" title="stopped — exception" json={`{
  "seq": 25,
  "type": "event",
  "event": "stopped",
  "body": {
    "reason": "exception",
    "description": "java.lang.StackOverflowError",
    "threadId": 1,
    "allThreadsStopped": true,
    "text": "Stack overflow in recursive call"
  }
}`} />,
              },
              {
                label: "Step Complete",
                content: <JsonBlock type="event" title="stopped — step" json={`{
  "seq": 30,
  "type": "event",
  "event": "stopped",
  "body": { "reason": "step", "threadId": 1, "allThreadsStopped": false }
}`} />,
              },
            ]} />
          </Collapsible>

          <Collapsible title="output — Program output" badge="output" badgeType="event">
            <JsonBlock type="event" json={`{
  "seq": 20,
  "type": "event",
  "event": "output",
  "body": {
    "category": "stdout",
    "output": "Computing factorial of 5\\n",
    "source": { "name": "main.kt", "path": "/home/dev/project/src/main/kotlin/main.kt" },
    "line": 10
  }
}`} />
          </Collapsible>

          <Collapsible title="thread — Thread lifecycle" badge="thread" badgeType="event">
            <JsonBlock type="event" json={`{
  "seq": 8,
  "type": "event",
  "event": "thread",
  "body": { "reason": "started", "threadId": 1 }
}`} />
          </Collapsible>

          <Collapsible title="exited / terminated — Session end" badge="exited" badgeType="event">
            <div className="space-y-3">
              <JsonBlock type="event" title="exited event" json={`{ "seq": 50, "type": "event", "event": "exited", "body": { "exitCode": 0 } }`} />
              <JsonBlock type="event" title="terminated event" json={`{ "seq": 51, "type": "event", "event": "terminated" }`} />
            </div>
          </Collapsible>

          <Collapsible title="process — Process information" badge="process" badgeType="event">
            <JsonBlock type="event" json={`{
  "seq": 7,
  "type": "event",
  "event": "process",
  "body": {
    "name": "com.example.debug.MainKt",
    "systemProcessId": 12345,
    "isLocalProcess": true,
    "startMethod": "launch"
  }
}`} />
          </Collapsible>

          <Collapsible title="breakpoint — Breakpoint state changed" badge="breakpoint" badgeType="event">
            <JsonBlock type="event" json={`{
  "seq": 9,
  "type": "event",
  "event": "breakpoint",
  "body": {
    "reason": "changed",
    "breakpoint": { "id": 1, "verified": true, "line": 4 }
  }
}`} />
          </Collapsible>
        </ScrollReveal>
      </Section>

      {/* LIVE SESSION */}
      <Section id="session">
        <ScrollReveal>
          <SectionTitle sub="Step-by-step walkthrough of debugging a Kotlin factorial function">
            Live Debug Session
          </SectionTitle>

          <KotlinBlock
            title="main.kt — Our target program"
            code={`package com.example.debug

fun factorial(n: Int): Long {
    if (n <= 1) return 1L    // Line 4: base case
    return n * factorial(n - 1)  // Line 5: recursive call
}

fun main() {
    val number = 5             // Line 9
    println("Computing factorial of $number")  // Line 10
    val result = factorial(number)  // Line 11: we call factorial here
    println("factorial($number) = $result")  // Line 12
}`}
          />

          <div className="mt-8 mb-4">
            <h3 className="text-lg font-bold mb-2">Session Timeline</h3>
            <p className="text-sm text-dap-muted mb-6">
              Follow the complete DAP message exchange. We set a breakpoint at line 4 (inside
              <code className="text-dap-accent text-xs px-1 py-0.5 bg-dap-surface rounded mx-1">factorial</code>),
              then step through each recursive call.
            </p>
          </div>

          <div className="relative pl-2">
            <TimelineStep type="request" title="initialize" description="Client connects and negotiates capabilities with the Kotlin debug adapter.">
              <JsonBlock type="request" json={`{
  "seq": 1,
  "type": "request",
  "command": "initialize",
  "arguments": {
    "clientID": "vscode",
    "adapterID": "kotlin",
    "linesStartAt1": true,
    "columnsStartAt1": true,
    "supportsVariableType": true
  }
}`} />
            </TimelineStep>

            <TimelineStep type="response" title="initialize response" description="Adapter reports its capabilities.">
              <JsonBlock type="response" json={`{
  "seq": 1,
  "type": "response",
  "request_seq": 1,
  "command": "initialize",
  "success": true,
  "body": {
    "supportsConfigurationDoneRequest": true,
    "supportsConditionalBreakpoints": true,
    "supportsEvaluateForHovers": true,
    "supportsSetVariable": true,
    "supportsTerminateRequest": true,
    "exceptionBreakpointFilters": [
      { "filter": "caught", "label": "Caught Exceptions" },
      { "filter": "uncaught", "label": "Uncaught Exceptions", "default": true }
    ]
  }
}`} />
            </TimelineStep>

            <TimelineStep type="event" title="initialized" description="Adapter signals it's ready for configuration.">
              <JsonBlock type="event" json={`{ "seq": 2, "type": "event", "event": "initialized" }`} />
            </TimelineStep>

            <TimelineStep type="request" title="setBreakpoints" description="Set a breakpoint at line 4 inside the factorial function.">
              <JsonBlock type="request" json={`{
  "seq": 2,
  "type": "request",
  "command": "setBreakpoints",
  "arguments": {
    "source": { "name": "main.kt", "path": "/home/dev/project/src/main/kotlin/main.kt" },
    "breakpoints": [{ "line": 4 }]
  }
}`} />
            </TimelineStep>

            <TimelineStep type="response" title="setBreakpoints response" description="Breakpoint verified at line 4.">
              <JsonBlock type="response" json={`{
  "seq": 3,
  "type": "response",
  "request_seq": 2,
  "command": "setBreakpoints",
  "success": true,
  "body": { "breakpoints": [{ "id": 1, "verified": true, "line": 4 }] }
}`} />
            </TimelineStep>

            <TimelineStep type="request" title="configurationDone" description="All configuration sent. Adapter can start the debuggee.">
              <JsonBlock type="request" json={`{ "seq": 3, "type": "request", "command": "configurationDone" }`} />
            </TimelineStep>

            <TimelineStep type="request" title="launch" description="Launch the Kotlin program with debugging enabled.">
              <JsonBlock type="request" json={`{
  "seq": 4,
  "type": "request",
  "command": "launch",
  "arguments": {
    "mainClass": "com.example.debug.MainKt",
    "projectRoot": "/home/dev/project",
    "classPaths": ["/home/dev/project/build/classes/kotlin/main"]
  }
}`} />
            </TimelineStep>

            <TimelineStep type="event" title="process event" description="The JVM process has started.">
              <JsonBlock type="event" json={`{
  "seq": 5,
  "type": "event",
  "event": "process",
  "body": { "name": "com.example.debug.MainKt", "systemProcessId": 28456, "startMethod": "launch" }
}`} />
            </TimelineStep>

            <TimelineStep type="event" title="output event" description="Program prints to stdout before hitting the breakpoint.">
              <JsonBlock type="event" json={`{
  "seq": 7,
  "type": "event",
  "event": "output",
  "body": { "category": "stdout", "output": "Computing factorial of 5\\n" }
}`} />
            </TimelineStep>

            <TimelineStep type="event" title="stopped — breakpoint hit!" description="factorial(5) called, execution stops at line 4.">
              <div className="p-3 bg-dap-event/10 border border-dap-event/30 rounded-lg mb-3">
                <p className="text-xs text-dap-event font-medium">
                  Breakpoint hit at line 4 &mdash; first recursive call with n=5
                </p>
              </div>
              <JsonBlock type="event" json={`{
  "seq": 8,
  "type": "event",
  "event": "stopped",
  "body": { "reason": "breakpoint", "threadId": 1, "allThreadsStopped": true, "hitBreakpointIds": [1] }
}`} />
            </TimelineStep>

            <TimelineStep type="request" title="stackTrace" description="Client requests the call stack.">
              <JsonBlock type="response" title="stackTrace response" json={`{
  "seq": 10,
  "type": "response",
  "request_seq": 9,
  "command": "stackTrace",
  "success": true,
  "body": {
    "stackFrames": [
      { "id": 1, "name": "factorial", "line": 4, "column": 5,
        "source": { "name": "main.kt", "path": "/home/dev/project/src/main/kotlin/main.kt" } },
      { "id": 2, "name": "main", "line": 11, "column": 18,
        "source": { "name": "main.kt", "path": "/home/dev/project/src/main/kotlin/main.kt" } }
    ],
    "totalFrames": 2
  }
}`} />
            </TimelineStep>

            <TimelineStep type="request" title="scopes + variables" description="Client inspects variables in the factorial frame.">
              <JsonBlock type="response" title="variables response" json={`{
  "body": {
    "variables": [
      { "name": "n", "value": "5", "type": "Int", "variablesReference": 0 }
    ]
  }
}`} />
              <div className="mt-3 p-3 bg-dap-surface border border-dap-border rounded-lg">
                <p className="text-xs text-dap-muted">
                  <strong className="text-dap-text">Variable state:</strong> n = 5 (first call: factorial(5))
                </p>
              </div>
            </TimelineStep>

            <TimelineStep type="request" title="continue" description="Resume execution. factorial(4) will hit the breakpoint again.">
              <JsonBlock type="request" json={`{ "seq": 15, "type": "request", "command": "continue", "arguments": { "threadId": 1 } }`} />
            </TimelineStep>

            <TimelineStep type="event" title="stopped — breakpoint (n=4)" description="Second recursive call hits the breakpoint.">
              <div className="p-3 bg-dap-surface border border-dap-border rounded-lg">
                <h5 className="text-xs font-bold text-dap-text mb-2">Recursive call stack growing:</h5>
                <div className="space-y-0.5 font-mono text-xs">
                  <div className="text-dap-request">{"\u2192"} factorial(n=4)  &larr; stopped here</div>
                  <div className="text-dap-muted pl-4">factorial(n=5)</div>
                  <div className="text-dap-muted pl-8">main()</div>
                </div>
              </div>
            </TimelineStep>

            <TimelineStep type="request" title="evaluate" description="Use the debug console to evaluate an expression.">
              <JsonBlock type="request" json={`{
  "seq": 22,
  "type": "request",
  "command": "evaluate",
  "arguments": { "expression": "n * 2", "frameId": 1, "context": "repl" }
}`} />
              <JsonBlock type="response" json={`{
  "body": { "result": "8", "type": "Int", "variablesReference": 0 }
}`} />
            </TimelineStep>

            <TimelineStep type="request" title="stepIn" description="Step into the recursive call to follow factorial(3).">
              <JsonBlock type="request" json={`{ "seq": 25, "type": "request", "command": "stepIn", "arguments": { "threadId": 1 } }`} />
            </TimelineStep>

            <TimelineStep type="event" title="stopped — step complete" description="Now inside factorial(3).">
              <div className="p-3 bg-dap-surface border border-dap-border rounded-lg">
                <h5 className="text-xs font-bold text-dap-text mb-2">Deeper in the recursion:</h5>
                <div className="space-y-0.5 font-mono text-xs">
                  <div className="text-dap-request">{"\u2192"} factorial(n=3)  &larr; stopped here</div>
                  <div className="text-dap-muted pl-4">factorial(n=4)</div>
                  <div className="text-dap-muted pl-8">factorial(n=5)</div>
                  <div className="text-dap-muted pl-12">main()</div>
                </div>
              </div>
            </TimelineStep>

            <TimelineStep type="request" title="continue (to completion)" description="Let the program run to completion.">
              <div className="p-3 bg-dap-surface border border-dap-border rounded-lg mb-3">
                <p className="text-xs text-dap-muted">After continuing through all recursive calls:</p>
                <div className="font-mono text-xs mt-2 space-y-0.5">
                  <div><span className="text-dap-muted">factorial(1) =</span> <span className="text-dap-response">1</span></div>
                  <div><span className="text-dap-muted">factorial(2) = 2 &times; 1 =</span> <span className="text-dap-response">2</span></div>
                  <div><span className="text-dap-muted">factorial(3) = 3 &times; 2 =</span> <span className="text-dap-response">6</span></div>
                  <div><span className="text-dap-muted">factorial(4) = 4 &times; 6 =</span> <span className="text-dap-response">24</span></div>
                  <div><span className="text-dap-muted">factorial(5) = 5 &times; 24 =</span> <span className="text-dap-response font-bold">120</span></div>
                </div>
              </div>
            </TimelineStep>

            <TimelineStep type="event" title="output" description="Program prints the final result.">
              <JsonBlock type="event" json={`{
  "seq": 40,
  "type": "event",
  "event": "output",
  "body": { "category": "stdout", "output": "factorial(5) = 120\\n" }
}`} />
            </TimelineStep>

            <TimelineStep type="event" title="exited" description="Program exits normally with code 0.">
              <JsonBlock type="event" json={`{ "seq": 45, "type": "event", "event": "exited", "body": { "exitCode": 0 } }`} />
            </TimelineStep>

            <TimelineStep type="event" title="terminated" description="Debug session is complete.">
              <JsonBlock type="event" json={`{ "seq": 46, "type": "event", "event": "terminated" }`} />
            </TimelineStep>

            <TimelineStep type="request" title="disconnect" description="Client cleanly disconnects." isLast>
              <JsonBlock type="request" json={`{
  "seq": 50,
  "type": "request",
  "command": "disconnect",
  "arguments": { "restart": false, "terminateDebuggee": false }
}`} />
            </TimelineStep>
          </div>
        </ScrollReveal>
      </Section>

      {/* KOTLIN / JVM */}
      <Section id="kotlin-jvm">
        <ScrollReveal>
          <SectionTitle sub="How DAP works with the JVM via JDWP and JDI">
            Kotlin &amp; JVM Debugging
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-bold text-dap-accent mb-3">Architecture for JVM</h4>
              <div className="space-y-3 text-sm text-dap-muted">
                <p>
                  When debugging Kotlin/Java, the debug adapter communicates with the JVM through the
                  <strong className="text-dap-text"> Java Debug Wire Protocol (JDWP)</strong>.
                </p>
                <div className="space-y-1.5">
                  {[
                    { label: "IDE (VS Code)", detail: "DAP Client", color: "border-dap-request" },
                    { label: "kotlin-debug-adapter", detail: "DAP \u2194 JDI translation", color: "border-dap-accent" },
                    { label: "JDI (Java Debug Interface)", detail: "Java API for debugging", color: "border-dap-event" },
                    { label: "JDWP", detail: "Wire protocol (TCP)", color: "border-dap-event" },
                    { label: "JVM (debug agent)", detail: "-agentlib:jdwp=...", color: "border-dap-response" },
                    { label: "Kotlin Application", detail: "The debuggee", color: "border-dap-response" },
                  ].map((item) => (
                    <div key={item.label} className={`p-2.5 bg-dap-bg border-l-2 ${item.color} rounded-r-lg`}>
                      <div className="text-xs font-semibold text-dap-text">{item.label}</div>
                      <div className="text-[10px] text-dap-muted">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-dap-accent mb-3">VS Code launch.json</h4>
              <JsonBlock json={`{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "kotlin",
      "request": "launch",
      "name": "Launch Factorial",
      "mainClass": "com.example.debug.MainKt",
      "projectRoot": "\${workspaceFolder}",
      "classPaths": [
        "\${workspaceFolder}/build/classes/kotlin/main"
      ]
    },
    {
      "type": "kotlin",
      "request": "attach",
      "name": "Attach to JVM",
      "hostName": "localhost",
      "port": 5005,
      "timeout": 10000
    }
  ]
}`} />
              <KotlinBlock title="Java launch for remote debug" lineNumbers={false} code={`// Launch JVM with debug agent
// suspend=y: wait for debugger
java -agentlib:jdwp=transport=dt_socket,\\
  server=y,suspend=y,address=*:5005 \\
  -jar myapp.jar`} />
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-dap-border py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-dap-request to-dap-accent flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">D</span>
            </div>
            <span className="text-sm font-bold text-dap-text">DAP Guide</span>
          </div>
          <p className="text-xs text-dap-muted">
            Based on the{" "}
            <a
              href="https://microsoft.github.io/debug-adapter-protocol/specification"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dap-request hover:underline"
            >
              official DAP specification
            </a>
            . Protocol version 1.66.
          </p>
        </div>
      </footer>
    </>
  );
}
