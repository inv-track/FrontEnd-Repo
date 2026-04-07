"use client";

import { useState, useEffect } from "react";
import AddEmployeeModal from "../employee/AddEmployeeModal";
import styles from "../employee/EmployeeList.module.css";
import Image from "next/image";
import { fetchWithAuth } from "../lib/fetchWithAuth";

type Employee = {
  name: string;
  phoneNumber: string;
  nationalNumber: string;
  building: string;
};

export default function EmployeeList({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadEmployees() {
      try {
        const response = await fetchWithAuth("/api/employee/getAllEmployee", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    loadEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    if (!emp) return false;
    const name = emp.name ?? "";
    const building = emp.building ?? "";
    const nationalNumber = emp.nationalNumber ?? "";
    const q = searchTerm.trim();
    return (
      name.includes(q) || building.includes(q) || nationalNumber.includes(q)
    );
  });

  const handleSelect = (nationalNumber: string) => {
    setSelectedId(nationalNumber);
    onSelect(String(nationalNumber));
  };

  return (
    <div className={styles["employee-list"]}>
      {/* Header */}
      <div className={styles["header"]}>
        <h2 className={styles["title"]}>قائمة الموظفين</h2>
        <Image
          src="/icon/addEmployee.png"
          alt="addEmployee"
          width={20}
          height={20}
          className={styles["add-employee-icon"]}
          onClick={() => setOpen(true)}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Search */}
      <div className={styles["search-container"]}>
        <Image
          className={styles["search-icon"]}
          src="/icon/search.svg"
          alt="search"
          width={20}
          height={20}
        />
        <input
          type="text"
          className={styles["search-input"]}
          placeholder="بحث بالاسم أو المبنى..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* States */}
      {loading && <p className={styles["loading-text"]}>جاري التحميل...</p>}
      {error && <p className={styles["error-text"]}>{error}</p>}

      {/* List */}
      {!loading && !error && (
        <div className={styles["employee"]}>
          <ul className={styles["list"]}>
            {filteredEmployees.map((emp) => (
              <li
                key={emp.nationalNumber}
                className={`${styles["employee-item"]} ${
                  selectedId === emp.nationalNumber ? styles["selected"] : ""
                }`}
                onClick={() => handleSelect(emp.nationalNumber)}
              >
                <div className={styles["name-custody"]}>
                  <span className={styles["employee-name"]}>{emp.name}</span>
                </div>
                <span className={styles["employee-location"]}>
                  {emp.building}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <AddEmployeeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        addEmployee={(emp) =>
          setEmployees((prev) => [emp as Employee, ...prev])
        }
      />
    </div>
  );
}
