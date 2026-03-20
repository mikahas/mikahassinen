"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import styles from "./BurgerMenu.module.scss";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // inert + initial focus
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    if (open) {
      drawer.removeAttribute("inert");
      const first = drawer.querySelector<HTMLElement>(
        "button, a[href], [tabindex]:not([tabindex=\"-1\"])"
      );
      first?.focus();
    } else {
      drawer.setAttribute("inert", "");
    }
  }, [open]);

  // Escape key + focus trap
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href], [tabindex]:not([tabindex=\"-1\"])"
        )
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    burgerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={burgerRef}
        className={styles.burger}
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="nav-drawer"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <div
        className={`${styles.backdrop} ${open ? styles.backdropVisible : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        id="nav-drawer"
        ref={drawerRef}
        className={`${styles.drawer} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!open}
      >
        <button
          className={styles.closeBtn}
          onClick={close}
          aria-label="Close navigation menu"
        >
          ×
        </button>

        <nav aria-label="Main">
          <ul className={styles.navList}>
            <li><Link href="/" onClick={close}>Home</Link></li>
            <li><Link href="/about" onClick={close}>About</Link></li>
            <li><Link href="/api-docs" onClick={close}>API Docs</Link></li>
            <li><Link href="/teapot" onClick={close}>I&apos;m a Teapot</Link></li>
            <li><Link href="/tidbit" onClick={close}>Daily Tidbit</Link></li>
          </ul>
        </nav>

        <div className={styles.divider} aria-hidden="true" />

        <nav aria-label="Social">
          <ul className={styles.navList}>
            <li>
              <a
                href="https://linkedin.com/in/mikahassinen"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/mikahas"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.divider} aria-hidden="true" />

        <ThemeToggle />

        <div className={styles.divider} aria-hidden="true" />

        <nav aria-label="Curiosities">
          <ul className={`${styles.navList} ${styles.easterEggs}`}>
            <li>
              <Link href="/admin" onClick={close}>
                Admin Panel <span aria-hidden="true">·</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
