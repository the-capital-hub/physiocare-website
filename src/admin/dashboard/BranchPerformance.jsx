import { displayValue, money } from "./dashboardUtils";

export default function BranchPerformance({ branches, onNavigate }) {
  const hasBranches = Array.isArray(branches) && branches.length > 0;
  const maxRevenue = hasBranches
    ? Math.max(...branches.map((branch) => Number(branch.revenue || 0)), 1)
    : 1;

  return (
    <section className="dashboard-panel dashboard-branch-panel">
      <div className="dashboard-panel-heading">
        <div>
          <span className="dashboard-panel-icon red">▥</span>
          <div><h3>Branch Performance</h3><p>Live performance across active branches</p></div>
        </div>
        <button type="button" onClick={() => onNavigate("Branches")}>View branches <span>↗</span></button>
      </div>
      {hasBranches ? (
        <div className="dashboard-branch-list">
          {branches.map((branch, index) => {
            const width = Math.max(4, (Number(branch.revenue || 0) / maxRevenue) * 100);
            return (
              <div className="dashboard-branch-row" key={branch.branchId || branch.branchCode || index}>
                <div className="dashboard-branch-meta"><strong>{branch.branchName || `Branch ${index + 1}`}</strong><span>{displayValue(branch.branchCode)}</span></div>
                <div className="dashboard-branch-track"><i style={{ width: `${width}%` }} /></div>
                <div className="dashboard-branch-values"><strong>{money(branch.revenue)}</strong><span>{displayValue(branch.patients)} patients</span></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="dashboard-empty-chart"><span className="dashboard-empty-symbol">▥</span><strong>No branch performance data</strong><p>Branch level insights will appear here when available.</p></div>
      )}
    </section>
  );
}
