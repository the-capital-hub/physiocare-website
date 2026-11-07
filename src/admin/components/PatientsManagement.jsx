import React from "react";
import "./PatientsManagement.css";

const getValue = (source, path) => String(path).split(".").reduce((value, key) => value?.[key], source);
const readable = (value) => {
  if (value === null || value === undefined || value === "") return "Not added";
  if (typeof value === "object") return value.name || value.fullName || value.patientCode || "Available";
  return String(value);
};

export default function PatientsManagement({
  data = [], filteredData = [], search = "", onSearchChange, loading = false,
  editing, form = {}, module, renderField, onAdd, onEdit, onDeactivate,
  onSave, onCancel, onRefresh,
}) {
  const active = data.filter((p) => String(p.status || "").toLowerCase() === "active").length;
  const inactive = data.filter((p) => String(p.status || "").toLowerCase() === "inactive").length;
  const discharged = data.filter((p) => String(p.status || "").toLowerCase() === "discharged").length;
  const formOpen = editing !== null || (module?.editable && Object.keys(form).length > 0);

  return (
    <section className="stairs-patients">
      <div className="patients-heading">
        <div><span className="patients-kicker">PATIENT CARE DIRECTORY</span><h2>Patients</h2><p>Manage patient profiles and essential care information.</p></div>
        <div className="patients-heading-actions">
          <button className="patients-button patients-button-quiet" type="button" onClick={onRefresh} disabled={loading}>{loading ? "Refreshing..." : "↻ Refresh"}</button>
          <button className="patients-button patients-button-primary" type="button" onClick={onAdd}>+ Add patient</button>
        </div>
      </div>

      <div className="patients-metrics">
        <article className="patients-metric patients-metric-total"><span>Total patients</span><strong>{data.length}</strong><small>All registered profiles</small></article>
        <article className="patients-metric"><span>Active patients</span><strong>{active}</strong><small>Currently active</small></article>
        <article className="patients-metric"><span>Inactive</span><strong>{inactive}</strong><small>Inactive profiles</small></article>
        <article className="patients-metric"><span>Discharged</span><strong>{discharged}</strong><small>Completed care</small></article>
      </div>

      {formOpen ? (
        <section className="patients-form-panel">
          <div className="patients-section-heading"><div><span className="patients-kicker">{editing ? "UPDATE PROFILE" : "NEW REGISTRATION"}</span><h3>{editing ? "Edit patient details" : "Add a patient"}</h3></div><button className="patients-close" type="button" onClick={onCancel} aria-label="Close form">×</button></div>
          <form className="patients-form-grid" onSubmit={onSave}>
            {module?.fields?.map((field) => renderField(field))}
            <div className="patients-form-actions"><button className="patients-button patients-button-primary" type="submit" disabled={loading}>{loading ? "Saving..." : editing ? "Update patient" : "Save patient"}</button><button className="patients-button patients-button-quiet" type="button" onClick={onCancel}>Cancel</button></div>
          </form>
        </section>
      ) : (
        <section className="patients-list-panel">
          <div className="patients-list-toolbar">
            <div><span className="patients-kicker">PATIENT RECORDS</span><h3>All patients <span>{filteredData.length}</span></h3></div>
            <label className="patients-search"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search name, phone, code..." /></label>
          </div>
          <div className="patients-table-wrap"><table className="patients-table">
            <thead><tr><th>Patient</th><th>Contact</th><th>Condition</th><th>Branch</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredData.length === 0 ? <tr><td colSpan="6" className="patients-empty">{loading ? "Loading patient records..." : "No patient records found."}</td></tr> :
                filteredData.map((patient) => {
                  const status = String(patient.status || "Unknown");
                  const statusClass = status.toLowerCase().replace(/[^a-z]+/g, "");
                  return <tr key={patient._id || patient.patientCode || patient.phone}>
                    <td><div className="patients-person"><span className="patients-avatar">{String(patient.name || "P").trim().charAt(0).toUpperCase()}</span><div><strong>{readable(patient.name)}</strong><small>{readable(patient.patientCode)}</small></div></div></td>
                    <td><div className="patients-contact"><strong>{readable(patient.phone)}</strong><small>{readable(patient.email)}</small></div></td>
                    <td className="patients-condition">{readable(patient.condition)}</td><td>{readable(getValue(patient, "branchId.name"))}</td>
                    <td><span className={`patients-status is-${statusClass}`}>{status}</span></td>
                    <td><div className="patients-row-actions"><button type="button" onClick={() => onEdit(patient)}>Edit</button><button type="button" className="patients-delete-action" onClick={() => onDeactivate(patient)}>Deactivate</button></div></td>
                  </tr>;
                })}
            </tbody>
          </table></div>
          <div className="patients-list-foot">Showing {filteredData.length} of {data.length} patient records</div>
        </section>
      )}
    </section>
  );
}
