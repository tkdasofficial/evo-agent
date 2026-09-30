import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  Database,
  FileCode2,
  FileSpreadsheet,
  FolderGit2,
  Gauge,
  Globe2,
  Import,
  Layers3,
  Lightbulb,
  Library,
  Menu,
  Mic,
  MoreHorizontal,
  Pin,
  Presentation,
  PanelLeft,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evo Agent — Autonomous software builder" },
      { name: "description", content: "Plan, build, test, and verify software with an autonomous engineering agent." },
      { property: "og:title", content: "Evo Agent — Autonomous software builder" },
      { property: "og:description", content: "A professional AI software engineering workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EvoAgent,
});

const recent = ["Hyper Copilot", "Stellar Dashboard", "Pulse Commerce", "Nexus API"];
const tools = [
  [Globe2, "Publishing", "Publish a shareable version of your app"],
  [Database, "Database", "Store structured product and user data"],
  [ShieldCheck, "Authentication", "Secure sign-in and account management"],
  [Gauge, "Monitoring", "Inspect health, requests, and alerts"],
] as const;

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-mark" aria-label="Evo Agent">
      <span />
      <span />
      <span />
      {!compact && <b>Evo</b>}
    </div>
  );
}

function EvoAgent() {
  const [drawer, setDrawer] = useState(false);
  const [workspace, setWorkspace] = useState(false);
  const [toolView, setToolView] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [running, setRunning] = useState(false);

  const beginTask = () => {
    if (!prompt.trim()) return;
    setRunning(true);
    setWorkspace(true);
  };

  return (
    <div className="app-shell">
      <aside className="desktop-sidebar">
        <div className="sidebar-brand"><BrandMark /><button className="icon-button" aria-label="Collapse sidebar"><PanelLeft /></button></div>
        <button className="new-project"><Plus /> New project</button>
        <nav className="side-nav" aria-label="Main navigation">
          <button className="active"><Sparkles /> Agent</button>
          <button><FolderGit2 /> Projects</button>
          <button><Library /> Templates</button>
          <button><Clock3 /> Activity</button>
          <button><Boxes /> Integrations</button>
        </nav>
        <p className="nav-label">Recent</p>
        <div className="recent-list">
          {recent.map((name, index) => <button key={name}><span className={`project-dot dot-${index}`} />{name}<MoreHorizontal /></button>)}
        </div>
        <div className="sidebar-footer"><button><CircleHelp /> Help</button><button><Settings /> Settings</button><div className="profile"><span>TK</span><div><b>TK Das</b><small>Personal workspace</small></div><MoreHorizontal /></div></div>
      </aside>

      <div className="main-frame">
        <header className={`topbar ${workspace ? "workspace-topbar" : "home-topbar"}`}>
          <button className="icon-button mobile-only" onClick={() => setDrawer(true)} aria-label="Open navigation"><Menu /></button>
          <div className="project-switcher"><BrandMark compact /><span>{workspace ? "Hyper Copilot" : "Evo Agent"}</span><ChevronDown /></div>
          <div className="command-search"><Search /><span>Search projects and commands</span><kbd>⌘ K</kbd></div>
          <div className="top-actions"><button className="icon-button" aria-label="Tools" onClick={() => setToolView(!toolView)}><Wrench /></button><button className="icon-button" aria-label="Tasks"><Clock3 /></button><div className="avatar">TK</div></div>
        </header>

        {workspace ? (
          <Workspace running={running} toolView={toolView} prompt={prompt} setPrompt={setPrompt} beginTask={beginTask} setToolView={setToolView} />
        ) : (
          <Home setWorkspace={setWorkspace} openDrawer={() => setDrawer(true)} prompt={prompt} setPrompt={setPrompt} beginTask={beginTask} />
        )}
      </div>

      {drawer && <MobileDrawer close={() => setDrawer(false)} setWorkspace={() => { setWorkspace(true); setDrawer(false); }} />}
    </div>
  );
}

function Home({ setWorkspace, openDrawer, prompt, setPrompt, beginTask }: { setWorkspace: (v: boolean) => void; openDrawer: () => void; prompt: string; setPrompt: (v: string) => void; beginTask: () => void }) {
  return (
    <main className="home-page">
      <div className="home-inner">
        <div className="dashboard-mobile-head"><button onClick={openDrawer} aria-label="Open sidebar"><PanelLeft /></button><Lightbulb /></div>
        <div className="eyebrow"><span className="live-dot" /> SYSTEM READY <span>v1.0</span></div>
        <h1>What are we working<br />on today?</h1>
        <section className="jump-card" onClick={() => setWorkspace(true)}>
          <div className="jump-head"><span>Jump back in</span><ChevronRight /></div>
          <div className="project-preview">
            <i className="project-sheet sheet-left" /><i className="project-sheet sheet-back" /><i className="project-sheet sheet-front"><span><FolderGit2 /></span></i>
          </div>
        </section>
        <div className="idea-list">
          <button onClick={() => setPrompt("Turn my notes into slides")}><Presentation className="coral" /> Turn my notes into slides</button>
          <button onClick={() => setPrompt("Analyze a Google Sheet")}><FileSpreadsheet className="green" /> Analyze a Google Sheet</button>
          <button onClick={() => setPrompt("Find three directions")}><Sparkles className="orange" /> Find three directions</button>
          <button onClick={() => setPrompt("Turn a sheet into a dashboard")}><BarChart3 className="blue" /> Turn a sheet into a dashboard</button>
        </div>
      </div>
      <Composer prompt={prompt} setPrompt={setPrompt} beginTask={beginTask} placeholder="Start chatting or describe a task..." />
    </main>
  );
}

function Workspace({ running, toolView, prompt, setPrompt, beginTask, setToolView }: { running: boolean; toolView: boolean; prompt: string; setPrompt: (v: string) => void; beginTask: () => void; setToolView: (v: boolean) => void }) {
  return (
    <main className="workspace-page">
      <div className="workspace-tabs">
        <button className={!toolView ? "active" : ""} onClick={() => setToolView(false)}><Bot /> Agent</button>
        <button className={toolView ? "active" : ""} onClick={() => setToolView(true)}><Wrench /> Tools</button>
        <button><Clock3 /> Tasks</button>
      </div>
      {toolView ? (
        <section className="tools-view"><p className="section-kicker">Evo Cloud</p><div className="tool-grid">{tools.map(([Icon, title, desc]) => <button key={title}><Icon /><div><b>{title}</b><span>{desc}</span></div><ChevronRight /></button>)}</div></section>
      ) : (
        <section className="agent-view">
          <div className="active-task"><div><small>Active task</small><strong>{running ? prompt : "Set up the imported project"}</strong></div><FileCode2 /><MoreHorizontal /></div>
          <div className="conversation">
            <div className="action-row"><span><BrainCircuit /></span><span><Code2 /></span><span><SquareTerminal /></span><b>12 actions</b></div>
            <p>I’ve mapped the project structure and identified the critical path. I’ll preserve the existing architecture, implement the requested changes, and verify each acceptance check before completion.</p>
            <div className="action-row"><span><FileCode2 /></span><span><BrainCircuit /></span><span><Zap /></span><b>6 actions</b></div>
            <p>The workspace is ready. The application compiles cleanly, the interface is responsive, and the next verification pass will check the mobile flow and project navigation.</p>
            <div className="work-status"><Gauge /><span>Worked for 2 minutes</span><ChevronDown /></div>
            <div className="verification"><div><ShieldCheck /><span><b>Verification in progress</b><small>4 of 5 acceptance checks passed</small></span></div><div className="verify-bar"><i /></div></div>
          </div>
        </section>
      )}
      <Composer prompt={prompt} setPrompt={setPrompt} beginTask={beginTask} placeholder="Make, test, iterate..." compact />
      <div className="launch-bar"><button aria-label="Preview panels"><Layers3 /></button><button className="launch-main"><Globe2 /> Open application</button><button aria-label="Publish"><ArrowUp /></button></div>
    </main>
  );
}

function Composer({ prompt, setPrompt, beginTask, placeholder, compact = false }: { prompt: string; setPrompt: (v: string) => void; beginTask: () => void; placeholder: string; compact?: boolean }) {
  return <div className={`composer-wrap ${compact ? "compact" : ""}`}><div className="composer"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={placeholder} /><div className="composer-actions"><button aria-label="Attach"><Plus /></button><button className="mode"><Sparkles /> Build <ChevronDown /></button><button className="model"><span className="model-grid" /> Evo 1 <ChevronDown /></button><button aria-label="Voice"><Mic /></button><button className="send" onClick={beginTask} disabled={!prompt.trim()} aria-label="Send"><ArrowUp /></button></div></div></div>;
}

function MobileDrawer({ close, setWorkspace }: { close: () => void; setWorkspace: () => void }) {
  const drawerRecent = ["hyper-copilot-sandbox", "Clone hyper copilot sandbox", "hyper-copilot-sandbox-1", "elite-veo"];
  return <div className="drawer-backdrop" onClick={close}><aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-head"><BrandMark compact /><div><Search /><PanelLeft /><button className="icon-button" onClick={close} aria-label="Close navigation"><X /></button></div></div><button className="workspace-pill"><span>TK</span> Personal workspace <ChevronDown /></button><button className="drawer-new"><Plus /> New</button><nav><button><Import /> Import</button><button><Library /> Library</button><button><Clock3 /> Routines</button><button><Layers3 /> Integrations</button><button><ShieldCheck /> Security</button></nav><p className="nav-label">Recent</p><div className="drawer-recent">{drawerRecent.map((name, index) => <button key={name} onClick={setWorkspace}>{index === 1 ? <Bot /> : <FolderGit2 />}<span>{name}</span><Pin /><MoreHorizontal /></button>)}</div><div className="model-promo"><div><b>Use smarter models</b><span>GPT-6 Astra &amp; Claude Fable</span></div><Sparkles /></div><button className="learn-more"><Lightbulb /> Learn more</button><div className="drawer-account"><span>TK</span><b>TK Das</b><Settings /></div></aside></div>;
}