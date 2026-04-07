"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import styles from "./auditorsTable.module.css";
import AddAuditorModal from "./Addauditormodal";
import AuditorAccessModal from "./AuditorAccessModal";
import EditAuditorModal from "./EditAuditorModal";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "Active" | "Inactive" | "Wait";

interface Auditor {
  name: string;
  nationalNumber: string;
  isActive: boolean;
  status: Status;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

const PAGE_SIZE = 7;

const STATUS_STYLES: Record<Status, { text: string; dot: string }> = {
  Active: { text: styles.active, dot: styles.dotActive },
  Inactive: { text: styles.offline, dot: styles.dotOffline },
  Wait: { text: styles.wait, dot: styles.dotWait },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AuditorsTable() {
  const [auditors, setAuditors] = useState<Auditor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null); // nationalNumber

  const [selectedAuditor, setSelectedAuditor] = useState<null | {
    name: string;
    nationalNumber: string;
    username: string;
    password: string;
  }>(null);

  const [editAuditor, setEditAuditor] = useState<null | {
    nationalNumber: string;
    name: string;
  }>(null);

  // ── Toast ───────────────────────────────────────────────────────────────────
  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3000,
    );
  };

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchAuditors = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auditors/getAllAuditors");
      if (res.status === 401) {
        setError("غير مصرح، يرجى تسجيل الدخول");
        return;
      }
      if (!res.ok) throw new Error("فشل تحميل البيانات");
      const data: Auditor[] = await res.json();
      setAuditors(data);
    } catch {
      setError("حدث خطأ أثناء تحميل البيانات");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuditors();
  }, [fetchAuditors]);

  // ── Filter ──────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return auditors;
    return auditors.filter(
      (a) => a.name.toLowerCase().includes(q) || a.nationalNumber.includes(q),
    );
  }, [auditors, search]);

  // ── Pagination ──────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Toggle ──────────────────────────────────────────────────────────────────
  const handleToggle = async (nationalNumber: string) => {
    const target = auditors.find((a) => a.nationalNumber === nationalNumber);
    if (!target) return;

    const newIsActive = !target.isActive;
    const newStatus: Status = newIsActive ? "Active" : "Inactive";

    setAuditors((prev) =>
      prev.map((a) =>
        a.nationalNumber === nationalNumber
          ? { ...a, isActive: newIsActive, status: newStatus }
          : a,
      ),
    );

    try {
      const res = await fetch("/api/auditors/toggleActive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nationalNumber, isActive: newIsActive }),
      });
      if (!res.ok) throw new Error("فشل التحديث");
    } catch {
      setAuditors((prev) =>
        prev.map((a) =>
          a.nationalNumber === nationalNumber
            ? { ...a, isActive: target.isActive, status: target.status }
            : a,
        ),
      );
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (nationalNumber: string) => {
    const backup = auditors.find((a) => a.nationalNumber === nationalNumber);
    setConfirmDelete(null);
    setAuditors((prev) =>
      prev.filter((a) => a.nationalNumber !== nationalNumber),
    );
    try {
      const res = await fetch(
        `/api/auditors/deleteAuditor?nationalNumber=${nationalNumber}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("فشل الحذف");
      showToast("تم الحذف بنجاح", "success");
    } catch {
      if (backup) setAuditors((prev) => [...prev, backup]);
      showToast("فشل الحذف، حاول مرة أخرى", "error");
    }
  };

  // ── Pages list ──────────────────────────────────────────────────────────────
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 6)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
  };

  const auditorToDelete = auditors.find(
    (a) => a.nationalNumber === confirmDelete,
  );

  // ────────────────────────────────────────────────────────────────────────────

  return (
    <div className={styles.wrapper}>
      {/* Toasts */}
      <div className={styles.toastContainer}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`${styles.toast} ${t.type === "success" ? styles.toastSuccess : styles.toastError}`}
          >
            {t.type === "success" ? (
              <CheckCircle size={16} />
            ) : (
              <XCircle size={16} />
            )}
            {t.message}
          </div>
        ))}
      </div>

      {/* Confirm Delete Dialog */}
      {confirmDelete && (
        <div className={styles.overlay} onClick={() => setConfirmDelete(null)}>
          <div
            className={styles.confirmModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.confirmIcon}>
              <AlertTriangle size={32} />
            </div>
            <h3 className={styles.confirmTitle}>تأكيد الحذف</h3>
            <p className={styles.confirmMsg}>
              هل أنت متأكد من حذف <strong>{auditorToDelete?.name}</strong>؟
              <br />
              لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className={styles.confirmActions}>
              <button
                className={styles.confirmCancelBtn}
                onClick={() => setConfirmDelete(null)}
              >
                إلغاء
              </button>
              <button
                className={styles.confirmDeleteBtn}
                onClick={() => handleDelete(confirmDelete)}
              >
                <Trash2 size={15} />
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

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
          placeholder="بحث بالاسم أو الرقم القومي..."
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
                {["الاسم", "الرقم القومي", "الحالة", "الإجراءات"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <td key={j}>
                        <div className={styles.skeleton} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : error ? (
                <tr className={styles.emptyRow}>
                  <td colSpan={4}>{error}</td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr className={styles.emptyRow}>
                  <td colSpan={4}>لا توجد نتائج مطابقة</td>
                </tr>
              ) : (
                paginated.map((a) => {
                  const sc =
                    STATUS_STYLES[a.status] ?? STATUS_STYLES["Inactive"];
                  return (
                    <tr key={a.nationalNumber}>
                      <td className={styles.nameCell}>{a.name}</td>
                      <td className={styles.ltrCell}>{a.nationalNumber}</td>

                      <td>
                        <span className={`${styles.badge} ${sc.text}`}>
                          <span className={`${styles.dot} ${sc.dot}`} />
                          {a.status}
                        </span>
                      </td>

                      <td>
                        <div className={styles.actions}>
                          <button
                            className={`${styles.actionBtn} ${styles.contactBtn}`}
                            title="تواصل"
                            onClick={async () => {
                              try {
                                const res = await fetch(
                                  `/api/auditors/getAuditorData?nationalNumber=${a.nationalNumber}`,
                                );
                                if (!res.ok)
                                  throw new Error("فشل جلب البيانات");
                                const data = await res.json();
                                setSelectedAuditor({
                                  name: a.name,
                                  nationalNumber: a.nationalNumber,
                                  username: data.username,
                                  password: data.password,
                                });
                              } catch {
                                showToast("فشل جلب بيانات الدخول", "error");
                              }
                            }}
                          >
                            <Smartphone size={15} />
                          </button>

                          <button
                            className={`${styles.actionBtn} ${styles.editBtn}`}
                            title="تعديل"
                            onClick={() =>
                              setEditAuditor({
                                nationalNumber: a.nationalNumber,
                                name: a.name,
                              })
                            }
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                            title="حذف"
                            onClick={() => setConfirmDelete(a.nationalNumber)}
                          >
                            <Trash2 size={15} />
                          </button>

                          <button
                            className={`${styles.toggle} ${a.isActive ? styles.toggleOn : styles.toggleOff}`}
                            onClick={() => handleToggle(a.nationalNumber)}
                            role="switch"
                            aria-checked={a.isActive}
                          >
                            <span
                              className={`${styles.toggleThumb} ${a.isActive ? styles.toggleThumbOn : styles.toggleThumbOff}`}
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

        {!isLoading && totalPages > 1 && (
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
          const res = await fetch("/api/auditors/addAuditors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error("فشل الإضافة");
          showToast("تم إضافة المجرد بنجاح", "success");
          await fetchAuditors();
        }}
      />

      {/* Access Modal */}
      <AuditorAccessModal
        isOpen={!!selectedAuditor}
        onClose={() => setSelectedAuditor(null)}
        auditor={
          selectedAuditor
            ? {
                id: 0,
                name: selectedAuditor.name,
                department: "",
                phone: selectedAuditor.nationalNumber,
                addedAt: "",
                username: selectedAuditor.username,
                password: selectedAuditor.password,
              }
            : null
        }
      />

      {/* Edit Modal */}
      <EditAuditorModal
        isOpen={!!editAuditor}
        onClose={() => setEditAuditor(null)}
        auditor={editAuditor}
        onSubmit={async (data) => {
          const res = await fetch("/api/auditors/updateAuditor", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.name,
              oldNationalNumber: editAuditor?.nationalNumber,
              newNationalNumber: data.newNationalNumber,
            }),
          });
          if (!res.ok) throw new Error("فشل التعديل");
          showToast("تم التعديل بنجاح", "success");
          await fetchAuditors();
        }}
      />
    </div>
  );
}
