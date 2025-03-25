import styles from "@/app/page.module.scss";
import TestNumberOne from "@/components/TestNumberOne";

export default function Home() {
  return (
    <div className={styles.page}>
      <TestNumberOne />
    </div>
  );
}
