import { cssJoin } from "../../lib/array";
import styles from "./textinput.module.scss";

export default function TextInput({ value, onChange, disabled, className }) {
  return (
    <input
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cssJoin([styles.textinput, className])}
    />
  );
}
