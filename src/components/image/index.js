import NextLink from "next/link";
import { cssJoin } from "../../lib/array";
import styles from "./image.module.scss";

export default function Image({ src, className, clickable = true }) {
  const img = (
    <img
      src={src}
      className={cssJoin([className, clickable && styles.clickable])}
    />
  );
  return clickable ? <NextLink href={src}>{img}</NextLink> : img;
}
