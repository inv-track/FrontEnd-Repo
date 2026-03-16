"use client";

import { useEffect, useState } from "react";
import "./addAssetModal.css";
import { fetchWithAuth } from "../lib/fetchWithAuth";

interface Asset {
  name: string;
  status: string;
  price: number;
  serialNumber: string;
  assetType: string;
  room: string;
  category: string;
  unit: string;
  quantity: number;
}
interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: Asset | null;
}

interface AssetForm {
  name: string;
  status: string;
  price: number | "";
  serialNumber: string;
  assetType: string;
  room: string;
  category: string;
  unit: string;
  quantity: number | "";
}

interface Room {
  roomName: string;
}

interface Floor {
  name: string;
  rooms: Room[];
}

interface Building {
  name: string;
  floors: Floor[];
}

const EMPTY_FORM: AssetForm = {
  name: "",
  status: "",
  price: "",
  serialNumber: "",
  assetType: "",
  room: "",
  category: "",
  unit: "",
  quantity: "",
};

export default function AddAssetModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
}: AddAssetModalProps) {
  const [assetTypes, setAssetTypes] = useState<{ typeName: string }[]>([]);
  const [newAssetType, setNewAssetType] = useState("");
  const [addingAssetType, setAddingAssetType] = useState(false);
  const [showAddAssetType, setShowAddAssetType] = useState(false);

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [floors, setFloors] = useState<Floor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const [units, setUnits] = useState<{ name: string }[]>([]);
  const [newUnit, setNewUnit] = useState("");
  const [addingUnit, setAddingUnit] = useState(false);
  const [showAddUnit, setShowAddUnit] = useState(false);

  const [form, setForm] = useState<AssetForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //  جلب البيانات لما الـ modal يفتح
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name,
        status: editData.status,
        price: editData.price,
        serialNumber: editData.serialNumber,
        assetType: editData.assetType,
        room: editData.room,
        category: editData.category,
        unit: editData.unit,
        quantity: editData.quantity,
      });
    } else {
      setForm(EMPTY_FORM);
    }

    if (isOpen) {
      //  جلب أنواع الأصول
      fetchWithAuth("/api/warehouse/assettypes", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setAssetTypes(Array.isArray(data) ? data : []))
        .catch(() => setAssetTypes([]));

      //  المباني
      fetchWithAuth("/api/warehouse/locations", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setBuildings(Array.isArray(data) ? data : []))
        .catch(() => setBuildings([]));

      //   الفئات
      fetchWithAuth("/api/warehouse/categories", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setCategories(Array.isArray(data) ? data : []))
        .catch(() => setCategories([]));

      //   الوحدات
      fetchWithAuth("/api/warehouse/units", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setUnits(Array.isArray(data) ? data : []))
        .catch(() => setUnits([]));
    }
  }, [editData, isOpen]);

  //  لما يختار مبنى
  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const buildingName = e.target.value;
    setSelectedBuilding(buildingName);
    setSelectedFloor("");
    setRooms([]);
    setForm((prev) => ({ ...prev, room: "" }));

    const building = buildings.find((b) => b.name === buildingName);
    setFloors(building ? building.floors : []);
  };

  //  لما يختار دور
  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const floorName = e.target.value;
    setSelectedFloor(floorName);
    setForm((prev) => ({ ...prev, room: "" }));

    const floor = floors.find((f) => f.name === floorName);
    setRooms(floor ? floor.rooms : []);
  };

  //  إضافة نوع اصل جديد
  const handleAddAssetType = async () => {
    if (!newAssetType.trim()) return;
    setAddingAssetType(true);
    try {
      const res = await fetchWithAuth("/api/warehouse/assettypes", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ typeName: newAssetType }),
      });

      if (!res.ok) throw new Error("فشل");

      setAssetTypes((prev) => [...prev, { typeName: newAssetType }]);
      setForm((prev) => ({ ...prev, assetType: newAssetType }));
      setNewAssetType("");
      setShowAddAssetType(false);
    } catch {
      // handle error
    } finally {
      setAddingAssetType(false);
    }
  };

  //  إضافة فئة جديدة
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setAddingCategory(true);
    try {
      const res = await fetchWithAuth("/api/warehouse/categories", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: newCategory }),
      });

      if (!res.ok) throw new Error("فشل");

      //  أضف الفئة الجديدة للقائمة فوراً
      setCategories((prev) => [...prev, { name: newCategory }]);
      setForm((prev) => ({ ...prev, category: newCategory }));
      setNewCategory("");
      setShowAddCategory(false);
    } catch {
      // handle error
    } finally {
      setAddingCategory(false);
    }
  };

  const handleAddUnit = async () => {
    if (!newUnit.trim()) return;
    setAddingUnit(true);
    try {
      const res = await fetchWithAuth("/api/warehouse/units", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUnit }),
      });

      if (!res.ok) throw new Error("فشل");

      setUnits((prev) => [...prev, { name: newUnit }]);
      setForm((prev) => ({ ...prev, unit: newUnit }));
      setNewUnit("");
      setShowAddUnit(false);
    } catch {
      // handle error
    } finally {
      setAddingUnit(false);
    }
  };

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.status ||
      form.price === "" ||
      !form.serialNumber ||
      !form.assetType ||
      !form.room ||
      !form.category ||
      !form.unit
    ) {
      setError("يرجى ملء جميع الحقول المطلوبة *");
      return;
    }

    setLoading(true);
    setError(null);
    const formToSend = {
      ...form,
      quantity: form.quantity === "" ? 1 : form.quantity,
    };
    try {
      const url = editData ? "/api/warehouse/update" : "/api/warehouse/add";
      const method = editData ? "PUT" : "POST";
      const res = await fetchWithAuth(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formToSend),
      });

      if (!res.ok)
        throw new Error(editData ? "فشل تعديل العهدة" : "فشل إضافة العهدة");

      setForm(EMPTY_FORM);
      setSelectedBuilding("");
      setSelectedFloor("");
      setFloors([]);
      setRooms([]);
      setShowAddCategory(false);
      setNewCategory("");
      setShowAddAssetType(false);
      setNewAssetType("");
      setShowAddUnit(false);
      setNewUnit("");
      onSuccess();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("حدث خطأ غير متوقع");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {editData ? "تعديل عهدة" : "إضافة عهدة جديدة"}
        </h2>
        {error && <p className="modal-error">{error}</p>}

        <div className="modal-grid">
          <div className="modal-field">
            <label>الاسم *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="اسم العهدة"
              autoComplete="off"
            />
          </div>

          <div className="modal-field">
            <label>الرقم التسلسلي *</label>
            <input
              name="serialNumber"
              value={form.serialNumber}
              onChange={handleChange}
              placeholder="الرقم التسلسلي"
              autoComplete="off"
              disabled={!!editData}
              style={{
                opacity: editData ? 0.6 : 1,
                cursor: editData ? "not-allowed" : "text",
              }}
            />
          </div>

          <div className="modal-field">
            <label>الفئة *</label>
            <div className="filter-select">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">اختر الفئة</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {!showAddCategory ? (
              <button
                type="button"
                onClick={() => setShowAddCategory(true)}
                className="add-category-btn"
              >
                + إضافة فئة جديدة
              </button>
            ) : (
              <div className="new-category-row">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="اسم الفئة الجديدة"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={addingCategory}
                  className="btn-add"
                >
                  {addingCategory ? "..." : "إضافة"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategory("");
                  }}
                  className="btn-close"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="modal-field">
            <label>نوع الأصل *</label>
            <div className="filter-select">
              <select
                name="assetType"
                value={form.assetType}
                onChange={handleChange}
              >
                <option value="">اختر نوع الأصل</option>
                {assetTypes.map((t) => (
                  <option key={t.typeName} value={t.typeName}>
                    {t.typeName}
                  </option>
                ))}
              </select>
            </div>

            {!showAddAssetType ? (
              <button
                type="button"
                onClick={() => setShowAddAssetType(true)}
                className="add-category-btn"
              >
                + إضافة نوع جديد
              </button>
            ) : (
              <div className="new-category-row">
                <input
                  type="text"
                  value={newAssetType}
                  onChange={(e) => setNewAssetType(e.target.value)}
                  placeholder="اسم النوع الجديد"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={handleAddAssetType}
                  disabled={addingAssetType}
                  className="btn-add"
                >
                  {addingAssetType ? "..." : "إضافة"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddAssetType(false);
                    setNewAssetType("");
                  }}
                  className="btn-close"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="modal-field">
            <label>الحالة *</label>
            <div className="filter-select">
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="">اختر الحالة</option>
                <option value="new">جديد</option>
                <option value="used">مستعمل</option>
                {/* <option value="damaged">تالف</option> */}
              </select>
            </div>
          </div>

          <div className="modal-field">
            <label>السعر *</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="السعر"
              autoComplete="off"
            />
          </div>

          {/* المبنى */}
          <div className="modal-field">
            <label>المبنى *</label>
            <div className="filter-select">
              <select value={selectedBuilding} onChange={handleBuildingChange}>
                <option value="">اختر المبنى</option>
                {buildings.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-field">
            <label>الوحدة *</label>
            <div className="filter-select">
              <select name="unit" value={form.unit} onChange={handleChange}>
                <option value="">اختر الوحدة</option>
                {units.map((u) => (
                  <option key={u.name} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {!showAddUnit ? (
              <button
                type="button"
                onClick={() => setShowAddUnit(true)}
                className="add-category-btn"
              >
                + إضافة وحدة جديدة
              </button>
            ) : (
              <div className="new-category-row">
                <input
                  type="text"
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  placeholder="اسم الوحدة الجديدة"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={handleAddUnit}
                  disabled={addingUnit}
                  className="btn-add"
                >
                  {addingUnit ? "..." : "إضافة"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddUnit(false);
                    setNewUnit("");
                  }}
                  className="btn-close"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* الدور */}
          <div className="modal-field">
            <label>الدور *</label>
            <div className="filter-select">
              <select
                value={selectedFloor}
                onChange={handleFloorChange}
                disabled={!selectedBuilding}
              >
                <option value="">اختر الدور</option>
                {floors.map((f) => (
                  <option key={f.name} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-field">
            <label>الكمية</label>
            <input
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              placeholder="الكمية (افتراضي: 1)"
              autoComplete="off"
            />
          </div>

          {/* الغرفة */}
          <div className="modal-field">
            <label>الغرفة *</label>
            <div className="filter-select">
              <select
                name="room"
                value={form.room}
                onChange={handleChange}
                disabled={!selectedFloor}
              >
                <option value="">اختر الغرفة</option>
                {rooms.map((r) => (
                  <option key={r.roomName} value={r.roomName}>
                    {r.roomName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            إلغاء
          </button>
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? editData
                ? "جاري التعديل..."
                : "جاري الإضافة..."
              : editData
                ? "حفظ التعديلات"
                : "إضافة"}
          </button>
        </div>
      </div>
    </div>
  );
}
