import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import styles from "./page.module.css";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const dateFormatter = new Intl.DateTimeFormat("it-IT", { dateStyle: "medium" });

function buildExcerpt(content, limit = 180) {
  const text = content.replace(/\s+/g, " ").trim();
  if (text.length <= limit) {
    return text;
  }
  return `${text.slice(0, limit).trim()}...`;
}

async function getPosts() {
  let files = [];

  try {
    files = await fs.readdir(POSTS_DIR);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, "");
        const filePath = path.join(POSTS_DIR, file);
        const raw = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(raw);
        const parsedDate = data?.date ? new Date(data.date) : null;
        const date =
          parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : null;

        return {
          slug,
          title: data?.title ?? slug,
          date,
          excerpt: buildExcerpt(content),
        };
      })
  );

  return posts.sort((a, b) => {
    const aTime = a.date ? a.date.getTime() : 0;
    const bTime = b.date ? b.date.getTime() : 0;
    return bTime - aTime;
  });
}

export default async function BlogWithDecupPage() {
  const posts = await getPosts();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Blog con Decap</p>
        <h1 className={styles.title}>Post pubblicati via CMS</h1>
        <p className={styles.subtitle}>
          I contenuti arrivano da <code>content/posts</code>.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className={styles.empty}>Nessun post disponibile.</p>
      ) : (
        <div className={styles.list}>
          {posts.map((post) => (
            <article key={post.slug} className={styles.card}>
              <div className={styles.meta}>
                {post.date ? dateFormatter.format(post.date) : "Data non disponibile"}
              </div>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
