import styles from "./page.module.css";
import { Button } from "antd";

export default function Home() {
  return (
    <div className={styles.page}>
      this is home page
      <div>
        <Button type="primary" href="/test1">
          test1 page button
        </Button>
        <Button type="primary" href="/test2">
          test2 page button
        </Button>
      </div>
    </div>
  );
}
