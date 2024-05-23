import { useNewsContext } from "../hooks/useNewsContext";
import NewsCard from "./NewsCard";

export default function NewsList() {
  const { articles } = useNewsContext();

  return (
    <ul>
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </ul>
  );
}
