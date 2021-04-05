import { useState } from "react";
import Button from "../button";

const summaryToSlug = (summary) => {
  const invalidChar = /[^\w\d_-]/g;
  const space = / /g;
  return (
    summary &&
    summary
      .toString()
      .toLowerCase()
      .replace(space, "-")
      .replace(invalidChar, "")
  );
};

export default function Collapse({
  summary,
  defaultState = false,
  className,
  children,
}) {
  const [collapsed, setCollapsed] = useState(defaultState);

  return (
    <>
      <Button
        as="a"
        href={`#${summaryToSlug(summary)}`}
        label={collapsed ? `${summary} ⤵` : `${summary} ⤴`}
        className={className}
        tabIndex={0}
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      />
      {!collapsed && children}
    </>
  );
}
