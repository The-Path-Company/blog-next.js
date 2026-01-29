import Post from "@/components/Post/Post";
import StrapiPlaceholder from "@/components/StrapiPlaceholder/StrapiPlaceholder";
import StrapiPostContainer from "@/components/StrapiPostContainer/StrapiPostContainer";

const devBaseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:1337" : "";
const API_BASE =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ??
  process.env.STRAPI_API_URL ??
  devBaseUrl;

async function fetchArticles() {
  if (!API_BASE) {
    return { articles: [], hasError: true };
  }

  const endpoint = `${API_BASE.replace(/\/$/, "")}/api/articles?populate=*`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
      return { articles: [], hasError: true };
    }
    const data = await response.json();
    return {
      articles: Array.isArray(data?.data) ? data.data : [],
      hasError: false,
    };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return { articles: [], hasError: true };
  }
}

export default async function BlogPage() {
  const { articles, hasError } = await fetchArticles();

  if (hasError) {
    return <StrapiPlaceholder />;
  }

  return (
    <StrapiPostContainer>
      {articles.map((article, index) => (
        <Post
          key={article?.id ?? article?.attributes?.slug ?? index}
          article={article}
        />
      ))}
    </StrapiPostContainer>
  );
}
