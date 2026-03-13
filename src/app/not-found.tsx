import Link from "next/link";
import styles from "./not-found.module.scss";

function getStardate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 0).getTime();
  const diff = now.getTime() - start;
  const oneDay = 86400000;
  const dayOfYear = Math.floor(diff / oneDay);
  const stardate = ((year - 2323) * 1000 + (dayOfYear / 365) * 1000).toFixed(1);
  return stardate;
}

export default function NotFound() {
  const stardate = getStardate();

  return (
    <div className={styles.container}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>This sector has not been charted.</h1>
      <p className={styles.subtitle}>
        Captain&apos;s log — the page you are looking for does not appear on any
        starmap in the Federation database.
      </p>
      <p className={styles.stardate}>Stardate {stardate}</p>
      <Link href="/" className={styles.back}>
        ← Set a course for home
      </Link>
    </div>
  );
}
