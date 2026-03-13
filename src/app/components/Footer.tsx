import styles from "./Footer.module.scss";

export default function Footer() {
  const hash = process.env.NEXT_PUBLIC_COMMIT_HASH ?? "unknown";
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO ?? "";
  const href = repo && hash !== "unknown" ? `${repo}/commit/${hash}` : undefined;

  return (
    <footer className={styles.footer}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.build}
          aria-label={`View commit ${hash} on GitHub`}
        >
          build {hash}
        </a>
      ) : (
        <span className={styles.build} aria-label={`Build ${hash}`}>
          build {hash}
        </span>
      )}
    </footer>
  );
}
