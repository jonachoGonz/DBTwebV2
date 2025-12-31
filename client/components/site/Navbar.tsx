import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type NavItem = {
  label: string;
  to: string;
  pill?: boolean;
};

function NavLink({
  item,
  onClick,
}: {
  item: NavItem;
  onClick: () => void;
}) {
  const baseStyle: React.CSSProperties = {
    color: "rgb(252, 248, 241)",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 20px",
    borderRadius: 9999,
    border: item.pill ? "1px solid rgba(242, 236, 226, 0.5)" : "1px solid rgba(0,0,0,0)",
    transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: "20.8px",
  };

  return (
    <Link to={item.to} style={baseStyle} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Inicio", to: "/#inicio" },
      { label: "Sobre Nosotros", to: "/#nosotros" },
      { label: "Terapias", to: "/#terapias" },
      { label: "Servicios", to: "/#servicios" },
      { label: "Equipo", to: "/#equipo" },
      { label: "Proceso", to: "/#proceso" },
      { label: "Contacto", to: "/#contacto", pill: true },
    ],
    [],
  );

  return (
    <section
      style={{
        position: "absolute",
        top: 30,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 100,
      }}
      aria-label="Site Navigation"
    >
      <div style={{ maxWidth: "calc(100% - 60px)", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 30,
          }}
        >
          <Link
            to="/"
            style={{
              color: "rgb(252, 248, 241)",
              textDecoration: "none",
              position: "relative",
            }}
            onClick={() => setOpen(false)}
          >
            <div
              style={{
                color: "rgb(252, 248, 241)",
                fontSize: 24,
                fontWeight: 700,
                lineHeight: "32px",
              }}
            >
              DBT Salud
            </div>
          </Link>

          <nav
            className="d-none d-lg-flex"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              position: "relative",
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                item={item}
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div
                style={{
                  color: "rgb(252, 248, 241)",
                  fontSize: 13.5,
                  lineHeight: "17.55px",
                }}
              >
                EN
              </div>
            </div>

            <a
              href="https://wa.me/56949897699"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "rgb(252, 248, 241)",
                borderRadius: 9999,
                color: "rgb(0, 0, 0)",
                textDecoration: "none",
                fontWeight: 500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "12px 24px",
                transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                whiteSpace: "nowrap",
              }}
              onClick={() => setOpen(false)}
            >
              Agenda tu sesión
            </a>

            <button
              type="button"
              className="d-inline-flex d-lg-none"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              style={{
                width: 37,
                height: 37,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                backgroundColor: "transparent",
                border: "1px solid rgba(226, 232, 240, 0)",
                padding: 0,
              }}
            >
              <span
                aria-hidden="true"
                style={{ width: 15, height: 1, backgroundColor: "rgb(252, 248, 241)" }}
              />
              <span
                aria-hidden="true"
                style={{ width: 15, height: 1, backgroundColor: "rgb(252, 248, 241)" }}
              />
              <span
                aria-hidden="true"
                style={{ width: 15, height: 1, backgroundColor: "rgb(252, 248, 241)" }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div
            className="d-lg-none"
            style={{
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 18,
            }}
          >
            <div
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(0,0,0,0.35)",
                borderRadius: 20,
                padding: 12,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {navItems.map((item) => (
                  <NavLink
                    key={`mobile-${item.to}`}
                    item={item}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
