import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminPanel.css";
import DashboardOverview from "./dashboard/DashboardOverview";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import AdminLoginScreen from "./components/AdminLoginScreen";
import SessionLoading from "./components/SessionLoading";
import AdminNotice from "./components/AdminNotice";
import AdminFooter from "./components/AdminFooter";
import PanelHeader from "./components/PanelHeader";
import EmptyState from "./components/EmptyState";
import ActionTabs from "./components/ActionTabs";
import SearchField from "./components/SearchField";
import ReportGrid from "./components/ReportGrid";
import RecordForm from "./components/RecordForm";
import DataTable from "./components/DataTable";
import ModulePanel from "./components/ModulePanel";
import FinanceSummary from "./components/FinanceSummary";
import ClinicalPatientField from "./components/ClinicalPatientField";
import NotificationActions from "./components/NotificationActions";
import PatientsManagement from "./components/PatientsManagement";
import AppointmentsManagement from "./components/AppointmentsManagement";
import EmployeesManagement from "./components/EmployeesManagement";
import AttendanceLeavesManagement from "./components/AttendanceLeavesManagement";
import PayrollFinanceManagement from "./components/PayrollFinanceManagement";
import BranchesManagement from "./components/BranchesManagement";
import ReportsAnalytics from "./components/ReportsAnalytics";
import SettingsManagement from "./components/SettingsManagement";
import WebsiteContent from "./components/WebsiteContent/WebsiteContent";


/* =========================================
   STAIRS OS V1 ADMIN PANEL
========================================= */

const API = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"
).trim().replace(/\/$/, "");

const TOKEN_KEY = "physiocare_admin_token";

const LOGO_URL =
  "https://static.wixstatic.com/media/9c90f2_9440af6822a34176b24b34906c2a25bb~mv2.png";

const NAV_GROUPS = [
  {
    title: "Workspace",
    items: ["Overview", "Branches"],
  },
  {
    title: "People and Care",
    items: [
      "Employees",
      "Attendance",
      "Leaves",
      "Payroll",
      "Patients",
      "Clinical",
      "Appointments",
      "Leads",
    ],
  },
  {
    title: "Business",
    items: ["Finance", "Reports"],
  },
  {
    title: "System",
    items: ["Notifications", "Settings", "Website Content"],
  },
];

const MODULES = {
  Branches: {
    endpoint: "branches",
    responseKey: "branches",
    title: "Branch Management",
    method: "PATCH",
    fields: [
      ["name", "Branch Name", "text", true],
      ["code", "Branch Code", "text", true],
      ["address", "Address", "text"],
      ["city", "City", "text"],
      ["state", "State", "text"],
      ["phone", "Phone", "text"],
      ["email", "Email", "email"],
      ["active", "Active", "checkbox"],
    ],
    columns: [
      "name",
      "code",
      "city",
      "state",
      "phone",
      "active",
    ],
    editable: true,
  },

  Employees: {
    endpoint: "employees",
    responseKey: "employees",
    title: "Employee Management",
    method: "PATCH",
    fields: [
      ["employeeCode", "Employee Code", "text", true],
      ["fullName", "Full Name", "text", true],
      ["email", "Email", "email"],
      ["phone", "Phone", "text"],
      ["designation", "Designation", "text"],
      ["department", "Department", "text"],
      [
        "employmentType",
        "Employment Type",
        "select",
        false,
        ["full_time", "part_time", "contract", "intern"],
      ],
      ["joiningDate", "Joining Date", "date"],
      ["branchId", "Branch MongoDB ID", "text", true],
      ["salary.basic", "Basic Salary", "number"],
      ["salary.allowances", "Allowances", "number"],
      ["salary.deductions", "Deductions", "number"],
      [
        "status",
        "Status",
        "select",
        false,
        ["active", "inactive", "terminated"],
      ],
      ["notes", "Notes", "textarea"],
    ],
    columns: [
      "employeeCode",
      "fullName",
      "designation",
      "department",
      "employmentType",
      "branchId.name",
      "status",
    ],
    editable: true,
  },

  Patients: {
    endpoint: "patients",
    responseKey: "patients",
    title: "Patient Management",
    method: "PATCH",
    fields: [
      ["name", "Patient Name", "text", true],
      ["phone", "Phone", "text", true],
      ["email", "Email", "email"],
      ["age", "Age", "number"],
      ["dateOfBirth", "Date of Birth", "date"],
      [
        "gender",
        "Gender",
        "select",
        false,
        ["Male", "Female", "Other", "Prefer not to say"],
      ],
      ["address", "Address", "textarea"],
      ["city", "City", "text"],
      ["branchId", "Branch MongoDB ID", "text"],
      ["assignedTherapist", "Therapist Employee ID", "text"],
      ["condition", "Condition", "textarea"],
      ["medicalHistory", "Medical History", "textarea"],
      ["allergies", "Allergies", "textarea"],
      ["referralSource", "Referral Source", "text"],
      [
        "status",
        "Status",
        "select",
        false,
        ["Active", "Inactive", "Discharged"],
      ],
      ["consent", "Consent Received", "checkbox"],
      ["notes", "Notes", "textarea"],
    ],
    columns: [
      "patientCode",
      "name",
      "phone",
      "email",
      "condition",
      "branchId.name",
      "status",
    ],
    editable: true,
  },

  Leads: {
    endpoint: "leads",
    responseKey: "leads",
    title: "Lead Management",
    method: "PATCH",
    fields: [
      ["fullName", "Full Name", "text", true],
      ["phone", "Phone", "text", true],
      ["email", "Email", "email"],
      [
        "source",
        "Lead Source",
        "select",
        false,
        [
          "website",
          "phone",
          "walk_in",
          "referral",
          "social_media",
          "advertisement",
          "other",
        ],
      ],
      ["interestedService", "Interested Service", "text"],
      ["branchId", "Branch MongoDB ID", "text", true],
      [
        "status",
        "Status",
        "select",
        false,
        ["new", "contacted", "qualified", "converted", "lost"],
      ],
      [
        "priority",
        "Priority",
        "select",
        false,
        ["low", "medium", "high"],
      ],
      ["estimatedValue", "Estimated Value", "number"],
      ["nextFollowUpAt", "Next Follow Up", "datetime-local"],
      ["notes", "Notes", "textarea"],
      ["lostReason", "Lost Reason", "textarea"],
    ],
    columns: [
      "leadCode",
      "fullName",
      "phone",
      "source",
      "interestedService",
      "status",
      "priority",
    ],
    editable: true,
  },

  Appointments: {
    endpoint: "appointments",
    responseKey: null,
    title: "Appointment Management",
    columns: [
      "name",
      "phone",
      "service",
      "date",
      "time",
      "status",
    ],
  },

  Attendance: {
    endpoint: "attendance",
    responseKey: "attendance",
    title: "Attendance Management",
    columns: [
      "date",
      "employeeId.employeeCode",
      "employeeId.fullName",
      "branchId.name",
      "checkIn",
      "checkOut",
      "status",
      "note",
    ],
  },

  Leaves: {
    endpoint: "leaves",
    responseKey: "leaves",
    title: "Leave Management",
    columns: [
      "employeeId.employeeCode",
      "employeeId.fullName",
      "leaveType",
      "startDate",
      "endDate",
      "reason",
      "status",
    ],
  },

  Payroll: {
    endpoint: "payroll",
    responseKey: "payroll",
    title: "Payroll Management",
    columns: [
      "employeeId.employeeCode",
      "employeeId.fullName",
      "month",
      "basic",
      "allowances",
      "deductions",
      "gross",
      "net",
      "status",
    ],
  },
};

const CONTENT_MODULES = {
  Services: {
    endpoint: "services",
    columns: ["name", "description", "duration", "active"],
  },
  Team: {
    endpoint: "team",
    columns: ["name", "role", "bio", "active"],
  },
  Testimonials: {
    endpoint: "testimonials",
    columns: ["name", "text", "rating", "active"],
  },
  FAQs: {
    endpoint: "faqs",
    columns: ["question", "answer", "active"],
  },
};

const FINANCE_TABS = [
  "summary",
  "payments",
  "invoices",
  "expenses",
];

const CLINICAL_TABS = [
  "assessments",
  "treatment-plans",
  "notes",
];

/* =========================================
   API HELPERS
========================================= */

const getToken = () =>
  localStorage.getItem(TOKEN_KEY);

function getHeaders(options = {}) {
  const headers = {
    ...(options.headers || {}),
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (
    options.body &&
    !(options.body instanceof FormData)
  ) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

async function apiRequest(path, options = {}) {
  const url = `${API}/${String(path).replace(/^\/+/, "")}`;

  let response;

  try {
    response = await fetch(url, {
      ...options,
      headers: getHeaders(options),
    });
  } catch (error) {
    console.error("STAIRS API Network Error:", url, error);

    throw new Error(
      `Backend connection failed. Check backend and CORS. URL: ${url}`
    );
  }

  const contentType =
    response.headers.get("content-type") || "";

  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => ({}))
    : {
        message: await response.text().catch(() => ""),
      };

  if (!response.ok) {
    if (
      response.status === 401 &&
      path !== "auth/login"
    ) {
      localStorage.removeItem(TOKEN_KEY);
      window.dispatchEvent(
        new Event("stairs-session-expired")
      );
    }

    throw new Error(
      payload.message ||
        `API error ${response.status}: ${path}`
    );
  }

  return payload;
}

function getByPath(source, path) {
  return String(path)
    .split(".")
    .reduce((value, key) => value?.[key], source);
}

function setByPath(source, path, value) {
  const keys = String(path).split(".");
  const result = { ...source };
  let cursor = result;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      cursor[key] = value;
    } else {
      cursor[key] = { ...(cursor[key] || {}) };
      cursor = cursor[key];
    }
  });

  return result;
}

function listFrom(payload, preferredKey) {
  if (Array.isArray(payload)) return payload;

  if (
    preferredKey &&
    Array.isArray(payload?.[preferredKey])
  ) {
    return payload[preferredKey];
  }

  const keys = [
    "items",
    "data",
    "branches",
    "employees",
    "patients",
    "leads",
    "attendance",
    "leaves",
    "payroll",
    "payments",
    "invoices",
    "expenses",
    "assessments",
    "treatmentPlans",
    "clinicalNotes",
  ];

  for (const key of keys) {
    if (Array.isArray(payload?.[key])) {
      return payload[key];
    }
  }

  return [];
}

function humanize(value) {
  return String(value ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .replace(/^./, (char) => char.toUpperCase());
}

function displayValue(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.map(displayValue).join(", ");
  }

  if (typeof value === "object") {
    return (
      value.name ||
      value.fullName ||
      value.employeeCode ||
      value._id ||
      JSON.stringify(value)
    );
  }

  return String(value);
}

function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function inputDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
}

/* =========================================
   ADMIN PANEL COMPONENT
========================================= */


/* Report helpers: normalize common API response shapes without changing API contracts. */
function reportRows(payload) {
  if (Array.isArray(payload)) return payload.filter((item) => item && typeof item === "object");
  if (!payload || typeof payload !== "object") return [];
  for (const key of ["data", "items", "rows", "results", "trend", "monthly", "records"]) {
    if (Array.isArray(payload[key])) {
      return payload[key].filter((item) => item && typeof item === "object");
    }
  }
  for (const value of Object.values(payload)) {
    if (Array.isArray(value) && value.some((item) => item && typeof item === "object")) {
      return value.filter((item) => item && typeof item === "object");
    }
  }
  return [];
}

function reportMetricEntries(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return [];
  const source = payload.summary && typeof payload.summary === "object"
    ? payload.summary
    : payload.kpis && typeof payload.kpis === "object"
      ? payload.kpis
      : payload;
  return Object.entries(source)
    .filter(([, value]) => ["string", "number", "boolean"].includes(typeof value))
    .slice(0, 8);
}

function ReportCard({ reportKey, payload }) {
  const rows = reportRows(payload);
  const metrics = reportMetricEntries(payload);
  const isError = Boolean(payload?.error);
  const numericKey = (row) => Object.keys(row || {}).find((key) =>
    typeof row[key] === "number" && /(revenue|amount|total|count|expense|patient|appointment|paid|pending|balance|value)/i.test(key)
  ) || Object.keys(row || {}).find((key) => typeof row[key] === "number");
  const labelKey = (row) => Object.keys(row || {}).find((key) =>
    typeof row[key] === "string" && /(month|label|name|date|period|status|department|category)/i.test(key)
  ) || Object.keys(row || {}).find((key) => typeof row[key] === "string");
  const chartRows = rows.map((row, index) => ({
    label: String(labelKey(row) ? row[labelKey(row)] : `Item ${index + 1}`),
    value: Number(numericKey(row) ? row[numericKey(row)] : 0),
  })).filter((item) => Number.isFinite(item.value));
  const maxValue = Math.max(1, ...chartRows.map((item) => Math.abs(item.value)));
  const title = humanize(reportKey);
  const linePoints = chartRows.slice(0, 12).map((item, index, list) => {
    const x = list.length <= 1 ? 50 : 12 + (index / (list.length - 1)) * 276;
    const y = 94 - (Math.abs(item.value) / maxValue) * 76;
    return `${x},${y}`;
  }).join(" ");

  return (
    <article className={`report-card panel ${reportKey === "revenue-trend" ? "report-card-wide" : ""}`}>
      <div className="report-card-heading">
        <div>
          <p className="eyebrow">ANALYTICS</p>
          <h3>{title}</h3>
          <span className="report-card-subtitle">{chartRows.length} data points available</span>
        </div>
        <span className="report-card-mark" aria-hidden="true">↗</span>
      </div>

      {isError ? (
        <p className="report-error">{payload.error}</p>
      ) : (
        <>
          {metrics.length > 0 && (
            <div className="report-metrics">
              {metrics.map(([key, value]) => (
                <div className="report-metric" key={key}>
                  <span>{humanize(key)}</span>
                  <strong>{typeof value === "number" && /(revenue|amount|expense|balance|receivable)/i.test(key) ? money(value) : displayValue(value)}</strong>
                </div>
              ))}
            </div>
          )}

          {chartRows.length > 0 ? (
            <div className="report-visual">
              {chartRows.length > 1 && (
                <div className="report-line-chart">
                  <div className="report-chart-caption">
                    <span>Trend overview</span>
                    <strong>{chartRows.length} records</strong>
                  </div>
                  <svg viewBox="0 0 300 112" role="img" aria-label={`${title} trend graph`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`report-fill-${reportKey}`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#f04452" stopOpacity=".28" />
                        <stop offset="100%" stopColor="#f04452" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[18, 43, 68, 94].map((y) => <line key={y} x1="8" y1={y} x2="292" y2={y} className="report-grid-line" />)}
                    <polygon points={`12,94 ${linePoints} 288,94`} fill={`url(#report-fill-${reportKey})`} />
                    <polyline points={linePoints} className="report-line-path" />
                    {chartRows.slice(0, 12).map((item, index, list) => {
                      const x = list.length <= 1 ? 50 : 12 + (index / (list.length - 1)) * 276;
                      const y = 94 - (Math.abs(item.value) / maxValue) * 76;
                      return <circle key={`${item.label}-${index}`} cx={x} cy={y} r="3.5" className="report-line-dot"><title>{`${item.label}: ${item.value}`}</title></circle>;
                    })}
                  </svg>
                  <div className="report-line-labels">
                    <span>{chartRows[0]?.label}</span>
                    <span>{chartRows[Math.min(chartRows.length - 1, 11)]?.label}</span>
                  </div>
                </div>
              )}
              <div className="report-chart">
                <div className="report-chart-caption"><span>Record breakdown</span><strong>{chartRows.length} total</strong></div>
                {chartRows.slice(0, 10).map((item, index) => (
                  <div className="report-bar-row" key={`${item.label}-${index}`}>
                    <span className="report-bar-label" title={item.label}>{item.label}</span>
                    <div className="report-bar-track">
                      <i style={{ width: `${Math.max(2, (Math.abs(item.value) / maxValue) * 100)}%` }} />
                    </div>
                    <strong>{Number(item.value).toLocaleString("en-IN")}</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="empty-state">The report returned data, but no numeric series was detected for charting.</p>
          )}
        </>
      )}

      <details className="report-raw-data">
        <summary>View complete original report data</summary>
        <pre>{JSON.stringify(payload, null, 2)}</pre>
      </details>
    </article>
  );
}

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(getToken())
  );

  const [authChecking, setAuthChecking] = useState(
    Boolean(getToken())
  );

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [tab, setTab] = useState("Overview");
  const [mobile, setMobile] = useState(false);

  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [data, setData] = useState([]);
  const [overview, setOverview] = useState(null);
  const [reports, setReports] = useState({});

  const [financeTab, setFinanceTab] = useState("summary");
  const [financeSummary, setFinanceSummary] = useState(null);

  const [contentTab, setContentTab] = useState("Services");
  const [contentData, setContentData] = useState([]);

  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState([]);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const [clinicalPatientId, setClinicalPatientId] = useState("");
  const [clinicalTab, setClinicalTab] = useState("assessments");
  const [clinicalData, setClinicalData] = useState([]);
  const [clinicalFormOpen, setClinicalFormOpen] = useState(false);
  const [clinicalForm, setClinicalForm] = useState({});

  const module = MODULES[tab];

  /* =========================================
     LOAD DASHBOARD
  ========================================= */

  const loadOverview = useCallback(async () => {
    setLoading(true);

    try {
      const result = await apiRequest("reports/overview");
      setOverview({ ...(result.kpis || {}), branchPerformance: result.branchPerformance || [] });
    } catch (error) {
      setOverview(null);
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /* =========================================
     LOAD MODULE DATA
  ========================================= */

  const loadModule = useCallback(async () => {
    if (!module) return;

    setLoading(true);

    try {
      const result = await apiRequest(module.endpoint);

      setData(
        listFrom(result, module.responseKey)
      );
    } catch (error) {
      setData([]);
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }, [module]);

  /* =========================================
     LOAD FINANCE
  ========================================= */

  const loadFinance = useCallback(async () => {
    setLoading(true);

    try {
      if (financeTab === "summary") {
        const result = await apiRequest("finance/summary");

        setFinanceSummary(result.summary || {});
        setData([]);
      } else {
        const result = await apiRequest(
          `finance/${financeTab}`
        );

        setData(
          listFrom(result, financeTab)
        );
      }
    } catch (error) {
      setData([]);
      setFinanceSummary(null);
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }, [financeTab]);

  /* =========================================
     LOAD REPORTS
  ========================================= */

  const loadReports = useCallback(async () => {
    setLoading(true);

    const endpoints = [
      "revenue-trend",
      "appointments",
      "patients",
      "workforce",
      "receivables",
    ];

    const results = await Promise.allSettled(
      endpoints.map((endpoint) =>
        apiRequest(`reports/${endpoint}`)
      )
    );

    const nextReports = {};

    results.forEach((result, index) => {
      nextReports[endpoints[index]] =
        result.status === "fulfilled"
          ? result.value
          : {
              error: result.reason?.message || "Unable to load report",
            };
    });

    setReports(nextReports);
    setLoading(false);
  }, []);

  /* =========================================
     LOAD WEBSITE CONTENT
  ========================================= */

  const loadContent = useCallback(async () => {
    const config = CONTENT_MODULES[contentTab];

    if (!config) return;

    setLoading(true);

    try {
      const result = await apiRequest(config.endpoint);

      setContentData(listFrom(result));
    } catch (error) {
      setContentData([]);
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }, [contentTab]);

  /* =========================================
     LOAD CLINICAL RECORDS
  ========================================= */

  const loadClinical = useCallback(async () => {
    if (!clinicalPatientId.trim()) {
      setClinicalData([]);
      setNotice("Enter a patient MongoDB ID first.");
      return;
    }

    const responseKey =
      clinicalTab === "assessments"
        ? "assessments"
        : clinicalTab === "notes"
          ? "clinicalNotes"
          : "treatmentPlans";

    setLoading(true);

    try {
      const result = await apiRequest(
        `clinical/patients/${clinicalPatientId.trim()}/${clinicalTab}`
      );

      setClinicalData(
        listFrom(result, responseKey)
      );
    } catch (error) {
      setClinicalData([]);
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }, [clinicalPatientId, clinicalTab]);

  /* =========================================
     LOAD NOTIFICATIONS
  ========================================= */

  const loadNotifications = useCallback(async () => {
    setLoading(true);

    try {
      const result = await apiRequest("notifications");

      setNotifications(
        listFrom(result, "items")
      );
    } catch (error) {
      setNotifications([]);
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /* =========================================
     LOAD SETTINGS
  ========================================= */

  const loadSettings = useCallback(async () => {
    setLoading(true);

    try {
      const result = await apiRequest("settings");

      setSettings(
        Array.isArray(result)
          ? result
          : listFrom(result, "items")
      );
    } catch (error) {
      setSettings([]);
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /* =========================================
     AUTH SESSION VERIFICATION
  ========================================= */

  useEffect(() => {
    const onExpired = () => {
      setLoggedIn(false);
      setUser(null);
      setNotice("Session expired. Please sign in again.");
    };

    window.addEventListener(
      "stairs-session-expired",
      onExpired
    );

    return () => {
      window.removeEventListener(
        "stairs-session-expired",
        onExpired
      );
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function verifySession() {
      if (!getToken()) {
        setAuthChecking(false);
        setLoggedIn(false);
        return;
      }

      try {
        const result = await apiRequest("auth/me");

        if (!active) return;

        setUser(result.user || null);
        setLoggedIn(true);
      } catch {
        if (!active) return;

        localStorage.removeItem(TOKEN_KEY);
        setLoggedIn(false);
        setUser(null);
      } finally {
        if (active) setAuthChecking(false);
      }
    }

    verifySession();

    return () => {
      active = false;
    };
  }, []);

  /* =========================================
     TAB DATA LOADING
  ========================================= */

  useEffect(() => {
    if (!loggedIn) return;

    if (tab === "Overview") loadOverview();
    else if (module) loadModule();
    else if (tab === "Finance") loadFinance();
    else if (tab === "Reports") loadReports();
    else if (tab === "Clinical") {
      setClinicalData([]);
    }
    else if (tab === "Notifications") loadNotifications();
    else if (tab === "Settings") loadSettings();
    else if (tab === "Website Content") loadContent();
  }, [
    loggedIn,
    tab,
    module,
    loadOverview,
    loadModule,
    loadFinance,
    loadReports,
    loadNotifications,
    loadSettings,
    loadContent,
  ]);

  /* =========================================
     LOGIN
  ========================================= */

  const login = async (event) => {
    event.preventDefault();
    setLoginError("");

    if (!email.trim() || !password) {
      setLoginError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      const result = await apiRequest("auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      if (!result.token) {
        throw new Error("Login token was not returned.");
      }

      localStorage.setItem(TOKEN_KEY, result.token);

      setUser(result.user || result.admin || null);
      setLoggedIn(true);
      setTab("Overview");
      setEmail("");
      setPassword("");
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     LOGOUT
  ========================================= */

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);

    setLoggedIn(false);
    setUser(null);
    setTab("Overview");
    setData([]);
    setOverview(null);
    setReports({});
    setNotice("");
  };
    /* =========================================
     ADD RECORD FORM
  ========================================= */

  const startAdd = () => {
    let initial = {};

    (module?.fields || []).forEach(
      ([key, , type, , options]) => {
        let value = "";

        if (type === "checkbox") value = false;
        if (type === "select") value = options?.[0] || "";

        initial = setByPath(initial, key, value);
      }
    );

    if (tab === "Branches") {
      initial.active = true;
    }

    if (tab === "Patients") {
      initial.status = "Active";
      initial.consent = false;
    }

    if (tab === "Employees") {
      initial.status = "active";
      initial.employmentType = "full_time";
    }

    if (tab === "Leads") {
      initial.status = "new";
      initial.priority = "medium";
    }

    setEditing(null);
    setForm(initial);
  };

  /* =========================================
     EDIT RECORD
  ========================================= */

  const startEdit = (record) => {
    const next = { ...record };

    [
      "branchId",
      "assignedTherapist",
      "employeeId",
    ].forEach((key) => {
      if (next[key] && typeof next[key] === "object") {
        next[key] = next[key]._id || "";
      }
    });

    if (next.joiningDate) {
      next.joiningDate = inputDate(next.joiningDate);
    }

    if (next.dateOfBirth) {
      next.dateOfBirth = inputDate(next.dateOfBirth);
    }

    if (next.nextFollowUpAt) {
      const date = new Date(next.nextFollowUpAt);

      next.nextFollowUpAt = Number.isNaN(date.getTime())
        ? ""
        : new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 16);
    }

    setEditing(record._id);
    setForm(next);
  };

  /* =========================================
     SAVE RECORD
  ========================================= */

  const saveRecord = async (event) => {
    event.preventDefault();

    if (!module?.editable) return;

    setLoading(true);

    try {
      const payload = { ...form };

      if (
        tab === "Patients" &&
        payload.age !== "" &&
        payload.age !== undefined
      ) {
        payload.age = Number(payload.age);
      }

      if (
        tab === "Leads" &&
        payload.estimatedValue !== "" &&
        payload.estimatedValue !== undefined
      ) {
        payload.estimatedValue = Number(payload.estimatedValue);
      }

      if (tab === "Employees") {
        payload.salary = {
          basic: Number(
            getByPath(payload, "salary.basic") || 0
          ),
          allowances: Number(
            getByPath(payload, "salary.allowances") || 0
          ),
          deductions: Number(
            getByPath(payload, "salary.deductions") || 0
          ),
        };
      }

      if (payload.nextFollowUpAt) {
        payload.nextFollowUpAt = new Date(
          payload.nextFollowUpAt
        ).toISOString();
      }

      const path = editing
        ? `${module.endpoint}/${editing}`
        : module.endpoint;

      const method = editing
        ? module.method
        : "POST";

      await apiRequest(path, {
        method,
        body: JSON.stringify(payload),
      });

      setNotice(`${module.title} saved successfully.`);
      setEditing(null);
      setForm({});

      await loadModule();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     DEACTIVATE OR ARCHIVE
  ========================================= */

  const deactivateRecord = async (record) => {
    if (
      !window.confirm(
        "Are you sure you want to deactivate or archive this record?"
      )
    ) {
      return;
    }

    setLoading(true);

    try {
      await apiRequest(
        `${module.endpoint}/${record._id}`,
        { method: "DELETE" }
      );

      setNotice("Record updated successfully.");

      await loadModule();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     APPOINTMENT STATUS
  ========================================= */

  const updateAppointmentStatus = async (id, status) => {
    try {
      await apiRequest(
        `appointments/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }
      );

      setNotice("Appointment status updated.");
      await loadModule();
    } catch (error) {
      setNotice(error.message);
    }
  };

  /* =========================================
     LEAVE REVIEW
  ========================================= */

  const reviewLeave = async (id, status) => {
    try {
      await apiRequest(
        `leaves/${id}/review`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }
      );

      setNotice(`Leave ${status}.`);
      await loadModule();
    } catch (error) {
      setNotice(error.message);
    }
  };

  /* =========================================
     PAYROLL STATUS
  ========================================= */

  const updatePayrollStatus = async (id, status) => {
    try {
      await apiRequest(
        `payroll/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }
      );

      setNotice(`Payroll status changed to ${status}.`);
      await loadModule();
    } catch (error) {
      setNotice(error.message);
    }
  };

  /* =========================================
     ATTENDANCE MANAGER MARK
  ========================================= */

  const markAttendance = async () => {
    const employeeId = window.prompt(
      "Enter Employee MongoDB ID:"
    );

    if (!employeeId) return;

    const status = window.prompt(
      "Enter status: present, late, half_day, absent, on_leave",
      "present"
    );

    if (!status) return;

    const date = window.prompt(
      "Enter date in YYYY-MM-DD format:",
      new Date().toLocaleDateString("en-CA")
    );

    if (!date) return;

    try {
      await apiRequest("attendance/mark", {
        method: "POST",
        body: JSON.stringify({
          employeeId: employeeId.trim(),
          date,
          status: status.trim(),
        }),
      });

      setNotice("Attendance marked successfully.");
      await loadModule();
    } catch (error) {
      setNotice(error.message);
    }
  };

  /* =========================================
     SELF CHECK IN
  ========================================= */

  const selfCheckIn = async () => {
    try {
      await apiRequest("attendance/check-in", {
        method: "POST",
        body: JSON.stringify({}),
      });

      setNotice("Check in successful.");
      await loadModule();
    } catch (error) {
      setNotice(error.message);
    }
  };

  /* =========================================
     NOTIFICATION ACTIONS
  ========================================= */

  const markNotificationRead = async (id) => {
    try {
      await apiRequest(
        `notifications/${id}/read`,
        { method: "PATCH" }
      );

      await loadNotifications();
    } catch (error) {
      setNotice(error.message);
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      await apiRequest(
        "notifications/read-all",
        { method: "PATCH" }
      );

      setNotice("All notifications marked as read.");
      await loadNotifications();
    } catch (error) {
      setNotice(error.message);
    }
  };

  /* =========================================
     SETTINGS UPDATE
  ========================================= */

  const saveSetting = async (setting) => {
    const currentValue =
      typeof setting.value === "string"
        ? setting.value
        : JSON.stringify(setting.value ?? "");

    const nextValue = window.prompt(
      `Update setting: ${setting.key}`,
      currentValue
    );

    if (nextValue === null) return;

    try {
      await apiRequest(
        `settings/${encodeURIComponent(setting.key)}`,
        {
          method: "PUT",
          body: JSON.stringify({
            value: nextValue,
          }),
        }
      );

      setNotice("Setting saved successfully.");
      await loadSettings();
    } catch (error) {
      setNotice(error.message);
    }
  };

  /* =========================================
     CLINICAL RECORD FORM
  ========================================= */

  const saveClinicalRecord = async (event) => {
    event.preventDefault();

    if (!clinicalPatientId.trim()) {
      setNotice("Patient MongoDB ID is required.");
      return;
    }

    const endpoint =
      clinicalTab === "assessments"
        ? `clinical/patients/${clinicalPatientId}/assessments`
        : clinicalTab === "notes"
          ? `clinical/patients/${clinicalPatientId}/notes`
          : `clinical/patients/${clinicalPatientId}/treatment-plans`;

    setLoading(true);

    try {
      const payload = { ...clinicalForm };

      if (
        payload.painScore !== undefined &&
        payload.painScore !== ""
      ) {
        payload.painScore = Number(payload.painScore);
      }

      if (
        payload.progress !== undefined &&
        payload.progress !== ""
      ) {
        payload.progress = Number(payload.progress);
      }

      if (clinicalTab === "assessments") {
        if (typeof payload.goals === "string") {
          payload.goals = payload.goals
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
        }
      }

      if (clinicalTab === "treatment-plans") {
        ["objectives", "interventions"].forEach((key) => {
          if (typeof payload[key] === "string") {
            payload[key] = payload[key]
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean);
          }
        });
      }

      await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setClinicalForm({});
      setClinicalFormOpen(false);
      setNotice("Clinical record saved successfully.");

      await loadClinical();
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     FILTER DATA
  ========================================= */

  const filteredData = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return data;

    return data.filter((row) =>
      JSON.stringify(row)
        .toLowerCase()
        .includes(query)
    );
  }, [data, search]);

  /* =========================================
     FORM FIELD RENDERER
  ========================================= */

  const renderField = ([
    key,
    label,
    type,
    required,
    options,
  ]) => {
    const value = getByPath(form, key);

    return (
      <label key={key}>
        {label}

        {type === "textarea" ? (
          <textarea
            required={Boolean(required)}
            value={value ?? ""}
            onChange={(event) =>
              setForm((current) =>
                setByPath(
                  current,
                  key,
                  event.target.value
                )
              )
            }
          />
        ) : type === "select" ? (
          <select
            required={Boolean(required)}
            value={value ?? options?.[0] ?? ""}
            onChange={(event) =>
              setForm((current) =>
                setByPath(
                  current,
                  key,
                  event.target.value
                )
              )
            }
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {humanize(option)}
              </option>
            ))}
          </select>
        ) : type === "checkbox" ? (
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(event) =>
              setForm((current) =>
                setByPath(
                  current,
                  key,
                  event.target.checked
                )
              )
            }
          />
        ) : (
          <input
            type={type || "text"}
            required={Boolean(required)}
            min={type === "number" ? 0 : undefined}
            value={value ?? ""}
            onChange={(event) =>
              setForm((current) =>
                setByPath(
                  current,
                  key,
                  event.target.value
                )
              )
            }
          />
        )}
      </label>
    );
  };

  /* =========================================
     TABLE RENDERER
  ========================================= */

  const renderTable = (
    rows,
    columns,
    actions = null
  ) => (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>
                {humanize(column.split(".").at(-1))}
              </th>
            ))}

            {actions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={
                  columns.length + (actions ? 1 : 0)
                }
                className="empty-state"
              >
                {loading
                  ? "Loading records..."
                  : "No records found."}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row._id || JSON.stringify(row)}>
                {columns.map((column) => (
                  <td key={column}>
                    {displayValue(
                      getByPath(row, column)
                    )}
                  </td>
                ))}

                {actions && (
                  <td>{actions(row)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  /* =========================================
     CLINICAL FORM FIELDS
  ========================================= */

  const renderClinicalFields = () => {
    const fields =
      clinicalTab === "assessments"
        ? [
            ["assessmentDate", "Assessment Date", "date"],
            ["chiefComplaint", "Chief Complaint", "text", true],
            ["painScore", "Pain Score (0 to 10)", "number"],
            ["painLocation", "Pain Location", "text"],
            ["medicalHistory", "Medical History", "textarea"],
            ["physicalFindings", "Physical Findings", "textarea"],
            ["diagnosis", "Diagnosis", "textarea"],
            ["goals", "Goals (one per line)", "textarea"],
            ["recommendations", "Recommendations", "textarea"],
          ]
        : clinicalTab === "notes"
          ? [
              ["sessionDate", "Session Date", "date"],
              ["treatmentProvided", "Treatment Provided", "textarea", true],
              ["subjective", "Subjective", "textarea"],
              ["objective", "Objective", "textarea"],
              ["response", "Patient Response", "textarea"],
              ["homeProgram", "Home Program", "textarea"],
              ["nextVisit", "Next Visit", "date"],
            ]
          : [
              ["title", "Plan Title", "text", true],
              ["objectives", "Objectives (one per line)", "textarea"],
              ["interventions", "Interventions (one per line)", "textarea"],
              ["frequency", "Frequency", "text"],
              ["startDate", "Start Date", "date", true],
              ["targetEndDate", "Target End Date", "date"],
              [
                "status",
                "Status",
                "select",
                false,
                ["draft", "active", "on_hold", "completed", "cancelled"],
              ],
              ["progress", "Progress Percentage", "number"],
              ["outcomeNotes", "Outcome Notes", "textarea"],
            ];

    return fields.map(
      ([key, label, type, required, options]) => (
        <label key={key}>
          {label}

          {type === "textarea" ? (
            <textarea
              required={Boolean(required)}
              value={clinicalForm[key] ?? ""}
              onChange={(event) =>
                setClinicalForm((current) => ({
                  ...current,
                  [key]: event.target.value,
                }))
              }
            />
          ) : type === "select" ? (
            <select
              value={clinicalForm[key] ?? options?.[0] ?? ""}
              onChange={(event) =>
                setClinicalForm((current) => ({
                  ...current,
                  [key]: event.target.value,
                }))
              }
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {humanize(option)}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              required={Boolean(required)}
              min={type === "number" ? 0 : undefined}
              max={key === "progress" ? 100 : undefined}
              value={clinicalForm[key] ?? ""}
              onChange={(event) =>
                setClinicalForm((current) => ({
                  ...current,
                  [key]: event.target.value,
                }))
              }
            />
          )}
        </label>
      )
    );
  };
    /* =========================================
     SESSION LOADING SCREEN
  ========================================= */

  if (authChecking) return <SessionLoading />;

  if (!loggedIn) return <AdminLoginScreen logoUrl={LOGO_URL} email={email} setEmail={setEmail} password={password} setPassword={setPassword} login={login} loginError={loginError} loading={loading} />;

  /* =========================================
     DASHBOARD
  ========================================= */

  return (
    <div className="admin-app">
      <AdminSidebar mobile={mobile} groups={NAV_GROUPS} activeTab={tab} logoUrl={LOGO_URL} onLogout={logout} onNavigate={(item) => { setTab(item); setMobile(false); setEditing(null); setForm({}); setSearch(""); setNotice(""); }} />

      <main className="admin-content">
        <AdminTopbar mobile={mobile} onToggleMobile={() => setMobile(value => !value)} tab={tab} user={user} humanize={humanize} />

        <AdminNotice notice={notice} onDismiss={() => setNotice("")} />

        {/* =====================================
            OVERVIEW
        ===================================== */}

        {tab === "Overview" && (
          <DashboardOverview
            overview={overview}
            loading={loading}
            user={user}
            onRefresh={loadOverview}
            onNavigate={setTab}
          />
        )}

        {/* =====================================
            STANDARD MODULES
        ===================================== */}

        {module && !["Patients", "Appointments", "Employees", "Attendance", "Leaves", "Payroll", "Branches"].includes(tab) && (
          <ModulePanel>
            <div className="panel-heading">
              <div>
                <p className="eyebrow">STAIRS OS MODULE</p>
                <h3>{module.title}</h3>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={loadModule}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "↻ Refresh"}
                </button>

                {module.editable && (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={startAdd}
                  >
                    + Add new
                  </button>
                )}

                {tab === "Attendance" && (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={markAttendance}
                  >
                    Mark attendance
                  </button>
                )}

                {tab === "Attendance" && (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={selfCheckIn}
                  >
                    My check in
                  </button>
                )}
              </div>
            </div>

            <input
              className="search-input"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder={`Search ${tab.toLowerCase()}...`}
            />

            {editing !== null ||
            (module.editable && Object.keys(form).length > 0) ? (
              <form
                className="record-form"
                onSubmit={saveRecord}
              >
                {module.fields.map(renderField)}

                <div className="form-actions">
                  <button
                    type="submit"
                    className="primary-button"
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : editing
                        ? "Update record"
                        : "Save record"}
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setEditing(null);
                      setForm({});
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              renderTable(
                filteredData,
                module.columns,
                (
                  module.editable ||
                  [
                    "Appointments",
                    "Leaves",
                    "Payroll",
                  ].includes(tab)
                )
                  ? (row) => (
                      <div className="table-actions">
                        {module.editable && (
                          <>
                            <button
                              type="button"
                              className="text-button"
                              onClick={() => startEdit(row)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="text-button danger"
                              onClick={() => deactivateRecord(row)}
                            >
                              Deactivate
                            </button>
                          </>
                        )}

                        {tab === "Appointments" && (
                          <select
                            className="status-select"
                            value={row.status || "New"}
                            onChange={(event) =>
                              updateAppointmentStatus(
                                row._id,
                                event.target.value
                              )
                            }
                          >
                            {[
                              "New",
                              "Contacted",
                              "Confirmed",
                              "Completed",
                              "Cancelled",
                              "No Show",
                            ].map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        )}

                        {tab === "Leaves" &&
                          row.status === "pending" && (
                            <>
                              <button
                                type="button"
                                className="text-button"
                                onClick={() =>
                                  reviewLeave(row._id, "approved")
                                }
                              >
                                Approve
                              </button>

                              <button
                                type="button"
                                className="text-button danger"
                                onClick={() =>
                                  reviewLeave(row._id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}

                        {tab === "Payroll" &&
                          row.status === "draft" && (
                            <button
                              type="button"
                              className="text-button"
                              onClick={() =>
                                updatePayrollStatus(
                                  row._id,
                                  "approved"
                                )
                              }
                            >
                              Approve
                            </button>
                          )}

                        {tab === "Payroll" &&
                          row.status === "approved" && (
                            <button
                              type="button"
                              className="text-button"
                              onClick={() =>
                                updatePayrollStatus(
                                  row._id,
                                  "paid"
                                )
                              }
                            >
                              Mark paid
                            </button>
                          )}
                      </div>
                    )
                  : null
              )
            )}

            {tab === "Appointments" && (
              <p className="empty-state">
                Appointment status updates are available here.
                New bookings must use the secure schedule endpoint
                with valid patient, branch and therapist IDs.
              </p>
            )}

            {tab === "Attendance" && (
              <p className="empty-state">
                Manager attendance marking requires attendance.manage
                permission. Self check in requires an employee profile
                linked to the logged in account.
              </p>
            )}
          </ModulePanel>
        )}

        {/* =====================================
            PHASE 3 TO 8 DEDICATED MODULES
        ===================================== */}

        {tab === "Patients" && (
          <PatientsManagement
            data={data}
            filteredData={filteredData}
            search={search}
            onSearchChange={setSearch}
            loading={loading}
            editing={editing}
            form={form}
            module={module}
            renderField={renderField}
            onAdd={startAdd}
            onEdit={startEdit}
            onDeactivate={deactivateRecord}
            onSave={saveRecord}
            onCancel={() => { setEditing(null); setForm({}); }}
            onRefresh={loadModule}
          />
        )}

        {tab === "Appointments" && (
          <AppointmentsManagement
            data={data}
            loading={loading}
            onRefresh={loadModule}
            onStatusChange={updateAppointmentStatus}
          />
        )}

        {tab === "Employees" && (
          <EmployeesManagement
            data={data}
            filteredData={filteredData}
            search={search}
            onSearchChange={setSearch}
            loading={loading}
            editing={editing}
            form={form}
            module={module}
            renderField={renderField}
            onAdd={startAdd}
            onEdit={startEdit}
            onDeactivate={deactivateRecord}
            onSave={saveRecord}
            onCancel={() => { setEditing(null); setForm({}); }}
            onRefresh={loadModule}
          />
        )}

        { ["Attendance", "Leaves"].includes(tab) && (
          <AttendanceLeavesManagement
            data={data}
            search={search}
            onSearchChange={setSearch}
            loading={loading}
            onRefresh={loadModule}
            onMarkAttendance={async (payload) => {
              try {
                await apiRequest("attendance/mark", {
                  method: "POST",
                  body: JSON.stringify(payload),
                });
                setNotice("Attendance marked successfully.");
                await loadModule();
              } catch (error) {
                setNotice(error.message);
              }
            }}
            onReviewLeave={reviewLeave}
          />
        )}

        {tab === "Branches" && (
          <BranchesManagement
            data={data}
            filteredData={filteredData}
            search={search}
            onSearchChange={setSearch}
            loading={loading}
            editing={editing}
            form={form}
            module={module}
            renderField={renderField}
            onAdd={startAdd}
            onEdit={startEdit}
            onDeactivate={deactivateRecord}
            onSave={saveRecord}
            onCancel={() => { setEditing(null); setForm({}); }}
            onRefresh={loadModule}
          />
        )}

        {/* =====================================
            FINANCE
        ===================================== */}

        {tab === "Finance" && (
          <PayrollFinanceManagement
            tab={tab}
            data={data}
            loading={loading}
            financeTab={financeTab}
            setFinanceTab={setFinanceTab}
            financeSummary={financeSummary}
            onRefresh={loadFinance}
            onPayrollStatus={updatePayrollStatus}
          />
        )}

        {tab === "Payroll" && (
          <PayrollFinanceManagement
            tab={tab}
            data={data}
            loading={loading}
            financeTab={financeTab}
            setFinanceTab={setFinanceTab}
            financeSummary={financeSummary}
            onRefresh={loadModule}
            onPayrollStatus={updatePayrollStatus}
          />
        )}

        {/* =====================================
            REPORTS
        ===================================== */}

        {tab === "Reports" && (
          <ReportsAnalytics
            reports={reports}
            loading={loading}
            onRefresh={loadReports}
          />
        )}

        {/* =====================================
            CLINICAL RECORDS
        ===================================== */}

        {tab === "Clinical" && (
          <ModulePanel>
            <div className="panel-heading">
              <div>
                <p className="eyebrow">PHASE 4</p>
                <h3>Clinical Records</h3>
              </div>

              <button
                type="button"
                className="secondary-button"
                onClick={loadClinical}
                disabled={loading}
              >
                Load records
              </button>
            </div>

            <ClinicalPatientField value={clinicalPatientId} onChange={setClinicalPatientId} />

            <div className="form-actions clinical-tabs">
              {CLINICAL_TABS.map((key) => (
                <button
                  type="button"
                  key={key}
                  className={
                    clinicalTab === key
                      ? "primary-button"
                      : "secondary-button"
                  }
                  onClick={() => {
                    setClinicalTab(key);
                    setClinicalData([]);
                    setClinicalFormOpen(false);
                    setClinicalForm({});
                  }}
                >
                  {humanize(key)}
                </button>
              ))}

              <button
                type="button"
                className="primary-button"
                onClick={() => setClinicalFormOpen((value) => !value)}
              >
                + Add clinical record
              </button>
            </div>

            {clinicalFormOpen && (
              <form
                className="record-form"
                onSubmit={saveClinicalRecord}
              >
                {renderClinicalFields()}

                <div className="form-actions">
                  <button
                    type="submit"
                    className="primary-button"
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : "Save clinical record"}
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setClinicalFormOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {renderTable(
              clinicalData,
              clinicalTab === "assessments"
                ? [
                    "assessmentDate",
                    "chiefComplaint",
                    "painScore",
                    "diagnosis",
                  ]
                : clinicalTab === "notes"
                  ? [
                      "sessionDate",
                      "treatmentProvided",
                      "response",
                      "homeProgram",
                    ]
                  : [
                      "title",
                      "frequency",
                      "startDate",
                      "targetEndDate",
                      "status",
                      "progress",
                    ]
            )}
          </ModulePanel>
        )}

        {/* =====================================
            NOTIFICATIONS
        ===================================== */}

        {tab === "Notifications" && (
          <ModulePanel>
            <div className="panel-heading">
              <div>
                <p className="eyebrow">PHASE 9</p>
                <h3>Notifications</h3>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={loadNotifications}
                  disabled={loading}
                >
                  ↻ Refresh
                </button>

                <button
                  type="button"
                  className="primary-button"
                  onClick={markAllNotificationsRead}
                >
                  Mark all read
                </button>
              </div>
            </div>

            {notifications.length === 0 ? (
              <p className="empty-state">
                {loading
                  ? "Loading notifications..."
                  : "No notifications found."}
              </p>
            ) : (
              renderTable(
                notifications,
                [
                  "title",
                  "message",
                  "type",
                  "createdAt",
                  "readAt",
                ],
                (row) =>
                  !row.readAt && (
                    <button
                      type="button"
                      className="text-button"
                      onClick={() =>
                        markNotificationRead(row._id)
                      }
                    >
                      Mark read
                    </button>
                  )
              )
            )}
          </ModulePanel>
        )}

        {/* =====================================
            SETTINGS
        ===================================== */}

        {tab === "Settings" && (
          <SettingsManagement
            settings={settings}
            loading={loading}
            onRefresh={loadSettings}
            onEdit={saveSetting}
          />
        )}

        {/* =====================================
            WEBSITE CONTENT
        ===================================== */}

        {tab === "Website Content" && (
  <WebsiteContent
    apiRequest={apiRequest}
    loading={loading}
    onNotice={setNotice}
  />
)}

        <AdminFooter />
      </main>
    </div>
  );
}