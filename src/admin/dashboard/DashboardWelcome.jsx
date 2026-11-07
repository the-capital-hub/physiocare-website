export default function DashboardWelcome({ user, loading, onRefresh }) {
  const displayName = user?.fullName || user?.name || user?.email?.split("@")[0] || "Admin";
  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="dashboard-welcome-row">
      <div className="dashboard-welcome-copy">
        <div className="dashboard-eyebrow-row">
          <span className="dashboard-live-indicator" />
          <p className="eyebrow">STAIRS OS <span>/</span> CLINIC CONTROL CENTER</p>
        </div>
        <h2>Welcome back, <span>{displayName}</span></h2>
        <p className="dashboard-subtitle">Your clinic at a glance. Here is what is happening today.</p>
      </div>
      <div className="dashboard-welcome-actions">
        <div className="dashboard-date-chip"><span aria-hidden="true">▦</span><span>{today}</span></div>
        <button type="button" className="dashboard-refresh" onClick={onRefresh} disabled={loading}>
          <span aria-hidden="true">↻</span> {loading ? "Refreshing" : "Refresh data"}
        </button>
      </div>
    </header>
  );
}
