"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./AddEmployeeModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  addEmployee: (emp: unknown) => void;
}

type Room = { roomName: string };
type Floor = { name: string; rooms: Room[] };
type Building = { name: string; floors: Floor[] };
type JobTitle = { jobName: string };

interface FormErrors {
  name?: string;
  ssn?: string;
  phoneNumber?: string;
  jobTitel?: string;
  building?: string;
  floor?: string;
  room?: string;
}

const Required = () => (
  <span style={{ color: "#ef4444", marginRight: "2px" }}>*</span>
);

function validate(
  name: string,
  ssn: string,
  phoneNumber: string,
  jobTitel: string,
  selectedBuilding: Building | null,
  selectedFloor: Floor | null,
  selectedRoom: string,
): FormErrors {
  const errors: FormErrors = {};
  if (!name.trim()) errors.name = "الاسم مطلوب";
  if (!ssn.trim()) errors.ssn = "الرقم القومي مطلوب";
  else if (ssn.length < 14) errors.ssn = "الرقم القومي يجب أن يكون 14 رقم";
  if (!phoneNumber.trim()) errors.phoneNumber = "رقم الهاتف مطلوب";
  else if (!/^01[0-9]{9}$/.test(phoneNumber))
    errors.phoneNumber = "رقم هاتف غير صحيح";
  if (!jobTitel) errors.jobTitel = "الوظيفة مطلوبة";
  if (!selectedBuilding) errors.building = "المبنى مطلوب";
  if (selectedBuilding && !selectedFloor) errors.floor = "الدور مطلوب";
  if (selectedFloor && !selectedRoom) errors.room = "الغرفة مطلوبة";
  return errors;
}

export default function AddEmployeeModal({
  isOpen,
  onClose,
  addEmployee,
}: Props) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null,
  );
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [name, setName] = useState("");
  const [ssn, setSsn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitel, setJobTitel] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchData = async () => {
      try {
        const [buildingsRes, jobsRes] = await Promise.all([
          fetch("/api/employee/getBuildings", { credentials: "include" }),
          fetch("/api/employee/getJobTitles", { credentials: "include" }),
        ]);
        if (!buildingsRes.ok || !jobsRes.ok) throw new Error("Failed");
        const [buildingsData, jobsData] = await Promise.all([
          buildingsRes.json(),
          jobsRes.json(),
        ]);
        setBuildings(buildingsData);
        setJobTitles(jobsData);
      } catch {
        alert("فشل تحميل البيانات ❌");
      }
    };
    fetchData();
  }, [isOpen]);

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate(
      name,
      ssn,
      phoneNumber,
      jobTitel,
      selectedBuilding,
      selectedFloor,
      selectedRoom,
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/employee/addEmployee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ssn,
          phoneNumber,
          jobTitel,
          roomName: selectedRoom,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      addEmployee({
        name,
        building: selectedBuilding?.name,
        phone: phoneNumber,
        nationalNumber: ssn,
      });
      setName("");
      setSsn("");
      setPhoneNumber("");
      setJobTitel("");
      setSelectedBuilding(null);
      setSelectedFloor(null);
      setSelectedRoom("");
      setErrors({});
      onClose();
    } catch {
      alert("حدث خطأ أثناء الإضافة ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>إضافة موظف جديد</h2>
            <p className={styles.subtitle}>أدخل بيانات الموظف الجديد</p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* الاسم */}
          <div className={styles.field}>
            <label className={styles.label}>
              الاسم الكامل <Required />
            </label>
            <input
              className={`${styles.input} ${errors.name ? styles.error : ""}`}
              placeholder="مثال: أحمد محمد علي"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError("name");
              }}
            />
            {errors.name && (
              <span className={styles.errorMsg}>{errors.name}</span>
            )}
          </div>

          {/* الرقم القومي */}
          <div className={styles.field}>
            <label className={styles.label}>
              الرقم القومي <Required />
            </label>
            <input
              className={`${styles.input} ${errors.ssn ? styles.error : ""}`}
              placeholder="14 رقم"
              value={ssn}
              onChange={(e) => {
                setSsn(e.target.value);
                clearError("ssn");
              }}
              dir="ltr"
              maxLength={14}
            />
            {errors.ssn && (
              <span className={styles.errorMsg}>{errors.ssn}</span>
            )}
          </div>

          {/* رقم الهاتف */}
          <div className={styles.field}>
            <label className={styles.label}>
              رقم الهاتف <Required />
            </label>
            <input
              className={`${styles.input} ${errors.phoneNumber ? styles.error : ""}`}
              placeholder="01xxxxxxxxx"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                clearError("phoneNumber");
              }}
              dir="ltr"
            />
            {errors.phoneNumber && (
              <span className={styles.errorMsg}>{errors.phoneNumber}</span>
            )}
          </div>

          {/* الوظيفة */}
          <div className={styles.field}>
            <label className={styles.label}>
              الوظيفة <Required />
            </label>
            <select
              className={`${styles.select} ${errors.jobTitel ? styles.error : ""}`}
              value={jobTitel}
              onChange={(e) => {
                setJobTitel(e.target.value);
                clearError("jobTitel");
              }}
            >
              <option value="" disabled>
                اختر الوظيفة
              </option>
              {jobTitles.map((j, i) => (
                <option key={`job-${i}-${j.jobName}`} value={j.jobName}>
                  {j.jobName}
                </option>
              ))}
            </select>
            {errors.jobTitel && (
              <span className={styles.errorMsg}>{errors.jobTitel}</span>
            )}
          </div>

          {/* المبنى */}
          <div className={styles.field}>
            <label className={styles.label}>
              المبنى <Required />
            </label>
            <select
              className={`${styles.select} ${errors.building ? styles.error : ""}`}
              value={selectedBuilding?.name || ""}
              onChange={(e) => {
                const b = buildings.find((b) => b.name === e.target.value);
                setSelectedBuilding(b || null);
                setSelectedFloor(null);
                setSelectedRoom("");
                clearError("building");
              }}
            >
              <option value="" disabled>
                اختر المبنى
              </option>
              {buildings.map((b, i) => (
                <option key={`building-${i}-${b.name}`} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            {errors.building && (
              <span className={styles.errorMsg}>{errors.building}</span>
            )}
          </div>

          {/* الدور */}
          {selectedBuilding && (
            <div className={styles.field}>
              <label className={styles.label}>
                الدور <Required />
              </label>
              <select
                className={`${styles.select} ${errors.floor ? styles.error : ""}`}
                value={selectedFloor?.name || ""}
                onChange={(e) => {
                  const f = selectedBuilding.floors.find(
                    (f) => f.name === e.target.value,
                  );
                  setSelectedFloor(f || null);
                  setSelectedRoom("");
                  clearError("floor");
                }}
              >
                <option value="" disabled>
                  اختر الدور
                </option>
                {selectedBuilding.floors.map((f, i) => (
                  <option key={`floor-${i}-${f.name}`} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
              {errors.floor && (
                <span className={styles.errorMsg}>{errors.floor}</span>
              )}
            </div>
          )}

          {/* الغرفة */}
          {selectedFloor && (
            <div className={styles.field}>
              <label className={styles.label}>
                الغرفة <Required />
              </label>
              <select
                className={`${styles.select} ${errors.room ? styles.error : ""}`}
                value={selectedRoom}
                onChange={(e) => {
                  setSelectedRoom(e.target.value);
                  clearError("room");
                }}
              >
                <option value="" disabled>
                  اختر الغرفة
                </option>
                {selectedFloor.rooms.map((r, i) => (
                  <option key={`room-${i}-${r.roomName}`} value={r.roomName}>
                    {r.roomName}
                  </option>
                ))}
              </select>
              {errors.room && (
                <span className={styles.errorMsg}>{errors.room}</span>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "جاري الإضافة..." : "إضافة الموظف"}
          </button>
        </div>
      </div>
    </div>
  );
}
