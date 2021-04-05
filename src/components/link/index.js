import NextLink from "next/link";
import Button from "../button";

export default function Link({
  label,
  href,
  external,
  as = "a",
  newTab,
  children,
  onClick,
  ...rest
}) {
  const button = (
    <Button
      label={label || children}
      as={as}
      href={external ? href : undefined}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      onClick={onClick}
      {...rest}
    />
  );

  return external ? (
    button
  ) : (
    <NextLink href={href} passHref={true}>
      {button}
    </NextLink>
  );
}
