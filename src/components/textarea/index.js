import { cssJoin, lineCount } from "../../lib/array";
import styles from "./textarea.module.scss";

export default function TextArea({
  value,
  onChange,
  rows,
  disabled,
  readOnly = false,
  className,
}) {
  return (
    <textarea
      value={value}
      placeholder="Separate by comma or newline"
      onChange={onChange}
      className={cssJoin([styles.textarea, className])}
      rows={rows || lineCount(value)}
      readOnly={readOnly}
      disabled={disabled}
    />
  );
}
