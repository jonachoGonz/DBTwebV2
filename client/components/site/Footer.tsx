import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-top bg-white">
      <div className="container py-4">
        <div className="row gy-3 align-items-center">
          <div className="col-12 col-md">
            <div className="d-flex align-items-center gap-2 fw-semibold">
              <span
                className="rounded-circle"
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: "rgb(var(--bs-primary-rgb))",
                  display: "inline-block",
                }}
                aria-hidden="true"
              />
              <span>DBT web v1</span>
            </div>
            <div className="text-secondary small mt-2">
              © {year} • Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </div>
          </div>

          <div className="col-12 col-md-auto">
            <div className="d-flex flex-wrap gap-3 justify-content-md-end">
              <Link
                className="link-secondary text-decoration-none"
                to="/#services"
              >
                Servicios
              </Link>
              <Link
                className="link-secondary text-decoration-none"
                to="/#booking"
              >
                Reserva
              </Link>
              <a
                className="link-secondary text-decoration-none"
                href="https://www.contentful.com"
                target="_blank"
                rel="noreferrer"
              >
                Contentful
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
