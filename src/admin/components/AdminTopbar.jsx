
import "./AdminTopbar.css";

export default function AdminTopbar({
  mobile,
  onToggleMobile,
  tab,
  user,
  humanize,
}) {
  const userName = user?.name || user?.fullName || "Admin";
  const userRole = user?.role ? humanize(user.role) : "Administrator";
  const userEmail = user?.email || "";
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header className="topbar stairs-topbar">
      <div className="topbar-main">

        <button
          type="button"
          className="mobile-toggle"
          onClick={onToggleMobile}
          aria-label={mobile ? "Close navigation" : "Open navigation"}
          aria-expanded={Boolean(mobile)}
        >
          <span aria-hidden="true">{mobile ? "×" : "☰"}</span>
        </button>

        <div className="stairs-topbar-heading">
          <div className="topbar-brandline">
            <span className="brandline-indicator" />
            <p className="eyebrow">
              STAIRS OS V1
              <span className="brandline-separator">·</span>
              CLINIC CONTROL CENTER
            </p>
          </div>

          <div className="topbar-title-row">
            <h1>{tab}</h1>
            <span className="topbar-context">Workspace</span>
          </div>
        </div>
      </div>

      <div className="admin-user-meta">
        <div className="user-meta-top">
          <span className="online-dot">
            <i aria-hidden="true" />
            Online
          </span>
          <span className="user-access-label">ACTIVE SESSION</span>
        </div>

        <div className="user-meta-bottom">
          <div className="user-avatar" aria-hidden="true">
            {initials || "A"}
          </div>

          <div className="user-details">
            <strong>{userRole}</strong>
            <small title={userEmail}>{userEmail || userName}</small>
          </div>

          <span className="user-session-mark" aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </header>
  );
}
