"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./auditorsTable.module.css";
import AddAuditorModal from "./Addauditormodal";
import AuditorAccessModal from "./AuditorAccessModal";
import EditAuditorModal from "./EditAuditorModal";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "Active" | "Offline" | "Wait";

interface Auditor {
  id: number;
  name: string;
  phone: string;
  department: string;
  lastActivity: string;
  status: Status;
  enabled: boolean;
}

const PAGE_SIZE = 7;

const STATUS_STYLES: Record<Status, { text: string; dot: string }> = {
  Active: { text: styles.active, dot: styles.dotActive },
  Offline: { text: styles.offline, dot: styles.dotOffline },
  Wait: { text: styles.wait, dot: styles.dotWait },
};

// ─── Mock data (شيلها لما الـ API يبقى جاهز) ─────────────────────────────────

const MOCK: Auditor[] = [
  {
    id: 1,
    name: "م. خالد أحمد سالم",
    phone: "01278945612",
    department: "قسم جرد الاصول",
    lastActivity: "2025-10-24 14:30",
    status: "Offline",
    enabled: true,
  },
  {
    id: 2,
    name: "م. شنوده اشرف عزيز",
    phone: "01278945612",
    department: "قسم التدقيق المالي",
    lastActivity: "2025-10-23 11:15",
    status: "Active",
    enabled: true,
  },
  {
    id: 3,
    name: "م. نورة محمد إبراهيم",
    phone: "01278945612",
    department: "إدارة المراجعة الداخلية",
    lastActivity: "2025-10-24 14:30",
    status: "Active",
    enabled: true,
  },
  {
    id: 4,
    name: "أ. عبدالله حسين علي",
    phone: "01278945612",
    department: "قسم جرد الاصول",
    lastActivity: "2025-10-23 11:15",
    status: "Wait",
    enabled: true,
  },
  {
    id: 5,
    name: "م. خالد أحمد سالم",
    phone: "01278945612",
    department: "قسم التدقيق المالي",
    lastActivity: "2025-10-24 14:30",
    status: "Wait",
    enabled: true,
  },
  {
    id: 6,
    name: "م. شنوده اشرف عزيز",
    phone: "01278945612",
    department: "إدارة المراجعة الداخلية",
    lastActivity: "2025-10-23 11:15",
    status: "Offline",
    enabled: false,
  },
  {
    id: 7,
    name: "م. نورة محمد إبراهيم",
    phone: "01278945612",
    department: "قسم جرد الاصول",
    lastActivity: "2025-10-24 14:30",
    status: "Offline",
    enabled: true,
  },
  {
    id: 8,
    name: "أ. محمد علي حسن",
    phone: "01198765432",
    department: "قسم التدقيق المالي",
    lastActivity: "2025-10-22 09:00",
    status: "Active",
    enabled: true,
  },
  {
    id: 9,
    name: "م. سارة يوسف إبراهيم",
    phone: "01012345678",
    department: "إدارة المراجعة الداخلية",
    lastActivity: "2025-10-21 13:45",
    status: "Wait",
    enabled: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AuditorsTable() {
  const [auditors, setAuditors] = useState<Auditor[]>(MOCK);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuditor, setSelectedAuditor] = useState<null | {
    id: number;
    name: string;
    department: string;
    phone: string;
    addedAt: string;
    username: string;
    password: string;
  }>(null);
  const [editAuditor, setEditAuditor] = useState<null | {
    id: number;
    name: string;
    phone: string;
    department: string;
  }>(null);

  // ── Filter ──
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return auditors;
    return auditors.filter(
      (a) =>
        a.name.includes(q) || a.department.includes(q) || a.phone.includes(q),
    );
  }, [auditors, search]);

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Toggle (optimistic) ──
  const handleToggle = async (id: number) => {
    setAuditors((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    );
    const target = auditors.find((a) => a.id === id);
    if (!target) return;
    try {
      await fetch(`/api/auditors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !target.enabled }),
      });
    } catch {
      setAuditors((prev) =>
        prev.map((a) => (a.id === id ? { ...a, enabled: target.enabled } : a)),
      );
    }
  };

  // ── Delete (optimistic) ──
  const handleDelete = async (id: number) => {
    const backup = auditors.find((a) => a.id === id);
    setAuditors((prev) => prev.filter((a) => a.id !== id));
    try {
      await fetch(`/api/auditors/${id}`, { method: "DELETE" });
    } catch {
      if (backup)
        setAuditors((prev) => [...prev, backup].sort((a, b) => a.id - b.id));
    }
  };

  // ── Pages list ──
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 6)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>قائمة المجردين</h1>
        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          إضافة مجرد جديد
        </button>
      </div>

      {/* Search */}
      <div className={styles.searchWrapper}>
        <Search size={15} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="بحث...."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className={styles.searchInput}
        />
      </div>

      {/* Card */}
      <div className={styles.card}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                {[
                  "الاسم",
                  "رقم الهاتف",
                  "القسم",
                  "أخر نشاط",
                  "الحالة",
                  "الإجراءات",
                ].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {paginated.length === 0 ? (
                <tr className={styles.emptyRow}>
                  <td colSpan={6}>لا توجد نتائج مطابقة</td>
                </tr>
              ) : (
                paginated.map((a) => {
                  const sc = STATUS_STYLES[a.status];
                  return (
                    <tr key={a.id}>
                      <td className={styles.nameCell}>{a.name}</td>
                      <td className={styles.ltrCell}>{a.phone}</td>
                      <td>{a.department}</td>
                      <td className={styles.ltrCell}>{a.lastActivity}</td>

                      {/* Status */}
                      <td>
                        <span className={`${styles.badge} ${sc.text}`}>
                          <span className={`${styles.dot} ${sc.dot}`} />
                          {a.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className={styles.actions}>
                          {/* Smartphone */}
                          <button
                            className={`${styles.actionBtn} ${styles.contactBtn}`}
                            title="تواصل"
                            onClick={() =>
                              setSelectedAuditor({
                                id: a.id,
                                name: a.name,
                                department: a.department,
                                phone: a.phone,
                                addedAt: a.lastActivity,
                                username: "khalid.inspector", // TODO: من الـ API
                                password: "pass1234", // TODO: من الـ API
                              })
                            }
                          >
                            <Smartphone size={15} />
                          </button>

                          {/* Edit */}
                          <button
                            className={`${styles.actionBtn} ${styles.editBtn}`}
                            title="تعديل"
                            onClick={() =>
                              setEditAuditor({
                                id: a.id,
                                name: a.name,
                                phone: a.phone,
                                department: a.department,
                              })
                            }
                          >
                            <Pencil size={15} />
                          </button>

                          {/* Delete */}
                          <button
                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                            onClick={() => handleDelete(a.id)}
                            title="حذف"
                          >
                            <Trash2 size={15} />
                          </button>

                          {/* Toggle */}
                          <button
                            className={`${styles.toggle} ${a.enabled ? styles.toggleOn : styles.toggleOff}`}
                            onClick={() => handleToggle(a.id)}
                            role="switch"
                            aria-checked={a.enabled}
                          >
                            <span
                              className={`${styles.toggleThumb} ${a.enabled ? styles.toggleThumbOn : styles.toggleThumbOff}`}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              <ChevronLeft size={15} />
            </button>

            {getPages().map((p, i) =>
              p === "..." ? (
                <span key={`d${i}`} className={styles.pageDots}>
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ""}`}
                  onClick={() => setPage(p as number)}
                >
                  {String(p).padStart(2, "0")}
                </button>
              ),
            )}

            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Add Modal */}
      <AddAuditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (data) => {
          console.log(data); // TODO: API
        }}
      />

      {/* Access Modal */}
      <AuditorAccessModal
        isOpen={!!selectedAuditor}
        onClose={() => setSelectedAuditor(null)}
        auditor={selectedAuditor}
      />

      {/* Edit Modal */}
      <EditAuditorModal
        isOpen={!!editAuditor}
        onClose={() => setEditAuditor(null)}
        auditor={editAuditor}
        onSubmit={async (data) => {
          setAuditors((prev) =>
            prev.map((a) => (a.id === editAuditor?.id ? { ...a, ...data } : a)),
          );
        }}
      />
    </div>
  );
}
