"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./EditAuditorModal.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EditAuditorForm {
  name: string;
  newNationalNumber: string;
}

interface FormErrors {
  name?: string;
  newNationalNumber?: string;
}

interface EditAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditAuditorForm) => Promise<void>;
  auditor: { nationalNumber: string; name: string } | null;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: EditAuditorForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "الاسم مطلوب";
  if (!form.newNationalNumber.trim())
    errors.newNationalNumber = "الرقم القومي مطلوب";
  else if (form.newNationalNumber.length < 14)
    errors.newNationalNumber = "الرقم القومي يجب أن يكون 14 رقم";
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditAuditorModal({
  isOpen,
  onClose,
  onSubmit,
  auditor,
}: EditAuditorModalProps) {
  const [form, setForm] = useState<EditAuditorForm>({
    name: "",
    newNationalNumber: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // لما المودل يفتح يحط داتا المجرد في الفورم
  useEffect(() => {
    if (auditor) {
      setForm({
        name: auditor.name,
        newNationalNumber: auditor.nationalNumber,
      });
      setErrors({});
    }
  }, [auditor]);

  if (!isOpen || !auditor) return null;

  const handleChange = (field: keyof EditAuditorForm, value: string) => {
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
            <h2 className={styles.title}>تعديل بيانات المجرد</h2>
            <p className={styles.subtitle}>قم بتعديل البيانات ثم اضغط حفظ</p>
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
              value={form.newNationalNumber}
              onChange={(e) =>
                handleChange("newNationalNumber", e.target.value)
              }
              className={`${styles.input} ${errors.newNationalNumber ? styles.error : ""}`}
              maxLength={14}
              dir="ltr"
            />
            {errors.newNationalNumber && (
              <span className={styles.errorMsg}>
                {errors.newNationalNumber}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الحفظ..." : "حفظ التعديلات"}
          </button>
        </div>
      </div>
    </div>
  );
}
