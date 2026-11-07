const ACTIONS = [
  ["Patients", "♙", "red"],
  ["Appointments", "▦", "blue"],
  ["Employees", "♧", "amber"],
  ["Reports", "▥", "violet"],
];

export default function QuickActions({ onNavigate }) {
  return (
    <section className="dashboard-panel dashboard-actions-panel">
      <div className="dashboard-panel-heading">
        <div><span className="dashboard-panel-icon red">✦</span><div><h3>Quick actions</h3><p>Jump into your daily workflow</p></div></div>
      </div>
      <div className="dashboard-action-grid">
        {ACTIONS.map(([label, icon, tone]) => (
          <button type="button" className={`dashboard-action ${tone}`} key={label} onClick={() => onNavigate(label)}>
            <span aria-hidden="true">{icon}</span>{label}<b>↗</b>
          </button>
        ))}
      </div>
    </section>
  );
}
