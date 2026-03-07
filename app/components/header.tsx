"use client";
import styles from "./header.module.css";
import UserMenu from "./userMenu";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>نظام جرد العهد والمخازن</div>
      <div className={styles["header-actions"]}>
        <UserMenu />
      </div>
    </header>
  );
}
