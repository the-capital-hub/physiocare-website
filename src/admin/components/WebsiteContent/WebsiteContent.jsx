
import { useEffect, useMemo, useState } from "react";
import "./WebsiteContent.css";

const CONTENT_MODULES = {
  Services: {
    endpoint: "services",
    description: "Manage clinic treatments and services",
    fields: [
      ["name", "Service name", "text", true],
      ["description", "Description", "textarea", true],
      ["icon", "Icon name", "text"],
      ["duration", "Duration", "text"],
      ["active", "Visible on website", "checkbox"],
    ],
    columns: ["name", "description", "duration", "active"],
  },
  Team: {
    endpoint: "team",
    description: "Manage doctors and clinical team members",
    fields: [
      ["name", "Full name", "text", true],
      ["role", "Professional role", "text", true],
      ["bio", "Biography", "textarea"],
      ["active", "Visible on website", "checkbox"],
    ],
    columns: ["name", "role", "bio", "active"],
  },
  Testimonials: {
    endpoint: "testimonials",
    description: "Manage patient feedback and reviews",
    fields: [
      ["name", "Patient name", "text", true],
      ["text", "Review", "textarea", true],
      ["rating", "Rating", "number", true],
      ["active", "Visible on website", "checkbox"],
    ],
    columns: ["name", "text", "rating", "active"],
  },
  FAQs: {
    endpoint: "faqs",
    description: "Manage frequently asked questions",
    fields: [
      ["question", "Question", "textarea", true],
      ["answer", "Answer", "textarea", true],
      ["active", "Visible on website", "checkbox"],
    ],
    columns: ["question", "answer", "active"],
  },
};

const EMPTY_FORM = {};

function getRows(payload, endpoint) {
  if (Array.isArray(payload)) return payload;

  for (const key of [endpoint, "items", "data"]) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }

  return [];
}

function getInitialForm(fields, item = null) {
  const form = {};

  fields.forEach(([key, , type]) => {
    form[key] = item?.[key] ?? (type === "checkbox" ? true : "");
  });

  return form;
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Active" : "Hidden";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export default function WebsiteContent({
  apiRequest,
  loading: parentLoading = false,
  onNotice,
}) {
  const [activeTab, setActiveTab] = useState("Services");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const config = CONTENT_MODULES[activeTab];

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return records;

    return records.filter((record) =>
      config.columns.some((key) =>
        String(record[key] ?? "").toLowerCase().includes(query)
      )
    );
  }, [records, search, config]);

  const loadRecords = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiRequest(config.endpoint);
      setRecords(getRows(result, config.endpoint));
    } catch (err) {
      setRecords([]);
      setError(err.message || "Unable to load website content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
    setEditing(null);
    setForm(EMPTY_FORM);
    setSearch("");
    // Load when the selected content module changes.
  }, [activeTab]);

  const startAdd = () => {
    setEditing("new");
    setForm(getInitialForm(config.fields));
  };

  const startEdit = (record) => {
    setEditing(record._id);
    setForm(getInitialForm(config.fields, record));
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
  };

  const updateField = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const saveRecord = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const isNew = editing === "new";
      const path = isNew
        ? config.endpoint
        : `${config.endpoint}/${editing}`;

      await apiRequest(path, {
        method: isNew ? "POST" : "PATCH",
        body: JSON.stringify(form),
      });

      onNotice?.(
        isNew
          ? `${activeTab} item created successfully.`
          : `${activeTab} item updated successfully.`
      );

      cancelEdit();
      await loadRecords();
    } catch (err) {
      setError(err.message || "Unable to save content.");
    } finally {
      setSaving(false);
    }
  };

  const deleteRecord = async (record) => {
    const confirmed = window.confirm(
      `Delete "${record.name || record.question || "this item"}"?`
    );

    if (!confirmed) return;

    setSaving(true);
    setError("");

    try {
      await apiRequest(`${config.endpoint}/${record._id}`, {
        method: "DELETE",
      });

      onNotice?.("Content deleted successfully.");
      await loadRecords();
    } catch (err) {
      setError(err.message || "Unable to delete content.");
    } finally {
      setSaving(false);
    }
  };

  const total = records.length;
  const active = records.filter((item) => item.active).length;

  return (
    <section className="wc-page">
      <div className="wc-heading">
        <div>
          <span className="wc-eyebrow">WEBSITE MANAGEMENT</span>
          <h2>Website Content</h2>
          <p>Manage your clinic website content from one workspace.</p>
        </div>

        <button
          type="button"
          className="wc-refresh"
          onClick={loadRecords}
          disabled={loading || saving || parentLoading}
        >
          ↻ Refresh
        </button>
      </div>

      <div className="wc-stats">
        <div className="wc-stat-card">
          <span>Total content</span>
          <strong>{total}</strong>
          <small>Current section records</small>
        </div>

        <div className="wc-stat-card">
          <span>Published content</span>
          <strong>{active}</strong>
          <small>Marked visible on website</small>
        </div>

        <div className="wc-stat-card">
          <span>Hidden content</span>
          <strong>{total - active}</strong>
          <small>Not marked visible</small>
        </div>
      </div>

      <div className="wc-tabs">
        {Object.keys(CONTENT_MODULES).map((key) => (
          <button
            key={key}
            type="button"
            className={activeTab === key ? "wc-tab active" : "wc-tab"}
            onClick={() => setActiveTab(key)}
          >
            <strong>{key}</strong>
            <span>{CONTENT_MODULES[key].description}</span>
          </button>
        ))}
      </div>

      <div className="wc-toolbar">
        <div>
          <h3>{activeTab}</h3>
          <p>{config.description}</p>
        </div>

        <button
          type="button"
          className="wc-primary"
          onClick={startAdd}
          disabled={saving}
        >
          + Add {activeTab === "FAQs" ? "FAQ" : activeTab.slice(0, -1)}
        </button>
      </div>

      {error && (
        <div className="wc-error" role="alert">
          {error}
        </div>
      )}

      {editing !== null && (
        <form className="wc-editor" onSubmit={saveRecord}>
          <div className="wc-editor-heading">
            <div>
              <span className="wc-eyebrow">CONTENT EDITOR</span>
              <h3>{editing === "new" ? "Create new item" : "Edit item"}</h3>
            </div>

            <button
              type="button"
              className="wc-close"
              onClick={cancelEdit}
            >
              ×
            </button>
          </div>

          <div className="wc-form-grid">
            {config.fields.map(([key, label, type, required]) => (
              <label
                key={key}
                className={
                  type === "textarea" ? "wc-field wc-field-wide" : "wc-field"
                }
              >
                {type === "checkbox" ? (
                  <span className="wc-checkbox-field">
                    <input
                      type="checkbox"
                      checked={Boolean(form[key])}
                      onChange={(event) =>
                        updateField(key, event.target.checked)
                      }
                    />
                    {label}
                  </span>
                ) : (
                  <>
                    <span>{label}{required ? " *" : ""}</span>
                    {type === "textarea" ? (
                      <textarea
                        value={form[key] ?? ""}
                        required={required}
                        rows={4}
                        onChange={(event) =>
                          updateField(key, event.target.value)
                        }
                      />
                    ) : (
                      <input
                        type={type}
                        value={form[key] ?? ""}
                        required={required}
                        min={type === "number" ? 1 : undefined}
                        max={type === "number" ? 5 : undefined}
                        onChange={(event) =>
                          updateField(
                            key,
                            type === "number"
                              ? event.target.value === ""
                                ? ""
                                : Number(event.target.value)
                              : event.target.value
                          )
                        }
                      />
                    )}
                  </>
                )}
              </label>
            ))}
          </div>

          <div className="wc-editor-actions">
            <button
              type="button"
              className="wc-secondary"
              onClick={cancelEdit}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="wc-primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      )}

      <div className="wc-list-panel">
        <div className="wc-list-heading">
          <div>
            <h3>Content library</h3>
            <p>{filteredRecords.length} records found</p>
          </div>

          <input
            className="wc-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search ${activeTab.toLowerCase()}...`}
          />
        </div>

        {loading ? (
          <div className="wc-empty">Loading content...</div>
        ) : filteredRecords.length === 0 ? (
          <div className="wc-empty">
            <span>◇</span>
            <strong>No content found</strong>
            <p>Add a new item or change your search.</p>
          </div>
        ) : (
          <div className="wc-table-wrap">
            <table className="wc-table">
              <thead>
                <tr>
                  {config.columns.map((key) => (
                    <th key={key}>{key.replace(/([A-Z])/g, " $1")}</th>
                  ))}
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record._id}>
                    {config.columns.map((key) => (
                      <td key={key}>
                        {key === "rating"
                          ? `★ ${formatValue(record[key])}`
                          : formatValue(record[key])}
                      </td>
                    ))}

                    <td>
                      <span
                        className={
                          record.active
                            ? "wc-status published"
                            : "wc-status hidden"
                        }
                      >
                        {record.active ? "Visible" : "Hidden"}
                      </span>
                    </td>

                    <td>
                      <div className="wc-row-actions">
                        <button
                          type="button"
                          onClick={() => startEdit(record)}
                          disabled={saving}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete"
                          onClick={() => deleteRecord(record)}
                          disabled={saving}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
