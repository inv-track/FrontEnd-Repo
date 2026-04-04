"use client";

import { useState, useEffect } from "react";
import { Search, X, FileText, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { fetchWithAuth } from "../lib/fetchWithAuth";
import "./transferModal.css";

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

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TransferModal({ isOpen, onClose, onSuccess }: TransferModalProps) {
  // ===== From Employee States =====
  const [fromNationalInput, setFromNationalInput] = useState("");
  const [fromEmployee, setFromEmployee] = useState<Employee | null>(null);
  const [fromEmployeeError, setFromEmployeeError] = useState("");
  const [searchingFrom, setSearchingFrom] = useState(false);
  const [employeeAssets, setEmployeeAssets] = useState<EmployeeAsset[]>([]);

  // ===== To Employee States =====
  const [toNationalInput, setToNationalInput] = useState("");
  const [toEmployee, setToEmployee] = useState<Employee | null>(null);
  const [toEmployeeError, setToEmployeeError] = useState("");
  const [searchingTo, setSearchingTo] = useState(false);

  // ===== Selected Assets =====
  const [selectedAssets, setSelectedAssets] = useState<SelectedAsset[]>([]);

  // ===== Submit States =====
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setFromNationalInput("");
      setFromEmployee(null);
      setFromEmployeeError("");
      setEmployeeAssets([]);
      setToNationalInput("");
      setToEmployee(null);
      setToEmployeeError("");
      setSelectedAssets([]);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ===== البحث عن الموظف المُرسِل =====
  const handleSearchFrom = async () => {
    if (!fromNationalInput.trim()) return;
    setSearchingFrom(true);
    setFromEmployeeError("");
    setFromEmployee(null);
    setEmployeeAssets([]);
    setSelectedAssets([]);

    try {
      const empRes = await fetchWithAuth(
        `/api/operations/employee?nationalNumber=${fromNationalInput}`,
        { credentials: "include" }
      );

      if (!empRes.ok) {
        setFromEmployeeError("موظف غير موجود — تأكد من الرقم القومي");
        return;
      }

      const empData: Employee = await empRes.json();
      setFromEmployee(empData);

      //  جلب عهد الموظف
      const assetsRes = await fetchWithAuth(
        `/api/operations/employeeassets?nationalNumber=${fromNationalInput}`,
        { credentials: "include" }
      );

      if (assetsRes.ok) {
        const assetsData: EmployeeAsset[] = await assetsRes.json();
        setEmployeeAssets(Array.isArray(assetsData) ? assetsData : []);
      }

    } catch {
      setFromEmployeeError("حدث خطأ أثناء البحث");
    } finally {
      setSearchingFrom(false);
    }
  };

  // ===== البحث عن الموظف المُستقبِل =====
  const handleSearchTo = async () => {
    if (!toNationalInput.trim()) return;
    setSearchingTo(true);
    setToEmployeeError("");
    setToEmployee(null);

    try {
      const res = await fetchWithAuth(
        `/api/operations/employee?nationalNumber=${toNationalInput}`,
        { credentials: "include" }
      );

      if (!res.ok) {
        setToEmployeeError("موظف غير موجود — تأكد من الرقم القومي");
        return;
      }

      const data: Employee = await res.json();

      //  تأكد إنه مش نفس الموظف المُرسِل
      if (data.nationalNumber === fromEmployee?.nationalNumber) {
        setToEmployeeError("لا يمكن النقل لنفس الموظف");
        return;
      }

      setToEmployee(data);

    } catch {
      setToEmployeeError("حدث خطأ أثناء البحث");
    } finally {
      setSearchingTo(false);
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

  // ===== حذف عهدة =====
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

  // ===== تنفيذ النقل =====
  const handleSubmit = async () => {
    if (!fromEmployee) {
      setError("يرجى البحث عن الموظف المُرسِل أولاً");
      return;
    }
    if (!toEmployee) {
      setError("يرجى البحث عن الموظف المُستقبِل أولاً");
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
        `/api/operations/transfer?fromNationalId=${fromEmployee.nationalNumber}&toNationalId=${toEmployee.nationalNumber}&createdByUser=${createdByUser}`,
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
    <div className="transfer-overlay" onClick={onClose}>
      <div className="transfer-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="transfer-title">عملية نقل بين موظفين</h2>

        {/* ===== الموظف المُرسِل ===== */}
        <div className="transfer-section">
          <label>الرقم القومي للموظف المُرسِل *</label>
          <div className="transfer-input-row">
            <input
              type="text"
              value={fromNationalInput}
              onChange={(e) => {
                setFromNationalInput(e.target.value);
                setFromEmployee(null);
                setFromEmployeeError("");
                setEmployeeAssets([]);
                setSelectedAssets([]);
              }}
              placeholder="أدخل الرقم القومي"
              autoComplete="off"
              onKeyDown={(e) => e.key === "Enter" && handleSearchFrom()}
            />
            <button
              className="transfer-search-btn"
              onClick={handleSearchFrom}
              disabled={searchingFrom}
            >
              <Search size={16} />
              {searchingFrom ? "..." : "بحث"}
            </button>
          </div>

          {fromEmployee && (
            <div className="transfer-result-card success">
              <CheckCircle size={16} /> {fromEmployee.name} — {fromEmployee.building}
            </div>
          )}
          {fromEmployeeError && (
            <div className="transfer-result-card error">
              <XCircle size={16} /> {fromEmployeeError}
            </div>
          )}
        </div>

        {/* ===== عهد الموظف المُرسِل ===== */}
        {employeeAssets.length > 0 && (
          <>
            <div className="transfer-divider" />
            <div className="transfer-section">
              <label>عهد الموظف — اضغط لاختيار العهدة</label>
              <div className="transfer-assets-list">
                {employeeAssets.map((asset) => {
                  const isSelected = selectedAssets.some(
                    (a) => a.serialNumber === asset.serialNumber
                  );
                  return (
                    <div
                      key={asset.serialNumber}
                      className={`transfer-asset-item ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelectAsset(asset)}
                    >
                      <div style={{ flex: 1 }}>
                        <div className="transfer-asset-name">{asset.name}</div>
                        <div className="transfer-asset-serial">{asset.serialNumber}</div>
                      </div>
                      <div className="transfer-asset-qty">
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
            <div className="transfer-divider" />
            <div className="transfer-section">
              <label>العهد المراد نقلها ({selectedAssets.length})</label>
              <div className="transfer-selected-list">
                {selectedAssets.map((asset) => (
                  <div key={asset.serialNumber} className="transfer-selected-item">
                    <div style={{ flex: 1 }}>
                      <div className="transfer-asset-name">{asset.name}</div>
                      <div className="transfer-asset-serial">{asset.serialNumber}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input
                        type="number"
                        className="transfer-qty-input"
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
                      className="transfer-selected-remove"
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

        <div className="transfer-divider" />

        {/* ===== الموظف المُستقبِل ===== */}
        <div className="transfer-section">
          <label>الرقم القومي للموظف المُستقبِل *</label>
          <div className="transfer-input-row">
            <input
              type="text"
              value={toNationalInput}
              onChange={(e) => {
                setToNationalInput(e.target.value);
                setToEmployee(null);
                setToEmployeeError("");
              }}
              placeholder="أدخل الرقم القومي"
              autoComplete="off"
              onKeyDown={(e) => e.key === "Enter" && handleSearchTo()}
            />
            <button
              className="transfer-search-btn"
              onClick={handleSearchTo}
              disabled={searchingTo}
            >
              <Search size={16} />
              {searchingTo ? "..." : "بحث"}
            </button>
          </div>

          {toEmployee && (
            <div className="transfer-result-card success">
              <CheckCircle size={16} /> {toEmployee.name} — {toEmployee.building}
            </div>
          )}
          {toEmployeeError && (
            <div className="transfer-result-card error">
              <XCircle size={16} /> {toEmployeeError}
            </div>
          )}
        </div>

        {error && <div className="transfer-error">{error}</div>}

        <div className="transfer-actions">
          <button className="btn-cancel" onClick={onClose}>إلغاء</button>
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={submitting || !fromEmployee || !toEmployee || selectedAssets.length === 0}
          >
            <FileText size={16} />
            {submitting ? "جاري التنفيذ..." : "تنفيذ النقل"}
          </button>
        </div>
      </div>
    </div>
  );
}