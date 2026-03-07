"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./home.css";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MainTitle from "../components/mainTitle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="main-content">
          {/* Main Title */}
          <MainTitle />

          {/* Quick Access */}
          <div className="quick-access-section">
            <h3 className="section-heading">الوصول السريع</h3>
          </div>

          {/* Cards Container */}
          <div className="cards-container">
            {/* Card 1 */}
            <div className="service-card">
              <div className="card-icon-wrapper navy-icon">
                <img src="/icon/uim_process.svg" alt="uim_process" />
              </div>
              <h3 className="card-heading">إدارة العمليات</h3>
              <p className="card-description">صرف, نقل, إرجاع العهد</p>
              <Link href="/operations" className="card-action-btn">
               الانتقال ←  
              </Link>
            </div>

            {/* Card 2 */}
            <div className="service-card">
              <div className="card-icon-wrapper green-icon"><img src="/icon/vaadin_storage (1).svg" alt="vaadin_storage" /></div>
              <h3 className="card-heading">إدارة العهد/المخازن</h3>
              <p className="card-description">عرض وادارة المخزون</p>
              <Link href="/warehouse" className="card-action-btn">
               الانتقال ←  
              </Link>
            </div>

            {/* Card 3 */}
            <div className="service-card">
              <div className="card-icon-wrapper blue-icon"><img src="/icon/Group (1).svg" alt="Group 1"/></div>
              <h3 className="card-heading">إدارة الموظفين</h3>
              <p className="card-description">عرض واضافة الموظفين</p>
              <Link href="/employee" className="card-action-btn">
               الانتقال ←  
              </Link>
            </div>

            {/* Card 4 */}
            <div className="service-card">
              <div className="card-icon-wrapper orange-icon">
                <img src="/icon/Group (2).svg" alt="Group 2"/>
              </div>
              <h3 className="card-heading">إدارة الموقع</h3>
              <p className="card-description">ادارة الاقسام والمباني و الغرف</p>
              <Link href="/location" className="card-action-btn">
               الانتقال ←  
              </Link>
            </div>

            {/* Card 5 */}
            <div className="service-card">
              <div className="card-icon-wrapper Violet-icon">
                <img src="/icon/Group.svg" alt="Group"/>
              </div>
              <h3 className="card-heading">إدارة المجردين</h3>
              <p className="card-description">منح صلاحيات الجرد عبر الموبايل</p>
              <Link href="/editors" className="card-action-btn">
               الانتقال ←  
              </Link>
            </div>
          </div>

          {/* About System Section */}
          <div className="about-system">
            <h3 className="about-heading">عن النظام</h3>
            <p className="about-description">
              نظام جرد العُهد والمخازن هو نظام متكامل لإدارة الأصول والعهد في الكلية التقنية. يوفر النظام إمكانية تتبع العمليات، إدارة
              الموظفين والمواقع، وإدارة المخزون بطريقة سهلة وفعالة.
            </p>

            <div className="system-features">
              <div className="feature-item">
                <div className="feature-icon-box">
                  <img src="/icon/vaadin_storage.svg" alt="vaadin_storage"/>
                </div>
                <p className="feature-label">إدارة شاملة للعهد</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-box">
                  <img src="/icon/uim_process (1).svg" alt="uim_process"/>
                </div>
                <p className="feature-label">تتبع العمليات بدقة</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-box">
                  <img src="/icon/streamline-ultimate_office-employee.svg" alt="Group 1"/>
                </div>
                <p className="feature-label">إدارة شاملة للموظفين</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
