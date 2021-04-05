import styles from "./web.module.scss";

export function Tournament({ tournament, link, children }) {
  return (
    <>
      <h2 className={styles.tournament}>
        🏆 <a href={link}>{tournament}</a>
      </h2>
      {children}
    </>
  );
}

export function Event({ name, status, link, children }) {
  return (
    <>
      <h3 className={styles.event}>
        ✨ <a href={link}>{name}</a>
        {status}
      </h3>

      {children}
    </>
  );
}

export function Players({ children }) {
  return <ul className={styles.players}>{children}</ul>;
}

export function Player({ placement, tag }) {
  return (
    <li className={styles.player}>
      <span className={styles.placement}>{placement}</span>
      <span>{tag}</span>
    </li>
  );
}

export function Missing({ children }) {
  return (
    <code className={styles.missing}>
      <span>{children}</span> (missing)
    </code>
  );
}

export function NotFound() {
  return <code className={styles.notFound}>No results found</code>;
}
