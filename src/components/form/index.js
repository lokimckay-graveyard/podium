import { useEffect, useState } from "react";
import Button from "../button";
import TextArea from "../textarea";
import TextInput from "../textinput";
import { d2s, s2d, splitCommas } from "./conversion";
import { getResults } from "../../api";
import Results from "../results";
import Loading from "../loading";
import styles from "./form.module.scss";
import { isPopulatedArray } from "../../lib/array";
import { fireEvent } from "../tracking";

const example = {
  players: ["Loki", "BaM"],
  event: "friday-night-smash-253",
};

function Section({ title, children }) {
  return (
    <li>
      {title && <h2>{title}</h2>}
      {children}
    </li>
  );
}

function validateForm({ players, event, setValidationMessage }) {
  const playersDefined = isPopulatedArray(players);
  const eventDefined = !!event && event !== "";
  if (!playersDefined) {
    setValidationMessage("Please provide at least 1 player");
    return false;
  }
  if (!eventDefined) {
    setValidationMessage("Please provide an event");
    return false;
  }
  return playersDefined && eventDefined;
}

export default function Form() {
  const [players, setPlayers] = useState();
  const [event, setEvent] = useState("");
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState();
  const [displayResponse, setDisplayResponse] = useState(false);

  const requestResults = async ({ players, event } = {}) => {
    setLoading(true);
    const response = await getResults({
      players: splitCommas(players),
      events: [event],
    });
    setResponse(response);
    setDisplayResponse(true);
    setLoading(false);
  };

  const onBack = () => {
    setDisplayResponse(false);
  };

  const onShowMe = () => {
    setPlayers(example.players);
    setEvent(example.event);
    fireEvent({
      type: "getResults",
      value: { valid: true, players: example.players, event: example.event },
    });
    requestResults(example);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const isValid = validateForm({ players, event, setValidationMessage });
    fireEvent({
      type: "getResults",
      value: { valid: isValid, players, event },
    });
    if (isValid) requestResults({ players, event });
  };

  useEffect(() => {
    setValidationMessage(false);
  }, [players, event, response, loading, displayResponse]);

  return displayResponse ? (
    <div>
      <Results results={response.results} errors={response.errors} />
      <Button label="Back" className={styles.back} onClick={onBack} />
    </div>
  ) : loading ? (
    <div className={styles.loading}>
      <Loading className={styles.spinner} />
      <code>
        Searching for placements of players<p>{players.join(", ")}</p>
        <br />
        Who attended<p>{event}</p>
      </code>
    </div>
  ) : (
    <>
      <Button
        label="Show me"
        className={styles.showMe}
        onClick={onShowMe}
        disabled={loading}
      />
      <form className={styles.form} onSubmit={onSubmit}>
        <ol>
          <Section title="Players">
            <p>
              Player or crew tags to search for (case sensitive) e.g.{" "}
              <code>Loki, BaM</code>
            </p>
            <TextArea
              value={d2s(players)}
              onChange={(e) => setPlayers(s2d(e.target.value))}
              rows={15}
              disabled={loading}
            />
          </Section>
          <Section title="Event URL">
            <p>
              Smash.gg tournament or event URL. e.g.{" "}
              <code>friday-night-smash-253</code>
            </p>
            <TextInput
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              disabled={loading}
            />
          </Section>
        </ol>
        <code className={styles.validationMessage}>{validationMessage}</code>
        <Button
          label="Get results"
          type="submit"
          disabled={loading}
          className={styles.getResults}
        />
      </form>
    </>
  );
}
