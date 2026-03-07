module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/employee/employeeById/[nationalNumber]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function GET(req, context) {
    try {
        // ✅ قراءة الرقم القومي
        const { nationalNumber } = await context.params;
        // ✅ قراءة التوكن
        const cookieStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const tokenCookie = (await cookieStore).get("token");
        if (!tokenCookie) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "No token"
            }, {
                status: 401
            });
        }
        const token = tokenCookie.value;
        const baseUrl = "http://invtrackapi.runasp.net/api/Employee";
        /* =======================================
       1️⃣ بيانات الموظف (إجباري)
    ======================================== */ const empRes = await fetch(`${baseUrl}/GetEmployeeByNationalNumber?NationalNumber=${nationalNumber}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!empRes.ok) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Employee not found"
            }, {
                status: 404
            });
        }
        const empData = await empRes.json();
        /* =======================================
       2️⃣ العهد (اختياري)
    ======================================== */ const assetsRes = await fetch(`${baseUrl}/GetAllAssetItemToEmployee?NationalNumber=${nationalNumber}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const rawAssets = assetsRes.ok ? await assetsRes.json() : [];
        const assets = Array.isArray(rawAssets) ? rawAssets.map((a)=>({
                item: a.name,
                qty: a.quantity,
                lastTransfer: a.transactionDate
            })) : [];
        /* =======================================
       3️⃣ العمليات (اختياري)
    ======================================== */ const opsRes = await fetch(`${baseUrl}/GetEmployeeAssetHistory?NationalNumber=${nationalNumber}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const rawOps = opsRes.ok ? await opsRes.json() : [];
        let operations = [];
        // لو رجعت Array
        if (Array.isArray(rawOps)) {
            operations = rawOps.map((o)=>({
                    type: o.transactionType,
                    item: o.name ?? "",
                    qty: o.quantity ?? 0,
                    date: o.transactionDate
                }));
        } else if (rawOps && typeof rawOps === "object") {
            const single = rawOps;
            operations = [
                {
                    type: single.transactionType,
                    item: single.name ?? "",
                    qty: single.quantity ?? 0,
                    date: single.transactionDate
                }
            ];
        }
        /* =======================================
       رجوع البيانات للفرونت
    ======================================== */ return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: nationalNumber,
            name: empData.name,
            building: empData.building,
            phone: empData.phoneNumber,
            nationalId: empData.nationalNumber,
            avatarUrl: "/icon/lucide_user-round.svg",
            assets,
            operations
        });
    } catch (error) {
        console.error("SERVER ERROR:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Internal Server Error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f3ce9db3._.js.map