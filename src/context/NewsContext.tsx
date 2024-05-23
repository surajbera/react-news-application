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
    categories: [
      {
        text: "Benzinga",
        checked: false,
      },
      {
        text: "Lambda",
        checked: false,
      },
      {
        text: "Delta",
        checked: false,
      },
      {
        text: "Gamma",
        checked: false,
      },
    ],
    authors: [
      {
        text: "Benzinga Neuro",
        checked: false,
      },
      {
        text: "Werder Helmner",
        checked: false,
      },
      {
        text: "Patrick Wilson",
        checked: false,
      },
    ],
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
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  console.log(newsState);

  const updateCategoryFilter = (categoryText: string) => {
    const updatedCategories = newsState.filters.categories.map((cat) =>
      cat.text === categoryText ? { ...cat, checked: !cat.checked } : cat
    );

    dispatchNewsAction({
      type: "SET_FILTERS",
      payload: { categories: updatedCategories },
    });
  };

  const updateAuthorFilter = (authorText: string) => {
    const updatedAuthors = newsState.filters.authors.map((author) =>
      author.text === authorText ? { ...author, checked: !author.checked } : author
    );

    dispatchNewsAction({
      type: "SET_FILTERS",
      payload: { authors: updatedAuthors },
    });
  };

  const updateSortField = (field: "date" | "title") => {
    dispatchNewsAction({
      type: "SET_SORTING",
      payload: { sortBy: field, sortOrder: newsState.sorting.sortOrder },
    });
  };

  const updateSortOrder = (order: "asc" | "desc") => {
    dispatchNewsAction({
      type: "SET_SORTING",
      payload: { sortBy: newsState.sorting.sortBy, sortOrder: order },
    });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const initializeData = async () => {
      try {
        const articles = await fetchArticles(source);
        dispatchNewsAction({ type: "SET_ARTICLES", payload: articles });
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

  useEffect(() => {
    // Get the checked categories and authors
    const activeCategories = newsState.filters.categories
      .filter((cat) => cat.checked)
      .map((cat) => cat.text);
    const activeAuthors = newsState.filters.authors
      .filter((author) => author.checked)
      .map((author) => author.text);

    // Filter articles based on checked categories or authors
    let results = newsState.articles.filter(
      (article) =>
        (activeCategories.length === 0 || activeCategories.includes(article.source)) &&
        (activeAuthors.length === 0 || activeAuthors.includes(article.author))
    );

    // Sorting logic
    results = results.sort((a, b) => {
      if (newsState.sorting.sortBy === "date") {
        const dateA = new Date(a.date).getTime(); // Convert to milliseconds // remove this - here was the error if .getTIme() was not added
        const dateB = new Date(b.date).getTime(); // Convert to milliseconds
        return newsState.sorting.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (newsState.sorting.sortBy === "title") {
        return newsState.sorting.sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

    setFilteredArticles(results);
  }, [
    newsState.articles,
    newsState.filters.categories,
    newsState.filters.authors,
    newsState.sorting,
  ]);

  const value = {
    ...newsState,
    filteredArticles,
    updateSortField,
    updateSortOrder,
    updateCategoryFilter,
    updateAuthorFilter,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
