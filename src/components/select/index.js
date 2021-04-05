import { cssJoin } from "../../lib/array";
import styles from "./select.module.scss";

export default function Select({
  name,
  label,
  options,
  defaultValue,
  onChange,
  className,
}) {
  return (
    <div className={cssJoin([styles.select, className])}>
      <span>{label}</span>
      <select
        id={name}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {options.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
