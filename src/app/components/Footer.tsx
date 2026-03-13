import styles from "./Footer.module.scss";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  const hash = process.env.NEXT_PUBLIC_COMMIT_HASH ?? "unknown";

  return (
    <footer className={styles.footer}>
      <nav className={styles.links} aria-label="Social links">
        <a
          href="https://linkedin.com/in/mikahassinen"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          in
        </a>
        <span className={styles.dot} aria-hidden="true">·</span>
        <a
          href="https://github.com/mikahas"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          gh
        </a>
      </nav>
      <ThemeToggle />
      <span className={styles.build} aria-label={`Build ${hash}`}>
        build {hash}
      </span>
    </footer>
  );
}
