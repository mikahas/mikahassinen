import Link from "next/link";
import styles from "./page.module.scss";

export const metadata = {
  title: "418 — I'm a Teapot | Mika Hassinen",
};

export default function TeapotPage() {
  return (
    <div className={styles.container}>
      <span className={styles.teapot}>☕</span>
      <span className={styles.code}>418</span>
      <h1 className={styles.title}>I&apos;m a teapot.</h1>
      <p className={styles.quote}>&ldquo;There&apos;s coffee in that nebula.&rdquo;</p>
      <p className={styles.attribution}>— Captain Kathryn Janeway, USS Voyager</p>
      <p className={styles.subtitle}>
        This server refuses to brew coffee. It is, and always has been, a teapot.
        RFC 2324 is not a joke. Well, it is. But still.
      </p>
      <Link href="/" className={styles.back}>
        ← Back to the ship
      </Link>
    </div>
  );
}
