import FAQ from "../components/faq";
import Hero from "../components/hero";
import Link from "../components/link";
import { DISCORD_INVITE } from "../config/links";
import PageLayout from "../layouts/pageLayout";
import styles from "../styles/pages/help.module.scss";

function Section({ title, content }) {
  return (
    <div className={styles.section}>
      <h2 tabIndex={0}>{title}</h2>
      {content}
    </div>
  );
}

export default function About() {
  return (
    <PageLayout>
      <Hero title="Help" />
      <Section title="Common Questions" content={<FAQ />} />
      <Section
        title="Join the discord"
        content={
          <>
            <p>
              If you need further support, please join the{" "}
              <Link label="Podium discord" href={DISCORD_INVITE} newTab /> and
              see if someone has asked your question already
            </p>
            <span>
              <Link label={DISCORD_INVITE} href={DISCORD_INVITE} newTab />
            </span>
          </>
        }
      />
    </PageLayout>
  );
}
