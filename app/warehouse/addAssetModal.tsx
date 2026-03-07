"use client";

import { useEffect, useState } from "react";
import "./addAssetModal.css";
import { fetchWithAuth } from "../lib/fetchWithAuth";

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
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
}: AddAssetModalProps) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [floors, setFloors] = useState<Floor[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const [form, setForm] = useState<AssetForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //  جلب البيانات لما الـ modal يفتح
  useEffect(() => {
    if (isOpen) {
      //  المباني
      fetchWithAuth("/api/warehouse/locations", {
        method: "POST",
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
    }
  }, [isOpen]);

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
      const res = await fetchWithAuth("/api/warehouse/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formToSend),
      });

      if (!res.ok) throw new Error("فشل إضافة العهدة");

      setForm(EMPTY_FORM);
      setSelectedBuilding("");
      setSelectedFloor("");
      setFloors([]);
      setRooms([]);
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
        <h2 className="modal-title">إضافة عهدة جديدة</h2>

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

          <div className="modal-field">
            <label>الرقم التسلسلي *</label>
            <input
              name="serialNumber"
              value={form.serialNumber}
              onChange={handleChange}
              placeholder="الرقم التسلسلي"
              autoComplete="off"
            />
          </div>

          <div className="modal-field">
            <label>نوع الأصل *</label>
            <input
              name="assetType"
              value={form.assetType}
              onChange={handleChange}
              placeholder="نوع الأصل"
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

          <div className="modal-field">
            <label>الوحدة *</label>
            <input
              name="unit"
              value={form.unit}
              onChange={handleChange}
              placeholder="الوحدة"
              autoComplete="off"
            />
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
            {loading ? "جاري الإضافة..." : "إضافة"}
          </button>
        </div>
      </div>
    </div>
  );
}
