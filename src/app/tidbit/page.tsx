import Link from "next/link";
import styles from "./page.module.scss";
import { getTidbitForDate, parseDate, todayDateKey } from "@/lib/tidbit";

export const metadata = {
  title: "Daily Tidbit | Mika Hassinen",
  description: "A fun fact, aphorism, or interesting piece of information — one per day.",
};

export const dynamic = "force-dynamic";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default async function TidbitPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date: dateParam } = await searchParams;
  const dateKey = parseDate(dateParam ?? null) ?? todayDateKey();
  const tidbit = getTidbitForDate(dateKey);

  const [m, d] = dateKey.split("-").map(Number);
  const displayDate = `${monthNames[m - 1]} ${d}`;

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <span className={styles.date}>{displayDate}</span>
        <p className={styles.text}>{tidbit.text}</p>
        {tidbit.source && (
          <span className={styles.source}>— {tidbit.source}</span>
        )}
      </div>
      <Link href="/" className={styles.back}>
        ← Set a course for home
      </Link>
    </main>
  );
}
