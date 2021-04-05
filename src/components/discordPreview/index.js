import { cssJoin } from "../../lib/array";
import Image from "../image";
import styles from "./discordPreview.module.scss";

export default function DiscordPreview({ className }) {
  return (
    <div className={cssJoin([styles.preview, className])}>
      <Image
        src="/img/discord-example.png"
        clickable={false}
        className={styles.image}
      />
    </div>
  );
}
