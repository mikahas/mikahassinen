import Starfield from "./Starfield";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Starfield />

      <div className={styles.hero}>
        <h1 className={styles.name}>Mika Hassinen</h1>
        <p className={styles.tagline}>Developer. Trekkie. Enthusiast of nebulae with coffee.</p>
      </div>
    </main>
  );
}
