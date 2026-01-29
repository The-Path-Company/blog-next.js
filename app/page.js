import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Scegli il blog da visualizzare</h1>
          <p>
            Una versione usa Strapi, l&apos;altra legge i contenuti creati in
            Decap CMS.
          </p>
        </div>
        <div className={styles.ctas}>
          <Link className={styles.primary} href="/blog-with-strapi">
            Blog con Strapi
          </Link>
          <Link className={styles.secondary} href="/blog-with-decup">
            Blog con Decap
          </Link>
        </div>
      </main>
    </div>
  );
}
