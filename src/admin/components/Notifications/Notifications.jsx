
import { useEffect, useMemo, useState } from "react";
import "./Notifications.css";

const FILTERS = ["All", "Unread", "Read"];

const getItems = (result) => {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.items)) return result.items;
  if (Array.isArray(result?.notifications)) return result.notifications;
  if (Array.isArray(result?.data)) return result.data;
  return [];
};

const getType = (type = "system") => {
  const value = String(type).toLowerCase();

  const types = {
    appointment: { icon: "▦", label: "Appointment" },
    patient: { icon: "◉", label: "Patient" },
    finance: { icon: "₹", label: "Finance" },
    attendance: { icon: "◷", label: "Attendance" },
    leave: { icon: "▤", label: "Leave" },
    payroll: { icon: "₹", label: "Payroll" },
    lead: { icon: "◇", label: "Lead" },
    system: { icon: "⚙", label: "System" },
  };

  return types[value] || types.system;
};

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Notifications({
  apiRequest,
  onNotice,
}) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");

  const unreadCount = items.filter((item) => !item.readAt).length;
  const readCount = items.length - unreadCount;

  const loadNotifications = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await apiRequest("notifications");
      setItems(getItems(result));
    } catch (err) {
      setError(err.message || "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Unread" && !item.readAt) ||
        (filter === "Read" && Boolean(item.readAt));

      const matchesSearch =
        !query ||
        `${item.title || ""} ${item.message || ""} ${item.type || ""}`
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [items, filter, search]);

  const markAsRead = async (id) => {
    setActionId(id);
    setError("");

    try {
      await apiRequest(`notifications/${id}/read`, {
        method: "PATCH",
      });

      onNotice?.("Notification marked as read.");
      await loadNotifications();
    } catch (err) {
      setError(err.message || "Unable to update notification.");
    } finally {
      setActionId(null);
    }
  };

  const markAllAsRead = async () => {
    if (!unreadCount) return;

    setActionId("all");
    setError("");

    try {
      await apiRequest("notifications/read-all", {
        method: "PATCH",
      });

      onNotice?.("All notifications marked as read.");
      await loadNotifications();
    } catch (err) {
      setError(err.message || "Unable to update notifications.");
    } finally {
      setActionId(null);
    }
  };

  return (
    <section className="stairs-notifications">

      <header className="sn-heading">
        <div>
          <span className="sn-eyebrow">PHASE 9 · SYSTEM CENTER</span>
          <h2>Notifications</h2>
          <p>Stay updated with your clinic operations.</p>
        </div>

        <div className="sn-heading-actions">
          <button
            type="button"
            className="sn-refresh"
            onClick={loadNotifications}
            disabled={loading || Boolean(actionId)}
          >
            ↻ Refresh
          </button>

          <button
            type="button"
            className="sn-mark-all"
            onClick={markAllAsRead}
            disabled={!unreadCount || Boolean(actionId)}
          >
            {actionId === "all" ? "Updating..." : "Mark all as read"}
          </button>
        </div>
      </header>

      <div className="sn-stats">
        <article className="sn-stat">
          <span>Total notifications</span>
          <strong>{items.length}</strong>
          <small>All received updates</small>
        </article>

        <article className="sn-stat sn-stat-unread">
          <span>Unread</span>
          <strong>{unreadCount}</strong>
          <small>Need your attention</small>
        </article>

        <article className="sn-stat">
          <span>Read</span>
          <strong>{readCount}</strong>
          <small>Already reviewed</small>
        </article>
      </div>

      <div className="sn-toolbar">
        <div className="sn-filters">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "sn-filter active" : "sn-filter"}
              onClick={() => setFilter(item)}
            >
              {item}
              {item === "Unread" && unreadCount > 0 && (
                <span>{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        <input
          className="sn-search"
          placeholder="Search notifications..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {error && (
        <div className="sn-error" role="alert">
          {error}
        </div>
      )}

      <div className="sn-list-header">
        <div>
          <h3>Activity inbox</h3>
          <p>{filteredItems.length} notifications displayed</p>
        </div>

        <span className="sn-live-indicator">
          <i /> Live data
        </span>
      </div>

      <div className="sn-list">
        {loading && items.length === 0 ? (
          <div className="sn-empty">Loading notifications...</div>
        ) : filteredItems.length === 0 ? (
          <div className="sn-empty">
            <span className="sn-empty-icon">◇</span>
            <strong>No notifications found</strong>
            <p>There are no notifications matching this filter.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const type = getType(item.type);
            const unread = !item.readAt;

            return (
              <article
                className={`sn-item ${unread ? "unread" : ""}`}
                key={item._id}
              >
                <div className={`sn-icon sn-icon-${item.type || "system"}`}>
                  {type.icon}
                </div>

                <div className="sn-item-content">
                  <div className="sn-item-top">
                    <div className="sn-title-wrap">
                      {unread && <span className="sn-unread-dot" />}
                      <h4>{item.title || "Notification"}</h4>
                    </div>

                    <span className={`sn-status ${unread ? "new" : "read"}`}>
                      {unread ? "Unread" : "Read"}
                    </span>
                  </div>

                  <p className="sn-message">
                    {item.message || "No additional details available."}
                  </p>

                  <div className="sn-item-footer">
                    <span className="sn-type">{type.label}</span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>

                <div className="sn-item-action">
                  {unread ? (
                    <button
                      type="button"
                      onClick={() => markAsRead(item._id)}
                      disabled={Boolean(actionId)}
                    >
                      {actionId === item._id ? "Updating..." : "Mark read"}
                    </button>
                  ) : (
                    <span className="sn-reviewed">✓ Reviewed</span>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

    </section>
  );
}
