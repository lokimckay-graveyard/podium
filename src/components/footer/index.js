import Link from "../link";
import { SNEYED_TWITTER } from "../../config/links";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link
        label="❤️ @sneyed"
        href={SNEYED_TWITTER}
        newTab={true}
        external={true}
      />
    </footer>
  );
}
