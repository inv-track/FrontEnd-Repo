import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MainTitle from "../components/mainTitle";
import AuditorsTable from "./AuditorsTable";


const auditors = [
  {
    id: "1",
    name: "خالد أحمد سالم",
    phone: "01278945612",
    department: "قسم جرد الاصول",
    lastActivity: "2025-10-24 14:30",
    status: "Offline" as const,
  },
  {
    id: "2",
    name: "م. شندو أشرف",
    phone: "01278945612",
    department: "قسم التدقيق المالي",
    lastActivity: "2025-10-23 11:15",
    status: "Active" as const,
  },
];

export default function Editors() {
  return (
    <div className="container">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <Sidebar />

        <main className="main-content">
          {/* Main Title */}
          <MainTitle />

          <AuditorsTable />
        </main>
      </div>
    </div>
  );
}
