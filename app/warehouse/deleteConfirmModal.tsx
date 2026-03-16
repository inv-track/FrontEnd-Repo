"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { fetchWithAuth } from "../lib/fetchWithAuth";
import "./deleteConfirmModal.css";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  serialNumber: string;
  assetName: string;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onSuccess,
  serialNumber,
  assetName,
}: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchWithAuth(
        `/api/warehouse/delete?serialNumber=${serialNumber}`,
        { method: "DELETE", credentials: "include" },
      );

      if (!res.ok) throw new Error("فشل الحذف");

      onSuccess();
      onClose();
    } catch {
      setError("حدث خطأ أثناء الحذف");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-overlay" onClick={onClose}>
      <div className="delete-box" onClick={(e) => e.stopPropagation()}>
        <div className="delete-icon">
          <AlertTriangle size={40} color="#e53e3e" />
        </div>
        <h2 className="delete-title">تأكيد الحذف</h2>
        <p className="delete-message">
          هل أنت متأكد من حذف <strong>{assetName}</strong>؟
          <br />
          <span className="delete-serial">رقم تسلسلي: {serialNumber}</span>
        </p>

        {error && <p className="delete-error">{error}</p>}

        <div className="delete-actions">
          <button className="btn-cancel" onClick={onClose}>
            إلغاء
          </button>
          <button
            className="btn-delete"
            onClick={handleDelete}
            disabled={loading}
          >
            <Trash2 size={16} />
            {loading ? "جاري الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
}
