import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.starfield} aria-hidden="true">
        <div className={styles.starsSmall} />
        <div className={styles.starsMedium} />
        <div className={styles.starsLargeA} />
        <div className={styles.starsLargeB} />
      </div>

      <div className={styles.hero}>
        <h1 className={styles.name}>Mika Hassinen</h1>
        <p className={styles.tagline}>Developer. Trekkie. Enthusiast of nebulae with coffee.</p>
      </div>
    </main>
  );
}
