import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  const navbarEl = document.querySelector(
    "[data-site-navbar]",
  ) as HTMLElement | null;

  const navbarOffset = (navbarEl?.offsetHeight ?? 0) + 12;
  const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

export default function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      scrollToHash(location.hash);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
