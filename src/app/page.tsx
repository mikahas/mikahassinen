import Starfield from "./Starfield";
import BurgerMenu from "./components/BurgerMenu";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Starfield />
      <BurgerMenu />

      <div className={styles.hero}>
        <h1 className={styles.name}>Mika Hassinen</h1>
        <p className={styles.tagline}>Developer. Trekkie. Enthusiast of nebulae with coffee.</p>
      </div>
    </main>
  );
}
