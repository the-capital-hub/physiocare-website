import { useMemo, useState } from "react";
import "./SettingsManagement.css";

function humanize(value) {
  return String(value ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .replace(/^./, (character) => character.toUpperCase());
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") return "Not configured";
  if (typeof value === "boolean") return value ? "Enabled" : "Disabled";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function categoryFor(key) {
  const first = String(key || "General").split(/[._:/]/)[0];
  return humanize(first || "General");
}

export default function SettingsManagement({ settings = [], loading = false, onRefresh, onEdit }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All settings");

  const categories = useMemo(() => {
    const values = [...new Set(settings.map((item) => categoryFor(item.key)))].sort();
    return ["All settings", ...values];
  }, [settings]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return settings.filter((item) => {
      const matchesCategory = category === "All settings" || categoryFor(item.key) === category;
      const matchesQuery = !term || `${item.key} ${formatValue(item.value)}`.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [settings, query, category]);

  const configured = settings.filter((item) => item.value !== null && item.value !== undefined && item.value !== "").length;
  const empty = settings.length - configured;

  return (
    <div className="stairs-settings">
      <section className="settings-intro">
        <div>
          <span className="settings-kicker">SYSTEM CONTROL</span>
          <h2>Settings & configuration</h2>
          <p>Review the settings exposed to your account. Changes remain subject to your backend permissions.</p>
        </div>
        <button type="button" className="settings-refresh" onClick={onRefresh} disabled={loading}>
          <span aria-hidden="true">↻</span> {loading ? "Refreshing..." : "Refresh settings"}
        </button>
      </section>

      <section className="settings-summary" aria-label="Settings summary">
        <article className="settings-metric"><span>Total settings</span><strong>{settings.length}</strong><small>Returned by the server</small></article>
        <article className="settings-metric"><span>Configured</span><strong>{configured}</strong><small>Values are present</small></article>
        <article className="settings-metric"><span>Empty values</span><strong>{empty}</strong><small>Not currently configured</small></article>
      </section>

      <section className="settings-directory">
        <div className="settings-directory-head">
          <div><span className="settings-kicker">CONFIGURATION DIRECTORY</span><h3>Available settings</h3></div>
          <span className="settings-count">{filtered.length} records</span>
        </div>
        <div className="settings-toolbar">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search setting key or value..." aria-label="Search settings" />
          <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter settings category">
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="settings-empty"><span className="settings-empty-icon">⚙</span><strong>{loading ? "Loading settings..." : "No settings to display"}</strong><p>{settings.length ? "Try another search or category." : "No settings were returned, or this account does not have settings.read permission."}</p></div>
        ) : (
          <div className="settings-list">
            {filtered.map((item, index) => (
              <article className="settings-row" key={item._id || item.key || index}>
                <div className="settings-row-main">
                  <div className="settings-row-title"><strong>{humanize(item.key)}</strong><span>{categoryFor(item.key)}</span></div>
                  <code>{item.key}</code>
                  <pre>{formatValue(item.value)}</pre>
                  {item.updatedAt && <small className="settings-updated">Updated {new Date(item.updatedAt).toLocaleString("en-IN")}</small>}
                </div>
                <div className="settings-row-action">
                  <span className="settings-state">{item.value === null || item.value === undefined || item.value === "" ? "Not set" : "Available"}</span>
                  <button type="button" onClick={() => onEdit?.(item)} disabled={!onEdit}>Edit value</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <aside className="settings-security-note">
        <span aria-hidden="true">盾</span>
        <div><strong>Permission controlled</strong><p>Global settings can be changed only when the signed in account has <code>settings.system.manage</code>. Personal preferences are handled separately by the backend.</p></div>
      </aside>
    </div>
  );
}
