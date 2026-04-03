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

interface BuildingData {
  name: string;
  floors: { name: string; rooms: { roomName: string }[]; }[];
}

type ViewLevel = 'buildings' | 'floors' | 'rooms' | 'items';

const API_BASE = "/api/Location";
const ASSET_API = "/api/AssetItem";
const getAuthHeaders = () => ({ 'Content-Type': 'application/json' });

export default function LocationPage() {
  const [buildingsData, setBuildingsData] = useState<BuildingData[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(false);

  const [viewLevel, setViewLevel] = useState<ViewLevel>('buildings');
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<{ name: string; rooms: { roomName: string }[] } | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [items, setItems] = useState<LocationItem[]>([]);
  const [itemsCount, setItemsCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  // Modal states
  const [selectedBuildingModal, setSelectedBuildingModal] = useState('');
  const [selectedFloorModal, setSelectedFloorModal] = useState('');
  const [selectedRoomModal, setSelectedRoomModal] = useState('');
  const [addingBuilding, setAddingBuilding] = useState(false);
  const [addingFloor, setAddingFloor] = useState(false);
  const [addingRoom, setAddingRoom] = useState(false);
  const [newBuildingName, setNewBuildingName] = useState('');
  const [newFloorName, setNewFloorName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');

  const availableBuildings = buildingsData.map(b => b.name);
  const availableFloors = selectedBuildingModal
    ? (buildingsData.find(b => b.name === selectedBuildingModal)?.floors || []).map(f => f.name)
    : [];
  const availableRooms = selectedBuildingModal && selectedFloorModal
    ? (buildingsData.find(b => b.name === selectedBuildingModal)?.floors.find(f => f.name === selectedFloorModal)?.rooms || []).map(r => r.roomName)
    : [];

  useEffect(() => { fetchLocations(); }, []);

  const fetchLocations = async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`${API_BASE}/GetAllBuildingAndFloorsAndRooms`, { method: 'GET', headers: getAuthHeaders() });
      if (!res.ok) return;
      const data: BuildingData[] = await res.json();
      setBuildingsData(data);
    } catch (err) { console.error("Error:", err); }
    finally { setFetchLoading(false); }
  };

  const fetchItems = async (building: string, floor: string, room: string) => {
    setItemsLoading(true);
    setItems([]);
    try {
      const params = new URLSearchParams();
      params.append('buildingName', building);
      if (floor) params.append('floorName', floor);
      if (room) params.append('roomName', room);
      const res = await fetch(`${ASSET_API}/GetAllAssetByLocation?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
      if (!res.ok) return;
      const data = await res.json();
      const parsed: LocationItem[] = (data.data || []).map((asset: any, index: number) => ({
        id: index + 1, name: asset.name, category: asset.category,
        quantity: asset.quantity, serialNumber: asset.serialNumber,
        status: asset.status, price: asset.price,
      }));
      setItems(parsed);
      setItemsCount(data.count || parsed.length);
    } catch (err) { console.error("Error fetching items:", err); }
    finally { setItemsLoading(false); }
  };

  // ===== Navigation =====
  const handleSelectBuilding = (building: BuildingData) => {
    setSelectedBuilding(building);
    setSelectedFloor(null);
    setSelectedRoom('');
    setItems([]);
    setSearchQuery('');
    if (building.floors && building.floors.length > 0) {
      setViewLevel('floors');
    } else {
      setViewLevel('items');
      fetchItems(building.name, '', '');
    }
  };

  const handleSelectFloor = (floor: { name: string; rooms: { roomName: string }[] }) => {
    setSelectedFloor(floor);
    setSelectedRoom('');
    setItems([]);
    setSearchQuery('');
    if (floor.rooms && floor.rooms.length > 0) {
      setViewLevel('rooms');
    } else {
      setViewLevel('items');
      fetchItems(selectedBuilding!.name, floor.name, '');
    }
  };

  const handleSelectRoom = (room: string) => {
    setSelectedRoom(room);
    setItems([]);
    setSearchQuery('');
    setViewLevel('items');
    fetchItems(selectedBuilding!.name, selectedFloor?.name || '', room);
  };

  const goBack = () => {
    if (viewLevel === 'items') {
      if (selectedRoom) { setSelectedRoom(''); setViewLevel('rooms'); }
      else if (selectedFloor) { setSelectedFloor(null); setViewLevel('floors'); }
      else { setSelectedBuilding(null); setViewLevel('buildings'); }
    } else if (viewLevel === 'rooms') { setSelectedFloor(null); setViewLevel('floors'); }
    else if (viewLevel === 'floors') { setSelectedBuilding(null); setViewLevel('buildings'); }
    setItems([]); setSearchQuery('');
  };

  // ===== Filter current list =====
  const filteredBuildings = buildingsData.filter(b => b.name.includes(searchQuery));
  const filteredFloors = selectedBuilding?.floors.filter(f => f.name.includes(searchQuery)) || [];
  const filteredRooms = selectedFloor?.rooms.filter(r => r.roomName.includes(searchQuery)) || [];
  const filteredItems = items.filter(i => i.name.includes(searchQuery) || i.category.includes(searchQuery));

  // ===== Modal handlers =====
  const handleAddBuilding = async () => {
    if (!newBuildingName.trim()) return;
    await fetch(`${API_BASE}/AddBuilding`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ name: newBuildingName }) });
    await fetchLocations();
    setSelectedBuildingModal(newBuildingName);
    setNewBuildingName(''); setAddingBuilding(false);
  };

  const handleAddFloor = async () => {
    if (!newFloorName.trim() || !selectedBuildingModal) return;
    await fetch(`${API_BASE}/AddFloor`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ floorName: newFloorName, buildingName: selectedBuildingModal }) });
    await fetchLocations();
    setSelectedFloorModal(newFloorName);
    setNewFloorName(''); setAddingFloor(false);
  };

  const handleAddRoom = async () => {
    if (!newRoomName.trim() || !selectedBuildingModal) return;
    await fetch(`${API_BASE}/AddRoom`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ roomName: newRoomName, floorName: selectedFloorModal || '', buildingName: selectedBuildingModal, description: '' }) });
    await fetchLocations();
    setSelectedRoomModal(newRoomName);
    setNewRoomName(''); setAddingRoom(false);
  };

  const handleSaveLocation = async () => {
    if (!selectedBuildingModal) return;
    setAddLoading(true);
    await fetchLocations();
    setAddLoading(false);
    resetModal();
    setShowAddModal(false);
  };

  const resetModal = () => {
    setSelectedBuildingModal(''); setSelectedFloorModal(''); setSelectedRoomModal('');
    setAddingBuilding(false); setAddingFloor(false); setAddingRoom(false);
    setNewBuildingName(''); setNewFloorName(''); setNewRoomName('');
  };

  const handlePrint = () => {
    const w = window.open('', '_blank');
    if (!w) return;
    const title = selectedRoom || selectedFloor?.name || selectedBuilding?.name || '';
    w.document.write(`<html dir="rtl"><head><title>طباعة العهد - ${title}</title>
    <style>body{font-family:Arial,sans-serif;padding:24px;direction:rtl;}table{width:100%;border-collapse:collapse;margin-top:24px;}th{background:#0F4C81;color:white;padding:10px 14px;text-align:right;}td{padding:10px 14px;border-bottom:1px solid #E2E8F0;}</style></head>
    <body><h1>${title}</h1><p>إجمالي العهد: ${itemsCount}</p>
    <table><thead><tr><th>#</th><th>اسم العهدة</th><th>الفئة</th><th>الكمية</th><th>الحالة</th><th>الرقم التسلسلي</th></tr></thead><tbody>
    ${items.map((item, i) => `<tr><td>${i+1}</td><td>${item.name}</td><td>${item.category}</td><td>${item.quantity}</td><td>${item.status||''}</td><td>${item.serialNumber||''}</td></tr>`).join('') || '<tr><td colspan="6" style="text-align:center">لا توجد عهد</td></tr>'}
    </tbody></table></body></html>`);
    w.document.close(); w.print(); w.close();
  };

  // ===== Breadcrumb =====
  const renderBreadcrumb = () => (
    <div className="loc-breadcrumb">
      <span className={viewLevel === 'buildings' ? 'loc-bc-active' : 'loc-bc-link'} onClick={() => { setViewLevel('buildings'); setSelectedBuilding(null); setSelectedFloor(null); setSelectedRoom(''); setItems([]); }}>
        المباني
      </span>
      {selectedBuilding && <>
        <span className="loc-bc-sep">←</span>
        <span className={viewLevel === 'floors' ? 'loc-bc-active' : 'loc-bc-link'} onClick={() => { setViewLevel('floors'); setSelectedFloor(null); setSelectedRoom(''); setItems([]); }}>
          {selectedBuilding.name}
        </span>
      </>}
      {selectedFloor && <>
        <span className="loc-bc-sep">←</span>
        <span className={viewLevel === 'rooms' ? 'loc-bc-active' : 'loc-bc-link'} onClick={() => { setViewLevel('rooms'); setSelectedRoom(''); setItems([]); }}>
          {selectedFloor.name}
        </span>
      </>}
      {selectedRoom && <>
        <span className="loc-bc-sep">←</span>
        <span className="loc-bc-active">{selectedRoom}</span>
      </>}
    </div>
  );

  return (
    <div className="container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">
          <MainTitle />
          <div className="location-wrapper">
            <div className="grid">

              {/* ========== Left Panel ========== */}
              <div className="left-box">
                <div className="left-header">
                  <span className="left-title">
                    {viewLevel === 'buildings' && `المباني (${buildingsData.length})`}
                    {viewLevel === 'floors' && `الأدوار (${selectedBuilding?.floors.length || 0})`}
                    {viewLevel === 'rooms' && `الغرف (${selectedFloor?.rooms.length || 0})`}
                    {viewLevel === 'items' && `العهد (${itemsCount})`}
                  </span>
                  <button className="add-btn" onClick={() => setShowAddModal(true)}>+</button>
                </div>

                {/* Breadcrumb */}
                {viewLevel !== 'buildings' && renderBreadcrumb()}

                {/* Search */}
                <div className="loc-search-wrapper">
                  <input type="text" className="loc-search-input" placeholder="بحث..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <span className="loc-search-icon">🔍</span>
                </div>

                {/* Back button */}
                {viewLevel !== 'buildings' && (
                  <button className="loc-back-btn" onClick={goBack}>← رجوع</button>
                )}

                {/* List */}
                <div className="locations-list">
                  {fetchLoading ? (
                    <p className="empty-list">جاري التحميل...</p>
                  ) : viewLevel === 'buildings' ? (
                    filteredBuildings.length === 0 ? <p className="empty-list">لا توجد مباني</p> :
                    filteredBuildings.map((b, i) => (
                      <div key={i} className="location-card" onClick={() => handleSelectBuilding(b)}>
                        <div className="location-header">
                          <h3 className="location-name">{b.name}</h3>
                          <span className="location-items">{b.floors?.length || 0} دور</span>
                        </div>
                      </div>
                    ))
                  ) : viewLevel === 'floors' ? (
                    filteredFloors.length === 0 ? <p className="empty-list">لا توجد أدوار</p> :
                    filteredFloors.map((f, i) => (
                      <div key={i} className="location-card" onClick={() => handleSelectFloor(f)}>
                        <div className="location-header">
                          <h3 className="location-name">{f.name}</h3>
                          <span className="location-items">{f.rooms?.length || 0} غرفة</span>
                        </div>
                      </div>
                    ))
                  ) : viewLevel === 'rooms' ? (
                    filteredRooms.length === 0 ? <p className="empty-list">لا توجد غرف</p> :
                    filteredRooms.map((r, i) => (
                      <div key={i} className="location-card" onClick={() => handleSelectRoom(r.roomName)}>
                        <div className="location-header">
                          <h3 className="location-name">{r.roomName}</h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-items-side">
                      <p className="empty-list">العهد معروضة على اليمين</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ========== Right Panel ========== */}
              <div className={`detail-box ${viewLevel === 'items' ? 'detail-box--visible' : ''}`}>
                {viewLevel !== 'items' ? (
                  <div className="no-selection">
                    <div className="map-icon">📍</div>
                    اختر موقعاً لعرض العهد
                  </div>
                ) : (
                  <div className="detail-content">
                    <div className="detail-info-card">
                      <div className="detail-info-header">
                        <div className="detail-icon-wrapper">
                          <img src="/icon/location.png" alt="Location Icon" />
                        </div>
                        <div className="detail-text-content">
                          <h2 className="detail-name">{selectedRoom || selectedFloor?.name || selectedBuilding?.name}</h2>
                          <p className="detail-meta">
                            🏢 {selectedBuilding?.name}
                            {selectedFloor && ` - ${selectedFloor.name}`}
                            {selectedRoom && ` - ${selectedRoom}`}
                          </p>
                          <p className="detail-meta">📦 إجمالي العهد: <strong>{itemsCount}</strong></p>
                        </div>
                      </div>
                    </div>

                    <div className="items-card">
                      <div className="items-card-header">
                        <h3 className="items-card-title">العهدة المخزنة</h3>
                        <button className="btn-print-item" onClick={handlePrint}>
                          <img src="/icon/Printer.png" alt="Print" style={{ width: 16, height: 16 }} /> طباعة
                        </button>
                      </div>

                      {itemsLoading ? (
                        <div className="no-items">جاري تحميل العهد...</div>
                      ) : items.length > 0 ? (
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
                            {items.map((item) => (
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
                        <div className="no-items">لا توجد عهدة في هذا الموقع</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* ========== Add Modal ========== */}
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

            <label className="modal-label">المبنى *</label>
            {!addingBuilding ? (
              <>
                <select className="modal-input" value={selectedBuildingModal} onChange={(e) => { setSelectedBuildingModal(e.target.value); setSelectedFloorModal(''); setSelectedRoomModal(''); }}>
                  <option value="">اختر المبنى</option>
                  {availableBuildings.map((b, i) => <option key={`b-${i}`} value={b}>{b}</option>)}
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

            <label className="modal-label">الدور (اختياري)</label>
            {!addingFloor ? (
              <>
                <select className="modal-input" value={selectedFloorModal} onChange={(e) => { setSelectedFloorModal(e.target.value); setSelectedRoomModal(''); }} disabled={!selectedBuildingModal}>
                  <option value="">اختر الدور</option>
                  {availableFloors.map((f, i) => <option key={`f-${i}`} value={f}>{f}</option>)}
                </select>
                {selectedBuildingModal && <button className="loc-add-inline-btn" onClick={() => setAddingFloor(true)}>+ إضافة دور جديد</button>}
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

            <label className="modal-label">الغرفة (اختياري)</label>
            {!addingRoom ? (
              <>
                <select className="modal-input" value={selectedRoomModal} onChange={(e) => setSelectedRoomModal(e.target.value)} disabled={!selectedBuildingModal}>
                  <option value="">اختر الغرفة</option>
                  {availableRooms.map((r, i) => <option key={`r-${i}`} value={r}>{r}</option>)}
                </select>
                {selectedBuildingModal && <button className="loc-add-inline-btn" onClick={() => setAddingRoom(true)}>+ إضافة غرفة جديدة</button>}
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
              <button className="save-btn" onClick={handleSaveLocation} disabled={addLoading || !selectedBuildingModal}>
                {addLoading ? 'جاري الحفظ...' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}