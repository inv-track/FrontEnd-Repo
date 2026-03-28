"use client";
import { useState, useEffect } from 'react';
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MainTitle from "../components/mainTitle";
import "./location.css";

interface LocationItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  serialNumber?: string;
  status?: string;
  price?: number;
}

interface Location {
  id: number;
  name: string;
  building: string;
  floor?: string;
  items: number;
  itemsList?: LocationItem[];
}

interface BuildingData {
  name: string;
  floors: { name: string; rooms: { roomName: string }[]; }[];
}

const API_BASE = "/api/Location";
const ASSET_API = "/api/AssetItem";
const getAuthHeaders = () => ({ 'Content-Type': 'application/json' });

export default function LocationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [addLoading, setAddLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [buildingsData, setBuildingsData] = useState<BuildingData[]>([]);

  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [addingBuilding, setAddingBuilding] = useState(false);
  const [addingFloor, setAddingFloor] = useState(false);
  const [addingRoom, setAddingRoom] = useState(false);
  const [newBuildingName, setNewBuildingName] = useState('');
  const [newFloorName, setNewFloorName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');

  const availableBuildings = buildingsData.map(b => b.name);
  const availableFloors = selectedBuilding
    ? (buildingsData.find(b => b.name === selectedBuilding)?.floors || []).map(f => f.name)
    : [];
  const availableRooms = selectedBuilding && selectedFloor
    ? (buildingsData.find(b => b.name === selectedBuilding)?.floors.find(f => f.name === selectedFloor)?.rooms || []).map(r => r.roomName)
    : [];

  useEffect(() => { fetchLocations(); }, []);

  const filteredLocations = locations.filter(loc =>
    loc.name.includes(searchQuery) || loc.building.includes(searchQuery) || (loc.floor && loc.floor.includes(searchQuery))
  );

  const fetchLocations = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`${API_BASE}/GetAllBuildingAndFloorsAndRooms`, { method: 'GET', headers: getAuthHeaders() });
      if (!res.ok) return;
      const data: BuildingData[] = await res.json();
      setBuildingsData(data);
      const parsed: Location[] = [];
      data.forEach((building) => {
        if (!building.floors || building.floors.length === 0) {
          parsed.push({ id: Date.now() + Math.random(), name: building.name, building: building.name, items: 0, itemsList: [] });
        } else {
          building.floors.forEach((floor) => {
            if (!floor.rooms || floor.rooms.length === 0) {
              parsed.push({ id: Date.now() + Math.random(), name: floor.name, building: building.name, floor: floor.name, items: 0, itemsList: [] });
            } else {
              floor.rooms.forEach((room) => {
                parsed.push({ id: Date.now() + Math.random(), name: room.roomName, building: building.name, floor: floor.name, items: 0, itemsList: [] });
              });
            }
          });
        }
      });
      setLocations(parsed);
    } catch (err) { console.error("Error:", err); }
    finally { setFetchLoading(false); }
  };

  // ===== Fetch items for selected location =====
  const fetchLocationItems = async (location: Location) => {
    setItemsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('buildingName', location.building);
      if (location.floor) params.append('floorName', location.floor);
      if (location.name !== location.building && location.name !== location.floor) {
        params.append('roomName', location.name);
      }

      const res = await fetch(`${ASSET_API}/GetAllAssetByLocation?${params.toString()}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!res.ok) return;
      const data = await res.json();

      // API returns { count: number, data: [...] }
      const items: LocationItem[] = (data.data || []).map((asset: any, index: number) => ({
        id: index + 1,
        name: asset.name,
        category: asset.category,
        quantity: asset.quantity,
        serialNumber: asset.serialNumber,
        status: asset.status,
        price: asset.price,
      }));

      const updated = { ...location, items: data.count || items.length, itemsList: items };
      setSelectedLocation(updated);
      setLocations(prev => prev.map(l => l.id === location.id ? updated : l));
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setItemsLoading(false);
    }
  };

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    fetchLocationItems(location);
  };

  const handleAddBuilding = async () => {
    if (!newBuildingName.trim()) return;
    await fetch(`${API_BASE}/AddBuilding`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ name: newBuildingName }) });
    await fetchLocations();
    setSelectedBuilding(newBuildingName);
    setNewBuildingName(''); setAddingBuilding(false);
  };

  const handleAddFloor = async () => {
    if (!newFloorName.trim() || !selectedBuilding) return;
    await fetch(`${API_BASE}/AddFloor`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ floorName: newFloorName, buildingName: selectedBuilding }) });
    await fetchLocations();
    setSelectedFloor(newFloorName);
    setNewFloorName(''); setAddingFloor(false);
  };

  const handleAddRoom = async () => {
    if (!newRoomName.trim() || !selectedBuilding) return;
    await fetch(`${API_BASE}/AddRoom`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ roomName: newRoomName, floorName: selectedFloor || '', buildingName: selectedBuilding, description: '' }) });
    await fetchLocations();
    setSelectedRoom(newRoomName);
    setNewRoomName(''); setAddingRoom(false);
  };

  const handleSaveLocation = async () => {
    if (!selectedBuilding) return;
    setAddLoading(true);
    await fetchLocations();
    setAddLoading(false);
    resetModal();
    setShowAddModal(false);
  };

  const resetModal = () => {
    setSelectedBuilding(''); setSelectedFloor(''); setSelectedRoom('');
    setAddingBuilding(false); setAddingFloor(false); setAddingRoom(false);
    setNewBuildingName(''); setNewFloorName(''); setNewRoomName('');
  };

  const handlePrint = () => {
    if (!selectedLocation) return;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html dir="rtl"><head><title>طباعة العهد - ${selectedLocation.name}</title>
    <style>body{font-family:Arial,sans-serif;padding:24px;direction:rtl;}table{width:100%;border-collapse:collapse;margin-top:24px;}th{background:#0F4C81;color:white;padding:10px 14px;text-align:right;}td{padding:10px 14px;border-bottom:1px solid #E2E8F0;}</style></head>
    <body><h1>${selectedLocation.name}</h1><p>المبنى: ${selectedLocation.building}${selectedLocation.floor ? ' - ' + selectedLocation.floor : ''}</p>
    <p>إجمالي العهد: ${selectedLocation.items}</p>
    <table><thead><tr><th>#</th><th>اسم العهدة</th><th>الفئة</th><th>الكمية</th><th>الحالة</th><th>الرقم التسلسلي</th></th></tr></thead><tbody>
    ${selectedLocation.itemsList?.map((item, i) => `<tr><td>${i+1}</td><td>${item.name}</td><td>${item.category}</td><td>${item.quantity}</td><td>${item.status || ''}</td><td>${item.serialNumber}</td></tr>`).join('') || '<tr><td colspan="5" style="text-align:center">لا توجد عهد</td></tr>'}
    </tbody></table></body></html>`);
    w.document.close(); w.print(); w.close();
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

              {/* Left Panel */}
              <div className="left-box">
                <div className="left-header">
                  <span className="left-title">قائمة المواقع ({locations.length})</span>
                  <button className="add-btn" onClick={() => setShowAddModal(true)}>+</button>
                </div>
                <div className="serch-box">
                  <input type="text" className="search-input" placeholder="بحث...." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  {/* <span className="location-serch-icon"><img src="/icon/magnifier.png" alt="Search" /></span> */}
                </div>
                <div className="locations-list">
                  {fetchLoading ? <p className="empty-list">جاري التحميل...</p>
                    : filteredLocations.length === 0 ? <p className="empty-list">لا توجد نتائج</p>
                    : filteredLocations.map((location) => (
                      <div key={location.id} className={`location-card ${selectedLocation?.id === location.id ? 'location-card--active' : ''}`} onClick={() => handleSelectLocation(location)}>
                        <div className="location-header">
                          <h3 className="location-name">{location.name}</h3>
                          {/* <span className="location-items">{location.items} عهدة</span> */}
                        </div>
                        <p className="location-building">{location.building}{location.floor ? ` - ${location.floor}` : ''}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Right Panel */}
              <div className={`detail-box ${selectedLocation ? 'detail-box--visible' : ''}`}>
                {!selectedLocation ? (
                  <div className="no-selection"><div className="map-icon">📍</div>اختر موقعاً لعرض التفاصيل</div>
                ) : (
                  <div className="detail-content">
                    <button className="back-btn" onClick={() => setSelectedLocation(null)}>← رجوع للقائمة</button>
                    <div className="detail-info-card">
                      <div className="detail-info-header">
                        <div className="detail-icon-wrapper"><img src="/icon/location.png" alt="Location Icon" /></div>
                        <div className="detail-text-content">
                          <h2 className="detail-name">{selectedLocation.name}</h2>
                          <p className="detail-meta">🏢 {selectedLocation.building}{selectedLocation.floor && ` - ${selectedLocation.floor}`} - {selectedLocation.name}</p>
                          <p className="detail-meta">📦 إجمالي العهد: <strong>{selectedLocation.items}</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="items-card">
                      <div className="items-card-header">
                        <h3 className="items-card-title">العهدة المخزنة في هذا الموقع</h3>
                        <button className="btn-print-item" onClick={handlePrint}>
                          <img src="/icon/Printer.png" alt="Print" style={{ width: 16, height: 16 }} /> طباعة العهد
                        </button>
                      </div>
                      {itemsLoading ? (
                        <div className="no-items">جاري تحميل العهد...</div>
                      ) : selectedLocation.itemsList && selectedLocation.itemsList.length > 0 ? (
                        <table className="items-table">
                          <thead>
                            <tr>
                              <th>اسم العهدة</th>
                              <th>الفئة</th>
                              <th>الكمية</th>
                              <th>الحالة</th>
                              <th>الرقم التسلسلي</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedLocation.itemsList.map((item) => (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td><span className="quantity-badge">{item.quantity}</span></td>
                                <td>{item.status || '-'}</td>
                                <td style={{ fontSize: '12px', color: '#94A3B8' }}>{item.serialNumber || '-'}</td>
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => { setShowAddModal(false); resetModal(); }}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <div>
                <h2 className="modal-title">إضافة موقع جديد</h2>
                <p className="modal-subtitle">أدخل بيانات الموقع الجديد</p>
              </div>
              <button className="modal-close-btn" onClick={() => { setShowAddModal(false); resetModal(); }}>✕</button>
            </div>

            {/* المبنى */}
            <label className="modal-label">المبنى *</label>
            {!addingBuilding ? (
              <>
                <select className="modal-input" value={selectedBuilding} onChange={(e) => { setSelectedBuilding(e.target.value); setSelectedFloor(''); setSelectedRoom(''); }}>
                  <option value="">اختر المبنى</option>
                  {availableBuildings.map((b, i) => <option key={`building-${i}`} value={b}>{b}</option>)}
                </select>
                <button className="loc-add-inline-btn" onClick={() => setAddingBuilding(true)}>+ إضافة مبنى جديد</button>
              </>
            ) : (
              <div className="loc-inline-add-row">
                <input className="modal-input" placeholder="اسم المبنى الجديد" value={newBuildingName} onChange={(e) => setNewBuildingName(e.target.value)} autoFocus />
                <div className="loc-inline-btns">
                  <button className="loc-confirm-btn" onClick={handleAddBuilding}>إضافة</button>
                  <button className="loc-cancel-inline-btn" onClick={() => { setAddingBuilding(false); setNewBuildingName(''); }}>✕</button>
                </div>
              </div>
            )}

            {/* الدور */}
            <label className="modal-label">الدور (اختياري)</label>
            {!addingFloor ? (
              <>
                <select className="modal-input" value={selectedFloor} onChange={(e) => { setSelectedFloor(e.target.value); setSelectedRoom(''); }} disabled={!selectedBuilding}>
                  <option value="">اختر الدور</option>
                  {availableFloors.map((f, i) => <option key={`floor-${i}`} value={f}>{f}</option>)}
                </select>
                {selectedBuilding && <button className="loc-add-inline-btn" onClick={() => setAddingFloor(true)}>+ إضافة دور جديد</button>}
              </>
            ) : (
              <div className="loc-inline-add-row">
                <input className="modal-input" placeholder="اسم الدور الجديد" value={newFloorName} onChange={(e) => setNewFloorName(e.target.value)} autoFocus />
                <div className="loc-inline-btns">
                  <button className="loc-confirm-btn" onClick={handleAddFloor}>إضافة</button>
                  <button className="loc-cancel-inline-btn" onClick={() => { setAddingFloor(false); setNewFloorName(''); }}>✕</button>
                </div>
              </div>
            )}

            {/* الغرفة */}
            <label className="modal-label">الغرفة (اختياري)</label>
            {!addingRoom ? (
              <>
                <select className="modal-input" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} disabled={!selectedBuilding}>
                  <option value="">اختر الغرفة</option>
                  {availableRooms.map((r, i) => <option key={`room-${i}`} value={r}>{r}</option>)}
                </select>
                {selectedBuilding && <button className="loc-add-inline-btn" onClick={() => setAddingRoom(true)}>+ إضافة غرفة جديدة</button>}
              </>
            ) : (
              <div className="loc-inline-add-row">
                <input className="modal-input" placeholder="اسم الغرفة الجديدة" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} autoFocus />
                <div className="loc-inline-btns">
                  <button className="loc-confirm-btn" onClick={handleAddRoom}>إضافة</button>
                  <button className="loc-cancel-inline-btn" onClick={() => { setAddingRoom(false); setNewRoomName(''); }}>✕</button>
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => { setShowAddModal(false); resetModal(); }}>إلغاء</button>
              <button className="save-btn" onClick={handleSaveLocation} disabled={addLoading || !selectedBuilding}>
                {addLoading ? 'جاري الحفظ...' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}