import { useEffect, useRef } from "react";
import { useNewsContext } from "../hooks/useNewsContext";
import NewsCard from "./NewsCard";
import ShimmerUi from "./ShimmerUi";

export default function NewsList() {
  const { filteredArticles, loading } = useNewsContext();
  const initialLoadComplete = useRef(false);

  useEffect(() => {
    if (!loading && filteredArticles.length > 0) {
      initialLoadComplete.current = true;
    }
  }, [loading, filteredArticles.length]);

  if (loading && !initialLoadComplete.current) {
    return (
      <>
        <ShimmerUi />
        <ShimmerUi />
        <ShimmerUi />
        <ShimmerUi />
      </>
    );
  }

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
