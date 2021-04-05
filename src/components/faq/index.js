import Image from "../image";
import Collapse from "../collapse";
import styles from "./faq.module.scss";
import Link from "../link";

function Question({ question, content, steps }) {
  return (
    <li>
      <Collapse summary={question} defaultState={true}>
        {content}
        {steps && (
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        )}
      </Collapse>
    </li>
  );
}

export default function FAQ() {
  return (
    <ul className={styles.questions}>
      <Question
        question="How do I remove Podium from my server?"
        steps={[
          <>
            <p>Go to your discord server's settings</p>
            <Image src="/img/remove-podium-1.png" className={styles.image} />
          </>,
          <>
            <p>
              Click the Integrations tab and then click Manage next to the
              Podium integration
            </p>
            <Image src="/img/remove-podium-2.png" className={styles.image} />
          </>,
          <>
            <p>Click Remove Integration</p>
            <Image src="/img/remove-podium-3.png" className={styles.image} />
          </>,
        ]}
      />
      <Question
        question="Why doesn't my link from X site work?"
        content={
          <p>
            Currently only{" "}
            <Link label="SmashGG" href="https://smash.gg" external={true} />{" "}
            links are supported
            <br />
            AuSmash and Challonge are on the roadmap! 🚀
          </p>
        }
      />
    </ul>
  );
}
