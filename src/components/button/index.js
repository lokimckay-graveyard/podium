import { createElement } from "react";
import { cssJoin } from "../../lib/array";
import styles from "./button.module.scss";

export default function Button({
  label = "Button",
  as = "button",
  href,
  disabled,
  type,
  onClick,
  className,
  ...rest
}) {
  const elementProps = {
    href,
    disabled,
    type,
    onClick,
    className: cssJoin([styles.button, className]),
    ...rest,
  };
  return createElement(as, elementProps, label);
}
