"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./EditAuditorModal.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EditAuditorForm {
  name: string;
  phone: string;
  department: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  department?: string;
}

interface EditAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EditAuditorForm) => Promise<void>;
  auditor: { id: number; name: string; phone: string; department: string } | null;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: EditAuditorForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim())       errors.name       = "الاسم مطلوب";
  if (!form.phone.trim())      errors.phone      = "رقم الهاتف مطلوب";
  else if (!/^01[0-9]{9}$/.test(form.phone)) errors.phone = "رقم هاتف غير صحيح";
  if (!form.department.trim()) errors.department = "القسم مطلوب";
  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditAuditorModal({
  isOpen,
  onClose,
  onSubmit,
  auditor,
}: EditAuditorModalProps) {
  const [form, setForm]     = useState<EditAuditorForm>({ name: "", phone: "", department: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // لما المودل يفتح يحط داتا المجرد في الفورم
  useEffect(() => {
    if (auditor) {
      setForm({ name: auditor.name, phone: auditor.phone, department: auditor.department });
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
          <button className={styles.closeBtn} onClick={onClose} aria-label="إغلاق">
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
            {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
          </div>

          {/* رقم الهاتف */}
          <div className={styles.field}>
            <label className={styles.label}>رقم الهاتف</label>
            <input
              type="tel"
              placeholder="01xxxxxxxxx"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`${styles.input} ${errors.phone ? styles.error : ""}`}
              dir="ltr"
            />
            {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
          </div>

          {/* القسم */}
          <div className={styles.field}>
            <label className={styles.label}>القسم</label>
            <input
              type="text"
              placeholder="مثال: قسم جرد الاصول"
              value={form.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className={`${styles.input} ${errors.department ? styles.error : ""}`}
            />
            {errors.department && <span className={styles.errorMsg}>{errors.department}</span>}
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
