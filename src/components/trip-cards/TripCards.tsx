import StayCard from "./StayCard";
import ExperienceCard from "./ExperienceCard";
import FoodCard from "./FoodCard";
import type { TripCardItem } from "./types";
import styles from "./trip-cards.module.css";

// Drop this inside an assistant chat bubble. Pass the response array as-is.
export default function TripCards({ items }: { items: TripCardItem[] }) {
  return (
    <div className={styles.root}>
      {items.map((item, i) => {
        switch (item.cardType) {
          case "stay":
            return <StayCard key={i} details={item.details} />;
          case "experience":
            return <ExperienceCard key={i} details={item.details} />;
          case "food":
            return <FoodCard key={i} details={item.details} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
