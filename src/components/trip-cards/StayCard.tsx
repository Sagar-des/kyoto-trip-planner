import Image from "next/image";
import Fill, { isEmpty } from "./Fill";
import HeartButton from "./HeartButton";
import { cardImages } from "./images";
import type { StayDetails } from "./types";
import styles from "./trip-cards.module.css";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function parse(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return { y, m: m - 1, d, t: Date.UTC(y, m - 1, d) };
}

// Returns null when either date is missing or not a real date, so the card can show a filler.
function formatRange(checkIn?: string | null, checkOut?: string | null) {
  if (isEmpty(checkIn) || isEmpty(checkOut)) return null;
  const a = parse(checkIn as string);
  const b = parse(checkOut as string);
  if (!a || !b) return null;
  const nights = Math.round((b.t - a.t) / 86400000);
  const start = a.m === b.m ? `${a.d}` : `${a.d} ${MONTHS[a.m]}`;
  return { label: `${start}–${b.d} ${MONTHS[b.m]} ${b.y}`, nights };
}

export default function StayCard({ details }: { details: StayDetails }) {
  const range = formatRange(details.checkIn, details.checkOut);
  const price = details.nightlyPriceUsd;
  const hasPrice = typeof price === "number" && !Number.isNaN(price);
  const img = cardImages.stay;

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
              {range.label}
              <span> · {range.nights} night{range.nights === 1 ? "" : "s"}</span>
            </>
          ) : (
            <span className={styles.filler} data-filler="true">Dates to be confirmed</span>
          )}
        </h3>
        <p className={styles.stayTitle}><Fill value={details.listingTitle} filler="Stay name coming soon" /></p>
        <p><Fill value={details.destination} filler="Destination to be confirmed" /></p>
        <p><Fill value={details.description} filler="Description coming soon" /></p>
        <div className={styles.stayPrice}>
          {hasPrice ? (
            <>
              <b>${price} USD</b> night
              {range && range.nights > 0 && (
                <>
                  {" "}· <span className={styles.underline}>${(price as number) * range.nights} total</span>
                </>
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
