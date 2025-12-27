import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-lg-5">
              <div className="text-secondary small">Error 404</div>
              <h1 className="display-6 fw-bold mt-2">Página no encontrada</h1>
              <p className="text-secondary mt-3 mb-4">
                La ruta <code>{location.pathname}</code> no existe. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-2">
                <Link to="/" className="btn btn-primary">
                  Volver al inicio
                </Link>
                <Link to="/#services" className="btn btn-outline-secondary">
                  Ver servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
