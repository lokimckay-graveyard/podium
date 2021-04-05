import Form from "../components/form";
import Hero from "../components/hero";
import PageLayout from "../layouts/pageLayout";
import styles from "../styles/pages/home.module.scss";

export default function Home() {
  return (
    <PageLayout>
      <Hero
        description="Generate results of competitive Smash events"
        className={styles.hero}
      />
      <Form />
    </PageLayout>
  );
}
