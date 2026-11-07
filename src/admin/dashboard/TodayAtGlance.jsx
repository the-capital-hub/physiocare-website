import { displayValue } from "./dashboardUtils";

export default function TodayAtGlance({ overview }) {
  const items = [
    ["Upcoming appointments", overview.upcomingAppointments, "blue"],
    ["New patients", overview.newPatients, "red"],
    ["Employees present", overview.employeesPresentToday, "green"],
    ["Pending leave requests", overview.pendingLeaveRequests, "amber"],
    ["Active leads", overview.activeLeads, "violet"],
  ];

  return (
    <section className="dashboard-panel dashboard-today-panel">
      <div className="dashboard-panel-heading">
        <div><span className="dashboard-panel-icon blue">◷</span><div><h3>Today at a glance</h3><p>Key operational indicators</p></div></div>
      </div>
      <div className="dashboard-today-list">
        {items.map(([label, value, tone]) => (
          <div className="dashboard-today-item" key={label}>
            <span className={`dashboard-today-dot ${tone}`} /><span>{label}</span><strong>{displayValue(value)}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
