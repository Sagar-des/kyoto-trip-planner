import Image from "next/image";
import Fill, { isEmpty } from "./Fill";
import HeartButton from "./HeartButton";
import { cardImages } from "./images";
import { hasNumber, hoursLabel, money, weekdayAndDay } from "./format";
import type { ExperienceDetails } from "./types";
import styles from "./trip-cards.module.css";

export default function ExperienceCard({ details: d }: { details: ExperienceDetails }) {
  const img = cardImages.experience;
  const [weekday, dayNum] = weekdayAndDay(d.date) ?? ["Day", "–"];
  const hours = hoursLabel(d.durationHours);
  const soldOut = (d.availability ?? "").toLowerCase().includes("sold");

  return (
    <article className={styles.exp} data-card="experience">
      <div className={styles.expHero}>
        <Image src={img.src} alt={img.alt} fill sizes="(max-width: 480px) 100vw, 440px" className={styles.cover} />
        <div className={styles.expShade} />
        <span className={styles.pill}>
          {hours ?? <span className={styles.filler} data-filler="true">Duration to be confirmed</span>}
        </span>
        <HeartButton />
        <h3 className={styles.expTitle}><Fill value={d.experienceTitle} filler="Experience coming soon" /></h3>
      </div>

      <ol className={styles.days}>
        <li>
          <div className={styles.dchip}>
            <small>{weekday}</small>
            <b>{dayNum}</b>
          </div>
          <p>
            <b className={styles.start}>
              {isEmpty(d.startTime) ? (
                <span className={styles.filler} data-filler="true">Start time to be confirmed</span>
              ) : (
                <>Starts {d.startTime}</>
              )}
            </b>
            <br />
            <span className={styles.sub}><Fill value={d.meetingPoint} filler="Meeting point to be confirmed" /></span>
          </p>
        </li>
      </ol>

      <div className={styles.expFoot}>
        <p className={styles.sub}>
          {hasNumber(d.rating) ? (
            <><span className={styles.star}>★</span> {d.rating.toFixed(2)}</>
          ) : (
            <span className={styles.filler} data-filler="true">No rating yet</span>
          )}
          {" · "}
          <Fill value={d.category} filler="Category to be confirmed" />
          {" · "}
          {isEmpty(d.hostFirstName) ? (
            <span className={styles.filler} data-filler="true">Host to be confirmed</span>
          ) : (
            <>Hosted by {d.hostFirstName}</>
          )}
        </p>
        <div className={styles.expPriceRow}>
          <span>
            {hasNumber(d.pricePerGuestUsd) ? (
              <>
                <b>{money(d.pricePerGuestUsd)}</b> per guest
                {hasNumber(d.totalForTwoGuestsUsd) && <> · {money(d.totalForTwoGuestsUsd)} for 2</>}
              </>
            ) : (
              <span className={styles.filler} data-filler="true">Price to be confirmed</span>
            )}
          </span>
          {isEmpty(d.availability) ? (
            <span className={styles.filler} data-filler="true">Availability to be confirmed</span>
          ) : (
            <span className={styles.badge}>
              <i className={soldOut ? styles.dotOff : styles.dotOn} />
              {d.availability}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
