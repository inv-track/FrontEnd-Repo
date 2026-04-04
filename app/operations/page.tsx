"use client";

import { fetchWithAuth } from "../lib/fetchWithAuth";
import { useEffect, useState } from "react";
import ReturnModal from "./returnModal";
import TransferModal from "./transferModal";
import { FileOutput, Undo2, ArrowLeftRight } from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MainTitle from "../components/mainTitle";
import AssignModal from "./assignModal";
import "./operations.css";

interface Transaction {
  transactionDate: string;
  notes: string;
  transactionType: string;
  assetItem: string;
}

export default function Operations() {
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth("/api/operations", {
        credentials: "include",
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (!res.ok) throw new Error("فشل تحميل البيانات");

      const data: Transaction[] = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
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
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">
          <MainTitle />

          {/* ===== الازرار  ===== */}
          <div className="add-button-operations">
            <button onClick={() => setIsModalOpen(true)}>
              <FileOutput size={18} />
              عملية صرف
            </button>
            <button onClick={() => setIsTransferModalOpen(true)}>
              <ArrowLeftRight size={18} />
              عملية نقل
            </button>
            <button onClick={() => setIsReturnModalOpen(true)}>
              <Undo2 size={18} />
              عملية إرجاع
            </button>
          </div>

          {/* ===== الجدول ===== */}
          <div className="container-operations">
            <div className="title-table-operations">سجل العمليات</div>

            <div className="table-container-operations">
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
                      <th>نوع العملية</th>
                      <th>العهدة</th>
                      <th>التاريخ</th>
                      <th>ملاحظات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center" }}>
                          لا توجد عمليات
                        </td>
                      </tr>
                    ) : (
                      transactions.map((t, index) => (
                        <tr key={index}>
                          <td>
                            <span
                              className={`badge badge-${t.transactionType === "صرف" ? "assign" : "return"}`}
                            >
                              {t.transactionType}
                            </span>
                          </td>
                          <td>{t.assetItem}</td>
                          <td>{t.transactionDate}</td>
                          <td>{t.notes}</td>
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

      <AssignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchTransactions()}
      />
      <ReturnModal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        onSuccess={() => fetchTransactions()}
      />
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onSuccess={() => fetchTransactions()}
      />
    </div>
  );
}
