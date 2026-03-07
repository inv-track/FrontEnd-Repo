"use client";

import React from "react";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MainTitle from "../components/mainTitle";
import AddAssetModal from "./addAssetModal";
import "./warehouse.css";
import QRModal from "./qrModal";
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

const SEARCH_MODES = [
  { value: "all", label: "جميع العمليات" },
  { value: "serialNumber", label: "الرقم التسلسلي" },
  { value: "name", label: "الاسم" },
  { value: "status", label: "الحالة" },
  { value: "assetType", label: "نوع الأصل" },
  { value: "room", label: "المكان" },
  { value: "category", label: "الفئة" },
];

export default function Warehouse() {
  const [qrModal, setQrModal] = useState<{
    isOpen: boolean;
    serialNumber: string;
    name: string;
  }>({
    isOpen: false,
    serialNumber: "",
    name: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allAssets, setAllAssets] = useState<Asset[]>([]); //  الكل من الـ API
  const [assets, setAssets] = useState<Asset[]>([]); //  المعروض بعد الفلترة
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchMode, setSearchMode] = useState("all"); //  مود البحث

  //  جلب كل البيانات من الـ API
  const fetchAssets = async (serialNumber = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = serialNumber
        ? `/api/warehouse?serialNumber=${serialNumber}`
        : `/api/warehouse`;

      const res = await fetchWithAuth(url, {
        credentials: "include",
        cache: "no-store", 
        headers: {
          "Cache-Control": "no-cache", 
        },
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (!res.ok) throw new Error("فشل تحميل البيانات");

      const data: Asset[] = await res.json();
      const result = Array.isArray(data) ? data : [data];
      setAllAssets(result);
      setAssets(result);
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

  useEffect(() => {
    fetchAssets();
  }, []);

  //  الفلترة بتحصل هنا حسب المود
  const handleSearch = (value: string, mode: string) => {
    if (!value.trim()) {
      setAssets(allAssets); // لو فاضي يرجع الكل
      return;
    }

    const filtered = allAssets.filter((asset) => {
      switch (mode) {
        case "serialNumber":
          //  البحث بالرقم التسلسلي → بيكال الـ API
          return true; // هيتعمل في fetchAssets
        case "status":
          return asset.status.toLowerCase().includes(value.toLowerCase());
        case "category":
          return asset.category.toLowerCase().includes(value.toLowerCase());
        case "room":
          return asset.room.toLowerCase().includes(value.toLowerCase());
        case "assetType":
          return asset.assetType.toLowerCase().includes(value.toLowerCase());
        case "name":
          return asset.name.toLowerCase().includes(value.toLowerCase());
        default:
          return true;
      }
    });

    setAssets(filtered);
  };

  //  لما يغير الـ select
  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value;
    setSearchMode(newMode);
    setSearchValue("");

    //  لو رجع لـ "all" أو غير المود يجيب الكل من الـ API تاني
    if (newMode === "all") {
      fetchAssets(); // بيجيب الكل
    } else {
      setAssets(allAssets); // بيرجع للـ cache المحلي
    }
  };

  //  لما يكتب في الـ input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (searchMode === "serialNumber") {
      // الرقم التسلسلي → مش بيفلتر لحد ما يضغط Enter أو الأيقونة
      return;
    }

    // باقي الأنواع → فلترة فورية
    handleSearch(value, searchMode);
  };

  //  لما يضغط Enter أو أيقونة البحث
  const handleSubmitSearch = () => {
    if (searchMode === "serialNumber") {
      fetchAssets(searchValue); // بيكال الـ API
    } else {
      handleSearch(searchValue, searchMode);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmitSearch();
  };

  return (
    <div className="container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">
          <MainTitle />
          <div className="add-button">
            <button onClick={() => setIsModalOpen(true)}>
              <img src="/icon/plus.svg" alt="plus" />
              اضافة عهدة
            </button>
          </div>
          <div className="container-warehouse">
            <div className="title-table">قائمة العهد في المخزن</div>
            <div className="toolbar">
              <div className="search-box">
                <input
                  type="text"
                  placeholder={
                    searchMode === "serialNumber"
                      ? "ابحث بالرقم التسلسلي..."
                      : searchMode === "status"
                        ? "ابحث بالحالة (جديد / مستعمل)..."
                        : searchMode === "category"
                          ? "ابحث بالفئة..."
                          : searchMode === "room"
                            ? "ابحث بالمكان..."
                            : searchMode === "assetType"
                              ? "ابحث بنوع الأصل..."
                              : searchMode === "name"
                                ? "ابحث بالاسم..."
                                : "بحث..."
                  }
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  disabled={searchMode === "all"} //  لو all مش محتاج بحث
                />
                <span
                  className="search-icon"
                  onClick={handleSubmitSearch}
                  style={{ cursor: "pointer" }}
                >
                  <img src="/icon/search.svg" alt="search" />
                </span>
              </div>

              {/*  الـ Select بيتحكم في مود البحث */}
              <div className="filter-box">
                <select value={searchMode} onChange={handleModeChange}>
                  {SEARCH_MODES.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
                <span className="filter-icon">
                  <img src="/icon/ix_filter.svg" alt="filter" />
                </span>
              </div>
            </div>

            <div className="table-container">
              {loading ? (
                <p style={{ textAlign: "center", padding: "20px" }}>
                  جاري التحميل...
                </p>
              ) : error ? (
                <p
                  style={{ textAlign: "center", color: "red", padding: "20px" }}
                >
                  {error}
                </p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>الحالة</th>
                      <th>السعر</th>
                      <th>الرقم التسلسلي</th>
                      <th>نوع الأصل</th>
                      <th>المكان</th>
                      <th>الفئة</th>
                      <th>الوحدة</th>
                      <th>الكمية</th>
                      <th>QR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: "center" }}>
                          لا توجد بيانات
                        </td>
                      </tr>
                    ) : (
                      assets.map((asset, index) => (
                        <tr key={index}>
                          <td>{asset.name}</td>
                          <td>{asset.status}</td>
                          <td>{asset.price}</td>
                          <td>{asset.serialNumber}</td>
                          <td>{asset.assetType}</td>
                          <td>{asset.room}</td>
                          <td>{asset.category}</td>
                          <td>{asset.unit}</td>
                          <td>{asset.quantity}</td>
                          <td>
                            <img
                              src={`/api/warehouse/qr?code=${asset.serialNumber}`}
                              alt={`QR-${asset.serialNumber}`}
                              className="qr-img"
                              onClick={() =>
                                setQrModal({
                                  isOpen: true,
                                  serialNumber: asset.serialNumber,
                                  name: asset.name,
                                })
                              }
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
      <AddAssetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchAssets()}
      />
      <QRModal
        isOpen={qrModal.isOpen}
        onClose={() =>
          setQrModal({ isOpen: false, serialNumber: "", name: "" })
        }
        serialNumber={qrModal.serialNumber}
        name={qrModal.name}
      />
    </div>
  );
}
