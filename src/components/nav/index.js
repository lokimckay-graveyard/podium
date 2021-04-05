import Button from "../button";
import Link from "../link";
import styles from "./nav.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/about" label="About" />
        </li>
        <li>
          <Link href="/help" label="Help" />
        </li>
        <li>
          <Link href="/bot" label="Discord Bot" as="button" />
        </li>
      </ul>
    </nav>
  );
}
