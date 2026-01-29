import Post from "@/components/Post/Post";

const devBaseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:1337" : "";
const API_BASE =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ??
  process.env.STRAPI_API_URL ??
  devBaseUrl;

async function fetchArticles() {
  if (!API_BASE) {
    return [];
  }

  const endpoint = `${API_BASE.replace(/\/$/, "")}/api/articles?populate=*`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}

export default async function BlogPage() {
  const articles = await fetchArticles();

  return (
    <div>
      {articles.map((article, index) => (
        <Post
          key={article?.id ?? article?.attributes?.slug ?? index}
          article={article}
        />
      ))}
    </div>
  );
}
