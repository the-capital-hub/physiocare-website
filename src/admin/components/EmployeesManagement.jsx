import React, { useMemo, useState } from "react";
import "./EmployeesManagement.css";

const getValue = (obj, path) =>
  path.split(".").reduce((value, key) => value?.[key], obj);

const display = (value) => {
  if (value === null || value === undefined || value === "") return "Not set";
  if (typeof value === "object") return value.name || value.fullName || value._id || "Not set";
  return String(value).replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

export default function EmployeesManagement({
  data = [],
  filteredData,
  search = "",
  onSearchChange = () => {},
  loading = false,
  editing,
  form = {},
  module,
  renderField,
  onAdd,
  onEdit,
  onDeactivate,
  onSave,
  onCancel,
  onRefresh,
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const rows = useMemo(() => {
    const source = Array.isArray(filteredData) ? filteredData : data;
    return source.filter((employee) => {
      const status = String(employee.status || "active").toLowerCase();
      const type = String(employee.employmentType || "").toLowerCase();
      return (statusFilter === "all" || status === statusFilter) &&
        (typeFilter === "all" || type === typeFilter);
    });
  }, [data, filteredData, statusFilter, typeFilter]);

  const activeCount = data.filter((item) => String(item.status || "active").toLowerCase() === "active").length;
  const inactiveCount = data.filter((item) => String(item.status || "").toLowerCase() === "inactive").length;
  const therapistCount = data.filter((item) => /therapist|physio/i.test(item.designation || "")).length;

  return (
    <section className="stairs-employees">
      <div className="emp-heading">
        <div>
          <span className="emp-eyebrow">PEOPLE AND CARE</span>
          <h1>Employees</h1>
          <p>Manage your workforce, roles, branches and employment details.</p>
        </div>
        <div className="emp-heading-actions">
          <button className="emp-secondary" type="button" onClick={onRefresh} disabled={loading}>↻ Refresh</button>
          <button className="emp-primary" type="button" onClick={onAdd}>＋ Add employee</button>
        </div>
      </div>

      <div className="emp-stat-grid">
        <article className="emp-stat-card"><span>Total employees</span><strong>{data.length}</strong><small>All employee records</small></article>
        <article className="emp-stat-card"><span>Active workforce</span><strong>{activeCount}</strong><small>Currently active</small></article>
        <article className="emp-stat-card"><span>Inactive</span><strong>{inactiveCount}</strong><small>Inactive records</small></article>
        <article className="emp-stat-card"><span>Care team</span><strong>{therapistCount}</strong><small>Therapist and physio roles</small></article>
      </div>

      <div className="emp-toolbar">
        <label className="emp-search">
          <span>⌕</span>
          <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search name, code, role or department" />
        </label>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by status">
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="terminated">Terminated</option>
        </select>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} aria-label="Filter by employment type">
          <option value="all">All employment types</option>
          <option value="full_time">Full time</option>
          <option value="part_time">Part time</option>
          <option value="contract">Contract</option>
          <option value="intern">Intern</option>
        </select>
      </div>

      <div className="emp-table-card">
        <div className="emp-table-head">
          <div><h2>Employee directory</h2><p>{rows.length} records shown</p></div>
          <span className="emp-live-dot">Live records</span>
        </div>
        {loading && <div className="emp-loading">Updating employee records…</div>}
        <div className="emp-table-scroll">
          <table>
            <thead><tr><th>Employee</th><th>Employee code</th><th>Designation</th><th>Department</th><th>Employment</th><th>Branch</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.map((employee) => (
                <tr key={employee._id}>
                  <td><div className="emp-person"><span className="emp-avatar">{(employee.fullName || "E").trim().charAt(0).toUpperCase()}</span><div><strong>{display(employee.fullName)}</strong><small>{employee.email || employee.phone || "Contact not set"}</small></div></div></td>
                  <td className="emp-code">{display(employee.employeeCode)}</td>
                  <td>{display(employee.designation)}</td>
                  <td>{display(employee.department)}</td>
                  <td>{display(employee.employmentType)}</td>
                  <td>{display(getValue(employee, "branchId.name") || employee.branchId)}</td>
                  <td><span className={`emp-status ${String(employee.status || "active").toLowerCase()}`}>{display(employee.status || "active")}</span></td>
                  <td><div className="emp-row-actions"><button type="button" onClick={() => onEdit(employee)}>Edit</button><button type="button" className="emp-delete" onClick={() => onDeactivate(employee)}>Deactivate</button></div></td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan="8"><div className="emp-empty"><strong>No employees found</strong><span>Try changing your search or filters.</span></div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== undefined && editing !== null && (
        <form className="emp-edit-form" onSubmit={onSave}>
          <div className="emp-form-heading"><div><span className="emp-eyebrow">EMPLOYEE PROFILE</span><h2>{editing ? "Update employee" : "Add employee"}</h2></div><button type="button" className="emp-close" onClick={onCancel}>×</button></div>
          <div className="emp-form-grid">
            {module?.fields?.map((field) => renderField?.(field))}
          </div>
          <div className="emp-form-actions"><button type="button" className="emp-secondary" onClick={onCancel}>Cancel</button><button type="submit" className="emp-primary" disabled={loading}>{loading ? "Saving…" : "Save employee"}</button></div>
        </form>
      )}
    </section>
  );
}
