'use client';

import Image from "next/image";
import styles from "./Post.module.css";

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%25' height='100%25' fill='%23f1f3f5'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2399a1a8' font-family='Arial' font-size='32'>No image</text></svg>";

export default function Post({ article }) {
  const data = article?.attributes ?? article ?? {};
  const title = data.title ?? "Senza titolo";
  const description =
    data.description ?? data.excerpt ?? "Nessuna descrizione disponibile.";

  const baseUrl = "http://localhost:1337";
  const imageUrl = `${baseUrl}${article.cover.url}`;

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
