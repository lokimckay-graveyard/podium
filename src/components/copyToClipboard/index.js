import Button from "../button";

export default function CopyToClipboard({ value }) {
  return (
    <Button
      label="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(value);
      }}
    />
  );
}
