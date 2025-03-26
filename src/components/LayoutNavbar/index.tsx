"use client";

import React from "react";
import Link from "next/link";
import { Select } from "antd";
import i18n from "@/i18n/i18n";
import { useTranslation } from "react-i18next";
import styles from "./navbar.module.scss";

const LayoutNavbar = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link href="/">{t("nav_home")}</Link>
        <Link href="/test1">{t("nav_test1")}</Link>
        <Link href="/test2">{t("nav_test2")}</Link>
      </div>
      <div className={styles.navRight}>
        <Select
          defaultValue={i18n.language}
          onChange={(lng) => i18n.changeLanguage(lng)}
          style={{ width: 120 }}
        >
          <Select.Option value="en">🇬🇧 English</Select.Option>
          <Select.Option value="th">🇹🇭 ไทย</Select.Option>
        </Select>
      </div>
    </div>
  );
};

export default LayoutNavbar;
