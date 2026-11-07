import React, { useMemo, useState } from "react";
import "./BranchesManagement.css";

const display = (value) => {
  if (value === null || value === undefined || value === "") return "Not set";
  if (typeof value === "object") return value.name || value._id || "Not set";
  return String(value);
};

export default function BranchesManagement({
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
  const [cityFilter, setCityFilter] = useState("all");

  const source = Array.isArray(filteredData) ? filteredData : data;
  const cities = useMemo(
    () => [...new Set(data.map((branch) => branch.city).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [data]
  );

  const rows = source.filter((branch) => {
    const active = branch.active !== false;
    return (statusFilter === "all" || (statusFilter === "active" ? active : !active)) &&
      (cityFilter === "all" || branch.city === cityFilter);
  });

  const activeCount = data.filter((branch) => branch.active !== false).length;
  const inactiveCount = data.length - activeCount;
  const cityCount = cities.length;

  return (
    <section className="stairs-branches">
      <header className="br-heading">
        <div>
          <span className="br-eyebrow">WORKSPACE MANAGEMENT</span>
          <h1>Branch Management</h1>
          <p>Manage clinic locations, contact details and branch availability.</p>
        </div>
        <div className="br-heading-actions">
          <button type="button" className="br-button secondary" onClick={onRefresh} disabled={loading}>↻ Refresh</button>
          <button type="button" className="br-button primary" onClick={onAdd}>＋ Add branch</button>
        </div>
      </header>

      <div className="br-stats">
        <article><span>Total branches</span><strong>{data.length}</strong><small>All registered locations</small></article>
        <article><span>Active branches</span><strong>{activeCount}</strong><small>Currently available</small></article>
        <article><span>Inactive branches</span><strong>{inactiveCount}</strong><small>Not currently active</small></article>
        <article><span>Operating cities</span><strong>{cityCount}</strong><small>Unique cities in records</small></article>
      </div>

      <div className="br-toolbar">
        <label className="br-search"><span>⌕</span><input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search branch name, code, city or contact" /></label>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter branch status">
          <option value="all">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option>
        </select>
        <select value={cityFilter} onChange={(event) => setCityFilter(event.target.value)} aria-label="Filter by city">
          <option value="all">All cities</option>{cities.map((city) => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>

      <div className="br-table-card">
        <div className="br-table-head"><div><h2>Branch directory</h2><p>{rows.length} locations shown</p></div><span className="br-live">Branch records</span></div>
        {loading && <div className="br-loading">Updating branch records…</div>}
        <div className="br-table-scroll">
          <table>
            <thead><tr><th>Branch</th><th>Branch code</th><th>Location</th><th>Contact</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.map((branch) => (
                <tr key={branch._id}>
                  <td><div className="br-branch-cell"><span className="br-avatar">{(branch.name || "B").trim().charAt(0).toUpperCase()}</span><div><strong>{display(branch.name)}</strong><small>{display(branch.address)}</small></div></div></td>
                  <td className="br-code">{display(branch.code)}</td>
                  <td>{[branch.city, branch.state].filter(Boolean).join(", ") || "Not set"}</td>
                  <td>{display(branch.phone)}</td>
                  <td>{display(branch.email)}</td>
                  <td><span className={`br-status ${branch.active === false ? "inactive" : "active"}`}>{branch.active === false ? "Inactive" : "Active"}</span></td>
                  <td><div className="br-actions"><button type="button" onClick={() => onEdit(branch)}>Edit</button><button type="button" className="archive" onClick={() => onDeactivate(branch)}>Deactivate</button></div></td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan="7"><div className="br-empty"><strong>No branches found</strong><span>Try changing your search or filters.</span></div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== undefined && editing !== null && (
        <form className="br-edit-form" onSubmit={onSave}>
          <div className="br-form-heading"><div><span className="br-eyebrow">LOCATION PROFILE</span><h2>{editing ? "Update branch" : "Add new branch"}</h2><p>Enter the branch details below.</p></div><button type="button" className="br-close" onClick={onCancel} aria-label="Close form">×</button></div>
          <div className="br-form-grid">{module?.fields?.map((field) => renderField?.(field))}</div>
          <div className="br-form-actions"><button type="button" className="br-button secondary" onClick={onCancel}>Cancel</button><button type="submit" className="br-button primary" disabled={loading}>{loading ? "Saving…" : "Save branch"}</button></div>
        </form>
      )}
    </section>
  );
}
