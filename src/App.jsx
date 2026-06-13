import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0D0D1A",
  surface: "#12122A",
  card: "#1A1A35",
  border: "#2a2a45",
  purple: "#7B2FBE",
  violet: "#9B59F5",
  muted: "#8888AA",
  white: "#FFFFFF",
  red: "#F44336",
  green: "#4CAF50",
  blue: "#64B5F6",
};

const screens = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "focus", icon: "🎯", label: "Focus" },
  { id: "notes", icon: "📝", label: "Notes" },
  { id: "camera", icon: "📷", label: "Camera" },
  { id: "feed", icon: "🎬", label: "Feed" },
];

/* ── Radio Player ── */
function RadioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const STREAM = "https://listen.streamaudio.co/proxy/stvradio/stream";

  function play() {
    if (!audioRef.current) return;
    setLoading(true);
    audioRef.current.src = STREAM;
    audioRef.current.play()
      .then(() => { setPlaying(true); setLoading(false); })
      .catch(() => { setLoading(false); });
  }

  function pause() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = "";
    setPlaying(false);
    setLoading(false);
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, #1a0a2e 0%, #2a1245 50%, #1a0a2e 100%)",
      border: `1.5px solid ${C.violet}`,
      borderRadius: 16,
      padding: "14px 16px",
      marginBottom: 14,
      position: "relative",
      overflow: "hidden",
      boxShadow: `0 0 24px ${C.violet}40`,
    }}>
      {/* Pulsing glow when live */}
      {playing && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: 16,
          border: `1.5px solid ${C.violet}`,
          animation: "pulse 2s ease-in-out infinite",
          pointerEvents: "none",
        }} />
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.01); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <audio ref={audioRef} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 42, height: 42, borderRadius: "50%",
          background: C.purple,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
          animation: playing ? "spin 4s linear infinite" : "none",
          flexShrink: 0,
        }}>🎵</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: C.white, fontWeight: 600, fontSize: 13 }}>Radio Meltdown</div>
          <div style={{ color: C.muted, fontSize: 10 }}>STV Network · Live Stream</div>
        </div>
        {playing && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: C.red, borderRadius: 6, padding: "3px 8px" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.white }} />
            <span style={{ color: C.white, fontSize: 9, fontWeight: 700 }}>LIVE</span>
          </div>
        )}
      </div>

      {/* Wave visualizer (decorative) */}
      <div style={{ display: "flex", alignItems: "center", gap: 3, height: 24, marginBottom: 12, justifyContent: "center" }}>
        {[6,10,16,12,20,14,8,18,10,14,20,12,16,10,6].map((h, i) => (
          <div key={i} style={{
            width: 3, borderRadius: 2,
            background: playing ? C.violet : C.border,
            height: playing ? h : 4,
            transition: "all 0.3s ease",
            transitionDelay: `${i * 0.05}s`,
          }} />
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={play}
          disabled={playing || loading}
          style={{
            flex: 1, padding: "11px", borderRadius: 12, border: "none",
            background: playing ? C.border : C.purple,
            color: playing ? C.muted : C.white,
            fontWeight: 600, fontSize: 14, cursor: playing ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            transition: "all 0.2s",
          }}
        >
          {loading ? "⏳" : "▶"} {loading ? "Connecting…" : "Play"}
        </button>
        <button
          onClick={pause}
          disabled={!playing && !loading}
          style={{
            flex: 1, padding: "11px", borderRadius: 12,
            border: `1.5px solid ${!playing && !loading ? C.border : C.violet}`,
            background: "transparent",
            color: !playing && !loading ? C.muted : C.violet,
            fontWeight: 600, fontSize: 14, cursor: !playing && !loading ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            transition: "all 0.2s",
          }}
        >
          ⏸ Pause
        </button>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <a href="https://fairefaretravels.github.io/radiomeltdownorg/" target="_blank" rel="noreferrer"
          style={{ flex: 1, textAlign: "center", fontSize: 10, color: C.violet, textDecoration: "none", padding: "4px", borderRadius: 6, background: C.violet + "15" }}>
          📻 Full Player
        </a>
        <a href="https://fairefaretravels.github.io/stv-backoffice/" target="_blank" rel="noreferrer"
          style={{ flex: 1, textAlign: "center", fontSize: 10, color: C.muted, textDecoration: "none", padding: "4px", borderRadius: 6, background: C.card }}>
          🏢 Back Office
        </a>
      </div>
    </div>
  );
}

/* ── Shared components ── */
function Card({ children, style = {}, accent }) {
  return (
    <div style={{
      background: C.card, borderRadius: 12, padding: "10px 12px",
      marginBottom: 8, borderLeft: accent ? `2px solid ${accent}` : "none",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>{children}</div>;
}

function Pill({ children, color = C.violet }) {
  return (
    <span style={{
      display: "inline-block", borderRadius: 20, fontSize: 10,
      padding: "2px 8px", marginRight: 4, marginBottom: 4,
      background: color + "30", color,
    }}>{children}</span>
  );
}

function BtnPrimary({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", padding: "10px", borderRadius: 10,
      background: C.purple, border: "none", color: C.white,
      fontSize: 13, fontWeight: 500, cursor: "pointer", marginTop: 6, ...style,
    }}>{children}</button>
  );
}

function BtnOutline({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", padding: "9px", borderRadius: 10,
      background: "transparent", border: `0.5px solid ${C.violet}`, color: C.violet,
      fontSize: 13, cursor: "pointer", marginTop: 6, ...style,
    }}>{children}</button>
  );
}

/* ── Home screen ── */
function HomeScreen() {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = days[new Date().getDay()];
  return (
    <div>
      <RadioPlayer />
      <div style={{ color: C.white, fontSize: 16, fontWeight: 500 }}>Good morning</div>
      <div style={{ color: C.muted, fontSize: 11, marginBottom: 14 }}>{today} · Let's get to work</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        {[["3h","Focus today"],["7","Notes"],["2","Drafts"]].map(([n, l]) => (
          <div key={l} style={{ flex: 1, background: C.card, borderRadius: 10, padding: "8px 10px" }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: C.violet }}>{n}</div>
            <div style={{ fontSize: 9, color: C.muted }}>{l}</div>
          </div>
        ))}
      </div>
      <Card>
        <Label>Today's focus goal</Label>
        <div style={{ height: 4, background: C.border, borderRadius: 2, margin: "6px 0" }}>
          <div style={{ height: "100%", width: "62%", background: C.violet, borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.muted }}>
          <span>62% done</span><span>3h 45m left</span>
        </div>
      </Card>
      <Card>
        <Label>Content queue</Label>
        <div style={{ marginTop: 4 }}>
          <Pill>TikTok draft</Pill>
          <Pill color={C.green}>Live scheduled</Pill>
          <Pill color={C.red}>2 unposted</Pill>
        </div>
      </Card>
      <BtnPrimary>Start focus session</BtnPrimary>
    </div>
  );
}

/* ── Focus screen ── */
function FocusScreen() {
  const TOTAL = 25 * 60;
  const [seconds, setSeconds] = useState(24 * 60 + 38);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (running && seconds > 0) {
      ref.current = setInterval(() => setSeconds(s => s - 1), 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [running, seconds]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const circ = 2 * Math.PI * 55;
  const offset = circ * (seconds / TOTAL);

  return (
    <div>
      <div style={{ color: C.white, fontSize: 16, fontWeight: 500 }}>Focus mode</div>
      <div style={{ color: C.muted, fontSize: 11, marginBottom: 14 }}>Stay locked in.</div>
      <div style={{ textAlign: "center", padding: "10px 0 14px" }}>
        <div style={{ width: 110, height: 110, margin: "0 auto 10px", borderRadius: "50%", border: `4px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <svg width={118} height={118} viewBox="0 0 118 118" style={{ position: "absolute", top: -4, left: -4 }}>
            <circle cx={59} cy={59} r={55} fill="none" stroke={C.violet} strokeWidth={4}
              strokeDasharray={circ} strokeDashoffset={circ - offset}
              strokeLinecap="round" transform="rotate(-90 59 59)" />
          </svg>
          <div>
            <div style={{ fontSize: 26, fontWeight: 500, color: C.white }}>{mins}:{secs}</div>
            <div style={{ fontSize: 10, color: C.muted }}>remaining</div>
          </div>
        </div>
        <div style={{ color: C.muted, fontSize: 11 }}>Session 2 of 3 · Deep work</div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        {[["2","Sessions done"],["50m","Total focused"]].map(([n, l]) => (
          <div key={l} style={{ flex: 1, background: C.card, borderRadius: 10, padding: "8px 10px" }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: C.violet }}>{n}</div>
            <div style={{ fontSize: 9, color: C.muted }}>{l}</div>
          </div>
        ))}
      </div>
      <Card style={{ marginBottom: 8 }}>
        <Label>Current task</Label>
        <div style={{ fontSize: 14, fontWeight: 500, color: C.white }}>Finish WrkBsh pitch deck</div>
      </Card>
      <div style={{ display: "flex", gap: 8 }}>
        <BtnOutline style={{ marginTop: 0 }} onClick={() => setRunning(r => !r)}>
          {running ? "Pause" : "Resume"}
        </BtnOutline>
        <BtnPrimary style={{ marginTop: 0 }} onClick={() => { setRunning(false); setSeconds(TOTAL); }}>
          Reset
        </BtnPrimary>
      </div>
    </div>
  );
}

/* ── Notes screen ── */
function NotesScreen() {
  const [text, setText] = useState("");
  const [tag, setTag] = useState("Idea");
  const [notes, setNotes] = useState([
    { title: "WrkBsh feature list", preview: "Focus, Notes, Camera, Go Live, TikTok feed...", time: "Today · 9:14 AM", accent: C.violet },
    { title: "Investor meeting prep", preview: "Talk about the 23 min refocus stat, show demo", time: "Yesterday · 4:02 PM", accent: C.green },
    { title: "Content ideas — week 3", preview: "Morning routine series, app walkthrough...", time: "Jun 10 · 11:30 AM", accent: C.blue },
  ]);

  function save() {
    if (!text.trim()) return;
    setNotes(n => [{ title: text.slice(0, 30), preview: text, time: "Just now", accent: C.violet }, ...n]);
    setText("");
  }

  return (
    <div>
      <div style={{ color: C.white, fontSize: 16, fontWeight: 500 }}>Notes</div>
      <div style={{ color: C.muted, fontSize: 11, marginBottom: 14 }}>Capture fast. Organize later.</div>
      <textarea
        value={text} onChange={e => setText(e.target.value)}
        placeholder="What's on your mind..."
        style={{ width: "100%", background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 10, padding: 10, color: C.white, fontSize: 12, minHeight: 70, resize: "none", fontFamily: "inherit", outline: "none" }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, margin: "8px 0" }}>
        {["Idea","Task","Research"].map(t => (
          <span key={t} onClick={() => setTag(t)} style={{ display: "inline-block", borderRadius: 20, fontSize: 10, padding: "2px 8px", cursor: "pointer", background: tag === t ? C.violet + "30" : C.card, color: tag === t ? C.violet : C.muted, border: `0.5px solid ${tag === t ? C.violet : C.border}` }}>{t}</span>
        ))}
      </div>
      <BtnPrimary style={{ marginBottom: 12 }} onClick={save}>Save note</BtnPrimary>
      {notes.map((n, i) => (
        <Card key={i} accent={n.accent}>
          <div style={{ fontSize: 12, fontWeight: 500, color: C.white }}>{n.title}</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{n.preview}</div>
          <div style={{ fontSize: 9, color: "#555", marginTop: 4 }}>{n.time}</div>
        </Card>
      ))}
    </div>
  );
}

/* ── Camera screen ── */
function CameraScreen() {
  const [recording, setRecording] = useState(false);
  const [live, setLive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [viewers, setViewers] = useState(142);
  const ref = useRef(null);

  useEffect(() => {
    if (recording || live) {
      ref.current = setInterval(() => {
        setElapsed(s => s + 1);
        if (live) setViewers(v => Math.max(0, v + Math.floor(Math.random() * 5 - 1)));
      }, 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [recording, live]);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  return (
    <div>
      <div style={{ color: C.white, fontSize: 16, fontWeight: 500 }}>Camera</div>
      <div style={{ color: C.muted, fontSize: 11, marginBottom: 10 }}>Capture, record, go live.</div>
      <div style={{ background: "#0a0a18", borderRadius: 12, height: 150, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 10, border: `0.5px solid ${C.border}` }}>
        <span style={{ fontSize: 36, opacity: 0.2 }}>📷</span>
        {(recording || live) && (
          <div style={{ position: "absolute", top: 8, right: 8, background: C.red, borderRadius: 4, padding: "2px 6px", fontSize: 9, color: C.white, fontWeight: 500 }}>
            {live ? `LIVE ${fmt(elapsed)}` : `REC ${fmt(elapsed)}`}
          </div>
        )}
        {live && (
          <div style={{ position: "absolute", bottom: 8, left: 8, fontSize: 11, color: C.white, background: "rgba(0,0,0,0.6)", borderRadius: 6, padding: "2px 8px" }}>
            👁 {viewers} viewers
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <button style={{ flex: 1, padding: 8, borderRadius: 10, border: `0.5px solid ${C.violet}`, background: "transparent", color: C.violet, fontSize: 11, fontWeight: 500, cursor: "pointer" }}>Flip</button>
        <button onClick={() => { setRecording(r => !r); setLive(false); if (!recording) setElapsed(0); }} style={{ flex: 1, padding: 8, borderRadius: 10, border: "none", background: recording ? "#9b1111" : C.red, color: C.white, fontSize: 11, fontWeight: 500, cursor: "pointer" }}>
          {recording ? "Stop" : "Record"}
        </button>
        <button onClick={() => { setLive(l => !l); setRecording(false); if (!live) setElapsed(0); }} style={{ flex: 1, padding: 8, borderRadius: 10, border: "none", background: live ? "#4a1188" : C.purple, color: C.white, fontSize: 11, fontWeight: 500, cursor: "pointer" }}>
          {live ? "End Live" : "Go Live"}
        </button>
      </div>
      {live && (
        <Card>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: C.red, borderRadius: 4, padding: "2px 8px", fontSize: 10, color: C.white, fontWeight: 500, marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.white }} />
            LIVE — {viewers} viewers
          </div>
          <div style={{ color: "#ccc", fontSize: 11, marginBottom: 6 }}>Building the WrkBsh prototype live</div>
          <div><Pill>TikTok</Pill><Pill color={C.green}>Instagram</Pill><Pill color={C.blue}>YouTube</Pill></div>
        </Card>
      )}
      <Card>
        <Label>Save to</Label>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          {["Notes","Content queue","Post now"].map((l, i) => (
            <button key={l} style={{ flex: 1, padding: 6, borderRadius: 10, border: i < 2 ? `0.5px solid ${C.violet}` : "none", background: i === 2 ? C.purple : "transparent", color: i === 2 ? C.white : C.violet, fontSize: 10, cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── Feed screen ── */
function FeedScreen() {
  const [posts, setPosts] = useState([
    { id: 1, draft: true, body: "Day 1 of building in public. Here's the full WrkBsh stack I'm working on... #buildinpublic", likes: 0, comments: 0, time: "Just now · Draft" },
    { id: 2, draft: false, body: "Focus session 2 complete. 50 minutes of deep work. No app switches. WrkBsh stays open. That's the whole point.", likes: 84, comments: 12, time: "2 hrs ago · Posted" },
  ]);

  function publish(id) {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, draft: false, time: "Just now · Posted" } : p));
  }

  function like(id) {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  }

  return (
    <div>
      <div style={{ color: C.white, fontSize: 16, fontWeight: 500 }}>Content feed</div>
      <div style={{ color: C.muted, fontSize: 11, marginBottom: 14 }}>Your drafts, posts, and schedule.</div>
      {posts.map(p => (
        <Card key={p.id}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.purple, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: C.white }}>W</div>
            <div>
              <div style={{ fontSize: 11, color: "#ccc", fontWeight: 500 }}>WrkBsh · You</div>
              <div style={{ fontSize: 9, color: "#555" }}>{p.time}</div>
            </div>
            {p.draft && <span style={{ marginLeft: "auto", background: C.violet + "30", color: C.violet, fontSize: 9, padding: "2px 6px", borderRadius: 4 }}>Draft</span>}
          </div>
          <div style={{ color: "#aaa", fontSize: 11, marginBottom: 8 }}>{p.body}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => like(p.id)} style={{ background: "none", border: "none", color: "#666", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>❤ {p.likes}</button>
            <span style={{ fontSize: 10, color: "#666", display: "flex", alignItems: "center", gap: 3 }}>💬 {p.comments}</span>
            {p.draft && <button onClick={() => publish(p.id)} style={{ marginLeft: "auto", background: C.purple, border: "none", color: C.white, fontSize: 10, padding: "4px 10px", borderRadius: 8, cursor: "pointer" }}>Post now</button>}
          </div>
        </Card>
      ))}
      <Card accent={C.red}>
        <Label>Scheduled</Label>
        <div style={{ fontSize: 14, fontWeight: 500, color: C.white, marginTop: 3 }}>Morning routine clip · Today 6:00 PM</div>
        <BtnOutline style={{ marginTop: 8, padding: 6, fontSize: 11 }}>Edit draft</BtnOutline>
      </Card>
    </div>
  );
}

const screenMap = { home: HomeScreen, focus: FocusScreen, notes: NotesScreen, camera: CameraScreen, feed: FeedScreen };

/* ── Phone frame ── */
function PhoneFrame({ activeId, onSwitch }) {
  const Screen = screenMap[activeId];
  return (
    <div style={{ width: 280, margin: "0 auto", background: C.bg, borderRadius: 36, border: "2px solid #333", padding: "12px 0 18px", overflow: "hidden" }}>
      <div style={{ width: 80, height: 20, background: C.bg, borderRadius: "0 0 12px 12px", margin: "0 auto 6px" }} />
      <div style={{ padding: "0 10px", minHeight: 480 }}>
        <Screen />
        <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 0 2px", borderTop: `0.5px solid #2a2a45`, marginTop: 10 }}>
          {screens.map(s => (
            <div key={s.id} onClick={() => onSwitch(s.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 9, color: activeId === s.id ? C.violet : "#666", cursor: "pointer" }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Tablet frame ── */
function TabletFrame({ activeId, onSwitch }) {
  const Screen = screenMap[activeId];
  return (
    <div style={{ background: C.bg, borderRadius: 18, border: "2px solid #333", padding: 10, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", minHeight: 420 }}>
        <div style={{ background: C.surface, padding: "14px 10px", borderRight: `0.5px solid ${C.border}` }}>
          <div style={{ color: C.violet, fontSize: 15, fontWeight: 500, marginBottom: 18 }}>WrkBsh</div>
          {screens.map(s => (
            <div key={s.id} onClick={() => onSwitch(s.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", borderRadius: 8, fontSize: 12, color: activeId === s.id ? C.violet : C.muted, background: activeId === s.id ? C.purple + "25" : "transparent", marginBottom: 2, cursor: "pointer" }}>
              <span style={{ fontSize: 15 }}>{s.icon}</span>
              {s.label}
            </div>
          ))}
        </div>
        <div style={{ padding: "14px", background: C.bg, overflow: "auto" }}>
          <Screen />
        </div>
      </div>
    </div>
  );
}

/* ── Root App with dancer background ── */
export default function App() {
  const [mode, setMode] = useState("phone");
  const [activeScreen, setActiveScreen] = useState("home");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", position: "relative", overflow: "hidden", background: C.bg }}>

      {/* Dancer background */}
      <img
        src="/dancer1.gif"
        alt=""
        aria-hidden="true"
        style={{
          position: "fixed", bottom: 0, right: 0,
          height: "55vh", width: "auto",
          opacity: 0.18,
          pointerEvents: "none",
          zIndex: 0,
          mixBlendMode: "screen",
        }}
      />
      {/* Second dancer mirrored left */}
      <img
        src="/dancer1.gif"
        alt=""
        aria-hidden="true"
        style={{
          position: "fixed", bottom: 0, left: 0,
          height: "40vh", width: "auto",
          opacity: 0.10,
          pointerEvents: "none",
          zIndex: 0,
          transform: "scaleX(-1)",
          mixBlendMode: "screen",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "12px" }}>

        {/* STV Header */}
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ color: C.violet, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", marginBottom: 2 }}>STV NETWORK</div>
          <div style={{ color: C.white, fontSize: 22, fontWeight: 700, letterSpacing: "0.05em" }}>WrkBsh</div>
          <div style={{ color: C.muted, fontSize: 10 }}>Your all-in-one workspace</div>
        </div>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12, background: "#1a1a2e", borderRadius: 10, padding: 4 }}>
          {["phone","tablet"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "6px", borderRadius: 8, border: "none", background: mode === m ? C.purple : "transparent", color: mode === m ? C.white : C.muted, fontWeight: mode === m ? 600 : 400, cursor: "pointer", fontSize: 12 }}>
              {m === "phone" ? "📱 iPhone" : "🖥 Tablet"}
            </button>
          ))}
        </div>

        {/* Screen tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
          {screens.map(s => (
            <button key={s.id} onClick={() => setActiveScreen(s.id)} style={{ flex: 1, minWidth: 0, padding: "6px 4px", fontSize: 11, borderRadius: 8, border: "0.5px solid", borderColor: activeScreen === s.id ? C.violet : C.border, background: activeScreen === s.id ? C.violet + "20" : "transparent", color: activeScreen === s.id ? C.violet : C.muted, cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {mode === "phone"
          ? <PhoneFrame activeId={activeScreen} onSwitch={setActiveScreen} />
          : <TabletFrame activeId={activeScreen} onSwitch={setActiveScreen} />
        }
      </div>
    </div>
  );
}
