(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/sidebar.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "sidebar-module__XUuFKW__active",
  "logout-btn": "sidebar-module__XUuFKW__logout-btn",
  "menu-text": "sidebar-module__XUuFKW__menu-text",
  "menu-toggle": "sidebar-module__XUuFKW__menu-toggle",
  "nav-icon": "sidebar-module__XUuFKW__nav-icon",
  "nav-link": "sidebar-module__XUuFKW__nav-link",
  "nav-menu": "sidebar-module__XUuFKW__nav-menu",
  "nav-text": "sidebar-module__XUuFKW__nav-text",
  "sidebar": "sidebar-module__XUuFKW__sidebar",
  "slideDown": "sidebar-module__XUuFKW__slideDown",
});
}),
"[project]/app/lib/fetchWithAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchWithAuth",
    ()=>fetchWithAuth
]);
async function fetchWithAuth(url, options) {
    const res = await fetch(url, {
        ...options,
        credentials: "include"
    });
    if (res.status === 401) {
        alert("انتهت الجلسة، برجاء تسجيل الدخول مرة أخرى");
        window.location.href = "/login";
        throw new Error("Session expired");
    }
    return res;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/sidebar.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$fetchWithAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/fetchWithAuth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Sidebar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const links = [
        {
            href: "/home",
            icon: "fa-solid fa-house",
            text: "الرئيسية"
        },
        {
            href: "/operations",
            icon: "fa-solid fa-rotate",
            text: "العمليات"
        },
        {
            href: "/warehouse",
            icon: "fa-solid fa-box",
            text: "العهد/المخازن"
        },
        {
            href: "/employee",
            icon: "fa-solid fa-users",
            text: "الموظفين"
        },
        {
            href: "/location",
            icon: "fa-solid fa-location-dot",
            text: "المكان"
        },
        {
            href: "/editors",
            icon: "fa-solid fa-user-tie",
            text: "المجردين"
        }
    ];
    const toggleMenu = ()=>{
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = ()=>{
        setIsMenuOpen(false);
    };
    const handleLogout = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$fetchWithAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/logout", {
            method: "POST",
            credentials: "include"
        });
        window.location.href = "/login";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["sidebar"],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["menu-toggle"]} ${isMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["active"] : ""}`,
                onClick: toggleMenu,
                children: "القائمة"
            }, void 0, false, {
                fileName: "[project]/app/components/sidebar.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["nav-menu"]} ${isMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["active"] : ""}`,
                children: [
                    links.map((link)=>{
                        const isActive = pathname === link.href;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: link.href,
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["nav-link"]} ${isActive ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["active"] : ""}`,
                            onClick: closeMenu,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["nav-icon"],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: link.icon
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/sidebar.tsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/components/sidebar.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["nav-text"],
                                    children: link.text
                                }, void 0, false, {
                                    fileName: "[project]/app/components/sidebar.tsx",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, link.href, true, {
                            fileName: "[project]/app/components/sidebar.tsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["nav-link"]} ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["logout-btn"]}`,
                        onClick: handleLogout,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["nav-icon"],
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fa-solid fa-sign-out-alt"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/sidebar.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/sidebar.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$sidebar$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["nav-text"],
                                children: "تسجيل الخروج"
                            }, void 0, false, {
                                fileName: "[project]/app/components/sidebar.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/sidebar.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/sidebar.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/sidebar.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "d/L2GqF9l44rBl7/rgBWSc2ljcI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/header.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "header": "header-module__edqLnG__header",
  "header-actions": "header-module__edqLnG__header-actions",
  "logo": "header-module__edqLnG__logo",
  "profile-btn": "header-module__edqLnG__profile-btn",
  "search-container": "header-module__edqLnG__search-container",
});
}),
"[project]/app/components/userMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$fetchWithAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/fetchWithAuth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function UserMenu() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserMenu.useEffect": ()=>{
            //  اقرأ الـ cookie
            const cookies = document.cookie.split(";");
            const userCookie = cookies.find({
                "UserMenu.useEffect.userCookie": (c)=>c.trim().startsWith("user=")
            }["UserMenu.useEffect.userCookie"]);
            if (userCookie) {
                try {
                    const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
                    setUser(userData);
                } catch  {
                    setUser(null);
                }
            }
        }
    }["UserMenu.useEffect"], []);
    //  إغلاق الـ menu لما يضغط برا
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserMenu.useEffect": ()=>{
            const handleClickOutside = {
                "UserMenu.useEffect.handleClickOutside": (e)=>{
                    if (menuRef.current && !menuRef.current.contains(e.target)) {
                        setIsOpen(false);
                    }
                }
            }["UserMenu.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "UserMenu.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["UserMenu.useEffect"];
        }
    }["UserMenu.useEffect"], []);
    const handleLogout = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$fetchWithAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchWithAuth"])("/api/logout", {
            method: "POST",
            credentials: "include"
        });
        window.location.href = "/login";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "user-menu-wrapper",
        ref: menuRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "user-icon-btn",
                onClick: ()=>setIsOpen(!isOpen),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                    className: "fa-regular fa-user",
                    style: {
                        fontSize: "22px",
                        color: "#1a3c6e"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/components/userMenu.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/userMenu.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "user-dropdown",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "user-info",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "user-avatar",
                                children: user?.userName?.charAt(0).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/app/components/userMenu.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "user-details",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "user-name",
                                        children: user?.userName
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/userMenu.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "user-role",
                                        children: user?.role
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/userMenu.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/userMenu.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/userMenu.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "user-divider"
                    }, void 0, false, {
                        fileName: "[project]/app/components/userMenu.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "user-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "user-label",
                                children: "الرقم الوظيفي"
                            }, void 0, false, {
                                fileName: "[project]/app/components/userMenu.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "user-value",
                                children: user?.ssn
                            }, void 0, false, {
                                fileName: "[project]/app/components/userMenu.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/userMenu.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "user-divider"
                    }, void 0, false, {
                        fileName: "[project]/app/components/userMenu.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "logout-btn",
                        onClick: handleLogout,
                        children: "تسجيل الخروج"
                    }, void 0, false, {
                        fileName: "[project]/app/components/userMenu.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/userMenu.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/userMenu.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(UserMenu, "/lwg2UUdb9GvWAj9wHMM0Yu30ME=");
_c = UserMenu;
var _c;
__turbopack_context__.k.register(_c, "UserMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/header.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$userMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/components/userMenu.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function Header() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logo,
                children: "نظام جرد العهد والمخازن"
            }, void 0, false, {
                fileName: "[project]/app/components/header.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["header-actions"],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$userMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/components/header.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/header.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/header.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/mainTitle.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "breadcrumb": "mainTitle-module___yiJNG__breadcrumb",
  "college-title": "mainTitle-module___yiJNG__college-title",
  "main-title": "mainTitle-module___yiJNG__main-title",
  "page-title-section": "mainTitle-module___yiJNG__page-title-section",
  "welcome-text": "mainTitle-module___yiJNG__welcome-text",
});
}),
"[project]/app/components/mainTitle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MainTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$mainTitle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/components/mainTitle.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MainTitle() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const pages = {
        "/home": {
            title: "نظام جرد العهد والمخازن",
            line1: "مرحبا بك في نظام إدارة العهد والمخازن",
            bottomTitle: "لكلية العلوم",
            breadcrumb: "الرئيسية"
        },
        "/operations": {
            title: "العمليات",
            line1: "أدارة عمليات الصرف والنقل والارجاع",
            breadcrumb: "الرئيسية > العمليات"
        },
        "/employee": {
            title: "الموظفين",
            line1: "عرض وإدارة بيانات الموظفين والعهد المسلمه لهم",
            breadcrumb: "الرئيسية > الموظفين"
        },
        "/warehouse": {
            title: "العهدة / المخازن",
            line1: "إدارة المخزون والعهد",
            breadcrumb: "الرئيسية > العهدة / المخازن"
        },
        "/location": {
            title: "المكان",
            line1: "عرض وإدارة مواقع التخزين في الكلية",
            breadcrumb: "الرئيسية > المكان"
        },
        "/editors": {
            title: "المجردين",
            line1: "إدارة حسابات المُجرِّدين الخارجيين ومنحهم صلاحيات الوصول لتطبيق الجرد عبر الموبايل",
            breadcrumb: "الرئيسية > المجردين"
        }
    };
    const current = pages[pathname] || {
        title: "لوحة التحكم",
        breadcrumb: "الرئيسية > لوحة التحكم"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$mainTitle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["page-title-section"],
        style: {
            textAlign: pathname === "/home" ? "center" : "right"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$mainTitle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["breadcrumb"],
                children: current.breadcrumb
            }, void 0, false, {
                fileName: "[project]/app/components/mainTitle.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$mainTitle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["main-title"],
                children: current.title
            }, void 0, false, {
                fileName: "[project]/app/components/mainTitle.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            current.line1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$mainTitle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["welcome-text"],
                children: current.line1
            }, void 0, false, {
                fileName: "[project]/app/components/mainTitle.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            current.line2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$mainTitle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["welcome-text"],
                children: current.line2
            }, void 0, false, {
                fileName: "[project]/app/components/mainTitle.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this),
            current.bottomTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$components$2f$mainTitle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"]["college-title"],
                children: current.bottomTitle
            }, void 0, false, {
                fileName: "[project]/app/components/mainTitle.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/mainTitle.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(MainTitle, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MainTitle;
var _c;
__turbopack_context__.k.register(_c, "MainTitle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/editors/auditorsTable.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionBtn": "auditorsTable-module__pPMXBq__actionBtn",
  "actions": "auditorsTable-module__pPMXBq__actions",
  "active": "auditorsTable-module__pPMXBq__active",
  "addBtn": "auditorsTable-module__pPMXBq__addBtn",
  "badge": "auditorsTable-module__pPMXBq__badge",
  "card": "auditorsTable-module__pPMXBq__card",
  "contactBtn": "auditorsTable-module__pPMXBq__contactBtn",
  "deleteBtn": "auditorsTable-module__pPMXBq__deleteBtn",
  "dot": "auditorsTable-module__pPMXBq__dot",
  "dotActive": "auditorsTable-module__pPMXBq__dotActive",
  "dotOffline": "auditorsTable-module__pPMXBq__dotOffline",
  "dotWait": "auditorsTable-module__pPMXBq__dotWait",
  "editBtn": "auditorsTable-module__pPMXBq__editBtn",
  "emptyRow": "auditorsTable-module__pPMXBq__emptyRow",
  "header": "auditorsTable-module__pPMXBq__header",
  "ltrCell": "auditorsTable-module__pPMXBq__ltrCell",
  "nameCell": "auditorsTable-module__pPMXBq__nameCell",
  "offline": "auditorsTable-module__pPMXBq__offline",
  "pageBtn": "auditorsTable-module__pPMXBq__pageBtn",
  "pageBtnActive": "auditorsTable-module__pPMXBq__pageBtnActive",
  "pageDots": "auditorsTable-module__pPMXBq__pageDots",
  "pagination": "auditorsTable-module__pPMXBq__pagination",
  "pulse": "auditorsTable-module__pPMXBq__pulse",
  "searchIcon": "auditorsTable-module__pPMXBq__searchIcon",
  "searchInput": "auditorsTable-module__pPMXBq__searchInput",
  "searchWrapper": "auditorsTable-module__pPMXBq__searchWrapper",
  "skeleton": "auditorsTable-module__pPMXBq__skeleton",
  "table": "auditorsTable-module__pPMXBq__table",
  "tableScroll": "auditorsTable-module__pPMXBq__tableScroll",
  "tbody": "auditorsTable-module__pPMXBq__tbody",
  "thead": "auditorsTable-module__pPMXBq__thead",
  "title": "auditorsTable-module__pPMXBq__title",
  "toggle": "auditorsTable-module__pPMXBq__toggle",
  "toggleOff": "auditorsTable-module__pPMXBq__toggleOff",
  "toggleOn": "auditorsTable-module__pPMXBq__toggleOn",
  "toggleThumb": "auditorsTable-module__pPMXBq__toggleThumb",
  "toggleThumbOff": "auditorsTable-module__pPMXBq__toggleThumbOff",
  "toggleThumbOn": "auditorsTable-module__pPMXBq__toggleThumbOn",
  "wait": "auditorsTable-module__pPMXBq__wait",
  "wrapper": "auditorsTable-module__pPMXBq__wrapper",
});
}),
"[project]/app/editors/Addauditormodal.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "body": "Addauditormodal-module__bjAXRW__body",
  "closeBtn": "Addauditormodal-module__bjAXRW__closeBtn",
  "error": "Addauditormodal-module__bjAXRW__error",
  "errorMsg": "Addauditormodal-module__bjAXRW__errorMsg",
  "fadeIn": "Addauditormodal-module__bjAXRW__fadeIn",
  "field": "Addauditormodal-module__bjAXRW__field",
  "header": "Addauditormodal-module__bjAXRW__header",
  "infoBox": "Addauditormodal-module__bjAXRW__infoBox",
  "input": "Addauditormodal-module__bjAXRW__input",
  "label": "Addauditormodal-module__bjAXRW__label",
  "modal": "Addauditormodal-module__bjAXRW__modal",
  "overlay": "Addauditormodal-module__bjAXRW__overlay",
  "submitBtn": "Addauditormodal-module__bjAXRW__submitBtn",
  "subtitle": "Addauditormodal-module__bjAXRW__subtitle",
  "title": "Addauditormodal-module__bjAXRW__title",
});
}),
"[project]/app/editors/Addauditormodal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AddAuditorModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/editors/Addauditormodal.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// ─── Validation ───────────────────────────────────────────────────────────────
function validate(form) {
    const errors = {};
    if (!form.name.trim()) errors.name = "الاسم مطلوب";
    if (!form.phone.trim()) errors.phone = "رقم الهاتف مطلوب";
    else if (!/^01[0-9]{9}$/.test(form.phone)) errors.phone = "رقم هاتف غير صحيح";
    if (!form.department.trim()) errors.department = "القسم مطلوب";
    return errors;
}
function AddAuditorModal({ isOpen, onClose, onSubmit }) {
    _s();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        phone: "",
        department: ""
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!isOpen) return null;
    const handleChange = (field, value)=>{
        setForm((prev)=>({
                ...prev,
                [field]: value
            }));
        // Clear error on change
        if (errors[field]) setErrors((prev)=>({
                ...prev,
                [field]: undefined
            }));
    };
    const handleSubmit = async ()=>{
        const validationErrors = validate(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);
        try {
            await onSubmit(form);
            setForm({
                name: "",
                phone: "",
                department: ""
            });
            setErrors({});
            onClose();
        } catch (err) {
            console.error(err);
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleOverlayClick = (e)=>{
        if (e.target === e.currentTarget) onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay,
        onClick: handleOverlayClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modal,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                    children: "اضافة مجرد جديد"
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                                    children: "أدخل البيانات الأساسية وسيتم إنشاء بيانات الدخول تلقائياً"
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/editors/Addauditormodal.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].closeBtn,
                            onClick: onClose,
                            "aria-label": "إغلاق",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/app/editors/Addauditormodal.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/editors/Addauditormodal.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].body,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                    children: "الاسم الكامل"
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "مثال: أحمد محمد علي",
                                    value: form.name,
                                    onChange: (e)=>handleChange("name", e.target.value),
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input} ${errors.name ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this),
                                errors.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMsg,
                                    children: errors.name
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/editors/Addauditormodal.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                    children: "رقم الهاتف"
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "tel",
                                    placeholder: "012742476",
                                    value: form.phone,
                                    onChange: (e)=>handleChange("phone", e.target.value),
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input} ${errors.phone ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error : ""}`,
                                    dir: "ltr"
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this),
                                errors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMsg,
                                    children: errors.phone
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/editors/Addauditormodal.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].field,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                    children: "القسم"
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "مثال: قسم جرد الاصول",
                                    value: form.department,
                                    onChange: (e)=>handleChange("department", e.target.value),
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input} ${errors.department ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error : ""}`
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 140,
                                    columnNumber: 13
                                }, this),
                                errors.department && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMsg,
                                    children: errors.department
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/editors/Addauditormodal.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoBox,
                            children: "🔒 سيتم إنشاء اسم المستخدم وكلمة المرور تلقائياً من النظام"
                        }, void 0, false, {
                            fileName: "[project]/app/editors/Addauditormodal.tsx",
                            lineNumber: 153,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitBtn,
                            onClick: handleSubmit,
                            disabled: isSubmitting,
                            children: isSubmitting ? "جاري الإضافة..." : "أضافه"
                        }, void 0, false, {
                            fileName: "[project]/app/editors/Addauditormodal.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/editors/Addauditormodal.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/editors/Addauditormodal.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/editors/Addauditormodal.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(AddAuditorModal, "voUh/mFxhiXdY7/JdomcjRz4M94=");
_c = AddAuditorModal;
var _c;
__turbopack_context__.k.register(_c, "AddAuditorModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/editors/AuditorsTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuditorsTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/editors/auditorsTable.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/editors/Addauditormodal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const PAGE_SIZE = 7;
const STATUS_STYLES = {
    Active: {
        text: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active,
        dot: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dotActive
    },
    Offline: {
        text: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].offline,
        dot: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dotOffline
    },
    Wait: {
        text: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wait,
        dot: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dotWait
    }
};
// ─── Mock data (شيلها لما الـ API يبقى جاهز) ─────────────────────────────────
const MOCK = [
    {
        id: 1,
        name: "م. خالد أحمد سالم",
        phone: "01278945612",
        department: "قسم جرد الاصول",
        lastActivity: "2025-10-24 14:30",
        status: "Offline",
        enabled: true
    },
    {
        id: 2,
        name: "م. شنوده اشرف عزيز",
        phone: "01278945612",
        department: "قسم التدقيق المالي",
        lastActivity: "2025-10-23 11:15",
        status: "Active",
        enabled: true
    },
    {
        id: 3,
        name: "م. نورة محمد إبراهيم",
        phone: "01278945612",
        department: "إدارة المراجعة الداخلية",
        lastActivity: "2025-10-24 14:30",
        status: "Active",
        enabled: true
    },
    {
        id: 4,
        name: "أ. عبدالله حسين علي",
        phone: "01278945612",
        department: "قسم جرد الاصول",
        lastActivity: "2025-10-23 11:15",
        status: "Wait",
        enabled: true
    },
    {
        id: 5,
        name: "م. خالد أحمد سالم",
        phone: "01278945612",
        department: "قسم التدقيق المالي",
        lastActivity: "2025-10-24 14:30",
        status: "Wait",
        enabled: true
    },
    {
        id: 6,
        name: "م. شنوده اشرف عزيز",
        phone: "01278945612",
        department: "إدارة المراجعة الداخلية",
        lastActivity: "2025-10-23 11:15",
        status: "Offline",
        enabled: false
    },
    {
        id: 7,
        name: "م. نورة محمد إبراهيم",
        phone: "01278945612",
        department: "قسم جرد الاصول",
        lastActivity: "2025-10-24 14:30",
        status: "Offline",
        enabled: true
    },
    {
        id: 8,
        name: "أ. محمد علي حسن",
        phone: "01198765432",
        department: "قسم التدقيق المالي",
        lastActivity: "2025-10-22 09:00",
        status: "Active",
        enabled: true
    },
    {
        id: 9,
        name: "م. سارة يوسف إبراهيم",
        phone: "01012345678",
        department: "إدارة المراجعة الداخلية",
        lastActivity: "2025-10-21 13:45",
        status: "Wait",
        enabled: false
    }
];
function AuditorsTable() {
    _s();
    const [auditors, setAuditors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(MOCK);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedAuditor, setSelectedAuditor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ── Filter ──
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuditorsTable.useMemo[filtered]": ()=>{
            const q = search.trim().toLowerCase();
            if (!q) return auditors;
            return auditors.filter({
                "AuditorsTable.useMemo[filtered]": (a)=>a.name.includes(q) || a.department.includes(q) || a.phone.includes(q)
            }["AuditorsTable.useMemo[filtered]"]);
        }
    }["AuditorsTable.useMemo[filtered]"], [
        auditors,
        search
    ]);
    // ── Pagination ──
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    // ── Toggle (optimistic) ──
    const handleToggle = async (id)=>{
        setAuditors((prev)=>prev.map((a)=>a.id === id ? {
                    ...a,
                    enabled: !a.enabled
                } : a));
        const target = auditors.find((a)=>a.id === id);
        if (!target) return;
        try {
            await fetch(`/api/auditors/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    enabled: !target.enabled
                })
            });
        } catch  {
            setAuditors((prev)=>prev.map((a)=>a.id === id ? {
                        ...a,
                        enabled: target.enabled
                    } : a));
        }
    };
    // ── Delete (optimistic) ──
    const handleDelete = async (id)=>{
        const backup = auditors.find((a)=>a.id === id);
        setAuditors((prev)=>prev.filter((a)=>a.id !== id));
        try {
            await fetch(`/api/auditors/${id}`, {
                method: "DELETE"
            });
        } catch  {
            if (backup) setAuditors((prev)=>[
                    ...prev,
                    backup
                ].sort((a, b)=>a.id - b.id));
        }
    };
    // ── Pages list ──
    const getPages = ()=>{
        if (totalPages <= 6) return Array.from({
            length: totalPages
        }, (_, i)=>i + 1);
        return [
            1,
            2,
            3,
            "...",
            totalPages - 2,
            totalPages - 1,
            totalPages
        ];
    };
    // ─────────────────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: " قائمة المُجرِّدين"
                    }, void 0, false, {
                        fileName: "[project]/app/editors/AuditorsTable.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addBtn,
                        onClick: ()=>setIsModalOpen(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/app/editors/AuditorsTable.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            "إضافة مجرد جديد"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/editors/AuditorsTable.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/editors/AuditorsTable.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchWrapper,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        size: 15,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchIcon
                    }, void 0, false, {
                        fileName: "[project]/app/editors/AuditorsTable.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "بحث....",
                        value: search,
                        onChange: (e)=>{
                            setSearch(e.target.value);
                            setPage(1);
                        },
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchInput
                    }, void 0, false, {
                        fileName: "[project]/app/editors/AuditorsTable.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/editors/AuditorsTable.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tableScroll,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].table,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].thead,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            "الاسم",
                                            "رقم الهاتف",
                                            "القسم",
                                            "أخر نشاط",
                                            "الحالة",
                                            "الإجراءات"
                                        ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: h
                                            }, h, false, {
                                                fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                lineNumber: 237,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/editors/AuditorsTable.tsx",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                    lineNumber: 227,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tbody,
                                    children: paginated.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyRow,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 6,
                                            children: "لا توجد نتائج مطابقة"
                                        }, void 0, false, {
                                            fileName: "[project]/app/editors/AuditorsTable.tsx",
                                            lineNumber: 245,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/editors/AuditorsTable.tsx",
                                        lineNumber: 244,
                                        columnNumber: 17
                                    }, this) : paginated.map((a)=>{
                                        const sc = STATUS_STYLES[a.status];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].nameCell,
                                                    children: a.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ltrCell,
                                                    children: a.phone
                                                }, void 0, false, {
                                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: a.department
                                                }, void 0, false, {
                                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ltrCell,
                                                    children: a.lastActivity
                                                }, void 0, false, {
                                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badge} ${sc.text}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dot} ${sc.dot}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                                lineNumber: 260,
                                                                columnNumber: 27
                                                            }, this),
                                                            a.status
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actions,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggle} ${a.enabled ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggleOn : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggleOff}`,
                                                                onClick: ()=>handleToggle(a.id),
                                                                role: "switch",
                                                                "aria-checked": a.enabled,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggleThumb} ${a.enabled ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggleThumbOn : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggleThumbOff}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                                    lineNumber: 274,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionBtn} ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deleteBtn}`,
                                                                onClick: ()=>handleDelete(a.id),
                                                                title: "حذف",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    size: 15
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                                    lineNumber: 283,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                                lineNumber: 278,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionBtn} ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].editBtn}`,
                                                                title: "تعديل",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                    size: 15
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                                    lineNumber: 289,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                                lineNumber: 285,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionBtn} ${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contactBtn}`,
                                                                title: "تواصل",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"], {
                                                                    size: 15
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                                    lineNumber: 295,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                                lineNumber: 291,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, a.id, true, {
                                            fileName: "[project]/app/editors/AuditorsTable.tsx",
                                            lineNumber: 251,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/editors/AuditorsTable.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/editors/AuditorsTable.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pagination,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageBtn,
                                onClick: ()=>setPage((p)=>p - 1),
                                disabled: page === 1,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                    lineNumber: 315,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/editors/AuditorsTable.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this),
                            getPages().map((p, i)=>p === "..." ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageDots,
                                    children: "..."
                                }, `d${i}`, false, {
                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                    lineNumber: 320,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageBtn} ${page === p ? __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageBtnActive : ""}`,
                                    onClick: ()=>setPage(p),
                                    children: String(p).padStart(2, "0")
                                }, p, false, {
                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                    lineNumber: 324,
                                    columnNumber: 17
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$auditorsTable$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pageBtn,
                                onClick: ()=>setPage((p)=>p + 1),
                                disabled: page === totalPages,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/app/editors/AuditorsTable.tsx",
                                    lineNumber: 339,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/editors/AuditorsTable.tsx",
                                lineNumber: 334,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/editors/AuditorsTable.tsx",
                        lineNumber: 309,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/editors/AuditorsTable.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$editors$2f$Addauditormodal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                onSubmit: async (data)=>{
                    // TODO: بعت الداتا للـ API هنا
                    console.log(data);
                }
            }, void 0, false, {
                fileName: "[project]/app/editors/AuditorsTable.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/editors/AuditorsTable.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_s(AuditorsTable, "4eTik4iRmLpiFpOCCGf2q6G7OdM=");
_c = AuditorsTable;
var _c;
__turbopack_context__.k.register(_c, "AuditorsTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_ee7d5689._.js.map