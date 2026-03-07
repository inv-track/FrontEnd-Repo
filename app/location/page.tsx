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

const mockAddLocation = async (data: Omit<Location, 'id' | 'itemsList'>): Promise<Location> => {
  return { ...data, id: Date.now(), itemsList: [] };
};

const mockDeleteItem = async (locationId: number, itemId: number): Promise<void> => {
  console.log('delete item', itemId, 'from location', locationId);
};

export default function Location() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [addLoading, setAddLoading] = useState(false);

  // States for fetching unique buildings and floors from the API
  const [availableBuildings, setAvailableBuildings] = useState<string[]>([]);
  const [availableFloors, setAvailableFloors] = useState<string[]>([]);

  const [newLocation, setNewLocation] = useState({ room: '', floor: '', building: '', description: '', items: 0 });
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: 1 });

  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      name: 'معمل 101',
      building: 'المبنى الرئيسي',
      floor: 'الطابق الأول',
      phone: '01274244766',
      custodian: 'أحمد محمد علي',
      department: 'قسم القراءة',
      items: 15,
      itemsList: [
        { id: 1, name: 'جهاز كمبيوتر محمول Dell', category: 'أجهزة حاسوب', quantity: 1 },
        { id: 2, name: 'شاشة LCD 24 بوصة', category: 'أجهزة عرض', quantity: 2 },
        { id: 3, name: 'طابعة مفاتيح', category: 'أجهزة طباعة', quantity: 3 },
      ]
    },
    {
      id: 2,
      name: 'معمل 102',
      building: 'مبنى تقنية المعلومات',
      custodian: 'أحمد محمد علي',
      department: 'قسم القراءة',
      items: 15,
      itemsList: [
        { id: 4, name: 'سيرفر HP', category: 'أجهزة حاسوب', quantity: 1 },
      ]
    },
    {
      id: 3,
      name: 'معمل 103',
      building: 'مبنى تقنية المعلومات',
      custodian: 'أحمد محمد علي',
      department: 'قسم القراءة',
      items: 15,
      itemsList: []
    },
    {
      id: 4,
      name: 'معمل 104',
      building: 'مبنى تقنية المعلومات',
      custodian: 'أحمد محمد علي',
      department: 'قسم القراءة',
      items: 15,
      itemsList: []
    },
    {
      id: 5,
      name: 'معمل 105',
      building: 'مبنى تقنية المعلومات',
      custodian: 'أحمد محمد علي',
      department: 'قسم القراءة',
      items: 15,
      itemsList: []
    },
  ]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const filteredLocations = locations.filter(loc =>
    loc.name.includes(searchQuery) || loc.building.includes(searchQuery) || (loc.floor && loc.floor.includes(searchQuery))
  );

  const API_BASE = "/api/Location";

  const fetchLocations = async () => {
    try {
      const res = await fetch(`${API_BASE}/GetAllBuildingAndFloorsAndRooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Locations from API:", data);
        // Best-effort parsing of locations if it returns a flat array of rooms or hierarchical
        // The exact mapping will depend on actual output.
        // If data is array of Buildings:
        const parsedLocations: Location[] = [];
        const buildingsSet = new Set<string>();
        const floorsSet = new Set<string>();

        if (Array.isArray(data)) {
          // Flatten standard hierarchical buildings/floors/rooms
          data.forEach((b: any, bIdx: number) => {
            buildingsSet.add(b.name || b.buildingName);
            if (b.floors && Array.isArray(b.floors)) {
              b.floors.forEach((f: any) => {
                floorsSet.add(f.floorName || f.name);
                if (f.rooms && Array.isArray(f.rooms)) {
                  f.rooms.forEach((r: any, rIdx: number) => {
                    parsedLocations.push({
                      id: r.id || Date.now() + Math.random(),
                      name: r.roomName || r.name,
                      building: b.name || b.buildingName,
                      floor: f.floorName || f.name,
                      items: 0,
                      itemsList: [],
                    });
                  });
                }
              });
            } else if (b.roomName) {
              // Flat list returned natively
              buildingsSet.add(b.buildingName);
              floorsSet.add(b.floorName);
              parsedLocations.push({
                id: b.id || Date.now() + Math.random(),
                name: b.roomName,
                building: b.buildingName,
                floor: b.floorName,
                items: 0,
                itemsList: [],
              });
            }
          });
        }

        if (parsedLocations.length > 0) {
          setLocations(parsedLocations);
        }
        setAvailableBuildings(Array.from(buildingsSet));
        setAvailableFloors(Array.from(floorsSet));
      }
    } catch (err) {
      console.error("Error fetching locations", err);
    }
  };

  const handleAddLocation = async () => {
    if (!newLocation.building) return;
    setAddLoading(true);
    try {
      // 1. Optional AddBuilding if user provided a building (either existing or new, API usually ignores duplicate or handles it)
      await fetch(`${API_BASE}/AddBuilding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newLocation.building })
      });

      // 2. Optional AddFloor if floor is provided
      if (newLocation.floor) {
        await fetch(`${API_BASE}/AddFloor`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ floorName: newLocation.floor, buildingName: newLocation.building })
        });
      }

      // 3. Optional AddRoom if room is provided
      if (newLocation.room) {
        await fetch(`${API_BASE}/AddRoom`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomName: newLocation.room,
            description: newLocation.description || "",
            floorName: newLocation.floor || "",
            buildingName: newLocation.building
          })
        });
      }

      // Optimistically add to UI for instant feedback, then refetch
      const created: Location = {
        id: Date.now(),
        name: newLocation.room || newLocation.floor || newLocation.building,
        building: newLocation.building,
        floor: newLocation.floor,
        items: 0,
        itemsList: []
      };

      setLocations(prev => [...prev, created]);
      setNewLocation({ room: '', floor: '', building: '', description: '', items: 0 });
      setShowAddModal(false);

      // Refresh real data
      fetchLocations();
    } catch (err) {
      console.error("Failed to add location", err);
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!selectedLocation) return;
    await mockDeleteItem(selectedLocation.id, itemId);
    const updated = {
      ...selectedLocation,
      items: selectedLocation.items - 1,
      itemsList: selectedLocation.itemsList?.filter(i => i.id !== itemId)
    };
    setSelectedLocation(updated);
    setLocations(prev => prev.map(l => l.id === selectedLocation.id ? updated : l));
  };

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
                  {filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`location-card ${selectedLocation?.id === location.id ? 'location-card--active' : ''}`}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div className="location-header">
                        <h3 className="location-name">{location.name}</h3>
                        <span className="location-items">{location.items} عهدة</span>
                      </div>
                      <p className="location-building">{location.building}</p>
                    </div>
                  ))}
                  {filteredLocations.length === 0 && (
                    <p className="empty-list">لا توجد نتائج</p>
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
                            🏢 المسار الكامل: كلية الهندسة - {selectedLocation.building}
                            {selectedLocation.floor && ` - ${selectedLocation.floor}`} - {selectedLocation.name}
                          </p>
                          {selectedLocation.phone && (
                            <p className="detail-meta">🏢 {selectedLocation.phone}</p>
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
                            {selectedLocation.itemsList.map((item, index) => (
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

            <label className="modal-label">المبنى</label>
            <input
              list="buildings-list"
              className="modal-input"
              placeholder="اكتب اسم المبنى أو اختره"
              value={newLocation.building}
              onChange={(e) => setNewLocation({ ...newLocation, building: e.target.value })}
            />
            <datalist id="buildings-list">
              {availableBuildings.map(b => <option key={b} value={b} />)}
              <option value="المبنى الرئيسي" />
              <option value="مبنى تقنية المعلومات" />
              <option value="مبنى الهندسة" />
              <option value="مبنى العلوم" />
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
              <option value="الطابق الأرضي" />
              <option value="الطابق الأول" />
              <option value="الطابق الثاني" />
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