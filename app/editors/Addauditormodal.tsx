"use client";

import { useState } from "react";
import { X } from "lucide-react";
import styles from "./Addauditormodal.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AddAuditorForm {
  name: string;
  nationalNumber: string;
}

interface FormErrors {
  name?: string;
  nationalNumber?: string;
}

interface AddAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddAuditorForm) => Promise<void>;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: AddAuditorForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "الاسم مطلوب";
  if (!form.nationalNumber.trim()) errors.nationalNumber = "الرقم القومي مطلوب";
  else if (form.nationalNumber.length < 14)
    errors.nationalNumber = "الرقم القومي يجب أن يكون 14 رقم";
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AddAuditorModal({
  isOpen,
  onClose,
  onSubmit,
}: AddAuditorModalProps) {
  const [form, setForm] = useState<AddAuditorForm>({
    name: "",
    nationalNumber: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof AddAuditorForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(form);
      setForm({ name: "", nationalNumber: "" });
      setErrors({});
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>اضافة مجرد جديد</h2>
            <p className={styles.subtitle}>
              أدخل البيانات الأساسية وسيتم إنشاء بيانات الدخول تلقائياً
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="إغلاق"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* الاسم الكامل */}
          <div className={styles.field}>
            <label className={styles.label}>الاسم الكامل</label>
            <input
              type="text"
              placeholder="مثال: أحمد محمد علي"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`${styles.input} ${errors.name ? styles.error : ""}`}
            />
            {errors.name && (
              <span className={styles.errorMsg}>{errors.name}</span>
            )}
          </div>

          {/* الرقم القومي */}
          <div className={styles.field}>
            <label className={styles.label}>الرقم القومي</label>
            <input
              type="text"
              placeholder="مثال: 30201011234567"
              value={form.nationalNumber}
              onChange={(e) => handleChange("nationalNumber", e.target.value)}
              className={`${styles.input} ${errors.nationalNumber ? styles.error : ""}`}
              maxLength={14}
              dir="ltr"
            />
            {errors.nationalNumber && (
              <span className={styles.errorMsg}>{errors.nationalNumber}</span>
            )}
          </div>

          {/* Info */}
          <div className={styles.infoBox}>
            🔒 سيتم إنشاء اسم المستخدم وكلمة المرور تلقائياً من النظام
          </div>

          {/* Submit */}
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإضافة..." : "أضافه"}
          </button>
        </div>
      </div>
    </div>
  );
}
