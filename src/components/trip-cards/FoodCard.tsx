import Image from "next/image";
import Fill, { isEmpty } from "./Fill";
import { cardImages } from "./images";
import type { FoodDetails } from "./types";
import styles from "./trip-cards.module.css";

export default function FoodCard({ details }: { details: FoodDetails }) {
  const img = cardImages.food;
  const hasRange = !isEmpty(details.priceRange);
  const filled = hasRange ? (details.priceRange as string).length : 0;
  const rest = Math.max(0, 4 - filled);

  return (
    <article className={styles.food} data-card="food">
      <div className={styles.foodThumb}>
        <Image src={img.src} alt={img.alt} fill sizes="104px" className={styles.cover} />
      </div>
      <div className={styles.foodInfo}>
        <span className={styles.meal}><Fill value={details.mealType} filler="Meal to be confirmed" /></span>
        <h3><Fill value={details.restaurantName} filler="Restaurant coming soon" /></h3>
        <p><Fill value={details.description} filler="Description coming soon" /></p>
        <div className={styles.range}>
          {hasRange ? (
            <span aria-label={`Price range: ${filled} out of 4`}>
              {details.priceRange}
              <i>{"$".repeat(rest)}</i>
            </span>
          ) : (
            <span className={styles.filler} data-filler="true">Price to be confirmed</span>
          )}
        </div>
      </div>
    </article>
  );
}
