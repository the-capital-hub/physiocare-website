import React, { useMemo, useState } from "react";
import "./ReportsAnalytics.css";

const REPORTS = [
  ["revenue-trend", "Revenue Trend", "Monthly revenue performance from the reports API"],
  ["appointments", "Appointments", "Appointment activity returned by the reports API"],
  ["patients", "Patients", "Patient activity returned by the reports API"],
  ["workforce", "Workforce", "Workforce performance returned by the reports API"],
  ["receivables", "Receivables", "Outstanding receivables returned by the reports API"],
];

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const humanize = (value) => String(value ?? "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replaceAll("_", " ").replace(/^./, (char) => char.toUpperCase());
const formatNumber = (value) => Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });
const formatValue = (value) => {
  if (value === null || value === undefined || value === "") return "Not available";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "string") return value;
  return null;
};
const moneyLike = (key) => /(revenue|amount|expense|balance|receivable|paid|gross|net|salary|value)/i.test(key);
const formatMetric = (key, value) => typeof value === "number" && moneyLike(key) ? `₹${formatNumber(value)}` : formatValue(value) ?? "Detailed data";

function rowsFrom(payload) {
  if (Array.isArray(payload)) return payload.filter(isObject);
  if (!isObject(payload)) return [];
  const preferred = ["data", "items", "rows", "results", "trend", "monthly", "records", "appointments", "patients", "employees", "payments", "invoices", "expenses", "workforce"];
  for (const key of preferred) if (Array.isArray(payload[key])) return payload[key].filter(isObject);
  for (const value of Object.values(payload)) if (Array.isArray(value) && value.some(isObject)) return value.filter(isObject);
  return [];
}

function metricsFrom(payload) {
  if (!isObject(payload)) return [];
  const source = isObject(payload.summary) ? payload.summary : isObject(payload.kpis) ? payload.kpis : payload;
  return Object.entries(source).filter(([, value]) => ["string", "number", "boolean"].includes(typeof value)).slice(0, 8);
}

function chartFrom(payload, preferredPattern) {
  const rows = rowsFrom(payload);
  if (!rows.length) return null;
  const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const numericKey = keys.find((key) => preferredPattern.test(key) && rows.some((row) => typeof row[key] === "number"))
    || keys.find((key) => rows.some((row) => typeof row[key] === "number"));
  const labelKey = keys.find((key) => /(month|label|name|date|period|status|department|category|service|role)/i.test(key) && rows.some((row) => typeof row[key] === "string"))
    || keys.find((key) => rows.some((row) => typeof row[key] === "string"));
  if (!numericKey) return null;
  const points = rows.map((row, index) => ({ label: String(row[labelKey] ?? `Item ${index + 1}`), value: Number(row[numericKey]) })).filter((item) => Number.isFinite(item.value)).slice(0, 12);
  return points.length ? { label: humanize(numericKey), points } : null;
}

function statusBreakdown(payload) {
  const rows = rowsFrom(payload);
  if (rows.length) {
    const key = Object.keys(rows[0]).find((name) => /status/i.test(name));
    if (key) {
      const counts = new Map();
      rows.forEach((row) => {
        const label = humanize(row[key] || "Unknown");
        counts.set(label, (counts.get(label) || 0) + 1);
      });
      return [...counts.entries()].map(([label, value]) => ({ label, value }));
    }
  }
  if (isObject(payload)) {
    const source = isObject(payload.summary) ? payload.summary : payload;
    const statusEntries = Object.entries(source).filter(([key, value]) => /completed|scheduled|pending|cancelled|canceled|progress|confirmed|no.?show/i.test(key) && typeof value === "number");
    if (statusEntries.length) return statusEntries.map(([label, value]) => ({ label: humanize(label), value }));
  }
  return [];
}

function valueLabel(value) {
  if (Array.isArray(value)) return `${value.length} records`;
  if (isObject(value)) return value.name || value.fullName || value.label || value._id || "Details";
  return formatValue(value) ?? "Not available";
}

function DataTable({ payload }) {
  const rows = rowsFrom(payload);
  if (!rows.length) return <div className="ra-empty">No tabular records were returned by this report.</div>;
  const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))].slice(0, 9);
  return <div className="ra-table-wrap"><table className="ra-table"><thead><tr>{keys.map((key) => <th key={key}>{humanize(key)}</th>)}</tr></thead><tbody>{rows.slice(0, 30).map((row, index) => <tr key={row._id || row.id || index}>{keys.map((key) => <td key={key}>{valueLabel(row[key])}</td>)}</tr>)}</tbody></table></div>;
}

function MetricCards({ reports }) {
  const configs = [
    ["revenue-trend", "Revenue Trend", /revenue|amount|total/i],
    ["appointments", "Appointments", /appointment|total|count/i],
    ["patients", "Patients", /patient|total|count/i],
    ["workforce", "Workforce", /employee|staff|workforce|total|count/i],
    ["receivables", "Receivables", /receivable|balance|amount|total/i],
  ];
  return <div className="ra-summary-grid">{configs.map(([key, title, pattern], index) => {
    const payload = reports[key];
    const metrics = metricsFrom(payload);
    const chosen = metrics.find(([name, value]) => typeof value === "number" && pattern.test(name)) || metrics.find(([, value]) => typeof value === "number");
    const rows = rowsFrom(payload);
    const value = payload?.error ? "Error" : chosen ? formatMetric(chosen[0], chosen[1]) : rows.length ? formatNumber(rows.length) : "—";
    const suffix = payload?.error ? "Report unavailable" : chosen ? humanize(chosen[0]) : rows.length ? "Records returned" : "Awaiting data";
    return <button type="button" className="ra-summary-card" key={key} onClick={() => document.getElementById(`ra-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
      <span className="ra-card-top"><span className="ra-card-icon">{["₹", "▦", "♙", "♧", "▣"][index]}</span><span className="ra-card-index">0{index + 1}</span></span>
      <span className="ra-card-title">{title}</span><strong>{value}</strong><small>{suffix}</small>
    </button>;
  })}</div>;
}

function LineChart({ data }) {
  const width = 720, height = 220, left = 16, right = 16, top = 18, bottom = 34;
  const values = data.points.map((point) => point.value);
  const min = Math.min(0, ...values), max = Math.max(1, ...values), range = max - min || 1;
  const x = (index) => left + (data.points.length <= 1 ? 0 : index / (data.points.length - 1) * (width - left - right));
  const y = (value) => top + (max - value) / range * (height - top - bottom);
  const points = data.points.map((point, index) => `${x(index)},${y(point.value)}`).join(" ");
  const area = `${left},${height - bottom} ${points} ${x(data.points.length - 1)},${height - bottom}`;
  return <div className="ra-line-chart"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${data.label} trend chart`}>
    <defs><linearGradient id="ra-area-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f04452" stopOpacity=".34"/><stop offset="100%" stopColor="#f04452" stopOpacity="0"/></linearGradient></defs>
    {[0, 1, 2, 3].map((line) => <line key={line} x1={left} y1={top + line * 52} x2={width - right} y2={top + line * 52} className="ra-grid-line"/>)}
    <polygon points={area} fill="url(#ra-area-fill)"/><polyline points={points} className="ra-line-path"/>
    {data.points.map((point, index) => <circle key={`${point.label}-${index}`} cx={x(index)} cy={y(point.value)} r="4" className="ra-line-dot"><title>{`${point.label}: ${formatNumber(point.value)}`}</title></circle>)}
  </svg><div className="ra-chart-labels">{data.points.map((point, index) => <span key={`${point.label}-${index}`} title={point.label}>{point.label}</span>)}</div></div>;
}

function BarChart({ data }) {
  const max = Math.max(1, ...data.points.map((point) => Math.abs(point.value)));
  return <div className="ra-bars">{data.points.map((point, index) => <div className="ra-bar-row" key={`${point.label}-${index}`}><span className="ra-bar-name" title={point.label}>{point.label}</span><div className="ra-bar-track"><i style={{ width: `${Math.max(2, Math.abs(point.value) / max * 100)}%` }}/></div><strong>{formatNumber(point.value)}</strong></div>)}</div>;
}

function DonutChart({ items }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  if (!total) return <div className="ra-empty">No appointment status breakdown available.</div>;
  const colors = ["#35d69a", "#3989f7", "#f3b934", "#f05a68", "#9b83f5", "#5bc0d5"];
  let cumulative = 0;
  const segments = items.map((item, index) => {
    const start = cumulative / total * 100;
    cumulative += item.value;
    const end = cumulative / total * 100;
    return `${colors[index % colors.length]} ${start}% ${end}%`;
  }).join(", ");
  return <div className="ra-donut-layout"><div className="ra-donut" style={{ background: `conic-gradient(${segments})` }}><div className="ra-donut-hole"><strong>{formatNumber(total)}</strong><span>Total</span></div></div><div className="ra-legend">{items.map((item, index) => <div className="ra-legend-row" key={item.label}><i style={{ background: colors[index % colors.length] }}/><span>{item.label}</span><strong>{formatNumber(item.value)}</strong></div>)}</div></div>;
}

function RawDetails({ payload }) {
  if (!isObject(payload)) return null;
  return <details className="ra-raw-details"><summary>View complete original report data</summary><pre>{JSON.stringify(payload, null, 2)}</pre></details>;
}

export default function ReportsAnalytics({ reports = {}, loading = false, onRefresh }) {
  const [activeReport, setActiveReport] = useState("revenue-trend");
  const [chartMode, setChartMode] = useState("line");
  const revenue = useMemo(() => chartFrom(reports["revenue-trend"], /revenue|amount|total|value/i), [reports]);
  const appointmentStatuses = useMemo(() => statusBreakdown(reports.appointments), [reports]);
  const workforce = useMemo(() => chartFrom(reports.workforce, /employee|staff|workforce|count|total|value/i), [reports]);
  const active = REPORTS.find(([key]) => key === activeReport) || REPORTS[0];
  const activePayload = reports[activeReport];
  const activeRows = rowsFrom(activePayload);
  const activeChart = chartFrom(activePayload, /revenue|amount|total|count|value|patient|appointment/i);
  const keyMetrics = useMemo(() => REPORTS.flatMap(([key, title]) => metricsFrom(reports[key]).map(([metric, value]) => ({ key: `${key}-${metric}`, title: humanize(metric), value: formatMetric(metric, value) }))).slice(0, 4), [reports]);

  return <section className="ra-page">
    <div className="ra-heading"><div className="ra-heading-copy"><p className="ra-eyebrow"><i/> STAIRS OS V1 <span>·</span> BUSINESS INTELLIGENCE</p><div className="ra-title-line"><span className="ra-title-icon">▥</span><h2>Reports &amp; Analytics</h2></div><p>Monitor clinic performance with live operational insights.</p></div><div className="ra-heading-actions"><span className="ra-data-status"><i/> Connected reports</span><button type="button" className="ra-refresh" onClick={onRefresh} disabled={loading}><span>↻</span>{loading ? "Refreshing..." : "Refresh reports"}</button></div></div>

    <MetricCards reports={reports}/>

    <div className="ra-primary-grid">
      <section className="ra-panel ra-revenue-panel" id="ra-revenue-trend"><div className="ra-panel-heading"><div><span className="ra-section-label">PERFORMANCE OVERVIEW</span><h3>Revenue Trend</h3><p>Revenue performance returned by the reports API</p></div><div className="ra-chart-switch"><button type="button" className={chartMode === "line" ? "active" : ""} onClick={() => setChartMode("line")}>Line</button><button type="button" className={chartMode === "bar" ? "active" : ""} onClick={() => setChartMode("bar")}>Bars</button></div></div>{revenue ? chartMode === "line" ? <LineChart data={revenue}/> : <BarChart data={revenue}/> : <div className="ra-empty">Revenue chart will appear when the API returns labeled numeric records.</div>}</section>
      <section className="ra-panel" id="ra-appointments"><div className="ra-panel-heading"><div><span className="ra-section-label">CLINIC ACTIVITY</span><h3>Appointments by Status</h3><p>Distribution derived from appointment records</p></div></div><DonutChart items={appointmentStatuses}/></section>
    </div>

    <div className="ra-secondary-grid">
      <section className="ra-panel"><div className="ra-panel-heading"><div><span className="ra-section-label">OPERATIONAL SNAPSHOT</span><h3>Key Metrics</h3><p>Summary values provided by report endpoints</p></div></div>{keyMetrics.length ? <div className="ra-key-metrics">{keyMetrics.map((item) => <div className="ra-key-metric" key={item.key}><span>{item.title}</span><strong>{item.value}</strong></div>)}</div> : <div className="ra-empty">No summary metrics returned by the reports API.</div>}</section>
      <section className="ra-panel" id="ra-workforce"><div className="ra-panel-heading"><div><span className="ra-section-label">TEAM PERFORMANCE</span><h3>Workforce Breakdown</h3><p>{workforce ? workforce.label : "Workforce report data"}</p></div></div>{workforce ? <BarChart data={workforce}/> : <div className="ra-empty">Workforce chart will appear when the API returns labeled numeric records.</div>}</section>
    </div>

    <section className="ra-panel ra-records-panel" id={`ra-${activeReport}`}><div className="ra-records-heading"><div><span className="ra-section-label">REPORT EXPLORER</span><h3>Detailed Report Records</h3><p>Select a report to inspect its original backend data.</p></div><span className="ra-record-count">{activeRows.length} records</span></div><div className="ra-report-tabs">{REPORTS.map(([key, title]) => <button type="button" key={key} className={activeReport === key ? "active" : ""} onClick={() => setActiveReport(key)}>{title}</button>)}</div><div className="ra-active-report-heading"><div><h4>{active[1]}</h4><p>{active[2]}</p></div><span className="ra-source-label">LIVE API RESPONSE</span></div>{activePayload?.error ? <div className="ra-empty">{activePayload.error}</div> : activePayload === undefined ? <div className="ra-empty">Waiting for report data.</div> : <><DataTable payload={activePayload}/><RawDetails payload={activePayload}/></>}</section>
    <p className="ra-footnote">All figures, charts and breakdowns are derived from existing reports API responses. No sample or estimated values are inserted.</p>
  </section>;
}
