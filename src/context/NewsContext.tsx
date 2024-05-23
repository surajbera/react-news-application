// libraries
import { createContext, useReducer, useEffect, useState, useCallback } from "react";
import axios from "axios";

// types
import { NewsArticle, NewsContextProviderProps, NewsContextValue, NewsState } from "./NewsTypes";

// reducers
import { newsReducer } from "./NewsReducer";

// services
import { fetchArticles } from "../services/newsService";

const initialState: NewsState = {
  articles: [],
  filters: {
    categories: [],
    authors: [],
  },
  sorting: {
    sortBy: "date",
    sortOrder: "asc",
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 5,
  },
};

export const NewsContext = createContext<NewsContextValue | null>(null);

export const NewsProvider = ({ children }: NewsContextProviderProps) => {
  const [newsState, dispatchNewsAction] = useReducer(newsReducer, initialState);
  console.log(newsState);

  const [fullArticles, setFullArticles] = useState<NewsArticle[]>([]);

  const updateCategoryFilter = useCallback(
    (categoryText: string) => {
      const updatedCategories = newsState.filters.categories.map((cat) =>
        cat.text === categoryText ? { ...cat, checked: !cat.checked } : cat
      );

      dispatchNewsAction({
        type: "SET_FILTERS",
        payload: { ...newsState.filters, categories: updatedCategories },
      });
    },
    [newsState.filters.categories, dispatchNewsAction]
  );

  const updateAuthorFilter = useCallback(
    (authorText: string) => {
      const updatedAuthors = newsState.filters.authors.map((author) =>
        author.text === authorText ? { ...author, checked: !author.checked } : author
      );

      dispatchNewsAction({
        type: "SET_FILTERS",
        payload: { ...newsState.filters, authors: updatedAuthors },
      });
    },
    [newsState.filters.authors, dispatchNewsAction]
  );

  useEffect(() => {
    const source = axios.CancelToken.source();

    const initializeData = async () => {
      try {
        const articles = await fetchArticles(source);
        setFullArticles(articles);
        dispatchNewsAction({ type: "SET_ARTICLES", payload: articles });

        const categories = [...new Set(articles.map((article) => article.source))];
        const authors = [...new Set(articles.map((article) => article.author))];
        dispatchNewsAction({
          type: "SET_FILTERS",
          payload: {
            categories: categories.map((c) => ({ text: c, checked: false })),
            authors: authors.map((a) => ({ text: a, checked: false })),
          },
        });
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Failed to initialize articles:", error);
        }
      }
    };

    initializeData();

    return () => {
      source.cancel("Component unmounted, canceling fetch");
    };
  }, []);

  // useEffect(() => {
  //   const filteredArticles = fullArticles.filter((article) => {
  //     const categoryCheck = newsState.filters.categories.find(
  //       (c) => c.text === article.source && c.checked
  //     );
  //     const authorCheck = newsState.filters.authors.find(
  //       (a) => a.text === article.author && a.checked
  //     );

  //     return categoryCheck || authorCheck;
  //   });

  //   dispatchNewsAction({ type: "SET_ARTICLES", payload: filteredArticles });
  // }, [newsState.filters.categories, newsState.filters.authors, fullArticles]);

  const value = {
    ...newsState,
    updateCategoryFilter,
    updateAuthorFilter,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
