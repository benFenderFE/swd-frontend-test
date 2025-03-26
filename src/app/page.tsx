"use client";

import styles from "./page.module.scss";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={styles.pageHome}>
      <div className={styles.title}>{t("home_title")}</div>
      <div className={styles.buttonsContainer}>
        <Button type="primary" href="/test1">
          {t("go_to_test1")}
        </Button>
        <Button type="primary" href="/test2">
          {t("go_to_test2")}
        </Button>
      </div>
    </div>
  );
}
