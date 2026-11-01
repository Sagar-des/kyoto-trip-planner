import Image from "next/image";
import Fill, { isEmpty } from "./Fill";
import HeartButton from "./HeartButton";
import { cardImages } from "./images";
import type { ExperienceDetails } from "./types";
import styles from "./trip-cards.module.css";

export default function ExperienceCard({ details }: { details: ExperienceDetails }) {
  const img = cardImages.experience;
  const rows = details.dayPlan && details.dayPlan.length > 0 ? details.dayPlan : [{}];

  return (
    <article className={styles.exp} data-card="experience">
      <div className={styles.expHero}>
        <Image src={img.src} alt={img.alt} fill sizes="(max-width: 480px) 100vw, 440px" className={styles.cover} />
        <div className={styles.expShade} />
        <span className={styles.pill}><Fill value={details.duration} filler="Duration to be confirmed" /></span>
        <HeartButton />
        <h3 className={styles.expTitle}><Fill value={details.activityName} filler="Activity coming soon" /></h3>
      </div>
      <ol className={styles.days}>
        {rows.map((d, i) => {
          const [weekday, dayNum] = isEmpty(d.day) ? ["Day", "–"] : (d.day as string).split(" ");
          return (
            <li key={i}>
              <div className={styles.dchip}>
                <small>{weekday}</small>
                <b>{dayNum ?? ""}</b>
              </div>
              <p><Fill value={d.plan} filler="Plan to be confirmed" /></p>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
