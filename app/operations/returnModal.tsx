"use client";

import { useState, useEffect } from "react";
import { Search, X, FileText, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { fetchWithAuth } from "../lib/fetchWithAuth";
import "./returnModal.css";

interface Employee {
  name: string;
  nationalNumber: string;
  building: string;
}

interface EmployeeAsset {
  name: string;
  serialNumber: string;
  quantity: number;
  transactionDate: string;
}

interface SelectedAsset {
  serialNumber: string;
  name: string;
  availableQty: number;
  requestedQuantity: number;
  warning?: string;
}

interface ReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReturnModal({ isOpen, onClose, onSuccess }: ReturnModalProps) {
  // ===== Employee States =====
  const [nationalInput, setNationalInput] = useState("");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [employeeError, setEmployeeError] = useState("");
  const [searchingEmployee, setSearchingEmployee] = useState(false);
  const [employeeAssets, setEmployeeAssets] = useState<EmployeeAsset[]>([]);

  // ===== Selected Assets =====
  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([]);

  // ===== Submit States =====
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      //  Reset لما الـ modal يتقفل
      setNationalInput("");
      setEmployee(null);
      setEmployeeError("");
      setEmployeeAssets([]);
      setSelectedAssets([]);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ===== البحث عن موظف وجلب عهده =====
  const handleSearchEmployee = async () => {
    if (!nationalInput.trim()) return;
    setSearchingEmployee(true);
    setEmployeeError("");
    setEmployee(null);
    setEmployeeAssets([]);
    setSelectedAssets([]);

    try {
      // جلب بيانات الموظف
      const empRes = await fetchWithAuth(
        `/api/operations/employee?nationalNumber=${nationalInput}`,
        { credentials: "include" }
      );

      if (!empRes.ok) {
        setEmployeeError("موظف غير موجود — تأكد من الرقم القومي");
        return;
      }

      const empData: Employee = await empRes.json();
      setEmployee(empData);

      //  جلب عهد الموظف
      const assetsRes = await fetchWithAuth(
        `/api/operations/employeeassets?nationalNumber=${nationalInput}`,
        { credentials: "include" }
      );

      if (assetsRes.ok) {
        const assetsData: EmployeeAsset[] = await assetsRes.json();
        setEmployeeAssets(Array.isArray(assetsData) ? assetsData : []);
      }

    } catch {
      setEmployeeError("حدث خطأ أثناء البحث");
    } finally {
      setSearchingEmployee(false);
    }
  };

  // ===== اختيار عهدة =====
  const handleSelectAsset = (asset: EmployeeAsset) => {
    const alreadySelected = selectedAssets.find(
      (a) => a.serialNumber === asset.serialNumber
    );
    if (alreadySelected) return;

    setSelectedAssets((prev) => [
      ...prev,
      {
        serialNumber: asset.serialNumber,
        name: asset.name,
        availableQty: asset.quantity,
        requestedQuantity: 1,
      },
    ]);
  };

  // ===== حذف عهدة من المختارة =====
  const handleRemoveAsset = (serialNumber: string) => {
    setSelectedAssets((prev) =>
      prev.filter((a) => a.serialNumber !== serialNumber)
    );
  };

  // ===== تغيير الكمية =====
  const handleQtyChange = (serialNumber: string, qty: number) => {
    setSelectedAssets((prev) =>
      prev.map((a) => {
        if (a.serialNumber !== serialNumber) return a;
        const finalQty = qty > a.availableQty ? a.availableQty : qty;
        return {
          ...a,
          requestedQuantity: finalQty,
          warning:
            qty > a.availableQty
              ? `الكمية المتاحة ${a.availableQty} فقط`
              : "",
        };
      })
    );
  };

  // ===== تنفيذ الإرجاع =====
  const handleSubmit = async () => {
    if (!employee) {
      setError("يرجى البحث عن موظف أولاً");
      return;
    }
    if (selectedAssets.length === 0) {
      setError("يرجى اختيار عهدة واحدة على الأقل");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const cookies = document.cookie.split(";");
      const userCookie = cookies.find((c) => c.trim().startsWith("user="));
      let createdByUser = "";
      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        createdByUser = userData.ssn;
      }

      const body = selectedAssets.map((a) => ({
        serialNumber: a.serialNumber,
        requestedQuantity: a.requestedQuantity,
      }));

      const res = await fetchWithAuth(
        `/api/operations/return?nationalId=${employee.nationalNumber}&createdByUser=${createdByUser}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        setError("فشل تنفيذ العملية — حاول مرة أخرى");
        return;
      }

      const pdfBlob = await res.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");

      onSuccess();
      onClose();

    } catch {
      setError("حدث خطأ غير متوقع");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="return-overlay" onClick={onClose}>
      <div className="return-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="return-title">عملية إرجاع من موظف</h2>

        {/* ===== قسم الموظف ===== */}
        <div className="return-section">
          <label>الرقم القومي للموظف *</label>
          <div className="return-input-row">
            <input
              type="text"
              value={nationalInput}
              onChange={(e) => {
                setNationalInput(e.target.value);
                setEmployee(null);
                setEmployeeError("");
                setEmployeeAssets([]);
                setSelectedAssets([]);
              }}
              placeholder="أدخل الرقم القومي"
              autoComplete="off"
              onKeyDown={(e) => e.key === "Enter" && handleSearchEmployee()}
            />
            <button
              className="return-search-btn"
              onClick={handleSearchEmployee}
              disabled={searchingEmployee}
            >
              <Search size={16} />
              {searchingEmployee ? "..." : "بحث"}
            </button>
          </div>

          {employee && (
            <div className="return-result-card success">
              <CheckCircle size={16} /> {employee.name} — {employee.building}
            </div>
          )}
          {employeeError && (
            <div className="return-result-card error">
              <XCircle size={16} /> {employeeError}
            </div>
          )}
        </div>

        {/* ===== عهد الموظف ===== */}
        {employeeAssets.length > 0 && (
          <>
            <div className="return-divider" />
            <div className="return-section">
              <label>عهد الموظف — اضغط لاختيار العهدة</label>
              <div className="return-assets-list">
                {employeeAssets.map((asset) => {
                  const isSelected = selectedAssets.some(
                    (a) => a.serialNumber === asset.serialNumber
                  );
                  return (
                    <div
                      key={asset.serialNumber}
                      className={`return-asset-item ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelectAsset(asset)}
                    >
                      <div style={{ flex: 1 }}>
                        <div className="return-asset-name">{asset.name}</div>
                        <div className="return-asset-serial">{asset.serialNumber}</div>
                      </div>
                      <div className="return-asset-qty">
                        الكمية: {asset.quantity}
                      </div>
                      {isSelected && <CheckCircle size={16} color="#0f4c81" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ===== العهد المختارة ===== */}
        {selectedAssets.length > 0 && (
          <>
            <div className="return-divider" />
            <div className="return-section">
              <label>العهد المراد إرجاعها ({selectedAssets.length})</label>
              <div className="return-selected-list">
                {selectedAssets.map((asset) => (
                  <div key={asset.serialNumber} className="return-selected-item">
                    <div style={{ flex: 1 }}>
                      <div className="return-asset-name">{asset.name}</div>
                      <div className="return-asset-serial">{asset.serialNumber}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input
                        type="number"
                        className="return-qty-input"
                        value={asset.requestedQuantity}
                        min={1}
                        onChange={(e) =>
                          handleQtyChange(asset.serialNumber, Number(e.target.value))
                        }
                      />
                      {asset.warning && (
                        <span style={{ fontSize: "12px", color: "#b7770d", display: "flex", alignItems: "center", gap: "4px" }}>
                          <AlertTriangle size={14} /> {asset.warning}
                        </span>
                      )}
                    </div>
                    <button
                      className="return-selected-remove"
                      onClick={() => handleRemoveAsset(asset.serialNumber)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {error && <div className="return-error">{error}</div>}

        <div className="return-actions">
          <button className="btn-cancel" onClick={onClose}>إلغاء</button>
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={submitting || !employee || selectedAssets.length === 0}
          >
            <FileText size={16} />
            {submitting ? "جاري التنفيذ..." : "تنفيذ الإرجاع"}
          </button>
        </div>
      </div>
    </div>
  );
}