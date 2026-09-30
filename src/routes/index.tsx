import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
const dashboardProjects = [
  { name: "Hyper Copilot", kind: "Agent workspace", tone: "amber" },
  { name: "Stellar Dashboard", kind: "Analytics", tone: "blue" },
  { name: "Pulse Commerce", kind: "Storefront", tone: "green" },
  { name: "Nexus API", kind: "Developer tools", tone: "coral" },
] as const;
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

      {drawer && <MobileDrawer close={() => setDrawer(false)} setWorkspace={() => { setWorkspace(true); setDrawer(false); }} goHome={() => { setWorkspace(false); setPrompt(""); setRunning(false); }} />}
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
        <section className="projects-section" aria-labelledby="projects-heading">
          <div className="projects-head"><span id="projects-heading">Projects</span><button>Show all <ChevronRight /></button></div>
          <div className="project-scroll">
            {dashboardProjects.map((project) => (
              <button className="project-card" key={project.name} onClick={() => setWorkspace(true)}>
                <span className={`project-thumb project-thumb-${project.tone}`}><i /><i /><FolderGit2 /></span>
                <span className="project-meta"><b>{project.name}</b><small>{project.kind}</small></span>
              </button>
            ))}
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
  const [model, setModel] = useState("Speed");
  const [modelMenu, setModelMenu] = useState(false);
  const models = ["Speed", "Flash", "Heavy"];

  return <div className={`composer-wrap ${compact ? "compact" : ""}`}><div className="composer"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={placeholder} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); beginTask(); } }} /><div className="composer-actions"><button aria-label="Attach"><Plus /></button><div className="model-select"><button className="model" onClick={() => setModelMenu(!modelMenu)} aria-haspopup="listbox" aria-expanded={modelMenu}><Zap /> {model} <ChevronDown /></button>{modelMenu && <div className="model-menu" role="listbox" aria-label="Select model">{models.map((name) => <button key={name} role="option" aria-selected={model === name} onClick={() => { setModel(name); setModelMenu(false); }}><span>{name}</span>{model === name && <span className="model-check">✓</span>}</button>)}</div>}</div><button aria-label="Voice"><Mic /></button></div></div></div>;
}

const allProjects = [
  { name: "hyper-copilot-sandbox", chat: false },
  { name: "Clone hyper copilot sandbox", chat: true },
  { name: "hyper-copilot-sandbox-1", chat: false },
  { name: "elite-veo", chat: false },
  { name: "Stellar Dashboard", chat: false },
  { name: "Pulse Commerce", chat: false },
  { name: "Nexus API", chat: false },
];
const workspaces = ["Personal workspace", "Team workspace"];

function MobileDrawer({ close, setWorkspace, goHome }: { close: () => void; setWorkspace: () => void; goHome: () => void }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(allProjects);
  const [pinned, setPinned] = useState<string[]>([]);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [ws, setWs] = useState(workspaces[0]);
  const [wsOpen, setWsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const go = (to: "/import" | "/library" | "/integrations" | "/dashboard") => { close(); navigate({ to }); };
  const list = projects
    .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => Number(pinned.includes(b.name)) - Number(pinned.includes(a.name)));
  const togglePin = (name: string) => setPinned((p) => (p.includes(name) ? p.filter((n) => n !== name) : [...p, name]));

  return <div className="drawer-backdrop" onClick={close}><aside className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
    <div className="drawer-head"><button className="bare" onClick={() => go("/dashboard")} aria-label="Dashboard"><BrandMark compact /></button><div><button className="bare" aria-label="Search projects" onClick={() => setSearch(search === null ? "" : null)}><Search /></button><button className="bare" aria-label="Close sidebar" onClick={close}><PanelLeft /></button></div></div>
    <div className="ws-wrap">
      <button className="workspace-pill" onClick={() => setWsOpen(!wsOpen)} aria-expanded={wsOpen}><span>{ws === workspaces[0] ? "TK" : "TM"}</span> {ws} <ChevronDown /></button>
      {wsOpen && <div className="drawer-menu">{workspaces.map((w) => <button key={w} onClick={() => { setWs(w); setWsOpen(false); }}>{w}{w === ws && <span className="model-check">✓</span>}</button>)}</div>}
    </div>
    <button className="drawer-new" onClick={() => { goHome(); close(); }}><Plus /> New</button>
    <nav><button onClick={() => go("/library")}><Library /> Library</button><button onClick={() => go("/import")}><Import /> Import</button><button onClick={() => go("/integrations")}><Layers3 /> Integrations</button></nav>
    <p className="nav-label">Recent</p>
    {search !== null && <input autoFocus className="drawer-search" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} />}
    <div className="drawer-recent">{list.length === 0 && <p className="drawer-empty">No projects found</p>}{list.map((p) => <div key={p.name} className="recent-row">
      <button className="recent-open" onClick={setWorkspace}>{p.chat ? <Bot /> : <FolderGit2 />}<span>{p.name}</span></button>
      <button className={`bare ${pinned.includes(p.name) ? "pinned" : ""}`} aria-label="Pin" onClick={() => togglePin(p.name)}><Pin /></button>
      <button className="bare" aria-label="More" onClick={() => setMenuFor(menuFor === p.name ? null : p.name)}><MoreHorizontal /></button>
      {menuFor === p.name && <div className="drawer-menu row-menu"><button onClick={setWorkspace}>Open</button><button onClick={() => { togglePin(p.name); setMenuFor(null); }}>{pinned.includes(p.name) ? "Unpin" : "Pin"}</button><button onClick={() => { setProjects((ps) => ps.filter((x) => x.name !== p.name)); setMenuFor(null); }}>Remove</button></div>}
    </div>)}</div>
    <div className="ws-wrap account-wrap">
      {settingsOpen && <div className="drawer-menu up"><button onClick={() => setSettingsOpen(false)}>Account</button><button onClick={() => setSettingsOpen(false)}>Preferences</button><button onClick={() => { setSettingsOpen(false); close(); }}>Sign out</button></div>}
      <div className="drawer-account"><span>TK</span><b>TK Das</b><button className="bare" aria-label="Settings" onClick={() => setSettingsOpen(!settingsOpen)}><Settings /></button></div>
    </div>
  </aside></div>;
}