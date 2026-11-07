import { Link } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar({
  mobile,
  groups,
  activeTab,
  logoUrl,
  onNavigate,
  onLogout,
}) {
  return (
    <aside
      className={`admin-sidebar ${mobile ? "open" : ""}`}
      aria-label="Main navigation"
    >
      <div className="sidebar-brand">
        <Link
          to="/"
          className="admin-logo-link"
          aria-label="Go to STAIRS home"
        >
          <img
            src={logoUrl}
            alt="STAIRS logo"
            className="admin-sidebar-logo"
          />
        </Link>

        <div className="sidebar-brand-copy">
          <strong>STAIRS</strong>
          <small>OS V1 WORKSPACE</small>
        </div>
      </div>

      <nav aria-label="Workspace sections">
        {groups.map((group) => (
          <div className="nav-group" key={group.title}>
            <p className="eyebrow nav-group-title">{group.title}</p>

            {group.items.map((item) => (
              <button
                type="button"
                key={item}
                className={activeTab === item ? "active" : ""}
                aria-current={activeTab === item ? "page" : undefined}
                onClick={() => onNavigate(item)}
              >
                <span>{item}</span>
                <span className="stairs-nav-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      <button
        type="button"
        className="logout-button"
        onClick={onLogout}
      >
        <span className="stairs-logout-icon" aria-hidden="true">↪</span>
        <span>Log out</span>
      </button>
    </aside>
  );
}
