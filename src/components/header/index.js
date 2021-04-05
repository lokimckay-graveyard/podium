import Head from "next/head";
import Logo from "../logo";
import Link from "next/link";
import Nav from "../nav";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <>
      <Head>
        <title>Podium</title>
        <link rel="icon" href="/favicon.svg" />
        <link href="/font/style.css" rel="stylesheet" />
      </Head>
      <div className={styles.header}>
        <div>
          <Link href="/">
            <a className={styles.brand}>
              <Logo className={styles.logo} />
              <span className={styles.text}>Podium</span>
            </a>
          </Link>
        </div>
        <div>
          <Nav />
        </div>
      </div>
    </>
  );
}
