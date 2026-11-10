import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./DashboardOverview.css";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").trim().replace(/\/$/, "");
const TOKEN_KEY = "physiocare_admin_token";

const request = async (path) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${API}/${path.replace(/^\/+/, "")}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const type = response.headers.get("content-type") || "";
  const payload = type.includes("application/json")
    ? await response.json().catch(() => ({}))
    : {};
  if (!response.ok) throw new Error(payload.message || `Unable to load ${path}`);
  return payload;
};

const firstArray = (payload, keys = []) => {
  if (Array.isArray(payload)) return payload;
  for (const key of [...keys, "data", "items", "rows", "results", "records"]) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  for (const value of Object.values(payload || {})) {
    if (Array.isArray(value)) return value;
  }
  return [];
};

const firstObject = (payload) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return {};
  return payload.summary || payload.kpis || payload.data || payload;
};

const numeric = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};
const money = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
}).format(numeric(value));
const count = (value) => numeric(value).toLocaleString("en-IN", { maximumFractionDigits: 0 });
const titleCase = (value = "") => String(value).replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());

const findNumber = (object, patterns) => {
  const entry = Object.entries(object || {}).find(([key, value]) =>
    patterns.some(pattern => pattern.test(key)) &&
    value !== null && value !== "" &&
    ["number", "string"].includes(typeof value) &&
    Number.isFinite(Number(value))
  );
  return entry ? numeric(entry[1]) : null;
};

const getLabel = (row, index) => {
  const key = Object.keys(row || {}).find(k => /(month|label|name|date|period|day|status)/i.test(k) && typeof row[k] === "string");
  return key ? String(row[key]) : `Item ${index + 1}`;
};
const getValue = (row) => {
  const key = Object.keys(row || {}).find(k => typeof row[k] === "number" && /(revenue|amount|total|count|patient|appointment|paid|pending|value|expense)/i.test(k))
    || Object.keys(row || {}).find(k => typeof row[k] === "number");
  return key ? numeric(row[key]) : null;
};

function Panel({ title, eyebrow, action, className = "", children }) {
  return <section className={`so-panel ${className}`}>
    <div className="so-panel-head">
      <div><span className="so-eyebrow">{eyebrow}</span><h3>{title}</h3></div>
      {action && <span className="so-panel-action">{action}</span>}
    </div>
    {children}
  </section>;
}

function MetricCard({ icon, label, value, foot, tone }) {
  return <article className={`so-kpi so-${tone}`}>
    <div className="so-kpi-top"><span className="so-kpi-icon">{icon}</span><span className="so-kpi-live"><i /> LIVE</span></div>
    <span className="so-kpi-label">{label}</span>
    <strong>{value}</strong>
    <span className="so-kpi-foot">{foot}</span>
    <span className="so-kpi-glow" />
  </article>;
}

function EmptyChart({ text = "No report data available yet" }) {
  return <div className="so-empty-chart"><span className="so-empty-symbol">⌁</span><p>{text}</p></div>;
}

function RevenueChart({ payload }) {
  const rows = useMemo(() => firstArray(payload, ["trend", "monthly", "revenue", "records"])
    .map((row, i) => ({ label: getLabel(row, i), value: getValue(row) }))
    .filter(item => item.value !== null).slice(-10), [payload]);
  if (!rows.length) return <EmptyChart />;
  const max = Math.max(1, ...rows.map(x => x.value));
  const points = rows.map((item, i) => {
    const x = rows.length === 1 ? 50 : 8 + i * (284 / (rows.length - 1));
    const y = 112 - (item.value / max) * 88;
    return `${x},${y}`;
  }).join(" ");
  const area = `8,112 ${points} 292,112`;
  return <div className="so-revenue-chart">
    <div className="so-chart-total"><span>Reported revenue</span><strong>{money(rows.reduce((s, x) => s + x.value, 0))}</strong></div>
    <svg viewBox="0 0 300 132" role="img" aria-label="Revenue trend chart" preserveAspectRatio="none">
      <defs><linearGradient id="soRevenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f04452" stopOpacity=".34"/><stop offset="100%" stopColor="#f04452" stopOpacity="0"/></linearGradient></defs>
      {[24, 52, 80, 112].map(y => <line key={y} x1="5" x2="295" y1={y} y2={y} className="so-grid-line" />)}
      <polygon points={area} fill="url(#soRevenueFill)" />
      <polyline points={points} className="so-revenue-line" />
      {rows.map((item, i) => {
        const x = rows.length === 1 ? 50 : 8 + i * (284 / (rows.length - 1));
        const y = 112 - (item.value / max) * 88;
        return <circle key={i} cx={x} cy={y} r="3.5" className="so-revenue-dot"><title>{`${item.label}: ${money(item.value)}`}</title></circle>;
      })}
    </svg>
    <div className="so-axis-labels"><span>{rows[0].label}</span><span>{rows[rows.length - 1].label}</span></div>
  </div>;
}

function StatusChart({ payload }) {
  const source = firstObject(payload);
  const entries = Object.entries(source).filter(([key, value]) =>
    /(completed|pending|cancelled|canceled|noShow|confirmed|scheduled)/i.test(key) && Number.isFinite(Number(value))
  ).slice(0, 5);
  const rows = entries.map(([key, value]) => ({ label: titleCase(key), value: numeric(value) })).filter(x => x.value >= 0);
  if (!rows.length) {
    const data = firstArray(payload, ["statuses", "breakdown", "appointments"]);
    data.forEach((row, i) => {
      const label = row.status || row._id || row.label || row.name || `Status ${i + 1}`;
      const value = row.count ?? row.total ?? row.value;
      if (Number.isFinite(Number(value))) rows.push({ label: titleCase(label), value: numeric(value) });
    });
  }
  if (!rows.length) return <EmptyChart />;
  const total = rows.reduce((s, x) => s + x.value, 0);
  const palette = ["#f04452", "#6e91ff", "#b28cff", "#e7a75a", "#56c7b3"];
  let offset = 0;
  const segments = rows.map((row, i) => {
    const dash = total ? row.value / total * 100 : 0;
    const segment = <circle key={row.label} r="38" cx="50" cy="50" fill="none" stroke={palette[i % palette.length]} strokeWidth="10"
      strokeDasharray={`${dash} ${100 - dash}`} strokeDashoffset={-offset} pathLength="100" />;
    offset += dash;
    return segment;
  });
  return <div className="so-status-wrap">
    <svg viewBox="0 0 100 100" className="so-donut" role="img" aria-label="Appointment status breakdown">
      <circle r="38" cx="50" cy="50" fill="none" stroke="#252b37" strokeWidth="10" />
      <g transform="rotate(-90 50 50)">{segments}</g>
      <text x="50" y="47" textAnchor="middle" className="so-donut-number">{count(total)}</text>
      <text x="50" y="59" textAnchor="middle" className="so-donut-caption">TOTAL</text>
    </svg>
    <div className="so-legend">{rows.map((row, i) => <div key={row.label}><i style={{ background: palette[i % palette.length] }} /><span>{row.label}</span><strong>{count(row.value)}</strong></div>)}</div>
  </div>;
}

function PatientChart({ payload }) {
  const rows = useMemo(() => firstArray(payload, ["trend", "monthly", "patients", "registrations"])
    .map((row, i) => ({ label: getLabel(row, i), value: getValue(row) }))
    .filter(x => x.value !== null).slice(-8), [payload]);
  if (!rows.length) return <EmptyChart />;
  const max = Math.max(1, ...rows.map(x => x.value));
  return <div className="so-growth-chart">
    {rows.map((row, i) => <div className="so-growth-col" key={`${row.label}-${i}`}>
      <strong>{count(row.value)}</strong>
      <div className="so-growth-track"><i style={{ height: `${Math.max(4, row.value / max * 100)}%` }} /></div>
      <span title={row.label}>{row.label}</span>
    </div>)}
  </div>;
}

function AppointmentList({ payload }) {
  const rows = firstArray(payload, ["appointments", "todayAppointments", "items"]).slice(0, 5);
  if (!rows.length) return <div className="so-inline-empty">No appointment records returned by the API.</div>;
  return <div className="so-table-wrap"><table className="so-table"><thead><tr><th>Patient</th><th>Time</th><th>Service</th><th>Status</th></tr></thead>
    <tbody>{rows.map((row, i) => {
      const patient = row.patient?.name || row.patientName || row.name || row.patient?.fullName || "Patient";
      const time = row.time || row.appointmentTime || row.startTime || (row.date ? new Date(row.date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "—");
      const service = row.service?.name || row.serviceName || row.treatment || "—";
      const status = row.status || "Scheduled";
      return <tr key={row._id || i}><td><strong>{patient}</strong></td><td>{time}</td><td>{service}</td><td><span className={`so-status-pill ${String(status).toLowerCase().replace(/\s+/g, "")}`}>{titleCase(status)}</span></td></tr>;
    })}</tbody></table></div>;
}

function ActivityList({ payload }) {
  const rows = firstArray(payload, ["items", "notifications", "activities", "data"]).slice(0, 5);
  if (!rows.length) return <div className="so-inline-empty">No recent activity available.</div>;
  return <div className="so-activity-list">{rows.map((row, i) => {
    const label = row.title || row.message || row.description || row.type || "Workspace update";
    const when = row.createdAt || row.updatedAt || row.date;
    return <div className="so-activity-item" key={row._id || i}><span className="so-activity-dot" /><div><strong>{label}</strong><small>{when ? new Date(when).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Recent update"}</small></div></div>;
  })}</div>;
}

function BranchPerformance({ branches }) {
  if (!branches.length) return <div className="so-inline-empty">Branch performance data is not available yet.</div>;
  const rows = branches.slice(0, 5).map((branch, i) => ({
    name: branch.branchName || branch.name || branch.branch?.name || branch.branchId?.name || `Branch ${i + 1}`,
    revenue: findNumber(branch, [/revenue/i, /collection/i, /income/i, /amount/i]) ?? 0,
    patients: findNumber(branch, [/patient/i]) ?? 0,
    appointments: findNumber(branch, [/appointment/i, /booking/i]) ?? 0,
  }));
  const max = Math.max(1, ...rows.map(x => x.revenue));
  return <div className="so-branch-list">{rows.map((row, i) => <div className="so-branch-row" key={`${row.name}-${i}`}>
    <div className="so-branch-info"><span className="so-branch-index">{String(i + 1).padStart(2, "0")}</span><div><strong>{row.name}</strong><small>{count(row.patients)} patients <b>·</b> {count(row.appointments)} appointments</small></div></div>
    <div className="so-branch-value"><strong>{money(row.revenue)}</strong><div><i style={{ width: `${Math.max(3, row.revenue / max * 100)}%` }} /></div></div>
  </div>)}</div>;
}

export default function DashboardOverview({ overview, loading = false, user, onRefresh, onNavigate }) {
  const [reports, setReports] = useState({});
  const [appointments, setAppointments] = useState(null);
  const [activities, setActivities] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");

  const loadDashboardDetails = useCallback(async () => {
    setReportLoading(true);
    setReportError("");
    const endpoints = ["revenue-trend", "appointments", "patients"];
    const results = await Promise.allSettled(endpoints.map(key => request(`reports/${key}`)));
    const next = {};
    results.forEach((result, i) => {
      if (result.status === "fulfilled") next[endpoints[i]] = result.value;
      else next[endpoints[i]] = { error: result.reason?.message || "Report unavailable" };
    });
    setReports(next);

    const [appointmentResult, activityResult] = await Promise.allSettled([
      request("appointments"),
      request("notifications"),
    ]);
    if (appointmentResult.status === "fulfilled") setAppointments(appointmentResult.value);
    if (activityResult.status === "fulfilled") setActivities(activityResult.value);
    setReportLoading(false);
  }, []);

  useEffect(() => { loadDashboardDetails(); }, [loadDashboardDetails]);

  const kpis = useMemo(() => {
    const source = overview?.kpis || overview || {};
    const definitions = [
      { label: "Total patients", icon: "♙", tone: "red", patterns: [/totalPatients/i, /^patients$/i, /patientCount/i], money: false, foot: "Patient records" },
      { label: "Appointments", icon: "▦", tone: "blue", patterns: [/totalAppointments/i, /^appointments$/i, /appointmentCount/i], money: false, foot: "Clinic activity" },
      { label: "Total revenue", icon: "₹", tone: "violet", patterns: [/totalRevenue/i, /^revenue$/i, /totalCollection/i], money: true, foot: "Business collections" },
      { label: "Pending payments", icon: "◷", tone: "amber", patterns: [/pendingPayments/i, /pendingAmount/i, /receivable/i], money: true, foot: "Outstanding balance" },
      { label: "Active employees", icon: "✚", tone: "teal", patterns: [/activeEmployees/i, /totalEmployees/i, /^employees$/i], money: false, foot: "Care team" },
    ];
    return definitions.map(def => {
      const value = findNumber(source, def.patterns);
      return value === null ? null : { ...def, value: def.money ? money(value) : count(value) };
    }).filter(Boolean);
  }, [overview]);

  const branches = overview?.branchPerformance || overview?.branches || [];
  const firstName = user?.name ? user.name.trim().split(/\s+/)[0] : "there";

  return <div className="stairs-overview-v2">
    <section className="so-welcome">
      <div className="so-welcome-content">
        <span className="so-welcome-tag"><i /> STAIRS OS <b>/</b> OVERVIEW</span>
        <h2>Welcome back, {firstName}</h2>
        <p>Your clinic operations, patient care and business performance in one place.</p>
        <div className="so-welcome-actions">
          <button onClick={() => onNavigate?.("Patients")}><span>＋</span> Add patient</button>
          <button onClick={() => onNavigate?.("Appointments")}><span>▦</span> Book appointment</button>
          <button onClick={() => onNavigate?.("Employees")}><span>♙</span> Add employee</button>
          <button onClick={() => onNavigate?.("Finance")}><span>₹</span> Record payment</button>
        </div>
      </div>
      <div className="so-welcome-art" aria-hidden="true"><div className="so-art-ring ring-one" /><div className="so-art-ring ring-two" /><div className="so-art-core">S</div><span className="so-art-cross">✦</span></div>
      <button className="so-refresh" onClick={() => { onRefresh?.(); loadDashboardDetails(); }} disabled={loading || reportLoading}><span className={loading || reportLoading ? "so-spin" : ""}>↻</span> Refresh</button>
    </section>

    <div className="so-section-title"><div><span className="so-eyebrow">AT A GLANCE</span><h3>Business snapshot</h3></div><span className="so-updated"><i /> Live workspace data</span></div>
    {kpis.length ? <div className="so-kpi-grid">{kpis.map(item => <MetricCard key={item.label} {...item} />)}</div> :
      <div className="so-no-kpis"><span>◈</span><div><strong>KPI data is not available</strong><p>Check the reports overview API response to populate these cards.</p></div></div>}

    <div className="so-chart-grid">
      <Panel title="Revenue overview" eyebrow="FINANCIAL PERFORMANCE" action="REPORT DATA"><RevenueChart payload={reports["revenue-trend"]} /></Panel>
      <Panel title="Appointments by status" eyebrow="CLINIC OPERATIONS" action="STATUS BREAKDOWN"><StatusChart payload={reports.appointments} /></Panel>
      <Panel title="Patient growth" eyebrow="PATIENT ACQUISITION" action="REGISTRATION TREND"><PatientChart payload={reports.patients} /></Panel>
    </div>

    <div className="so-section-title so-lower-title"><div><span className="so-eyebrow">DAILY OPERATIONS</span><h3>Clinic activity</h3></div></div>
    <div className="so-bottom-grid">
      <Panel title="Appointments" eyebrow="SCHEDULE" action="LATEST RECORDS" className="so-appointments-panel"><AppointmentList payload={appointments} /></Panel>
      <Panel title="Recent activity" eyebrow="WORKSPACE FEED" action="LATEST UPDATES"><ActivityList payload={activities} /></Panel>
    </div>
    <Panel title="Branch performance" eyebrow="LOCATION INSIGHTS" action={`${Array.isArray(branches) ? branches.length : 0} LOCATIONS`} className="so-branch-panel"><BranchPerformance branches={Array.isArray(branches) ? branches : []} /></Panel>
    {(reportLoading || reportError) && <p className="so-data-note">{reportLoading ? "Updating dashboard reports…" : reportError}</p>}
    <div className="so-footer-line"><span>STAIRS OS V1</span><span>Management overview</span></div>
  </div>;
}
