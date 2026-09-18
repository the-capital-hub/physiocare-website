import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminPanel.css";

const API = (
  import.meta.env.VITE_API_URL || "https://physiotherapy-backend-wfyg.onrender.com/"
).replace(/\/$/, "");

const TOKEN_KEY = "physiocare_admin_token";

const LOGO_URL =
  "https://static.wixstatic.com/media/9c90f2_9440af6822a34176b24b34906c2a25bb~mv2.png";

const navItems = [
  "Overview",
  "Appointments",
  "Patients",
  "Services",
  "Team",
  "Testimonials",
  "FAQs",
  "Settings",
];

const statuses = [
  "New",
  "Contacted",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const configs = {
  Patients: {
    endpoint: "patients",
    title: "Patients",
    fields: [
      ["name", "Name", "text", true],
      ["phone", "Phone", "text", true],
      ["email", "Email", "email", false],
      ["age", "Age", "number", false],
      [
        "gender",
        "Gender",
        "select",
        false,
        ["Male", "Female", "Other", "Prefer not to say"],
      ],
      ["condition", "Condition", "text", false],
      ["notes", "Notes", "textarea", false],
      [
        "status",
        "Status",
        "select",
        false,
        ["Active", "Inactive"],
      ],
    ],
  },

  Services: {
    endpoint: "services",
    title: "Services",
    fields: [
      ["name", "Service name", "text", true],
      ["description", "Description", "textarea", false],
      ["icon", "Icon name", "text", false],
      ["duration", "Duration", "text", false],
      ["active", "Active", "checkbox", false],
    ],
  },

  Team: {
    endpoint: "team",
    title: "Team members",
    fields: [
      ["name", "Name", "text", true],
      ["role", "Role", "text", true],
      ["bio", "Bio", "textarea", false],
      ["image", "Image URL", "url", false],
      ["active", "Active", "checkbox", false],
    ],
  },

  Testimonials: {
    endpoint: "testimonials",
    title: "Testimonials",
    fields: [
      ["name", "Patient name", "text", true],
      ["text", "Review", "textarea", true],
      ["rating", "Rating (1 to 5)", "number", true],
      ["active", "Active", "checkbox", false],
    ],
  },

  FAQs: {
    endpoint: "faqs",
    title: "FAQs",
    fields: [
      ["question", "Question", "text", true],
      ["answer", "Answer", "textarea", true],
      ["active", "Active", "checkbox", false],
    ],
  },
};

const settingFields = [
  ["clinicName", "Clinic name"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["address", "Address"],
  ["timings", "Opening hours"],
  ["whatsappNumber", "WhatsApp number"],
];

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    ...(getToken()
      ? {
          Authorization: `Bearer ${getToken()}`,
        }
      : {}),
  };
};

async function request(path, options = {}) {
  const response = await fetch(`${API}/${path}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function normalizeList(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(Boolean(getToken()));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");

  const [tab, setTab] = useState("Overview");
  const [mobile, setMobile] = useState(false);

  const [notice, setNotice] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);

  const [settings, setSettings] = useState({});

  const [loading, setLoading] = useState(false);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const [search, setSearch] = useState("");

  const config = configs[tab];

  const loadAppointments = async () => {
    setLoading(true);

    try {
      const data = await request("appointments");
      setAppointments(normalizeList(data));
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadRecords = async () => {
    if (!config) {
      return;
    }

    setLoading(true);

    try {
      const data = await request(config.endpoint);
      setRecords(normalizeList(data));
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    setLoading(true);

    try {
      const data = await request("settings");

      if (Array.isArray(data)) {
        setSettings(
          Object.fromEntries(
            data.map((item) => [item.key, item.value])
          )
        );
      } else if (Array.isArray(data?.items)) {
        setSettings(
          Object.fromEntries(
            data.items.map((item) => [item.key, item.value])
          )
        );
      } else if (Array.isArray(data?.data)) {
        setSettings(
          Object.fromEntries(
            data.data.map((item) => [item.key, item.value])
          )
        );
      } else {
        setSettings(data || {});
      }
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    if (tab === "Appointments" || tab === "Overview") {
      loadAppointments();
    }

    if (config) {
      loadRecords();
    }

    if (tab === "Settings") {
      loadSettings();
    }
  }, [loggedIn, tab]);

  const login = async (event) => {
    event.preventDefault();
    setLoginError("");

    try {
      const data = await request("auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!data?.token) {
        throw new Error("Login token was not returned by the server");
      }

      localStorage.setItem(TOKEN_KEY, data.token);

      setLoggedIn(true);
      setEmail("");
      setPassword("");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);

    setLoggedIn(false);
    setTab("Overview");

    setAppointments([]);
    setRecords([]);
    setSettings({});

    setEditing(null);
    setForm({});
  };

  const beginAdd = () => {
    setEditing(null);

    setForm({
      active: true,
      status: "Active",
      rating: 5,
    });
  };

  const beginEdit = (record) => {
    setEditing(record._id);

    setForm({
      ...record,
    });
  };

  const cancelForm = () => {
    setEditing(null);
    setForm({});
  };

  const saveRecord = async (event) => {
    event.preventDefault();

    if (!config) {
      return;
    }

    try {
      const payload = {
        ...form,
      };

      if (payload.age === "") {
        delete payload.age;
      }

      if (
        payload.rating !== undefined &&
        payload.rating !== ""
      ) {
        payload.rating = Number(payload.rating);
      }

      const path = editing
        ? `${config.endpoint}/${editing}`
        : config.endpoint;

      await request(path, {
        method: editing ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      setNotice(`${config.title} saved successfully`);

      setEditing(null);
      setForm({});

      await loadRecords();
    } catch (error) {
      setNotice(error.message);
    }
  };

  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this record?")) {
      return;
    }

    try {
      await request(`${config.endpoint}/${id}`, {
        method: "DELETE",
      });

      setNotice("Record deleted");

      await loadRecords();
    } catch (error) {
      setNotice(error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await request(`appointments/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status,
        }),
      });

      setAppointments((items) =>
        items.map((item) =>
          item._id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      setNotice("Status updated");
    } catch (error) {
      setNotice(error.message);
    }
  };

  const saveSettings = async (event) => {
    event.preventDefault();

    try {
      for (const [key] of settingFields) {
        await request(`settings/${key}`, {
          method: "PUT",
          body: JSON.stringify({
            value: settings[key] || "",
          }),
        });
      }

      setNotice("Clinic settings saved successfully");
    } catch (error) {
      setNotice(error.message);
    }
  };

  const filteredAppointments = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return appointments;
    }

    return appointments.filter((item) =>
      `${item.name || ""} ${item.phone || ""} ${
        item.service || ""
      } ${item.email || ""}`
        .toLowerCase()
        .includes(query)
    );
  }, [appointments, search]);

  const renderField = (field) => {
    const [key, label, type, required, options] = field;

    if (type === "textarea") {
      return (
        <label key={key}>
          {label}

          <textarea
            required={required}
            value={form[key] ?? ""}
            onChange={(event) =>
              setForm({
                ...form,
                [key]: event.target.value,
              })
            }
          />
        </label>
      );
    }

    if (type === "select") {
      return (
        <label key={key}>
          {label}

          <select
            required={required}
            value={form[key] ?? options?.[0] ?? ""}
            onChange={(event) =>
              setForm({
                ...form,
                [key]: event.target.value,
              })
            }
          >
            {options?.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </label>
      );
    }

    if (type === "checkbox") {
      return (
        <label
          key={key}
          className="checkbox-field"
        >
          <span>{label}</span>

          <input
            type="checkbox"
            checked={Boolean(form[key])}
            onChange={(event) =>
              setForm({
                ...form,
                [key]: event.target.checked,
              })
            }
          />
        </label>
      );
    }

    return (
      <label key={key}>
        {label}

        <input
          required={required}
          type={type}
          value={form[key] ?? ""}
          onChange={(event) =>
            setForm({
              ...form,
              [key]: event.target.value,
            })
          }
        />
      </label>
    );
  };

  if (!loggedIn) {
    return (
      <div className="admin-login-page">

        <div className="login-art">

          <Link
            to="/"
            className="admin-logo-link"
            aria-label="Go to Stairs home"
          >
            <img
              src={LOGO_URL}
              alt="Stairs Physiotherapy and Fitness Logo"
              className="admin-login-logo"
            />
          </Link>

          <p className="eyebrow">
            STAIRS ADMIN
          </p>

          <h1>
            Care management,
            <br />
            <em>made simple.</em>
          </h1>

          <p>
            Manage appointments, patients and clinic
            content in one secure workspace.
          </p>

        </div>

        <form
          className="login-card"
          onSubmit={login}
        >

          <div className="brand-word">
            STAIRS
          </div>

          <p className="eyebrow">
            WELCOME BACK
          </p>

          <h2>
            Sign in to your account
          </h2>

          <label>
            Email address

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </label>

          {loginError && (
            <div className="form-error">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
          >
            Sign in →
          </button>

        </form>

      </div>
    );
  }

  return (
    <div className="admin-app">

      <aside
        className={`admin-sidebar ${
          mobile ? "open" : ""
        }`}
      >

        <div className="sidebar-brand">

          <Link
            to="/"
            className="admin-logo-link"
            aria-label="Go to Stairs home"
          >
            <img
              src={LOGO_URL}
              alt="Stairs Physiotherapy and Fitness Logo"
              className="admin-sidebar-logo"
            />
          </Link>

          <div className="sidebar-brand-copy">
            <strong>
              STAIRS
            </strong>

            <small>
              Admin workspace
            </small>
          </div>

        </div>

        <nav>
          {navItems.map((item) => (
            <button
              type="button"
              key={item}
              className={
                tab === item
                  ? "active"
                  : ""
              }
              onClick={() => {
                setTab(item);
                setMobile(false);
                setEditing(null);
                setForm({});
              }}
            >
              {item}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="logout-button"
          onClick={logout}
        >
          ↪ Log out
        </button>

      </aside>

      <main className="admin-content">

        <header className="topbar">

          <button
            type="button"
            className="mobile-toggle"
            onClick={() =>
              setMobile(!mobile)
            }
          >
            ☰
          </button>

          <div>

            <p className="eyebrow">
              CLINIC CONTROL CENTER
            </p>

            <h1>{tab}</h1>

          </div>

          <span className="online-dot">
            ● Online
          </span>

        </header>

        {notice && (
          <div className="notice">

            <span>
              {notice}
            </span>

            <button
              type="button"
              onClick={() =>
                setNotice("")
              }
            >
              ×
            </button>

          </div>
        )}

        {tab === "Overview" && (
          <>
            <section className="welcome-panel">

              <div>

                <p className="eyebrow">
                  GOOD TO SEE YOU
                </p>

                <h2>
                  Here’s your clinic overview.
                </h2>

                <p>
                  Track daily operations and
                  patient interactions.
                </p>

              </div>

              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  setTab("Appointments")
                }
              >
                View appointments →
              </button>

            </section>

            <section className="stats-grid">

              {[
                [
                  "Total appointments",
                  appointments.length,
                ],
                [
                  "New enquiries",
                  appointments.filter(
                    (item) =>
                      item.status === "New"
                  ).length,
                ],
                [
                  "Confirmed",
                  appointments.filter(
                    (item) =>
                      item.status === "Confirmed"
                  ).length,
                ],
                [
                  "Completed",
                  appointments.filter(
                    (item) =>
                      item.status === "Completed"
                  ).length,
                ],
              ].map(([label, value]) => (
                <div
                  className="stat-card"
                  key={label}
                >

                  <div className="stat-label">
                    {label}
                  </div>

                  <strong>
                    {value}
                  </strong>

                </div>
              ))}

            </section>
          </>
        )}

        {tab === "Appointments" && (
          <section className="panel">

            <div className="panel-heading">

              <h3>
                Appointment management
              </h3>

              <button
                type="button"
                className="secondary-button"
                onClick={loadAppointments}
              >
                {loading
                  ? "Refreshing…"
                  : "↻ Refresh"}
              </button>

            </div>

            <input
              className="search-input"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by patient, phone or service…"
            />

            <div className="table-wrap">

              <table>

                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Service</th>
                    <th>Date and time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredAppointments.length === 0 ? (

                    <tr>
                      <td
                        colSpan="4"
                        className="empty-state"
                      >
                        No appointments found.
                      </td>
                    </tr>

                  ) : (

                    filteredAppointments.map(
                      (item) => (
                        <tr key={item._id}>

                          <td>

                            <strong>
                              {item.name ||
                                "Unknown patient"}
                            </strong>

                            <small>
                              {item.phone ||
                                "No phone"}
                            </small>

                            {item.email && (
                              <small>
                                {item.email}
                              </small>
                            )}

                          </td>

                          <td>
                            {item.service ||
                              "Consultation"}
                          </td>

                          <td>

                            {item.date || "—"}

                            <small>
                              {item.time || ""}
                            </small>

                          </td>

                          <td>

                            <select
                              className="status-select"
                              value={
                                item.status ||
                                "New"
                              }
                              onChange={(event) =>
                                updateStatus(
                                  item._id,
                                  event.target.value
                                )
                              }
                            >

                              {statuses.map(
                                (status) => (
                                  <option
                                    key={status}
                                    value={status}
                                  >
                                    {status}
                                  </option>
                                )
                              )}

                            </select>

                          </td>

                        </tr>
                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          </section>
        )}

        {config && (
          <section className="panel">

            <div className="panel-heading">

              <h3>
                {config.title} management
              </h3>

              <button
                type="button"
                className="secondary-button"
                onClick={beginAdd}
              >
                + Add new
              </button>

            </div>

            {editing !== null ||
            Object.keys(form).length > 0 ? (

              <form
                className="record-form"
                onSubmit={saveRecord}
              >

                {config.fields.map(
                  renderField
                )}

                <div className="form-actions">

                  <button
                    type="submit"
                    className="primary-button"
                  >
                    {editing
                      ? "Update"
                      : "Save"}
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={cancelForm}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            ) : (

              <div className="table-wrap">

                <table>

                  <thead>
                    <tr>
                      <th>
                        Name and question
                      </th>
                      <th>Details</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {records.length === 0 ? (

                      <tr>

                        <td
                          colSpan="3"
                          className="empty-state"
                        >
                          No records found.
                        </td>

                      </tr>

                    ) : (

                      records.map(
                        (item) => (
                          <tr
                            key={item._id}
                          >

                            <td>

                              <strong>
                                {item.name ||
                                  item.question ||
                                  "Record"}
                              </strong>

                            </td>

                            <td>
                              {item.role ||
                                item.description ||
                                item.text ||
                                item.answer ||
                                item.condition ||
                                "—"}
                            </td>

                            <td>

                              <button
                                type="button"
                                className="text-button"
                                onClick={() =>
                                  beginEdit(
                                    item
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="text-button danger"
                                onClick={() =>
                                  deleteRecord(
                                    item._id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </td>

                          </tr>
                        )
                      )

                    )}

                  </tbody>

                </table>

              </div>

            )}

          </section>
        )}

        {tab === "Settings" && (
          <section className="panel">

            <div className="panel-heading">

              <h3>
                Clinic settings
              </h3>

              <button
                type="button"
                className="secondary-button"
                onClick={loadSettings}
              >
                {loading
                  ? "Refreshing…"
                  : "↻ Refresh"}
              </button>

            </div>

            <form
              className="record-form"
              onSubmit={saveSettings}
            >

              {settingFields.map(
                ([key, label]) => (
                  <label key={key}>

                    {label}

                    <input
                      value={
                        settings[key] ?? ""
                      }
                      onChange={(event) =>
                        setSettings({
                          ...settings,
                          [key]:
                            event.target.value,
                        })
                      }
                    />

                  </label>
                )
              )}

              <button
                type="submit"
                className="primary-button"
              >
                Save settings
              </button>

            </form>

          </section>
        )}

      </main>

    </div>
  );
}