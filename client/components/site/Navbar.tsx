import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type NavItem = {
  label: string;
  to: string;
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Inicio", to: "/#top" },
      { label: "Servicios", to: "/#services" },
      { label: "Reserva", to: "/#booking" },
    ],
    [],
  );

  const isActive = (to: string) => {
    const url = new URL(to, window.location.origin);
    return location.pathname === url.pathname && location.hash === url.hash;
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top"
      data-site-navbar
    >
      <div className="container py-2">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          onClick={() => setOpen(false)}
        >
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-circle"
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, rgb(var(--bs-primary-rgb)), #1e3a8a)",
              color: "#fff",
              fontSize: 12,
              letterSpacing: 0.8,
            }}
            aria-hidden="true"
          >
            DBT
          </span>
          <span className="d-none d-sm-inline">DBT web v1</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="site-navbar"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`navbar-collapse collapse ${open ? "show" : ""}`}
          id="site-navbar"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2 mt-3 mt-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-link ${isActive(item.to) ? "active fw-semibold" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ms-lg-3 mt-3 mt-lg-0">
            <Link
              to="/#booking"
              className="btn btn-primary w-100"
              onClick={() => setOpen(false)}
            >
              Agendar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
