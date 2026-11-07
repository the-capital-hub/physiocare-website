import React, { useMemo, useState } from "react";
import "./AppointmentsManagement.css";

const first = (...values) => values.find((value) => value !== undefined && value !== null && value !== "");
const text = (value) => {
  if (value === null || value === undefined || value === "") return "Not added";
  if (typeof value === "object") return first(value.name, value.fullName, value.patientCode, value.employeeCode, value._id, "Not added");
  return String(value);
};
const dateLabel = (value) => {
  if (!value) return "Date not set";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};
const normalize = (value) => String(value || "").toLowerCase().replace(/[_-]+/g, " ").trim();

export default function AppointmentsManagement({ data = [], loading = false, onRefresh, onStatusChange }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const counts = useMemo(() => {
    const result = { total: data.length, confirmed: 0, completed: 0, cancelled: 0, pending: 0 };
    data.forEach((item) => {
      const status = normalize(item.status);
      if (status === "confirmed") result.confirmed += 1;
      else if (status === "completed") result.completed += 1;
      else if (status === "cancelled" || status === "no show") result.cancelled += 1;
      else result.pending += 1;
    });
    return result;
  }, [data]);

  const filtered = useMemo(() => data.filter((item) => {
    const patientName = first(item.name, item.patientName, item.patientId?.name, item.patient?.name, "");
    const phone = first(item.phone, item.patientPhone, item.patientId?.phone, item.patient?.phone, "");
    const service = first(item.service, item.serviceName, item.treatment, "");
    const searchText = `${patientName} ${phone} ${service} ${item.status || ""} ${item.branchId?.name || ""}`.toLowerCase();
    const matchesQuery = searchText.includes(query.trim().toLowerCase());
    const matchesStatus = statusFilter === "all" || normalize(item.status) === statusFilter;
    return matchesQuery && matchesStatus;
  }), [data, query, statusFilter]);

  const statusOptions = ["New", "Contacted", "Confirmed", "Completed", "Cancelled", "No Show"];

  return (
    <section className="stairs-appointments">
      <header className="appointments-heading">
        <div><span className="appointments-kicker">CLINIC SCHEDULE</span><h2>Appointments</h2><p>Track patient visits and update appointment progress.</p></div>
        <button type="button" className="appointments-refresh" onClick={onRefresh} disabled={loading}>{loading ? "Refreshing..." : "↻ Refresh schedule"}</button>
      </header>

      <div className="appointments-stats">
        <article className="appointment-stat stat-total"><span>Total appointments</span><strong>{counts.total}</strong><small>Loaded from clinic records</small></article>
        <article className="appointment-stat"><span>Confirmed</span><strong>{counts.confirmed}</strong><small>Ready for visit</small></article>
        <article className="appointment-stat"><span>Completed</span><strong>{counts.completed}</strong><small>Visit completed</small></article>
        <article className="appointment-stat"><span>Awaiting action</span><strong>{counts.pending}</strong><small>New or contacted</small></article>
      </div>

      <div className="appointments-panel">
        <div className="appointments-toolbar">
          <div><span className="appointments-kicker">VISIT MANAGEMENT</span><h3>Appointment list <span>{filtered.length}</span></h3></div>
          <div className="appointments-controls">
            <label className="appointments-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patient or service..." /></label>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by appointment status">
              <option value="all">All statuses</option>
              {statusOptions.map((status) => <option key={status} value={normalize(status)}>{status}</option>)}
            </select>
          </div>
        </div>

        <div className="appointments-table-wrap">
          <table className="appointments-table">
            <thead><tr><th>Patient</th><th>Service</th><th>Visit date</th><th>Time</th><th>Branch</th><th>Status</th><th>Update status</th></tr></thead>
            <tbody>
              {filtered.length === 0 ? <tr><td colSpan="7" className="appointments-empty">{loading ? "Loading appointments..." : "No appointments match these filters."}</td></tr> :
                filtered.map((item) => {
                  const patient = first(item.name, item.patientName, item.patientId?.name, item.patient?.name, "Patient");
                  const phone = first(item.phone, item.patientPhone, item.patientId?.phone, item.patient?.phone);
                  const service = first(item.service, item.serviceName, item.treatment, item.interestedService);
                  const visitDate = first(item.date, item.appointmentDate, item.scheduledAt, item.startTime);
                  const visitTime = first(item.time, item.appointmentTime, item.startTime && new Date(item.startTime).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
                  const status = String(item.status || "New");
                  const statusClass = normalize(status).replace(/\s+/g, "-");
                  return <tr key={item._id || `${patient}-${visitDate}-${visitTime}`}>
                    <td><div className="appointment-patient"><span className="appointment-avatar">{String(patient).charAt(0).toUpperCase()}</span><div><strong>{text(patient)}</strong><small>{text(phone)}</small></div></div></td>
                    <td>{text(service)}</td><td>{dateLabel(visitDate)}</td><td>{text(visitTime)}</td><td>{text(item.branchId?.name || item.branchName || item.branch)}</td>
                    <td><span className={`appointment-status status-${statusClass}`}>{status}</span></td>
                    <td><select className="appointment-status-select" aria-label={`Update status for ${patient}`} value={status} onChange={(event) => onStatusChange(item._id, event.target.value)} disabled={!item._id}><option value={status}>{status}</option>{statusOptions.filter((option) => option !== status).map((option) => <option key={option} value={option}>{option}</option>)}</select></td>
                  </tr>;
                })}
            </tbody>
          </table>
        </div>
        <footer className="appointments-foot">Showing {filtered.length} of {data.length} appointments</footer>
      </div>
    </section>
  );
}
