import Image from "next/image";
import Fill, { isEmpty } from "./Fill";
import { cardImages } from "./images";
import { hasNumber, money } from "./format";
import type { FoodDetails } from "./types";
import styles from "./trip-cards.module.css";

export default function FoodCard({ details: d }: { details: FoodDetails }) {
  const img = cardImages.food;
  const hasLevel = !isEmpty(d.priceLevel);
  const filled = hasLevel ? (d.priceLevel as string).length : 0;
  const rest = Math.max(0, 4 - filled);
  const where = [d.cuisine, d.neighbourhood].filter((x) => !isEmpty(x));

  return (
    <article className={styles.food} data-card="food">
      <div className={styles.foodThumb}>
        <Image src={img.src} alt={img.alt} fill sizes="104px" className={styles.cover} />
      </div>
      <div className={styles.foodInfo}>
        <span className={styles.meal}><Fill value={d.meal} filler="Meal to be confirmed" /></span>
        <h3><Fill value={d.placeName} filler="Restaurant coming soon" /></h3>
        <p>
          {where.length === 2 ? `${d.cuisine} · ${d.neighbourhood}` : (
            <Fill value={where[0] as string | undefined} filler="Cuisine to be confirmed" />
          )}
        </p>
        <div className={styles.range}>
          {hasLevel ? (
            <span aria-label={`Price level: ${filled} out of 4`}>
              {d.priceLevel}
              <i>{"$".repeat(rest)}</i>
            </span>
          ) : (
            <span className={styles.filler} data-filler="true">Price to be confirmed</span>
          )}
          <span className={styles.cost}>
            {" · "}
            {hasNumber(d.estCostForTwoUsd) ? (
              <>about {money(d.estCostForTwoUsd)} for 2</>
            ) : (
              <span className={styles.filler} data-filler="true">Cost to be confirmed</span>
            )}
          </span>
        </div>
        <p className={styles.small}>
          {hasNumber(d.walkFromStayMin) ? (
            <>{d.walkFromStayMin} min walk from your stay</>
          ) : (
            <span className={styles.filler} data-filler="true">Walk time to be confirmed</span>
          )}
        </p>
        <p className={styles.small}><Fill value={d.bookingNote} filler="No booking note" /></p>
      </div>
    </article>
  );
}
