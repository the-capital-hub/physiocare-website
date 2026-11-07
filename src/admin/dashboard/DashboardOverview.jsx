import React, { useMemo } from "react";
import "./DashboardOverview.css";

const currencyKeys = /revenue|income|collection|expense|payment|receivable|balance|amount|sales/i;
const patientKeys = /patient/i;
const appointmentKeys = /appointment|booking|session/i;

const LABELS = {
  totalRevenue: "Total revenue",
  revenue: "Total revenue",
  totalPatients: "Total patients",
  patients: "Total patients",
  newPatients: "New patients",
  activePatients: "Active patients",
  totalAppointments: "Appointments",
  appointments: "Appointments",
  completedAppointments: "Completed appointments",
  cancelledAppointments: "Cancelled appointments",
  pendingPayments: "Pending payments",
  pendingAmount: "Pending payments",
  totalEmployees: "Team members",
  employees: "Team members",
  totalBranches: "Branches",
};

const number = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatNumber = (value) =>
  number(value).toLocaleString("en-IN", { maximumFractionDigits: 0 });

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(number(value));

const humanize = (key) =>
  LABELS[key] ||
  String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const getMetricValue = (source, patterns) => {
  const entry = Object.entries(source || {}).find(([key, value]) =>
    patterns.test(key) &&
    ["number", "string"].includes(typeof value) &&
    value !== "" &&
    Number.isFinite(Number(value))
  );
  return entry ? number(entry[1]) : null;
};

const getBranchName = (branch, index) =>
  branch?.branchName ||
  branch?.name ||
  branch?.branch?.name ||
  branch?.branchId?.name ||
  `Branch ${index + 1}`;

function MetricCard({ label, value, icon, tone, hint, index }) {
  return (
    <article
      className={`stairs-metric-card ${tone || ""}`}
      style={{ "--metric-index": index }}
    >
      <div className="stairs-metric-top">
        <span className="stairs-metric-icon" aria-hidden="true">{icon}</span>
        <span className="stairs-metric-hint">{hint}</span>
      </div>
      <p>{label}</p>
      <strong>{value}</strong>
      <span className="stairs-metric-accent" aria-hidden="true" />
    </article>
  );
}

function BranchPerformance({ branches }) {
  if (!branches.length) {
    return (
      <section className="stairs-dashboard-panel stairs-branch-panel stairs-panel-empty">
        <div className="stairs-section-heading">
          <div>
            <span className="stairs-section-kicker">LOCATION INSIGHTS</span>
            <h3>Branch performance</h3>
            <p>Branch level performance will appear when available.</p>
          </div>
        </div>
        <div className="stairs-branch-placeholder">
          <span className="stairs-placeholder-mark">⌖</span>
          <span>Branch data is not available yet</span>
        </div>
      </section>
    );
  }

  const normalized = branches.map((branch, index) => ({
    name: getBranchName(branch, index),
    revenue: getMetricValue(branch, /revenue|collection|income|amount/i) ?? 0,
    patients: getMetricValue(branch, /patient/i) ?? 0,
    appointments: getMetricValue(branch, /appointment|booking|session/i) ?? 0,
  }));

  const maxRevenue = Math.max(1, ...normalized.map((item) => item.revenue));

  return (
    <section className="stairs-dashboard-panel stairs-branch-panel">
      <div className="stairs-section-heading">
        <div>
          <span className="stairs-section-kicker">LOCATION INSIGHTS</span>
          <h3>Branch performance</h3>
          <p>Compare activity across your clinic locations</p>
        </div>
        <span className="stairs-section-count">{branches.length} locations</span>
      </div>

      <div className="stairs-branch-list">
        {normalized.map((branch, index) => (
          <article className="stairs-branch-row" key={`${branch.name}-${index}`}>
            <div className="stairs-branch-identity">
              <span className="stairs-branch-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{branch.name}</strong>
                <span>
                  {formatNumber(branch.patients)} patients
                  <i aria-hidden="true" />
                  {formatNumber(branch.appointments)} appointments
                </span>
              </div>
            </div>
            <div className="stairs-branch-revenue">
              <strong>{formatMoney(branch.revenue)}</strong>
              <div
                className="stairs-branch-track"
                role="progressbar"
                aria-label={`${branch.name} revenue share relative to highest branch`}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={Math.round((branch.revenue / maxRevenue) * 100)}
              >
                <i style={{ width: `${Math.max(3, (branch.revenue / maxRevenue) * 100)}%` }} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuickActions({ onNavigate }) {
  const shortcuts = [
    { label: "Add patient", detail: "Register a new patient", icon: "＋", tab: "Patients", tone: "red" },
    { label: "Book appointment", detail: "Manage clinic schedule", icon: "▦", tab: "Appointments", tone: "blue" },
    { label: "Add employee", detail: "Grow your care team", icon: "♙", tab: "Employees", tone: "violet" },
    { label: "Record payment", detail: "Update a payment record", icon: "₹", tab: "Finance", tone: "amber" },
  ];

  return (
    <section className="stairs-dashboard-panel stairs-operations-panel">
      <div className="stairs-section-heading">
        <div>
          <span className="stairs-section-kicker">WORKSPACE</span>
          <h3>Quick actions</h3>
          <p>Jump directly into everyday tasks</p>
        </div>
        <span className="stairs-action-mark" aria-hidden="true">↗</span>
      </div>
      <div className="stairs-shortcut-list">
        {shortcuts.map((item, index) => (
          <button
            type="button"
            className={`stairs-shortcut ${item.tone}`}
            key={item.label}
            onClick={() => onNavigate?.(item.tab)}
            style={{ "--action-index": index }}
          >
            <span className="stairs-shortcut-icon">{item.icon}</span>
            <span className="stairs-shortcut-copy">
              <strong>{item.label}</strong>
              <small>{item.detail}</small>
            </span>
            <span className="stairs-shortcut-arrow">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function DashboardOverview({
  overview,
  loading = false,
  user,
  onRefresh,
  onNavigate,
}) {
  const metrics = useMemo(() => {
    const source = overview && typeof overview === "object" ? overview : {};
    const entries = Object.entries(source).filter(([key, value]) =>
      key !== "branchPerformance" &&
      key !== "branches" &&
      ["number", "string"].includes(typeof value) &&
      value !== "" &&
      Number.isFinite(Number(value))
    );

    const definitions = [
      { key: "revenue", label: "Total revenue", icon: "₹", tone: "revenue", pattern: /totalRevenue|revenue|collection/i, money: true, hint: "Business performance" },
      { key: "patients", label: "Total patients", icon: "✚", tone: "patients", pattern: /totalPatients|patients/i, hint: "Patient database" },
      { key: "appointments", label: "Appointments", icon: "▦", tone: "appointments", pattern: /totalAppointments|appointments/i, hint: "Clinic activity" },
      { key: "pending", label: "Pending payments", icon: "◷", tone: "pending", pattern: /pendingPayments|pendingAmount|receivable/i, money: true, hint: "Needs attention" },
      { key: "newPatients", label: "New patients", icon: "＋", tone: "new", pattern: /newPatients/i, hint: "Recently registered" },
      { key: "activePatients", label: "Active patients", icon: "♥", tone: "active", pattern: /activePatients/i, hint: "Currently in care" },
    ];

    const cards = definitions.map((definition) => {
      const match = entries.find(([key]) => definition.pattern.test(key));
      if (!match) return null;
      return {
        ...definition,
        value: definition.money ? formatMoney(match[1]) : formatNumber(match[1]),
      };
    }).filter(Boolean);

    if (cards.length) return cards;

    return entries.slice(0, 6).map(([key, value], index) => ({
      key,
      label: humanize(key),
      icon: ["◈", "✚", "▦", "◷", "＋", "●"][index],
      value: currencyKeys.test(key) ? formatMoney(value) : formatNumber(value),
      tone: ["revenue", "patients", "appointments", "pending", "new", "active"][index],
      hint: "Live business metric",
    }));
  }, [overview]);

  const branchPerformance = Array.isArray(overview?.branchPerformance)
    ? overview.branchPerformance
    : Array.isArray(overview?.branches)
      ? overview.branches
      : [];

  const rawEntries = Object.entries(overview || {}).filter(([key, value]) =>
    key !== "branchPerformance" &&
    key !== "branches" &&
    value !== null &&
    ["number", "string", "boolean"].includes(typeof value)
  );

  const appointmentCount = getMetricValue(overview, appointmentKeys);
  const patientCount = getMetricValue(overview, patientKeys);
  const firstName = user?.name ? user.name.trim().split(/\s+/)[0] : "";

  return (
    <div className="stairs-dashboard">
      <section className="stairs-dashboard-hero">
        <div className="stairs-hero-copy">
          <div className="stairs-hero-eyebrow">
            <span className="stairs-hero-brand-dot" />
            <span className="stairs-section-kicker">STAIRS OS / BUSINESS OVERVIEW</span>
          </div>
          <h2>{firstName ? `Welcome back, ${firstName}` : "Welcome to your workspace"}</h2>
          <p>Your clinic at a glance. Track care delivery and business performance from one place.</p>
          <div className="stairs-live-indicator"><i /> Connected workspace</div>
        </div>
        <button className="stairs-refresh-button" type="button" onClick={onRefresh} disabled={loading}>
          <span className={loading ? "stairs-spin" : ""}>↻</span>
          {loading ? "Updating" : "Refresh data"}
        </button>
        <div className="stairs-hero-orb" aria-hidden="true" />
        <div className="stairs-hero-grid" aria-hidden="true" />
      </section>

      <div className="stairs-overview-heading">
        <div>
          <span className="stairs-section-kicker">YOUR CLINIC</span>
          <h3>Business snapshot</h3>
        </div>
        <span className="stairs-data-caption">Live metrics from your workspace</span>
      </div>

      {loading && !overview ? (
        <div className="stairs-dashboard-loading">
          <span className="stairs-loading-pulse" />
          <span>Preparing your business overview</span>
        </div>
      ) : metrics.length ? (
        <section className="stairs-metrics-grid">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.key} {...metric} index={index} />
          ))}
        </section>
      ) : (
        <section className="stairs-dashboard-panel stairs-empty-panel">
          <span className="stairs-empty-icon">◈</span>
          <div>
            <strong>Your overview is ready for data</strong>
            <p>Once the reports endpoint returns KPI values, they will appear here automatically.</p>
          </div>
        </section>
      )}

      <div className="stairs-dashboard-lower">
        <BranchPerformance branches={branchPerformance} />
        <QuickActions onNavigate={onNavigate} />
      </div>

      {rawEntries.length > 0 && (
        <details className="stairs-data-details">
          <summary>
            <span>Additional workspace metrics</span>
            <span className="stairs-details-count">{rawEntries.length} values</span>
          </summary>
          <div className="stairs-extra-metrics">
            {rawEntries.map(([key, value]) => (
              <div key={key}>
                <span>{humanize(key)}</span>
                <strong>
                  {currencyKeys.test(key)
                    ? formatMoney(value)
                    : typeof value === "boolean"
                      ? value ? "Yes" : "No"
                      : formatNumber(value)}
                </strong>
              </div>
            ))}
          </div>
        </details>
      )}

      <div className="stairs-dashboard-footnote">
        <span>STAIRS OS V1</span>
        <span>
          {patientCount !== null ? `${formatNumber(patientCount)} patients` : "Clinic workspace"}
          {appointmentCount !== null ? ` · ${formatNumber(appointmentCount)} appointments` : ""}
        </span>
      </div>
    </div>
  );
}
