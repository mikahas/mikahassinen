import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

export const metadata = {
  title: "About | Mika Hassinen",
  description: "Curious about how things work. Systems, devices, ideas, people.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <Image
          src="/mika.jpg"
          alt="Mika Hassinen outdoors on a rocky trail, wearing a flat cap and backpack"
          width={180}
          height={180}
          className={styles.photo}
          priority
        />

        <div className={styles.prose}>
          <p>People usually get introduced with one small detail.</p>

          <blockquote className={styles.introQuotes}>
            <p>&ldquo;The motorcycle guy.&rdquo;</p>
            <p>&ldquo;The plant person.&rdquo;</p>
            <p>&ldquo;The one who builds strange little gadgets.&rdquo;</p>
          </blockquote>

          <p>
            It&apos;s rarely wrong. Just incomplete.
          </p>

          <p>
            A single detail is easy to remember, and it gives a conversation somewhere
            to begin. So that&apos;s where people start. Sometimes they stay there for a
            while, circling around the same topic until there&apos;s not much left to say
            about it.
          </p>

          <p>Eventually the subject runs out.</p>

          <p>That&apos;s usually when things get better.</p>

          <p>
            Because people are never just the one thing they were introduced as.
          </p>

          <p>
            If you stick around long enough, the conversation drifts somewhere else.
            You learn about the other interests, the odd projects, the way someone
            thinks about things. The parts that don&apos;t fit neatly into a quick
            introduction.
          </p>

          <p>Those are usually the interesting parts.</p>

          <div className={styles.divider} aria-hidden="true" />

          <p>So if you&apos;re here wondering who I am, the short version is this:</p>

          <p className={styles.highlight}>
            I&apos;m curious about how things work.<br />
            Systems, devices, ideas, people.
          </p>

          <p>
            Sometimes that curiosity turns into software.<br />
            Sometimes it turns into little experiments that started as a
            simple &ldquo;what happens if&hellip;&rdquo;
          </p>

          <p>
            And sometimes it just turns into a conversation that begins with something
            small and ends somewhere much more interesting.
          </p>

          <p className={styles.closer}>
            That tends to be how the best things start.
          </p>
        </div>

        <Link href="/" className={styles.back}>
          ← Set a course for home
        </Link>
      </article>
    </main>
  );
}
