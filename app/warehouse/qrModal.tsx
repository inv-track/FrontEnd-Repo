"use client";

import "./qrModal.css";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  serialNumber: string;
  name: string;
}

export default function QRModal({
  isOpen,
  onClose,
  serialNumber,
  name,
}: QRModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const content = `
    <html>
      <head>
        <title>طباعة QR - ${name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          @page { size: 6cm 7cm; margin: 0; }
          body {
            width: 6cm; height: 7cm;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            font-family: Arial, sans-serif;
            direction: rtl; padding: 4px;
          }
          h2 { font-size: 11px; font-weight: bold; margin-bottom: 2px; text-align: center; }
          p  { font-size: 9px; color: #555; margin-bottom: 4px; text-align: center; }
          img { width: 5cm; height: 5cm; }
        </style>
      </head>
      <body>
        <h2>${name}</h2>
        <p>الرقم التسلسلي: ${serialNumber}</p>
        <img src="/api/warehouse/qr?code=${serialNumber}" />
        <script>window.onload = () => { window.print(); window.close(); }</script>
      </body>
    </html>
  `;

    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
  };

  return (
    <div className="qr-overlay" onClick={onClose}>
      <div className="qr-box" onClick={(e) => e.stopPropagation()}>
        {/* زرار الإغلاق */}
        <button className="qr-close" onClick={onClose}>
          ✕
        </button>

        {/* الاسم والرقم التسلسلي */}
        <div className="qr-info">
          <h2 className="qr-name">{name}</h2>
          <p className="qr-serial">الرقم التسلسلي: {serialNumber}</p>
        </div>

        {/* صورة الـ QR */}
        <img
          src={`/api/warehouse/qr?code=${serialNumber}`}
          alt={`QR-${serialNumber}`}
          className="qr-image-large"
        />

        {/* زرار الطباعة */}
        <button className="qr-print-btn" onClick={handlePrint}>
          طباعة
        </button>
      </div>
    </div>
  );
}
