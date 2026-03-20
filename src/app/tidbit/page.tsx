import Link from "next/link";
import styles from "./page.module.scss";
import { tidbits } from "@/data/tidbits";

export const metadata = {
  title: "Daily Tidbit | Mika Hassinen",
  description: "A fun fact, aphorism, or interesting piece of information — one per day.",
};

function getTodaysTidbit() {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const dateKey = `${mm}-${dd}`;

  const exact = tidbits.find((t) => t.date === dateKey);
  if (exact) return { ...exact, dateKey };

  // Same deterministic fallback as the API
  let h = 0;
  for (let i = 0; i < dateKey.length; i++) {
    h = (h * 31 + dateKey.charCodeAt(i)) | 0;
  }
  const index = Math.abs(h) % tidbits.length;
  return { ...tidbits[index], date: dateKey, dateKey };
}

export const dynamic = "force-dynamic";

export default function TidbitPage() {
  const tidbit = getTodaysTidbit();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const [m, d] = tidbit.dateKey.split("-").map(Number);
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
