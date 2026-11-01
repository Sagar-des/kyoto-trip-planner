import styles from "./trip-cards.module.css";

type Value = string | number | null | undefined;

export function isEmpty(v: Value): boolean {
  if (v === null || v === undefined) return true;
  if (typeof v === "number") return Number.isNaN(v);
  return v.trim() === "";
}

// Shows the value, or a short grey filler line when the value is missing.
export default function Fill({ value, filler }: { value: Value; filler: string }) {
  if (isEmpty(value)) {
    return (
      <span className={styles.filler} data-filler="true">
        {filler}
      </span>
    );
  }
  return <>{value}</>;
}
