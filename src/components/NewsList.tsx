import { useEffect, useRef } from "react";
import { useNewsContext } from "../hooks/useNewsContext";
import NewsCard from "./NewsCard";
import ShimmerUi from "./ShimmerUi";

export default function NewsList() {
  const { filteredArticles, loading } = useNewsContext();
  const renderCount = useRef(0);

  useEffect(() => {
    console.log(renderCount.current);
    renderCount.current++;
  });

  if (loading && renderCount.current <= 2) {
    return (
      <>
        <p>Loading Articles...</p>
        <ShimmerUi />
      </>
    );
  }

  if (!filteredArticles.length) {
    if (renderCount.current <= 2) {
      return (
        <>
          <p>Loading Articles...</p>
          <ShimmerUi />
        </>
      );
    }
    if (renderCount.current > 2) {
      return <p className='no-articles-message'>Sorry! No articles found</p>;
    }
  }

  return (
    <ul className='news-card-wrap'>
      <ShimmerUi />
      {filteredArticles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </ul>
  );
}
