"use client";

import { useState } from "react";
import styles from "./trip-cards.module.css";

export default function HeartButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button
      type="button"
      className={styles.heart}
      aria-label="Save to wishlist"
      aria-pressed={saved}
      onClick={() => setSaved((s) => !s)}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 28C7 22 2 16.8 2 11.5 2 7.4 5.1 4.5 8.8 4.5c2.6 0 5.1 1.4 7.2 4.2 2.1-2.8 4.6-4.2 7.2-4.2 3.7 0 6.8 2.9 6.8 7 0 5.3-5 10.5-14 16.5z" />
      </svg>
    </button>
  );
}
