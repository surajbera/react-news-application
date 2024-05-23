import { useNewsContext } from "../hooks/useNewsContext";
import NewsCard from "./NewsCard";

export default function NewsList() {
  const { articles } = useNewsContext();

  return (
    <ul className='news-card-wrap'>
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </ul>
  );
}
