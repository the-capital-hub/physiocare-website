import { displayValue, money } from "./dashboardUtils";

const KPI_ITEMS = [
  { label: "Total Patients", key: "totalPatients", icon: "♙", tone: "red", caption: "Patient records" },
  { label: "Appointments Today", key: "appointmentsToday", icon: "▦", tone: "blue", caption: "Today's schedule" },
  { label: "Revenue Today", key: "revenueToday", icon: "₹", tone: "violet", isMoney: true, caption: "Today's collection" },
  { label: "Active Employees", key: "activeEmployees", icon: "♧", tone: "amber", caption: "Active team members" },
];

export default function DashboardKpiGrid({ overview }) {
  return (
    <section className="dashboard-kpi-grid" aria-label="Clinic key performance indicators">
      {KPI_ITEMS.map((item, index) => (
        <article className={`dashboard-kpi-card ${item.tone}`} key={item.key} style={{ "--kpi-index": index }}>
          <div className="dashboard-kpi-topline"><span>{item.label}</span><span className="dashboard-kpi-menu" aria-hidden="true">•••</span></div>
          <div className="dashboard-kpi-main">
            <div className="dashboard-kpi-copy">
              <strong>{item.isMoney ? money(overview[item.key]) : displayValue(overview[item.key])}</strong>
              <small>{item.caption}</small>
            </div>
            <div className="dashboard-kpi-icon" aria-hidden="true">{item.icon}</div>
          </div>
          <span className="dashboard-kpi-orb" aria-hidden="true" />
        </article>
      ))}
    </section>
  );
}
