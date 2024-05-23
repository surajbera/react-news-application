import { useNewsContext } from "../hooks/useNewsContext";
import NewsCard from "./NewsCard";

export default function NewsList() {
  const { filteredArticles } = useNewsContext();

  if (!filteredArticles.length) {
    return <p className='no-articles-message'>Sorry! No articles found</p>;
  }

  return (
    <ul className='news-card-wrap'>
      {filteredArticles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </ul>
  );
}
