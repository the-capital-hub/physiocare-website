import React, { useMemo, useState } from "react";
import "./PayrollFinanceManagement.css";

const getValue = (source, path) => path.split(".").reduce((value, key) => value?.[key], source);
const titleCase = (value) => {
  if (value === null || value === undefined || value === "") return "Not set";
  if (typeof value === "object") return value.fullName || value.name || value.employeeCode || value._id || "Not set";
  return String(value).replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
const currency = (value) => `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const dateText = (value) => {
  if (!value) return "Not set";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

export default function PayrollFinanceManagement({
  tab = "Payroll",
  data = [],
  loading = false,
  financeTab = "summary",
  setFinanceTab = () => {},
  financeSummary = null,
  onRefresh = () => {},
  onPayrollStatus = () => {},
}) {
  const [payrollFilter, setPayrollFilter] = useState("all");
  const [payrollSearch, setPayrollSearch] = useState("");
  const [financeSearch, setFinanceSearch] = useState("");

  const payrollRows = useMemo(() => {
    const query = payrollSearch.trim().toLowerCase();
    return data.filter((row) => {
      const status = String(row.status || "").toLowerCase();
      const employee = `${titleCase(row.employeeId)} ${row.employeeId?.employeeCode || ""}`.toLowerCase();
      return (payrollFilter === "all" || status === payrollFilter) &&
        (!query || `${employee} ${JSON.stringify(row)}`.toLowerCase().includes(query));
    });
  }, [data, payrollFilter, payrollSearch]);

  const financeRows = useMemo(() => {
    const query = financeSearch.trim().toLowerCase();
    if (!query) return data;
    return data.filter((row) => JSON.stringify(row).toLowerCase().includes(query));
  }, [data, financeSearch]);

  const totalNet = data.reduce((sum, row) => sum + Number(row.net || 0), 0);
  const draftCount = data.filter((row) => row.status === "draft").length;
  const approvedCount = data.filter((row) => row.status === "approved").length;
  const paidCount = data.filter((row) => row.status === "paid").length;

  const financeColumns = financeTab === "payments"
    ? ["receiptNumber", "patientId.name", "amount", "method", "status", "paidAt"]
    : financeTab === "invoices"
      ? ["invoiceNumber", "patientId.name", "total", "amountPaid", "balanceDue", "status", "dueDate"]
      : ["expenseNumber", "category", "description", "amount", "expenseDate", "status"];

  const renderFinanceValue = (row, key) => {
    const value = getValue(row, key);
    if (/(amount|total|balanceDue|amountPaid)/i.test(key)) return currency(value);
    if (/(paidAt|dueDate|expenseDate)/i.test(key)) return dateText(value);
    return titleCase(value);
  };

  return (
    <section className="stairs-payroll-finance">
      {tab === "Payroll" ? (
        <>
          <header className="pf-heading"><div><span className="pf-eyebrow">PEOPLE OPERATIONS</span><h1>Payroll management</h1><p>Review employee payroll records and manage approval status.</p></div><button type="button" className="pf-button secondary" onClick={onRefresh} disabled={loading}>↻ Refresh</button></header>
          <div className="pf-stats">
            <article><span>Payroll records</span><strong>{data.length}</strong><small>Loaded payroll entries</small></article>
            <article><span>Total net payroll</span><strong>{currency(totalNet)}</strong><small>Across loaded records</small></article>
            <article><span>Awaiting approval</span><strong>{draftCount}</strong><small>Draft payroll entries</small></article>
            <article><span>Paid</span><strong>{paidCount}</strong><small>{approvedCount} approved and awaiting payment</small></article>
          </div>
          <div className="pf-toolbar">
            <label className="pf-search"><span>⌕</span><input value={payrollSearch} onChange={(event) => setPayrollSearch(event.target.value)} placeholder="Search employee, code or payroll month" /></label>
            <select value={payrollFilter} onChange={(event) => setPayrollFilter(event.target.value)} aria-label="Filter payroll status"><option value="all">All statuses</option><option value="draft">Draft</option><option value="approved">Approved</option><option value="paid">Paid</option></select>
          </div>
          <div className="pf-table-card">
            <div className="pf-table-head"><div><h2>Payroll register</h2><p>{payrollRows.length} records shown</p></div><span className="pf-live">Payroll records</span></div>
            {loading && <div className="pf-loading">Loading payroll…</div>}
            <div className="pf-table-scroll"><table><thead><tr><th>Employee</th><th>Employee code</th><th>Month</th><th>Basic</th><th>Allowances</th><th>Deductions</th><th>Gross</th><th>Net pay</th><th>Status</th><th>Action</th></tr></thead><tbody>
              {payrollRows.map((row) => <tr key={row._id}><td>{titleCase(row.employeeId)}</td><td>{titleCase(getValue(row, "employeeId.employeeCode"))}</td><td>{titleCase(row.month)}</td><td>{currency(row.basic)}</td><td>{currency(row.allowances)}</td><td>{currency(row.deductions)}</td><td>{currency(row.gross)}</td><td className="pf-net">{currency(row.net)}</td><td><span className={`pf-status ${String(row.status || "").toLowerCase()}`}>{titleCase(row.status)}</span></td><td>{row.status === "draft" ? <button className="pf-action" type="button" onClick={() => onPayrollStatus(row._id, "approved")}>Approve</button> : row.status === "approved" ? <button className="pf-action paid" type="button" onClick={() => onPayrollStatus(row._id, "paid")}>Mark paid</button> : <span className="pf-muted">No action</span>}</td></tr>)}
              {!payrollRows.length && <tr><td colSpan="10"><div className="pf-empty"><strong>No payroll records found</strong><span>Try another search or status filter.</span></div></td></tr>}
            </tbody></table></div>
          </div>
        </>
      ) : (
        <>
          <header className="pf-heading"><div><span className="pf-eyebrow">BUSINESS OPERATIONS</span><h1>Finance management</h1><p>Monitor financial summaries, payments, invoices and expenses.</p></div><button type="button" className="pf-button secondary" onClick={onRefresh} disabled={loading}>↻ Refresh</button></header>
          <div className="pf-finance-tabs">{["summary", "payments", "invoices", "expenses"].map((key) => <button type="button" key={key} className={financeTab === key ? "active" : ""} onClick={() => setFinanceTab(key)}>{titleCase(key)}</button>)}</div>
          {financeTab === "summary" ? (
            <div className="pf-summary-grid">
              {Object.entries(financeSummary || {}).map(([key, value]) => <article key={key}><span>{titleCase(key)}</span><strong>{/count|invoices/i.test(key) ? titleCase(value) : currency(value)}</strong></article>)}
              {!Object.keys(financeSummary || {}).length && <div className="pf-empty-summary">{loading ? "Loading finance summary…" : "No finance summary available. Check finance.read permission and backend response."}</div>}
            </div>
          ) : (
            <div className="pf-table-card">
              <div className="pf-table-head"><div><h2>{titleCase(financeTab)}</h2><p>{financeRows.length} records shown</p></div><span className="pf-live">Finance records</span></div>
              <div className="pf-toolbar inside"><label className="pf-search"><span>⌕</span><input value={financeSearch} onChange={(event) => setFinanceSearch(event.target.value)} placeholder={`Search ${financeTab}`} /></label></div>
              {loading && <div className="pf-loading">Loading {financeTab}…</div>}
              <div className="pf-table-scroll"><table><thead><tr>{financeColumns.map((key) => <th key={key}>{titleCase(key.split(".").at(-1))}</th>)}</tr></thead><tbody>
                {financeRows.map((row) => <tr key={row._id || JSON.stringify(row)}>{financeColumns.map((key) => <td key={key}>{renderFinanceValue(row, key)}</td>)}</tr>)}
                {!financeRows.length && <tr><td colSpan={financeColumns.length}><div className="pf-empty"><strong>No {financeTab} records found</strong><span>There are no records matching your search.</span></div></td></tr>}
              </tbody></table></div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
