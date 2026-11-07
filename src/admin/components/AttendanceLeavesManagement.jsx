import React, { useMemo, useState } from "react";
import "./AttendanceLeavesManagement.css";

const valueAt = (obj, path) => path.split(".").reduce((value, key) => value?.[key], obj);
const label = (value) => {
  if (value === null || value === undefined || value === "") return "Not set";
  if (typeof value === "object") return value.fullName || value.employeeCode || value.name || value._id || "Not set";
  return String(value).replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
const dateLabel = (value) => {
  if (!value) return "Not set";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};
const todayLocal = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

export default function AttendanceLeavesManagement({
  data = [],
  search = "",
  onSearchChange = () => {},
  loading = false,
  onRefresh = () => {},
  onMarkAttendance = () => {},
  onReviewLeave = () => {},
}) {
  const [view, setView] = useState("attendance");
  const [statusFilter, setStatusFilter] = useState("all");
  const [markForm, setMarkForm] = useState({ employeeId: "", date: todayLocal(), status: "present" });
  const [showMarkForm, setShowMarkForm] = useState(false);

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    return data.filter((row) => {
      const status = String(row.status || "").toLowerCase();
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const employee = `${label(row.employeeId)} ${row.employeeId?.email || ""} ${row.employeeId?.phone || ""}`.toLowerCase();
      const text = `${employee} ${JSON.stringify(row)}`.toLowerCase();
      return matchesStatus && (!query || text.includes(query));
    });
  }, [data, search, statusFilter]);

  const pending = data.filter((row) => String(row.status || "").toLowerCase() === "pending").length;
  const approved = data.filter((row) => String(row.status || "").toLowerCase() === "approved").length;
  const rejected = data.filter((row) => String(row.status || "").toLowerCase() === "rejected").length;
  const present = data.filter((row) => ["present", "late", "half_day"].includes(String(row.status || "").toLowerCase())).length;
  const absent = data.filter((row) => ["absent", "on_leave"].includes(String(row.status || "").toLowerCase())).length;

  const submitMark = (event) => {
    event.preventDefault();
    if (!markForm.employeeId.trim() || !markForm.date || !markForm.status) return;
    onMarkAttendance({ employeeId: markForm.employeeId.trim(), date: markForm.date, status: markForm.status });
  };

  return (
    <section className="stairs-people-ops">
      <header className="plo-heading">
        <div><span className="plo-eyebrow">PEOPLE OPERATIONS</span><h1>Attendance & Leaves</h1><p>Track daily attendance and review employee leave requests.</p></div>
        <button className="plo-button secondary" type="button" onClick={onRefresh} disabled={loading}>↻ Refresh</button>
      </header>

      <div className="plo-tabs" role="tablist" aria-label="People operations sections">
        <button type="button" role="tab" aria-selected={view === "attendance"} className={view === "attendance" ? "active" : ""} onClick={() => { setView("attendance"); setStatusFilter("all"); onSearchChange(""); }}>Attendance</button>
        <button type="button" role="tab" aria-selected={view === "leaves"} className={view === "leaves" ? "active" : ""} onClick={() => { setView("leaves"); setStatusFilter("all"); onSearchChange(""); }}>Leave requests</button>
      </div>

      {view === "attendance" ? (
        <>
          <div className="plo-stat-grid">
            <article><span>Attendance records</span><strong>{data.length}</strong><small>Loaded records</small></article>
            <article><span>Present / Late / Half day</span><strong>{present}</strong><small>Attendance marked</small></article>
            <article><span>Absent / On leave</span><strong>{absent}</strong><small>Needs attention</small></article>
          </div>
          <div className="plo-toolbar">
            <label className="plo-search"><span>⌕</span><input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search employee or attendance details" /></label>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter attendance status">
              <option value="all">All statuses</option><option value="present">Present</option><option value="late">Late</option><option value="half_day">Half day</option><option value="absent">Absent</option><option value="on_leave">On leave</option>
            </select>
            <button type="button" className="plo-button primary" onClick={() => setShowMarkForm((value) => !value)}>＋ Mark attendance</button>
          </div>
          {showMarkForm && (
            <form className="plo-mark-form" onSubmit={submitMark}>
              <div className="plo-form-title"><div><h2>Mark employee attendance</h2><p>Enter the employee MongoDB ID used by the existing manager mark API.</p></div><button type="button" onClick={() => setShowMarkForm(false)} aria-label="Close form">×</button></div>
              <div className="plo-form-grid">
                <label>Employee ID<input value={markForm.employeeId} onChange={(event) => setMarkForm({ ...markForm, employeeId: event.target.value })} placeholder="Employee MongoDB ID" required /></label>
                <label>Date<input type="date" value={markForm.date} onChange={(event) => setMarkForm({ ...markForm, date: event.target.value })} required /></label>
                <label>Attendance status<select value={markForm.status} onChange={(event) => setMarkForm({ ...markForm, status: event.target.value })}><option value="present">Present</option><option value="late">Late</option><option value="half_day">Half day</option><option value="absent">Absent</option><option value="on_leave">On leave</option></select></label>
              </div>
              <div className="plo-form-actions"><button type="button" className="plo-button secondary" onClick={() => setShowMarkForm(false)}>Cancel</button><button type="submit" className="plo-button primary" disabled={loading}>Save attendance</button></div>
            </form>
          )}
          <div className="plo-table-card">
            <div className="plo-table-head"><div><h2>Attendance register</h2><p>{rows.length} records shown</p></div><span className="plo-live">Live records</span></div>
            {loading && <div className="plo-loading">Loading attendance…</div>}
            <div className="plo-table-scroll"><table><thead><tr><th>Employee</th><th>Employee code</th><th>Date</th><th>Check in</th><th>Check out</th><th>Status</th><th>Note</th></tr></thead><tbody>
              {rows.map((row) => <tr key={row._id}><td>{label(row.employeeId)}</td><td>{label(valueAt(row, "employeeId.employeeCode"))}</td><td>{dateLabel(row.date)}</td><td>{label(row.checkIn)}</td><td>{label(row.checkOut)}</td><td><span className={`plo-status ${String(row.status || "").toLowerCase()}`}>{label(row.status)}</span></td><td>{label(row.note)}</td></tr>)}
              {!rows.length && <tr><td colSpan="7"><div className="plo-empty"><strong>No attendance records found</strong><span>Try another search or status filter.</span></div></td></tr>}
            </tbody></table></div>
          </div>
        </>
      ) : (
        <>
          <div className="plo-stat-grid">
            <article><span>Total leave requests</span><strong>{data.length}</strong><small>All requests</small></article>
            <article><span>Pending review</span><strong>{pending}</strong><small>Awaiting decision</small></article>
            <article><span>Approved</span><strong>{approved}</strong><small>Approved requests</small></article>
            <article><span>Rejected</span><strong>{rejected}</strong><small>Rejected requests</small></article>
          </div>
          <div className="plo-toolbar">
            <label className="plo-search"><span>⌕</span><input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search employee, leave type or reason" /></label>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter leave status"><option value="all">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select>
          </div>
          <div className="plo-table-card">
            <div className="plo-table-head"><div><h2>Leave requests</h2><p>{rows.length} records shown</p></div><span className="plo-live">Review queue</span></div>
            {loading && <div className="plo-loading">Loading leave requests…</div>}
            <div className="plo-table-scroll"><table><thead><tr><th>Employee</th><th>Employee code</th><th>Leave type</th><th>Start date</th><th>End date</th><th>Reason</th><th>Status</th><th>Decision</th></tr></thead><tbody>
              {rows.map((row) => <tr key={row._id}><td>{label(row.employeeId)}</td><td>{label(valueAt(row, "employeeId.employeeCode"))}</td><td>{label(row.leaveType)}</td><td>{dateLabel(row.startDate)}</td><td>{dateLabel(row.endDate)}</td><td className="plo-reason">{label(row.reason)}</td><td><span className={`plo-status ${String(row.status || "").toLowerCase()}`}>{label(row.status)}</span></td><td>{String(row.status || "").toLowerCase() === "pending" ? <div className="plo-decisions"><button type="button" onClick={() => onReviewLeave(row._id, "approved")}>Approve</button><button type="button" className="reject" onClick={() => onReviewLeave(row._id, "rejected")}>Reject</button></div> : <span className="plo-muted">Reviewed</span>}</td></tr>)}
              {!rows.length && <tr><td colSpan="8"><div className="plo-empty"><strong>No leave requests found</strong><span>There are no requests matching these filters.</span></div></td></tr>}
            </tbody></table></div>
          </div>
        </>
      )}
    </section>
  );
}
