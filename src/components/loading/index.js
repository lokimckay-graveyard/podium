import { cssJoin } from "../../lib/array";
import styles from "./loading.module.scss";

export default function Loading({ className }) {
  return (
    <div className={cssJoin([styles.loading, className])}>
      <div />
      <div />
    </div>
  );
}
