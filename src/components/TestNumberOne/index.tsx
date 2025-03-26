"use client";

import { useState } from "react";
import styles from "@/components/TestNumberOne/pageOne.module.scss";
import { Trans, useTranslation } from "react-i18next";

const shapes = [
  "square",
  "circle",
  "oval",
  "trapezoid",
  "rectangle",
  "parallelogram",
];

const TestPageNumberOne = (): JSX.Element => {
  const { t } = useTranslation();
  const [isShifted, setIsShifted] = useState(false);
  const [shapeOrder, setShapeOrder] = useState(shapes);

  const shiftRight = () => {
    setShapeOrder([
      shapeOrder[shapeOrder.length - 1],
      ...shapeOrder.slice(0, -1),
    ]);
  };

  const shiftLeft = () => {
    setShapeOrder([...shapeOrder.slice(1), shapeOrder[0]]);
  };

  const moveLastThreeToFront = () => {
    setShapeOrder([...shapeOrder.slice(-3), ...shapeOrder.slice(0, -3)]);
    setIsShifted((prev) => !prev);
  };

  const shuffleArray = () => {
    setShapeOrder([...shapeOrder].sort(() => Math.random() - 0.5));
  };

  return (
    <div className={styles.container}>
      <h3>{t("pageTestOne.layout_title")}</h3>
      <div className={styles.titleContainer}>
        <div className={styles.title}>{t("pageTestOne.layout_heading")}</div>
        <div className={styles.titleDesc}>
          <Trans
            i18nKey="pageTestOne.test_description_html"
            components={{ br: <br /> }}
          />
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <div className={styles.buttonCard} onClick={shiftLeft}>
          <div className={`${styles.shape} ${styles.triangleLeft}`} />
          <div className={styles.buttonLabel}>
            {t("pageTestOne.move_shape")}
          </div>
        </div>

        <div className={styles.buttonCard} onClick={moveLastThreeToFront}>
          <div className={`${styles.shape} ${styles.triangleUp}`} />
          <div className={`${styles.shape} ${styles.triangleDown}`} />
          <div className={styles.buttonLabel}>
            {t("pageTestOne.move_position")}
          </div>
        </div>

        <div className={styles.buttonCard} onClick={shiftRight}>
          <div className={`${styles.shape} ${styles.triangleRight}`} />
          <div className={styles.buttonLabel}>
            {t("pageTestOne.move_shape")}
          </div>
        </div>
      </div>

      <div
        className={`${styles.shapeRow} ${isShifted ? styles.shiftRight : ""}`}
      >
        {shapeOrder.slice(0, 3).map((shape, index) => (
          <div
            className={styles.shapeBoxContainer}
            key={index}
            onClick={shuffleArray}
          >
            <div
              key={index}
              className={`${styles.shapeBox} ${styles[shape]}`}
              onClick={shuffleArray}
            />
          </div>
        ))}
      </div>

      <div
        className={`${styles.shapeRow} ${!isShifted ? styles.shiftRight : ""}`}
      >
        {shapeOrder.slice(3, 6).map((shape, index) => (
          <div
            className={styles.shapeBoxContainer}
            key={index}
            onClick={shuffleArray}
          >
            <div
              key={index + 3}
              className={`${styles.shapeBox} ${styles[shape]}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPageNumberOne;
