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
  loading: true,
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
  const [totalFilteredArticles, setTotalFilteredArticles] = useState<number>(0);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);

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

  const updateCurrentPage = (page: number) => {
    dispatchNewsAction({ type: "SET_PAGE", payload: page });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    dispatchNewsAction({ type: "SET_LOADING", payload: true });

    const initializeData = async () => {
      try {
        const articles = await fetchArticles(source);
        dispatchNewsAction({ type: "SET_ARTICLES", payload: articles });
        dispatchNewsAction({ type: "SET_LOADING", payload: false });
      } catch (error) {
        dispatchNewsAction({ type: "SET_LOADING", payload: false });
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

    // Update total filtered articles
    setTotalFilteredArticles(results.length); // Set the total number of filtered articles

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

    // Calculate the total number of pages
    const totalPages = Math.ceil(results.length / newsState.pagination.itemsPerPage);

    // Adjust the current page if out of range
    const updatedCurrentPage = Math.min(newsState.pagination.currentPage, totalPages) || 1;

    // Update current page if necessary
    if (newsState.pagination.currentPage !== updatedCurrentPage) {
      dispatchNewsAction({ type: "SET_PAGE", payload: updatedCurrentPage });
    }

    // Pagination logic
    const startIndex = (newsState.pagination.currentPage - 1) * newsState.pagination.itemsPerPage;
    const paginatedResults = results.slice(
      startIndex,
      startIndex + newsState.pagination.itemsPerPage
    );

    setFilteredArticles(paginatedResults);
  }, [
    newsState.articles,
    newsState.filters.categories,
    newsState.filters.authors,
    newsState.sorting,
    newsState.pagination.currentPage,
    newsState.pagination.itemsPerPage,
  ]);

  const value = {
    ...newsState,
    filteredArticles,
    totalFilteredArticles,
    updateSortField,
    updateSortOrder,
    updateCategoryFilter,
    updateAuthorFilter,
    updateCurrentPage,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
