import Link from "../link";
import { help, results } from "../../config/commands";
import { DISCORD_OAUTH, DISCORD_SLASH_COMMANDS_FAQ } from "../../config/links";
import styles from "./installbot.module.scss";
import { fireEvent } from "../tracking";

export default function InstallBot() {
  return (
    <div className={styles.container}>
      <ol className={styles.instructions}>
        <Section title="Authorize Podium">
          <p>
            Open this link in a web browser to allow Podium to access your
            Discord server
          </p>
          <Link
            label={DISCORD_OAUTH}
            href={DISCORD_OAUTH}
            className={styles.link}
            onClick={() => {
              fireEvent({ type: "bot", value: "authorize" });
            }}
          />
        </Section>
        <Section title="Invoke command">
          <p>Use a "slash" command listed below directly in your server!</p>
          <Commands />
        </Section>
      </ol>
      <div className={styles.info}>
        <div>
          <h2>What are slash commands?</h2>
          <p>Read more about Discord's slash commands here:</p>
          <Link
            label={DISCORD_SLASH_COMMANDS_FAQ}
            href={DISCORD_SLASH_COMMANDS_FAQ}
            external={true}
          />
        </div>
        <div>
          <h2>I need help!</h2>
          Check out the <Link as="a" label="/help page" href="/help" />
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <li className={styles.section}>
      {title && <h2>{title}</h2>}
      {children}
    </li>
  );
}

function Command({ name, example, description, options }) {
  return (
    <li className={styles.command}>
      <div>
        <p className={styles.highlight}>{`/${name}`}</p>
        <div className={styles.indent}>{description}</div>
      </div>

      {example && (
        <div>
          <p>Example:</p>

          <div className={styles.indent}>{example}</div>
        </div>
      )}
      {options && (
        <div>
          <p>Options:</p>

          <ul className={styles.optionsList}>
            {options.map((option) => (
              <li className={styles.indent}>
                <p className={styles.highlight}>{option.name}</p>
                {option.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function Commands() {
  return (
    <code>
      <ul className={styles.commands}>
        <Command
          name={results.name}
          example={
            <>
              <span className={styles.highlight}>/results players:</span> Loki,
              BaM <span className={styles.highlight}>event:</span>{" "}
              friday-night-smash-253
            </>
          }
          description={results.description}
          options={results.options}
        />
        <Command name={help.name} description={help.description} />
      </ul>
    </code>
  );
}
