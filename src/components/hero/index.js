import { cssJoin } from "../../lib/array";
import Logo from "../logo";
import styles from "./hero.module.scss";

export default function Hero({ title = "Podium", description, className }) {
  return (
    <div className={cssJoin([styles.hero, className])}>
      <Logo className={styles.logo} />
      <h1 className={styles.title} tabIndex={0}>
        {title}
      </h1>

      {description && (
        <p className={styles.description} tabIndex={0}>
          {description}
        </p>
      )}
    </div>
  );
}
