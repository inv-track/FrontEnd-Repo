"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState,useEffect } from "react";
import styles from "./sidebar.module.css";
import { fetchWithAuth } from "../lib/fetchWithAuth";
import {
  Home,
  RefreshCw,
  Package,
  Users,
  MapPin,
  UserCog,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/home", icon: <Home size={18} />, text: "الرئيسية" },
    { href: "/operations", icon: <RefreshCw size={18} />, text: "العمليات" },
    { href: "/warehouse", icon: <Package size={18} />, text: "العهد/المخازن" },
    { href: "/employee", icon: <Users size={18} />, text: "الموظفين" },
    { href: "/location", icon: <MapPin size={18} />, text: "المكان" },
    { href: "/editors", icon: <UserCog size={18} />, text: "المجردين" },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await fetchWithAuth("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  return (
    <aside className={styles["sidebar"]}>
      <button
        className={`${styles["menu-toggle"]} ${isMenuOpen ? styles["active"] : ""}`}
        onClick={toggleMenu}
      >
        القائمة
      </button>

      <nav
        className={`${styles["nav-menu"]} ${isMenuOpen ? styles["active"] : ""}`}
      >
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles["nav-link"]} ${isActive ? styles["active"] : ""}`}
              onClick={closeMenu}
            >
              <span className={styles["nav-icon"]}>{link.icon}</span>
              <span className={styles["nav-text"]}>{link.text}</span>
            </Link>
          );
        })}

        <button
          className={`${styles["nav-link"]} ${styles["logout-btn"]}`}
          onClick={handleLogout}
        >
          <span className={styles["nav-icon"]}>
            <LogOut size={18} />
          </span>
          <span className={styles["nav-text"]}>تسجيل الخروج</span>
        </button>
      </nav>
    </aside>
  );
}
