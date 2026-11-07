export default function DashboardUnavailable({ loading, onRefresh }) {
  return (
    <section className="dashboard-panel dashboard-unavailable">
      <span className="dashboard-empty-symbol">▦</span>
      <strong>{loading ? "Loading your dashboard" : "Dashboard metrics unavailable"}</strong>
      <p>{loading ? "Fetching the latest clinic data from STAIRS OS." : "Check dashboard.read permission and backend connection, then refresh."}</p>
      {!loading && <button type="button" className="dashboard-refresh" onClick={onRefresh}>Try again</button>}
    </section>
  );
}
