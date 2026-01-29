import Post from "@/components/Post/Post";

export default async function BlogPage() {
  const response = await fetch("http://localhost:1337/api/articles?populate=*");
  const articles = await response.json();

    return (
        <div>
            {articles.data.map((article) => <Post key={article.id} article={article} />)}
        </div>
    )
}

