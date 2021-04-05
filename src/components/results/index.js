import { useState } from "react";
import { isPopulatedArray } from "../../lib/array";
import { outputTargets } from "../../lib/keys";
import { resultsToOutput } from "../../lib/output";
import Checkbox from "../checkbox";
import CopyToClipboard from "../copyToClipboard";
import Select from "../select";
import TextArea from "../textarea";
import styles from "./results.module.scss";

export default function Results({ results, errors }) {
  const [target, setTarget] = useState(outputTargets.WEB);
  const [showMissing, setShowMissing] = useState(false);
  const onChangeTarget = (event) => {
    setTarget(event.target.value);
  };
  const onChangeMissing = (event) => {
    setShowMissing(event.target.value === "Yes");
  };

  const output = resultsToOutput({
    target,
    results,
    showMissing,
  });
  const plainTextOutput = resultsToOutput({
    target: outputTargets.PLAIN_TEXT,
    results,
    showMissing,
  });
  return (
    <>
      <div className={styles.controls}>
        <Select
          name="target"
          label="Output style"
          options={[
            { value: outputTargets.WEB, label: "Web" },
            { value: outputTargets.DISCORD, label: "Discord" },
            { value: outputTargets.PLAIN_TEXT, label: "Plain Text" },
          ]}
          onChange={onChangeTarget}
          className={styles.select}
        />
        <Select
          name="target"
          label="Show missing players"
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          defaultValue="No"
          onChange={onChangeMissing}
          className={styles.select}
        />
      </div>
      <div className={styles.output}>
        <Errors errors={errors} />
        {target === outputTargets.WEB ? (
          <div className={styles.web}>{output}</div>
        ) : target === outputTargets.DISCORD ? (
          <TextArea value={output} readOnly className={styles.discord} />
        ) : target === outputTargets.PLAIN_TEXT ? (
          <TextArea value={output} readOnly className={styles.plainText} />
        ) : null}
      </div>
      <CopyToClipboard
        value={target === outputTargets.WEB ? plainTextOutput : output}
      />
    </>
  );
}

function Errors({ errors }) {
  return isPopulatedArray(errors) ? (
    <ul className={styles.errors}>
      {errors.map((error, index) => (
        <li key={index}>
          <code>[ERROR]: {error?.message || JSON.stringify(error)}</code>
        </li>
      ))}
    </ul>
  ) : null;
}
