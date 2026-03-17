"use client";
import { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MainTitle from "../components/mainTitle";
import "./location.css";

// ===== Types =====
interface LocationItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
}

interface Location {
  id: number;
  name: string;
  building: string;
  floor?: string;
  phone?: string;
  custodian?: string;
  department?: string;
  items: number;
  itemsList?: LocationItem[];
}

// ===== API Base URL — matches app/api/Location/[action]/route.ts =====
const API_BASE = "/api/Location";

// ===== Helper: headers =====
const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
});

export default function Location() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [addLoading, setAddLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [availableBuildings, setAvailableBuildings] = useState<string[]>([]);
  const [availableFloors, setAvailableFloors] = useState<string[]>([]);

  const [newLocation, setNewLocation] = useState({
    room: '',
    floor: '',
    building: '',
    description: '',
    items: 0,
  });

  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 1 });

  // ✅ Start with empty array — data comes from API
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const filteredLocations = locations.filter(loc =>
    loc.name.includes(searchQuery) ||
    loc.building.includes(searchQuery) ||
    (loc.floor && loc.floor.includes(searchQuery))
  );

  // ===== Fetch All Locations from API =====
  const fetchLocations = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`${API_BASE}/GetAllBuildingAndFloorsAndRooms`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        console.error("Failed to fetch locations, status:", res.status);
        return;
      }

      const data = await res.json();
      console.log("API Response:", data);

      const parsedLocations: Location[] = [];
      const buildingsSet = new Set<string>();
      const floorsSet = new Set<string>();

      // ✅ Parse the real API response shape:
      // [ { name: "building", floors: [ { name: "floor", rooms: [ { roomName: "room" } ] } ] } ]
      if (Array.isArray(data)) {
        data.forEach((building: any) => {
          const buildingName = building.name || '';
          if (buildingName) buildingsSet.add(buildingName);

          const floors = building.floors || [];
          floors.forEach((floor: any) => {
            const floorName = floor.name || '';
            if (floorName) floorsSet.add(floorName);

            const rooms = floor.rooms || [];
            rooms.forEach((room: any) => {
              parsedLocations.push({
                id: Date.now() + Math.random(),
                name: room.roomName || 'غرفة بدون اسم',
                building: buildingName,
                floor: floorName,
                items: 0,
                itemsList: [],
              });
            });
          });
        });
      }

      setLocations(parsedLocations);
      setAvailableBuildings(Array.from(buildingsSet));
      setAvailableFloors(Array.from(floorsSet));

    } catch (err) {
      console.error("Error fetching locations:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  // ===== Add Location (Building + Floor + Room) =====
  const handleAddLocation = async () => {
    if (!newLocation.building) return;
    setAddLoading(true);

    try {
      // 1. Add Building
      await fetch(`${API_BASE}/AddBuilding`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: newLocation.building }),
      });

      // 2. Add Floor (if provided)
      if (newLocation.floor) {
        await fetch(`${API_BASE}/AddFloor`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            name: newLocation.floor,
            buildingName: newLocation.building,
          }),
        });
      }

      // 3. Add Room (if provided)
      if (newLocation.room) {
        await fetch(`${API_BASE}/AddRoom`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            roomName: newLocation.room,
            description: newLocation.description || '',
            floorName: newLocation.floor || '',
            buildingName: newLocation.building,
          }),
        });
      }

      // Reset form and close modal
      setNewLocation({ room: '', floor: '', building: '', description: '', items: 0 });
      setShowAddModal(false);

      // Refresh data from API
      await fetchLocations();

    } catch (err) {
      console.error("Failed to add location:", err);
    } finally {
      setAddLoading(false);
    }
  };

  // ===== Delete Item (mock — no API endpoint yet) =====
  const handleDeleteItem = async (itemId: number) => {
    if (!selectedLocation) return;
    const updated = {
      ...selectedLocation,
      items: selectedLocation.items - 1,
      itemsList: selectedLocation.itemsList?.filter(i => i.id !== itemId),
    };
    setSelectedLocation(updated);
    setLocations(prev => prev.map(l => l.id === selectedLocation.id ? updated : l));
  };

  // ===== Add Item (local only — no API endpoint yet) =====
  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !selectedLocation) return;
    const item: LocationItem = {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      quantity: newItem.quantity,
    };
    const updated = {
      ...selectedLocation,
      items: selectedLocation.items + 1,
      itemsList: [...(selectedLocation.itemsList || []), item],
    };
    setSelectedLocation(updated);
    setLocations(prev => prev.map(l => l.id === selectedLocation.id ? updated : l));
    setNewItem({ name: '', category: '', quantity: 1 });
    setShowAddItemModal(false);
  };

  // ===== Print =====
  const handlePrint = () => {
    if (!selectedLocation) return;
    const printContent = `
      <html dir="rtl">
        <head>
          <title>طباعة العهد - ${selectedLocation.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; direction: rtl; }
            h1 { font-size: 22px; margin-bottom: 4px; }
            p { color: #555; margin: 4px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 24px; }
            th { background: #0F4C81; color: white; padding: 10px 14px; text-align: right; font-size: 14px; }
            td { padding: 10px 14px; border-bottom: 1px solid #E2E8F0; font-size: 14px; }
            tr:last-child td { border-bottom: none; }
            .badge { display: inline-block; background: #0F4C81; color: white; padding: 3px 12px; border-radius: 4px; font-size: 13px; margin-top: 8px; }
          </style>
        </head>
        <body>
          <h1>${selectedLocation.name}</h1>
          <p>🏢 ${selectedLocation.building}${selectedLocation.floor ? ` - ${selectedLocation.floor}` : ''}</p>
          ${selectedLocation.phone ? `<p>📞 ${selectedLocation.phone}</p>` : ''}
          ${selectedLocation.custodian ? `<p>👤 المسؤول: ${selectedLocation.custodian} — ${selectedLocation.department}</p>` : ''}
          <span class="badge">إجمالي العهد: ${selectedLocation.items}</span>
          <table>
            <thead>
              <tr><th>#</th><th>اسم العهدة</th><th>الفئة</th><th>الكمية</th></tr>
            </thead>
            <tbody>
              ${selectedLocation.itemsList && selectedLocation.itemsList.length > 0
                ? selectedLocation.itemsList.map((item, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${item.name}</td>
                      <td>${item.category}</td>
                      <td>${item.quantity}</td>
                    </tr>`).join('')
                : '<tr><td colspan="4" style="text-align:center; color:#999;">لا توجد عهد مخزنة</td></tr>'
              }
            </tbody>
          </table>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="container">

      <Header />

      <div className="main-layout">
        <Sidebar />

        <main className="main-content">
          <MainTitle />

          <div className="location-wrapper">
            <div className="grid">

              {/* ========== Left Section ========== */}
              <div className="left-box">
                <div className="left-header">
                  <span className="left-title">قائمة المواقع ({locations.length})</span>
                  <button className="add-btn" onClick={() => setShowAddModal(true)}>+</button>
                </div>

                <div className="search-box">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="بحث...."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="search-icon">
                    <img src="/icon/magnifier.png" alt="Search" />
                  </span>
                </div>

                <div className="locations-list">
                  {fetchLoading ? (
                    <p className="empty-list">جاري التحميل...</p>
                  ) : filteredLocations.length === 0 ? (
                    <p className="empty-list">لا توجد نتائج</p>
                  ) : (
                    filteredLocations.map((location) => (
                      <div
                        key={location.id}
                        className={`location-card ${selectedLocation?.id === location.id ? 'location-card--active' : ''}`}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="location-header">
                          <h3 className="location-name">{location.name}</h3>
                          <span className="location-items">{location.items} عهدة</span>
                        </div>
                        <p className="location-building">
                          {location.building}{location.floor ? ` - ${location.floor}` : ''}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* ========== Right Section ========== */}
              <div className={`detail-box ${selectedLocation ? 'detail-box--visible' : ''}`}>

                {!selectedLocation ? (
                  <div className="no-selection">
                    <div className="map-icon">📍</div>
                    اختر موقعاً لعرض التفاصيل
                  </div>
                ) : (
                  <div className="detail-content">

                    <button className="back-btn" onClick={() => setSelectedLocation(null)}>
                      ← رجوع للقائمة
                    </button>

                    {/* Info Card */}
                    <div className="detail-info-card">
                      <div className="detail-info-header">
                        <div className="detail-icon-wrapper">
                          <img src="/icon/location.png" alt="Location Icon" />
                        </div>
                        <div className="detail-text-content">
                          <h2 className="detail-name">{selectedLocation.name}</h2>
                          <p className="detail-meta">
                            🏢 المسار الكامل: {selectedLocation.building}
                            {selectedLocation.floor && ` - ${selectedLocation.floor}`}
                            {` - ${selectedLocation.name}`}
                          </p>
                          {selectedLocation.phone && (
                            <p className="detail-meta">📞 {selectedLocation.phone}</p>
                          )}
                        </div>
                      </div>

                      {selectedLocation.custodian && (
                        <div className="custodian-row">
                          <span className="custodian-label">العهدة المسؤول</span>
                          <span className="custodian-value">
                            👤 {selectedLocation.custodian} — {selectedLocation.department}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Items Table */}
                    <div className="items-card">
                      <div className="items-card-header">
                        <h3 className="items-card-title">العهدة المخزنة في هذا الموقع</h3>
                        <button className="btn-print-item" onClick={handlePrint}>
                          <img src="/icon/Printer.png" alt="Print" style={{ width: 16, height: 16 }} /> طباعة العهد
                        </button>
                      </div>

                      {selectedLocation.itemsList && selectedLocation.itemsList.length > 0 ? (
                        <table className="items-table">
                          <thead>
                            <tr>
                              <th>اسم العهدة</th>
                              <th>الفئة</th>
                              <th>الكمية</th>
                              <th>الاجراءات</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedLocation.itemsList.map((item) => (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>
                                  <span className="quantity-badge">{item.quantity}</span>
                                </td>
                                <td className="actions-cell">
                                  <button
                                    className="btn-icon btn-delete"
                                    title="حذف"
                                    onClick={() => handleDeleteItem(item.id)}
                                  >
                                    <img src="/icon/delete.png" alt="Delete" />
                                  </button>
                                  <button className="btn-icon btn-edit" title="تعديل">
                                    <img src="/icon/edit.png" alt="Edit" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="no-items">لا توجد عهدة مخزنة في هذا الموقع</div>
                      )}
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* ========== Add Location Modal ========== */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h2 className="modal-title">إضافة موقع جديد</h2>
                <p className="modal-subtitle">أدخل بيانات الموقع الجديد</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <label className="modal-label">المبنى *</label>
            <input
              list="buildings-list"
              className="modal-input"
              placeholder="اكتب اسم المبنى أو اختره"
              value={newLocation.building}
              onChange={(e) => setNewLocation({ ...newLocation, building: e.target.value })}
            />
            <datalist id="buildings-list">
              {availableBuildings.map(b => <option key={b} value={b} />)}
            </datalist>

            <label className="modal-label">الطابق (اختياري)</label>
            <input
              list="floors-list"
              className="modal-input"
              placeholder="اكتب اسم الطابق أو اختره"
              value={newLocation.floor}
              onChange={(e) => setNewLocation({ ...newLocation, floor: e.target.value })}
            />
            <datalist id="floors-list">
              {availableFloors.map(f => <option key={f} value={f} />)}
            </datalist>

            <label className="modal-label">الغرفة / المعمل (اختياري)</label>
            <input
              type="text"
              className="modal-input"
              placeholder="مثال: معمل 106"
              value={newLocation.room}
              onChange={(e) => setNewLocation({ ...newLocation, room: e.target.value })}
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>إلغاء</button>
              <button
                className="save-btn"
                onClick={handleAddLocation}
                disabled={addLoading || !newLocation.building}
              >
                {addLoading ? 'جاري الحفظ...' : 'حفظ الموقع'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========== Add Item Modal ========== */}
      {showAddItemModal && (
        <div className="modal-overlay" onClick={() => setShowAddItemModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h2 className="modal-title">إضافة عهدة جديدة</h2>
                <p className="modal-subtitle">إضافة عهدة إلى {selectedLocation?.name}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowAddItemModal(false)}>✕</button>
            </div>

            <label className="modal-label">اسم العهدة</label>
            <input
              type="text"
              className="modal-input"
              placeholder="مثال: لاب توب Dell"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />

            <label className="modal-label">الفئة</label>
            <select
              className="modal-input"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
              <option value="">اختر الفئة</option>
              <option value="أجهزة حاسوب">أجهزة حاسوب</option>
              <option value="أجهزة عرض">أجهزة عرض</option>
              <option value="أجهزة طباعة">أجهزة طباعة</option>
              <option value="أجهزة شبكات">أجهزة شبكات</option>
              <option value="أثاث">أثاث</option>
              <option value="أخرى">أخرى</option>
            </select>

            <label className="modal-label">الكمية</label>
            <input
              type="number"
              className="modal-input"
              min={1}
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddItemModal(false)}>إلغاء</button>
              <button
                className="save-btn"
                onClick={handleAddItem}
                disabled={!newItem.name || !newItem.category}
              >
                إضافة
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
