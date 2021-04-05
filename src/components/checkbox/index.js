import { useState } from "react";
import { cssJoin } from "../../lib/array";
import styles from "./checkbox.module.scss";

export default function Checkbox({
  id,
  label,
  labelFirst,
  value: _value,
  onClick: _onClick,
  className,
}) {
  const isControlled =
    typeof _value !== "undefined" && typeof _onClick !== "undefined";
  const [localValue, setLocalValue] = useState(false);
  const value = isControlled ? _value : localValue;

  const onClick = (event) => {
    if (event.target.localName !== "input") return;
    const newValue = !value;
    if (isControlled) _onClick(newValue);
    if (!isControlled) setLocalValue(newValue);
  };

  const labelEl = <label htmlFor={id}>{label}</label>;
  return (
    <div className={cssJoin([styles.checkbox, className])}>
      {label && labelFirst && labelEl}
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={value}
        onChange={onClick}
      />
      {label && !labelFirst && labelEl}
    </div>
  );
}
