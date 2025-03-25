import styles from "@/app/page.module.scss";
import TestNumberTwo from "@/components/TestNumberTwo";

export default function Home() {
  return (
    <div className={styles.page}>
      <TestNumberTwo />
    </div>
  );
}
