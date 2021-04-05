import Footer from "../components/footer";
import Header from "../components/header";
import Tracking from "../components/tracking";
import { cssJoin } from "../lib/array";
import styles from "./pageLayout.module.scss";

export default function PageLayout({ children, className }) {
  return (
    <div className={cssJoin([styles.container, className])}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
      <Tracking />
    </div>
  );
}
