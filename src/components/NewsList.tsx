import { useEffect, useRef } from "react";
import { useNewsContext } from "../hooks/useNewsContext";
import NewsCard from "./NewsCard";
import ShimmerUi from "./ShimmerUi";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

// styles
import "../assets/styles/NewsList.scss";

export default function NewsList() {
  const { filteredArticles, loading, updateCurrentPage, pagination, totalFilteredArticles, error } =
    useNewsContext();
  const initialLoadComplete = useRef(false);

  const totalPages = Math.ceil(totalFilteredArticles / pagination.itemsPerPage);

  useEffect(() => {
    if (!loading && filteredArticles.length > 0) {
      initialLoadComplete.current = true;
    }
  }, [loading, filteredArticles.length]);

  if (loading && !initialLoadComplete.current) {
    return <ShimmerUi />;
  }

  if (error) {
    return <p className='error-message'>{error}</p>;
  }

  if (!filteredArticles.length) {
    return <p className='no-articles-message'>Sorry! No articles found</p>;
  }

  return (
    <>
      <ul className='news-card-wrap'>
        {filteredArticles.map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </ul>
      <div className='pagination-controls'>
        <button
          onClick={() => updateCurrentPage(Math.max(1, pagination.currentPage - 1))}
          disabled={pagination.currentPage === 1}
        >
          <IoChevronBackSharp />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => updateCurrentPage(page)}
            disabled={page === pagination.currentPage}
            className={page === pagination.currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => updateCurrentPage(Math.min(totalPages, pagination.currentPage + 1))}
          disabled={pagination.currentPage === totalPages}
        >
          <IoChevronForwardSharp />
        </button>
      </div>
    </>
  );
}
