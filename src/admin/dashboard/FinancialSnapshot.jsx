import { money } from "./dashboardUtils";

export default function FinancialSnapshot({ overview, onNavigate }) {
  return (
    <section className="dashboard-panel dashboard-finance-panel">
      <div className="dashboard-panel-heading">
        <div><span className="dashboard-panel-icon violet">₹</span><div><h3>Financial snapshot</h3><p>Current selected reporting period</p></div></div>
        <button type="button" onClick={() => onNavigate("Finance")}>Open finance <span>↗</span></button>
      </div>
      <div className="dashboard-finance-grid">
        <div><span>Total revenue</span><strong>{money(overview.revenue)}</strong></div>
        <div><span>Total expenses</span><strong>{money(overview.expenses)}</strong></div>
        <div><span>Net operating</span><strong className={Number(overview.netOperating || 0) >= 0 ? "positive" : "negative"}>{money(overview.netOperating)}</strong></div>
        <div><span>Pending payments</span><strong>{money(overview.pendingPayments)}</strong></div>
      </div>
    </section>
  );
}
