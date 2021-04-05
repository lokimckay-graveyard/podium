import DiscordPreview from "../components/discordPreview";
import Hero from "../components/hero";
import InstallBot from "../components/installbot";
import PageLayout from "../layouts/pageLayout";
import styles from "../styles/pages/bot.module.scss";

export default function Bot() {
  return (
    <PageLayout>
      <Hero title="Discord Bot" className={styles.hero} />
      <DiscordPreview className={styles.preview} />
      <InstallBot />
    </PageLayout>
  );
}
