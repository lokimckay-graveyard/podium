import Hero from "../components/hero";
import Link from "../components/link";
import { DISCORD_INVITE, GITHUB_REPO, SNEYED_TWITTER } from "../config/links";
import PageLayout from "../layouts/pageLayout";
import Image from "../components/image";
import styles from "../styles/pages/about.module.scss";
import DiscordPreview from "../components/discordPreview";

function Section({ title, content }) {
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      {content}
    </div>
  );
}

export default function About() {
  return (
    <PageLayout>
      <Hero title="About" />
      <Section
        title="What is Podium?"
        content={
          <>
            <p>
              Do you have a Smash discord or group chat where you would like to
              share placement results for a Smash tournament?
            </p>
            <p>
              Podium automatically generates a message containing all the
              placement results of players your are interested in.
            </p>
            <DiscordPreview className={styles.preview} />
          </>
        }
      />

      <Section
        title="How do I use Podium?"
        content={
          <p>
            Podium can be used via the <Link label="web interface" href="/" />{" "}
            or added as a <Link label="discord bot" href="/bot" />
          </p>
        }
      />
      <Section
        title="How does Podium work?"
        content={
          <>
            <p>
              Podium detects the origin of the event URL provide and then
              queries the public API of that origin using your player/event
              data.
            </p>
            <p>Information is not stored or remembered</p>
          </>
        }
      />
      <Section
        title="More info"
        content={
          <ul>
            <li>
              <Link label="Podium discord" href={DISCORD_INVITE} newTab />
            </li>
            <li>
              <Link label="Github repository" href={GITHUB_REPO} />
            </li>

            <li>
              <Link label="@sneyed on twitter" href={SNEYED_TWITTER} />
            </li>
          </ul>
        }
      />
    </PageLayout>
  );
}
