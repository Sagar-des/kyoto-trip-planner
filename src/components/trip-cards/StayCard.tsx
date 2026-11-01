import Image from "next/image";
import Fill, { isEmpty } from "./Fill";
import HeartButton from "./HeartButton";
import { cardImages } from "./images";
import { dateRange, hasNumber, money } from "./format";
import type { StayDetails } from "./types";
import styles from "./trip-cards.module.css";

export default function StayCard({ details: d }: { details: StayDetails }) {
  const range = dateRange(d.checkInDate, d.checkOutDate);
  const img = cardImages.stay;
  const where = [d.propertyType, d.neighbourhood].filter((x) => !isEmpty(x));

  return (
    <article className={styles.stay} data-card="stay">
      <div className={styles.stayPhoto}>
        <Image src={img.src} alt={img.alt} fill sizes="(max-width: 480px) 100vw, 440px" className={styles.cover} />
        <HeartButton />
      </div>
      <div className={styles.stayBody}>
        <h3 className={styles.stayDates}>
          {range ? (
            <>
              {range}
              {hasNumber(d.nights) && (
                <span> · {d.nights} night{d.nights === 1 ? "" : "s"}</span>
              )}
            </>
          ) : (
            <span className={styles.filler} data-filler="true">Dates to be confirmed</span>
          )}
        </h3>
        <p className={styles.stayTitle}><Fill value={d.listingTitle} filler="Stay name coming soon" /></p>
        <p>
          {where.length === 2 ? `${d.propertyType} in ${d.neighbourhood}` : (
            <Fill value={where[0] as string | undefined} filler="Location to be confirmed" />
          )}
        </p>
        <p><Fill value={d.highlight} filler="Highlights coming soon" /></p>
        <p>
          {hasNumber(d.guestRating) ? (
            <>
              <span className={styles.star}>★</span> {d.guestRating.toFixed(2)}
              {hasNumber(d.reviewCount) && <> ({d.reviewCount})</>}
            </>
          ) : (
            <span className={styles.filler} data-filler="true">No rating yet</span>
          )}
          {" · "}
          {isEmpty(d.hostFirstName) ? (
            <span className={styles.filler} data-filler="true">Host to be confirmed</span>
          ) : (
            <>Hosted by {d.hostFirstName}</>
          )}
        </p>
        <div className={styles.stayPrice}>
          {hasNumber(d.pricePerNightUsd) ? (
            <>
              <b>{money(d.pricePerNightUsd)} USD</b> night
              {hasNumber(d.totalForTwoNightsUsd) && (
                <> · <span className={styles.underline}>{money(d.totalForTwoNightsUsd)} total</span></>
              )}
            </>
          ) : (
            <span className={styles.filler} data-filler="true">Price to be confirmed</span>
          )}
        </div>
      </div>
    </article>
  );
}
