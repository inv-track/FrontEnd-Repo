"use client";

import { useState } from "react";
import { X, UserCircle2, Lock, Eye, EyeOff } from "lucide-react";
import styles from "./AuditorAccessModal.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuditorAccess {
  id: number;
  name: string;
  department: string;
  phone: string;
  addedAt: string;
  username: string;
  password: string;
}

interface AuditorAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditor: AuditorAccess | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AuditorAccessModal({
  isOpen,
  onClose,
  auditor,
}: AuditorAccessModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen || !auditor) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>اضافة موظف جديد</h2>
            <p className={styles.subtitle}>معلومات الوصول والنشاط</p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Profile card */}
          <div className={styles.profileCard}>
            <div className={styles.avatar}>
              <UserCircle2 size={24} />
            </div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{auditor.name}</span>
              <span className={styles.profileDept}>{auditor.department}</span>
            </div>
          </div>

          {/* Meta row */}
          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>رقم الهاتف</span>
              <span className={styles.metaValue}>{auditor.phone}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>تاريخ الاضافة</span>
              <span className={styles.metaValue}>{auditor.addedAt}</span>
            </div>
          </div>

          {/* Access box */}
          <div className={styles.accessBox}>
            <div className={styles.accessBoxHeader}>
              بيانات دخول تطبيق الموبايل
            </div>
            <div className={styles.accessBoxBody}>
              {/* Username */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>اسم المستخدم</label>
                <input
                  type="text"
                  readOnly
                  value={auditor.username}
                  className={styles.fieldInput}
                />
              </div>

              {/* Password */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>كلمة المرور</label>
                <div className={styles.passwordWrapper}>
                  <Lock size={14} className={styles.lockIcon} />
                  <input
                    type={showPassword ? "text" : "password"}
                    readOnly
                    value={auditor.password}
                    placeholder="كلمة المرور"
                    className={styles.passwordInput}
                  />
                  <button
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                    }
                    type="button"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
