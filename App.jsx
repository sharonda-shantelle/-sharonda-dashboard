import { useState, useEffect } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DAY_THEMES = {
  Monday:    { label: "CEO / Creative Day",       color: "#5B4FCF", accent: "#7C6FE8" },
  Tuesday:   { label: "Work + Fitness",            color: "#2E7D32", accent: "#43A047" },
  Wednesday: { label: "Work + Spiritual",          color: "#0277BD", accent: "#0288D1" },
  Thursday:  { label: "Therapy + Recovery",        color: "#C0392B", accent: "#E53935" },
  Friday:    { label: "Podcast Release + Family",  color: "#E65100", accent: "#F57C00" },
  Saturday:  { label: "Expansion Day",             color: "#AD7B00", accent: "#F9A825" },
  Sunday:    { label: "Refill + Family Day",       color: "#00695C", accent: "#00897B" },
};

const SCHEDULE = {
  Monday: [
    { time: "5:00–6:00 AM",   task: "Devotional Time",           sub: "Prayer • Bible • Journal",                                   icon: "📖", category: "faith" },
    { time: "6:00–7:00 AM",   task: "Fitness",                   sub: "Workout",                                                    icon: "🏋🏾‍♀️", category: "health" },
    { time: "7:30–5:00 PM",   task: "Focus Block",               sub: "Content Creation • Reels • TikTok • YouTube • Workbooks • Coaching • Business Growth", icon: "💻", category: "work" },
    { time: "1:00–2:00 PM",   task: "Lunch / Reset",             sub: "Fuel • Step Away",                                           icon: "🥗", category: "health" },
    { time: "5:00–8:00 PM",   task: "Educational Block",         sub: "Stocks • Speech Techniques • Reading • Growth",              icon: "📚", category: "growth" },
    { time: "8:30–9:30 PM",   task: "Admin + Engagement",        sub: "Emails • DMs • Comments • Schedule Content • Tea Time ☕",   icon: "💬", category: "brand" },
    { time: "9:30–10:00 PM",  task: "Daily Exam App",            sub: "Review • Reflect • Quiz Yourself",                           icon: "🎯", category: "god" },
    { time: "10:00 PM–5 AM",  task: "SLEEP",                     sub: "Protect Your Rest",                                          icon: "🌙", category: "rest" },
  ],
  Tuesday: [
    { time: "5:00–6:00 AM",   task: "Devotional Time",           sub: "Prayer • Bible • Journal",              icon: "📖", category: "faith" },
    { time: "6:00–7:00 AM",   task: "Get Ready",                 sub: "Hygiene • Breakfast • Prep",            icon: "🌅", category: "morning" },
    { time: "7:00–7:30 AM",   task: "Transition / Commute",      sub: "",                                      icon: "🚗", category: "transit" },
    { time: "7:30–6:00 PM",   task: "Work",                      sub: "10 HR Day • No Post Zone",              icon: "💼", category: "work" },
    { time: "6:00–6:30 PM",   task: "Transition",                sub: "Change • Decompress",                   icon: "🔄", category: "transit" },
    { time: "6:30–7:30 PM",   task: "Fitness Class",             sub: "HPC / Crunch",                          icon: "🏋🏾‍♀️", category: "health" },
    { time: "7:30–8:30 PM",   task: "Dinner / Shower",           sub: "Reset",                                 icon: "🍽️", category: "evening" },
    { time: "8:30–9:30 PM",   task: "Light Content Engagement",  sub: "Reply • Engage • Plan",                 icon: "💬", category: "brand" },
    { time: "9:30–10:00 PM",  task: "Daily Exam App",            sub: "Review • Reflect • Quiz Yourself",      icon: "🎯", category: "god" },
    { time: "10:00 PM–5 AM",  task: "SLEEP",                     sub: "Protect Your Rest",                     icon: "🛌", category: "rest" },
  ],
  Wednesday: [
    { time: "5:00–6:00 AM",   task: "Devotional Time",           sub: "Prayer • Bible • Journal",              icon: "📖", category: "faith" },
    { time: "6:00–7:00 AM",   task: "Get Ready",                 sub: "Hygiene • Breakfast • Prep",            icon: "🌅", category: "morning" },
    { time: "7:00–7:30 AM",   task: "Transition / Commute",      sub: "",                                      icon: "🚗", category: "transit" },
    { time: "7:30–6:00 PM",   task: "Work",                      sub: "10 HR Day • No Post Zone",              icon: "💼", category: "work" },
    { time: "6:30–7:30 PM",   task: "Walk / Treadmill",          sub: "Listen to Bible Study",                 icon: "🚶🏾‍♀️", category: "health" },
    { time: "7:30–8:30 PM",   task: "Bible Study",               sub: "7:00 – 8:00 PM",                        icon: "✝️", category: "faith" },
    { time: "8:30–9:30 PM",   task: "Board Meeting with God",    sub: "Pray • Plan • Seek Direction",          icon: "🙏", category: "faith" },
    { time: "9:30–10:00 PM",  task: "Daily Exam App",            sub: "Review • Reflect • Quiz Yourself",      icon: "🎯", category: "god" },
    { time: "10:00 PM–5 AM",  task: "SLEEP",                     sub: "Protect Your Rest",                     icon: "🛌", category: "rest" },
  ],
  Thursday: [
    { time: "5:00–6:00 AM",   task: "Devotional Time",           sub: "Prayer • Bible • Journal",              icon: "📖", category: "faith" },
    { time: "6:00–7:00 AM",   task: "Get Ready",                 sub: "Hygiene • Breakfast • Prep",            icon: "🌅", category: "morning" },
    { time: "7:00–7:30 AM",   task: "Transition / Commute",      sub: "",                                      icon: "🚗", category: "transit" },
    { time: "7:30–6:00 PM",   task: "Work",                      sub: "10 HR Day • No Post Zone",              icon: "💼", category: "work" },
    { time: "6:00–6:30 PM",   task: "Dinner / Decompress",       sub: "",                                      icon: "🍽️", category: "evening" },
    { time: "7:00–8:30 PM",   task: "THERAPY",                   sub: "7:00 – 8:30 PM",                        icon: "💜", category: "health" },
    { time: "8:30–9:30 PM",   task: "Gentle Reset",              sub: "Journal • Tea • Read • Stretch",        icon: "🍵", category: "rest" },
    { time: "9:30–10:00 PM",  task: "Daily Exam App",            sub: "Review • Reflect • Quiz Yourself",      icon: "🎯", category: "god" },
    { time: "10:00 PM–5 AM",  task: "SLEEP",                     sub: "Protect Your Rest",                     icon: "🛌", category: "rest" },
  ],
  Friday: [
    { time: "5:00–6:00 AM",   task: "Devotional Time",           sub: "Prayer • Bible • Journal",              icon: "📖", category: "faith" },
    { time: "6:00–7:00 AM",   task: "Get Ready",                 sub: "Hygiene • Breakfast • Prep",            icon: "🌅", category: "morning" },
    { time: "7:00–7:30 AM",   task: "Transition / Commute",      sub: "",                                      icon: "🚗", category: "transit" },
    { time: "7:30–6:00 PM",   task: "Work",                      sub: "10 HR Day • No Post Zone",              icon: "💼", category: "work" },
    { time: "6:00–6:30 PM",   task: "Transition",                sub: "",                                      icon: "🔄", category: "transit" },
    { time: "6:30–7:30 PM",   task: "Family Time",               sub: "Be Present",                            icon: "👩🏾‍👧🏾", category: "family" },
    { time: "7:30–8:30 PM",   task: "Dinner / Family Time",      sub: "",                                      icon: "🍽️", category: "family" },
    { time: "8:30–9:30 PM",   task: "Podcast Final Check / Home",sub: "Schedule • Promote • Post Teaser • Laundry • Light Cleaning", icon: "🎙️", category: "brand" },
    { time: "9:30–10:00 PM",  task: "Daily Exam App",            sub: "Review • Reflect • Quiz Yourself",      icon: "🎯", category: "god" },
    { time: "10:00 PM–5 AM",  task: "SLEEP",                     sub: "Protect Your Rest",                     icon: "🛌", category: "rest" },
  ],
  Saturday: [
    { time: "5:00–6:00 AM",   task: "Devotional Time",           sub: "Prayer • Bible • Journal",              icon: "📖", category: "faith" },
    { time: "6:00–7:00 AM",   task: "Fitness",                   sub: "Workout",                               icon: "🏋🏾‍♀️", category: "health" },
    { time: "7:30–1:00 PM",   task: "Power Block",               sub: "Create • Write • Plan • Design • Record", icon: "⚡", category: "brand" },
    { time: "2:00–8:00 PM",   task: "Family Time / Relax",       sub: "Be Present",                            icon: "👩🏾‍👧🏾", category: "family" },
    { time: "8:30–9:30 PM",   task: "Downtime / Hobby",          sub: "Rest • Watch • Read",                   icon: "🎨", category: "rest" },
    { time: "9:30–10:00 PM",  task: "Daily Exam App",            sub: "Review • Reflect • Quiz Yourself",      icon: "🎯", category: "god" },
    { time: "10:00 PM–5 AM",  task: "SLEEP",                     sub: "Protect Your Rest",                     icon: "🛌", category: "rest" },
  ],
  Sunday: [
    { time: "5:00–6:00 AM",   task: "Devotional Time",           sub: "Prayer • Bible • Journal",              icon: "📖", category: "faith" },
    { time: "6:00–7:00 AM",   task: "Fitness",                   sub: "Workout",                               icon: "🏋🏾‍♀️", category: "health" },
    { time: "10:00 AM–12:00 PM", task: "Church",                 sub: "Worship • Fellowship",                  icon: "⛪", category: "faith" },
    { time: "4:00–5:00 PM",   task: "Family Meal / Connect",     sub: "",                                      icon: "💚", category: "family" },
    { time: "7:00–8:00 PM",   task: "Weekly Reset",              sub: "Plan • Review • Prep • Budget Book Review", icon: "📋", category: "growth" },
    { time: "9:30–10:00 PM",  task: "Daily Exam App",            sub: "Review • Reflect • Quiz Yourself",      icon: "🎯", category: "god" },
    { time: "10:00 PM–5 AM",  task: "SLEEP",                     sub: "Protect Your Rest",                     icon: "🛌", category: "rest" },
  ],
};

const NON_NEGOTIABLES = [
  { time: "5:00–6:00 AM", task: "Devotional / Prayer / Bible / Journal", icon: "📖" },
  { time: "6:00–7:00 AM", task: "Get Ready / Breakfast / Prep", icon: "🌅" },
];

const CATEGORY_COLORS = {
  faith:   "#7C6FE8",
  morning: "#F59E42",
  transit: "#94A3B8",
  work:    "#2563EB",
  health:  "#22C55E",
  growth:  "#A855F7",
  brand:   "#EC4899",
  family:  "#F97316",
  rest:    "#64748B",
  god:     "#F0C040",
  evening: "#7E57C2",
};

const CATEGORY_LABELS = {
  faith:   "faith",
  morning: "morning",
  transit: "transit",
  work:    "work",
  health:  "health",
  growth:  "growth",
  brand:   "brand",
  family:  "family",
  rest:    "rest",
  god:     "time w/God",
  evening: "evening",
};

const getTodayKey = () => {
  const d = new Date().getDay();
  const map = [6,0,1,2,3,4,5];
  return DAYS[map[d]];
};

export default function WeeklyDashboard() {
  const today = getTodayKey();
  const [activeDay, setActiveDay] = useState(today);
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wk_checked") || "{}"); } catch { return {}; }
  });
  const [nnChecked, setNnChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wk_nn") || "{}"); } catch { return {}; }
  });
  const [view, setView] = useState("day");
  const [water, setWater] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wk_water") || "{}"); } catch { return {}; }
  });
  const [book, setBook] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wk_book") || "{}"); } catch { return {}; }
  });
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wk_notes") || "{}"); } catch { return {}; }
  });

  useEffect(() => { try { localStorage.setItem("wk_checked", JSON.stringify(checked)); } catch {} }, [checked]);
  useEffect(() => { try { localStorage.setItem("wk_nn", JSON.stringify(nnChecked)); } catch {} }, [nnChecked]);
  useEffect(() => { try { localStorage.setItem("wk_water", JSON.stringify(water)); } catch {} }, [water]);
  useEffect(() => { try { localStorage.setItem("wk_book", JSON.stringify(book)); } catch {} }, [book]);
  useEffect(() => { try { localStorage.setItem("wk_notes", JSON.stringify(notes)); } catch {} }, [notes]);

  const toggleCheck = (day, idx) => setChecked(prev => ({ ...prev, [`${day}-${idx}`]: !prev[`${day}-${idx}`] }));
  const toggleNN = (idx) => setNnChecked(prev => ({ ...prev, [`${activeDay}-nn-${idx}`]: !prev[`${activeDay}-nn-${idx}`] }));
  const toggleWater = (day, idx) => setWater(prev => ({ ...prev, [`${day}-w${idx}`]: !prev[`${day}-w${idx}`] }));
  const toggleBook = (day) => setBook(prev => ({ ...prev, [day]: !prev[day] }));

  const getDayProgress = (day) => {
    const items = SCHEDULE[day];
    const done = items.filter((_, i) => checked[`${day}-${i}`]).length;
    return { done, total: items.length, pct: Math.round((done / items.length) * 100) };
  };

  const theme = DAY_THEMES[activeDay];
  const schedule = SCHEDULE[activeDay];
  const progress = getDayProgress(activeDay);
  const weekTotal = DAYS.reduce((a, d) => {
    const p = getDayProgress(d);
    return { done: a.done + p.done, total: a.total + p.total };
  }, { done: 0, total: 0 });

  const s = {
    root: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #F9E4E8 0%, #F5D0D8 60%, #FAE0E8 100%)",
      fontFamily: "'Georgia', serif",
      color: "#F0EBF8",
      maxWidth: 600,
      margin: "0 auto",
      paddingBottom: 80,
    },
  };

  return (
    <div style={s.root}>

      {/* ── HEADER ── */}
      <div style={{
        background: "linear-gradient(90deg,#2D1B4E,#4A1B6D)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 16px 12px",
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: "clamp(15px, 4.5vw, 22px)",
              fontWeight: 700, letterSpacing: "0.06em", margin: 0, lineHeight: 1.2,
              background: "linear-gradient(90deg,#C4B5FD,#F0ABFC,#FCD34D)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>SHARONDA'S INTENTIONAL DASH</h1>
            <p style={{ margin: "3px 0 0", fontSize: 10, color: "#D4B8F0", letterSpacing: "0.1em" }}>
              WEEKLY PLAN — FOCUS. FAITH. CONSISTENCY.
            </p>
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {["day","week"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "5px 10px", borderRadius: 16,
                border: `1px solid ${view===v ? theme.color : "rgba(255,255,255,0.12)"}`,
                background: view===v ? theme.color : "transparent",
                color: view===v ? "#fff" : "#64748B",
                fontSize: 10, fontFamily: "inherit", cursor: "pointer",
                letterSpacing: "0.05em",
              }}>{v==="day" ? "Day" : "Week"}</button>
            ))}
          </div>
        </div>

        {/* Week progress */}
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 10, color: "#D4B8F0", whiteSpace: "nowrap" }}>
            WEEK {weekTotal.done}/{weekTotal.total}
          </span>
          <div style={{ flex: 1, height: 4, background: "rgba(0,0,0,0.1)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: `${Math.round((weekTotal.done/weekTotal.total)*100)}%`,
              height: "100%",
              background: "linear-gradient(90deg,#C0395A,#E8799A)",
              borderRadius: 4, transition: "width 0.4s ease",
            }} />
          </div>
          <span style={{ fontSize: 10, color: "#F5D0E8", whiteSpace: "nowrap", fontWeight: 700 }}>
            {Math.round((weekTotal.done/weekTotal.total)*100)}%
          </span>
        </div>
      </div>

      {/* ── DAY TABS ── */}
      <div style={{
        display: "flex", overflowX: "auto",
        padding: "12px 12px 0", gap: 5,
        scrollbarWidth: "none", WebkitOverflowScrolling: "touch",
      }}>
        {DAYS.map(day => {
          const t = DAY_THEMES[day];
          const p = getDayProgress(day);
          const isActive = day === activeDay;
          const isToday = day === today;
          return (
            <button key={day} onClick={() => { setActiveDay(day); setView("day"); }} style={{
              flex: "0 0 auto",
              padding: "8px 10px 6px",
              borderRadius: "10px 10px 0 0",
              border: isActive ? `2px solid ${t.color}` : "2px solid rgba(255,255,255,0.06)",
              borderBottom: isActive ? `2px solid #1A1035` : undefined,
              background: isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
              cursor: "pointer", fontFamily: "inherit",
              position: "relative", minWidth: 70,
              transition: "all 0.2s",
            }}>
              {isToday && (
                <div style={{
                  position: "absolute", top: 3, right: 5,
                  width: 5, height: 5, borderRadius: "50%",
                  background: t.color, boxShadow: `0 0 5px ${t.color}`,
                }} />
              )}
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: isActive ? t.accent : "#475569" }}>
                {day.slice(0,3).toUpperCase()}
              </div>
              <div style={{ marginTop: 4, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${p.pct}%`, height: "100%", background: t.color, transition: "width 0.3s" }} />
              </div>
              <div style={{ fontSize: 8, color: "#475569", marginTop: 2 }}>{p.done}/{p.total}</div>
            </button>
          );
        })}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ padding: "0 12px 24px" }}>

        {view === "week" ? (
          /* WEEK OVERVIEW */
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0 12px 12px 12px",
            padding: "20px 16px",
          }}>
            <h2 style={{ fontSize: 14, letterSpacing: "0.1em", color: "#C4B5FD", margin: "0 0 16px" }}>
              WEEK AT A GLANCE
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {DAYS.map(day => {
                const t = DAY_THEMES[day];
                const p = getDayProgress(day);
                return (
                  <div key={day} onClick={() => { setActiveDay(day); setView("day"); }} style={{
                    background: `linear-gradient(135deg,${t.color}18,${t.color}08)`,
                    border: `1px solid ${t.color}40`,
                    borderRadius: 12, padding: "14px 12px",
                    cursor: "pointer", transition: "transform 0.15s",
                    WebkitTapHighlightColor: "transparent",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: "0.05em" }}>{day.slice(0,3).toUpperCase()}</div>
                        <div style={{ fontSize: 8, color: "#64748B", marginTop: 1 }}>{t.label}</div>
                      </div>
                      <div style={{
                        width: 34, height: 34, borderRadius: "50%",
                        border: `2px solid ${t.color}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontWeight: 700, color: t.accent,
                      }}>{p.pct}%</div>
                    </div>
                    <div style={{ marginTop: 10, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: `${p.pct}%`, height: "100%", background: t.color }} />
                    </div>
                    <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 2 }}>
                      {SCHEDULE[day].map((_, i) => (
                        <div key={i} style={{
                          width: 8, height: 8, borderRadius: 2,
                          background: checked[`${day}-${i}`] ? t.color : "rgba(255,255,255,0.08)",
                        }} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Notes Area */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", color: "#7B4A55", fontWeight: 700, marginBottom: 10 }}>
                📝 WEEKLY NOTES
              </div>
              {DAYS.map(day => {
                const t = DAY_THEMES[day];
                return (
                  <div key={day} style={{ marginBottom: 10 }}>
                    <div style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                      color: t.accent, marginBottom: 4,
                      background: "linear-gradient(90deg,#C4B5FD,#F0ABFC,#FCD34D)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>
                      {day.toUpperCase()}
                    </div>
                    <textarea
                      value={notes[day] || ""}
                      onChange={e => {
                        const val = e.target.value;
                        setNotes(prev => ({ ...prev, [day]: val }));
                      }}
                      placeholder={`Notes for ${day}…`}
                      style={{
                        width: "100%",
                        minHeight: 60,
                        background: "rgba(255,255,255,0.6)",
                        border: `1px solid ${t.color}40`,
                        borderRadius: 8,
                        padding: "8px 10px",
                        fontSize: 12,
                        color: "#1F1F2E",
                        fontFamily: "inherit",
                        resize: "vertical",
                        outline: "none",
                        boxSizing: "border-box",
                        lineHeight: 1.5,
                        transition: "border 0.2s",
                      }}
                      onFocus={e => e.target.style.border = `1px solid ${t.color}`}
                      onBlur={e => e.target.style.border = `1px solid ${t.color}40`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

        ) : (
          /* DAY VIEW */
          <div style={{
            background: "rgba(255,255,255,0.55)",
            border: `1px solid ${theme.color}50`,
            borderRadius: "0 12px 12px 12px",
          }}>

            {/* Day header */}
            <div style={{
              padding: "16px 16px 12px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <h2 style={{
                  margin: 0, fontSize: 22, letterSpacing: "0.06em",
                  background: "linear-gradient(90deg,#C4B5FD,#F0ABFC,#FCD34D)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {activeDay.toUpperCase()}
                </h2>
                <p style={{ margin: "3px 0 0", fontSize: 10, color: "#7B4A55", letterSpacing: "0.07em" }}>
                  {activeDay === "Wednesday" ? `FAST DAY | "God can do more with 6 than I can w/7"` : theme.label.toUpperCase()}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#D4B8F0", lineHeight: 1 }}>
                  {progress.pct}%
                </div>
                <div style={{ fontSize: 10, color: "#7B4A55", marginTop: 2 }}>
                  {progress.done}/{progress.total} done
                </div>
              </div>
            </div>

            {/* Trackers */}
            <div style={{
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center",
            }}>
              {/* Water — hidden on Wednesday */}
              {activeDay !== "Wednesday" && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 9, letterSpacing: "0.08em", color: "#38BDF8", fontWeight: 700 }}>💧 WATER</span>
                  <div style={{ display: "flex", gap: 5 }}>
                    {[0,1,2].map(i => {
                      const filled = !!water[`${activeDay}-w${i}`];
                      return (
                        <div key={i} onClick={() => toggleWater(activeDay, i)} style={{
                          width: 30, height: 38,
                          borderRadius: "4px 4px 10px 10px",
                          border: `2px solid ${filled ? "#38BDF8" : "rgba(56,189,248,0.3)"}`,
                          background: filled ? "linear-gradient(180deg,#38BDF8,#0EA5E9)" : "rgba(56,189,248,0.05)",
                          cursor: "pointer", transition: "all 0.2s",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 14,
                          boxShadow: filled ? "0 0 8px rgba(56,189,248,0.4)" : "none",
                          userSelect: "none", WebkitTapHighlightColor: "transparent",
                        }}>{filled ? "💧" : ""}</div>
                      );
                    })}
                  </div>
                  <span style={{ fontSize: 9, color: "#475569" }}>
                    {[0,1,2].filter(i => water[`${activeDay}-w${i}`]).length}/3
                  </span>
                </div>
              )}

              {/* Book */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 9, letterSpacing: "0.08em", color: "#B5255A", fontWeight: 700 }}>📖 CHAPTER</span>
                <div onClick={() => toggleBook(activeDay)} style={{
                  width: 40, height: 38, borderRadius: 8,
                  border: `2px solid ${book[activeDay] ? "#B5255A" : "rgba(181,37,90,0.3)"}`,
                  background: book[activeDay] ? "linear-gradient(135deg,#8B1A4A,#C0395A)" : "rgba(181,37,90,0.05)",
                  cursor: "pointer", transition: "all 0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                  boxShadow: book[activeDay] ? "0 0 8px rgba(181,37,90,0.4)" : "none",
                  userSelect: "none", WebkitTapHighlightColor: "transparent",
                }}>{book[activeDay] ? "📖" : "📕"}</div>
                <span style={{ fontSize: 9, color: book[activeDay] ? "#B5255A" : "#A07080" }}>
                  {book[activeDay] ? "Done!" : "Tap to log"}
                </span>
              </div>
            </div>

            {/* Non-negotiables */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize: 9, letterSpacing: "0.12em", color: "#000", marginBottom: 8, fontWeight: 700 }}>
                ★ DAILY NON-NEGOTIABLES
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {NON_NEGOTIABLES.map((nn, i) => (
                  <div key={i} onClick={() => toggleNN(i)} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 12px", borderRadius: 20,
                    border: `1px solid ${nnChecked[`${activeDay}-nn-${i}`] ? "#000" : "rgba(0,0,0,0.2)"}`,
                    background: nnChecked[`${activeDay}-nn-${i}`] ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.03)",
                    cursor: "pointer", transition: "all 0.2s", userSelect: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                      border: `2px solid ${nnChecked[`${activeDay}-nn-${i}`] ? "#000" : "rgba(0,0,0,0.3)"}`,
                      background: nnChecked[`${activeDay}-nn-${i}`] ? "#000" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: "#fff",
                    }}>{nnChecked[`${activeDay}-nn-${i}`] && "✓"}</div>
                    <span style={{ fontSize: 11, color: nnChecked[`${activeDay}-nn-${i}`] ? "#000" : "#333" }}>
                      {nn.icon} {nn.time} — {nn.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule items */}
            <div style={{ padding: "8px 12px 16px" }}>
              {schedule.map((item, idx) => {
                const done = !!checked[`${activeDay}-${idx}`];
                const catColor = CATEGORY_COLORS[item.category] || "#64748B";
                return (
                  <div key={idx} onClick={() => toggleCheck(activeDay, idx)} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "11px 10px", borderRadius: 10, marginBottom: 3,
                    cursor: "pointer", transition: "all 0.18s",
                    background: done ? `${theme.color}14` : "transparent",
                    border: `1px solid ${done ? theme.color+"40" : "transparent"}`,
                    userSelect: "none", WebkitTapHighlightColor: "transparent",
                  }}>
                    {/* Checkbox */}
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                      border: `2px solid ${done ? "#4A1B6D" : "rgba(74,27,109,0.4)"}`,
                      background: done ? "#4A1B6D" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: "#fff", transition: "all 0.2s",
                    }}>{done && "✓"}</div>

                    {/* Icon */}
                    <div style={{ fontSize: 18, flexShrink: 0, opacity: done ? 0.4 : 1 }}>
                      {item.icon}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: 14, fontWeight: 600, lineHeight: 1.3,
                          color: done ? "#9CA3AF" : "#1F1F2E",
                          textDecoration: done ? "line-through" : "none",
                          transition: "all 0.2s",
                        }}>{item.task}</span>
                        <span style={{
                          fontSize: 8, padding: "2px 6px", borderRadius: 8,
                          background: `${catColor}22`, color: catColor,
                          letterSpacing: "0.07em", fontWeight: 700, textTransform: "uppercase",
                        }}>{CATEGORY_LABELS[item.category] || item.category}</span>
                      </div>
                      <div style={{ fontSize: 10, color: "#7B4A55", marginTop: 2, lineHeight: 1.4 }}>
                        {item.time}
                        {item.sub && <span style={{ marginLeft: 6, color: "#9B6070" }}>• {item.sub}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{
              padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)",
              textAlign: "center",
            }}>
              <p style={{ margin: 0, fontSize: 10, color: "#7B4A55", fontStyle: "italic" }}>
                "Your routine is a love letter to your future self 💕"
              </p>
              <p style={{ margin: "5px 0 0", fontSize: 9, color: "#9B6070", letterSpacing: "0.1em" }}>
                Be Intentional. Stay Consistent. Build the Life. ♡
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
