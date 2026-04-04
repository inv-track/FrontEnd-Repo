"use client";

import { fetchWithAuth } from "../lib/fetchWithAuth";
import { useState, useEffect } from "react";
import {
  Search,
  X,
  Plus,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import "./assignModal.css";

interface Employee {
  name: string;
  phoneNumber: string;
  nationalNumber: string;
  building: string;
}

interface AssetResult {
  name: string;
  serialNumber: string;
  quantity: number;
  status: string;
  price: number;
}

interface AssetItem {
  serialNumber: string;
  name: string;
  availableQty: number;
  requestedQuantity: number;
  warning?: string;
}

interface AssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssignModal({
  isOpen,
  onClose,
  onSuccess,
}: AssignModalProps) {
  const [allAssets, setAllAssets] = useState<AssetResult[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<AssetResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // ===== Employee States =====
  const [nationalInput, setNationalInput] = useState("");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [employeeError, setEmployeeError] = useState("");
  const [searchingEmployee, setSearchingEmployee] = useState(false);

  // ===== Asset States =====
  const [serialInput, setSerialInput] = useState("");
  const [assetResult, setAssetResult] = useState<AssetResult | null>(null);
  const [assetError, setAssetError] = useState("");
  const [assetQty, setAssetQty] = useState(1);
  const [assets, setAssets] = useState<AssetItem[]>([]);

  // ===== Submit States =====
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  //  جلب كل العهد لما الـ modal يفتح
  useEffect(() => {
    if (isOpen) {
      fetchWithAuth("/api/warehouse", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setAllAssets(Array.isArray(data) ? data : []))
        .catch(() => setAllAssets([]));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ===== البحث عن موظف =====
  const handleSearchEmployee = async () => {
    if (!nationalInput.trim()) return;
    setSearchingEmployee(true);
    setEmployeeError("");
    setEmployee(null);

    try {
      const res = await fetchWithAuth(
        `/api/operations/employee?nationalNumber=${nationalInput}`,
        { credentials: "include" }
      );

      if (!res.ok) {
        setEmployeeError("موظف غير موجود — تأكد من الرقم القومي");
        return;
      }

      const data: Employee = await res.json();
      setEmployee(data);
    } catch {
      setEmployeeError("حدث خطأ أثناء البحث");
    } finally {
      setSearchingEmployee(false);
    }
  };

  // ===== إضافة عهدة للقائمة =====
  const handleAddAsset = () => {
    if (!assetResult) return;

    //  تحقق لو موجودة قبل في القائمة
    const alreadyAdded = assets.find(
      (a) => a.serialNumber === assetResult.serialNumber
    );
    if (alreadyAdded) {
      setAssetError("هذه العهدة مضافة بالفعل");
      return;
    }

    let warning = "";
    let finalQty = assetQty;

    //  Validation الكمية
    if (assetQty > assetResult.quantity) {
      warning = `الكمية المتاحة ${assetResult.quantity} فقط — سيتم الصرف بالكمية المتاحة`;
      finalQty = assetResult.quantity;
    }

    setAssets((prev) => [
      ...prev,
      {
        serialNumber: assetResult.serialNumber,
        name: assetResult.name,
        availableQty: assetResult.quantity,
        requestedQuantity: finalQty,
        warning,
      },
    ]);

    //  Reset
    setSerialInput("");
    setAssetResult(null);
    setAssetError("");
    setAssetQty(1);
    setShowDropdown(false);
  };

  // ===== حذف عهدة من القائمة =====
  const handleRemoveAsset = (serialNumber: string) => {
    setAssets((prev) => prev.filter((a) => a.serialNumber !== serialNumber));
  };

  // ===== تغيير الكمية في القائمة =====
  const handleQtyChange = (serialNumber: string, qty: number) => {
    setAssets((prev) =>
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

  // ===== تنفيذ العملية =====
  const handleSubmit = async () => {
    if (!employee) {
      setError("يرجى البحث عن موظف أولاً");
      return;
    }
    if (assets.length === 0) {
      setError("يرجى إضافة عهدة واحدة على الأقل");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const cookies = document.cookie.split(";");
      const userCookie = cookies.find((c) => c.trim().startsWith("user="));
      let creatbyuser = "";
      if (userCookie) {
        const userData = JSON.parse(
          decodeURIComponent(userCookie.split("=")[1])
        );
        creatbyuser = userData.ssn;
      }

      const body = assets.map((a) => ({
        serialNumber: a.serialNumber,
        requestedQuantity: a.requestedQuantity,
      }));

      const res = await fetchWithAuth(
        `/api/operations/assign?nationalid=${employee.nationalNumber}&creatbyuser=${creatbyuser}`,
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

      //  Reset كامل
      setNationalInput("");
      setEmployee(null);
      setAssets([]);
      setSerialInput("");
      setAssetResult(null);
      setAssetQty(1);
      setError("");

      onSuccess();
      onClose();
    } catch {
      setError("حدث خطأ غير متوقع");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="assign-overlay" onClick={onClose}>
      <div className="assign-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="assign-title">عملية صرف جديدة</h2>

        {/* ===== قسم الموظف ===== */}
        <div className="assign-section">
          <label>الرقم القومي للموظف *</label>
          <div className="assign-input-row">
            <input
              type="text"
              value={nationalInput}
              onChange={(e) => {
                setNationalInput(e.target.value);
                setEmployee(null);
                setEmployeeError("");
              }}
              placeholder="أدخل الرقم القومي"
              autoComplete="off"
              onKeyDown={(e) => e.key === "Enter" && handleSearchEmployee()}
            />
            <button
              className="assign-search-btn"
              onClick={handleSearchEmployee}
              disabled={searchingEmployee}
            >
              <Search size={16} />
              {searchingEmployee ? "..." : "بحث"}
            </button>
          </div>

          {employee && (
            <div className="assign-result-card success">
              <CheckCircle size={16} /> {employee.name} — {employee.building}
            </div>
          )}
          {employeeError && (
            <div className="assign-result-card error">
              <XCircle size={16} /> {employeeError}
            </div>
          )}
        </div>

        <div className="assign-divider" />

        {/* ===== قسم العهد ===== */}
        <div className="assign-section">
          <label>إضافة عهدة *</label>

          <div style={{ position: "relative" }}>
            <div className="assign-add-row">
              <input
                type="text"
                value={serialInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setSerialInput(value);
                  setAssetResult(null);
                  setAssetError("");

                  //  فلترة فورية
                  if (value.trim()) {
                    const filtered = allAssets.filter(
                      (a) =>
                        a.name.toLowerCase().includes(value.toLowerCase()) ||
                        a.serialNumber.toLowerCase().includes(value.toLowerCase())
                    );
                    setFilteredAssets(filtered);
                    setShowDropdown(true);
                  } else {
                    setShowDropdown(false);
                    setFilteredAssets([]);
                  }
                }}
                placeholder="ابحث بالاسم أو الرقم التسلسلي..."
                autoComplete="off"
                onFocus={() => {
                  if (serialInput.trim()) setShowDropdown(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowDropdown(false), 200);
                }}
              />
            </div>

            {/*  الـ Dropdown */}
            {showDropdown && filteredAssets.length > 0 && (
              <div className="asset-dropdown">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.serialNumber}
                    className="asset-dropdown-item"
                    onMouseDown={() => {
                      setSerialInput(asset.name);
                      setAssetResult(asset);
                      setAssetQty(1); //  يبدأ بـ 1 مش بالكمية الكلية
                      setShowDropdown(false);
                      setAssetError("");
                    }}
                  >
                    <span className="asset-dropdown-name">{asset.name}</span>
                    <span className="asset-dropdown-info">
                      {asset.serialNumber} — متاح: {asset.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/*  لما يختار عهدة يظهر تفاصيلها */}
          {assetResult && (
            <div style={{ marginTop: "10px" }}>
              <div className="assign-result-card success">
                <CheckCircle size={16} /> {assetResult.name} — الكمية المتاحة:{" "}
                {assetResult.quantity}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "8px",
                }}
              >
                <label style={{ fontSize: "13px", color: "#444" }}>
                  الكمية:
                </label>
                <input
                  type="number"
                  className="qty-input"
                  value={assetQty}
                  min={1}
                  onChange={(e) => setAssetQty(Number(e.target.value))}
                  style={{ MozAppearance: "textfield" } as React.CSSProperties}
                />
                {/* تحذير لو الكمية أكبر من المتاح */}
                {assetQty > assetResult.quantity && (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#b7770d",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <AlertTriangle size={14} />
                    في المخزن {assetResult.quantity} فقط — سيتم الصرف بالكمية
                    المتاحة
                  </span>
                )}
                <button className="assign-search-btn" onClick={handleAddAsset}>
                  <Plus size={16} />
                  إضافة
                </button>
              </div>
            </div>
          )}

          {assetError && (
            <div className="assign-result-card error" style={{ marginTop: "8px" }}>
              <XCircle size={16} /> {assetError}
            </div>
          )}
        </div>

        {/* ===== قائمة العهد ===== */}
        {assets.length > 0 && (
          <>
            <div className="assign-divider" />
            <div className="assign-section">
              <label>العهد المضافة ({assets.length})</label>
              <div className="assign-assets-list">
                {assets.map((asset) => (
                  <div key={asset.serialNumber} className="assign-asset-item">
                    <div>
                      <div className="asset-name">{asset.name}</div>
                      <div className="asset-serial">{asset.serialNumber}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginRight: "auto",
                      }}
                    >
                      <input
                        type="number"
                        className="qty-input"
                        value={asset.requestedQuantity}
                        min={1}
                        onChange={(e) =>
                          handleQtyChange(
                            asset.serialNumber,
                            Number(e.target.value)
                          )
                        }
                        style={
                          { MozAppearance: "textfield" } as React.CSSProperties
                        }
                      />
                      {asset.warning && (
                        <span
                          className="asset-qty warning"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <AlertTriangle size={14} /> {asset.warning}
                        </span>
                      )}
                    </div>
                    <button
                      className="assign-asset-remove"
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

        {error && <div className="assign-error">{error}</div>}

        {/* ===== Buttons ===== */}
        <div className="assign-actions">
          <button className="btn-cancel" onClick={onClose}>
            إلغاء
          </button>
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={submitting || !employee || assets.length === 0}
          >
            <FileText size={16} />
            {submitting ? "جاري التنفيذ..." : "تنفيذ العملية"}
          </button>
        </div>
      </div>
    </div>
  );
}