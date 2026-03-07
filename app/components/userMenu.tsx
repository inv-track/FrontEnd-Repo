"use client";

import { fetchWithAuth } from "../lib/fetchWithAuth";
import { useEffect, useRef, useState } from "react";
import "./userMenu.css";

interface User {
  userName: string;
  role: string;
  ssn: string;
}

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //  اقرأ الـ cookie
    const cookies = document.cookie.split(";");
    const userCookie = cookies.find((c) => c.trim().startsWith("user="));
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        setUser(userData);
      } catch {
        setUser(null);
      }
    }
  }, []);

  //  إغلاق الـ menu لما يضغط برا
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetchWithAuth("/api/logout", { method: "POST", credentials: "include" });
    window.location.href = "/login";
  };

  return (
    <div className="user-menu-wrapper" ref={menuRef}>
      {/* أيقونة اليوزر */}
      <button className="user-icon-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-regular fa-user" style={{ fontSize: "22px", color: "#1a3c6e" }}></i>
      </button>

      {/*  الـ Dropdown */}
      {isOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <div className="user-avatar">
              {user?.userName?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <p className="user-name">{user?.userName}</p>
              <p className="user-role">{user?.role}</p>
            </div>
          </div>

          <div className="user-divider" />

          <div className="user-row">
            <span className="user-label">الرقم الوظيفي</span>
            <span className="user-value">{user?.ssn}</span>
          </div>

          <div className="user-divider" />

          <button className="logout-btn" onClick={handleLogout}>
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}