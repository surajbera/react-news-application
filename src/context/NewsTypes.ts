import { ReactNode } from "react";

export interface NewsArticle {
  title: string;
  url: string;
  image: string;
  date: string;
  body: string;
  source: string;
  author: string;
}

export interface NewsState {
  articles: NewsArticle[];
  error: string | null;
  loading: boolean;
  filters: {
    categories: { text: string; checked: boolean }[];
    authors: { text: string; checked: boolean }[];
  };
  sorting: {
    sortBy: "date" | "title";
    sortOrder: "asc" | "desc";
  };
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface NewsContextValue extends NewsState {
  filteredArticles: NewsArticle[];
  totalFilteredArticles: number;
  updateAuthorFilter: (author: string) => void;
  updateCategoryFilter: (category: string) => void;
  updateSortField: (field: "date" | "title") => void;
  updateSortOrder: (order: "asc" | "desc") => void;
  updateCurrentPage: (page: number) => void;
}

// Actions to manipulate the central state
export type SetArticlesAction = { type: "SET_ARTICLES"; payload: NewsArticle[] };
export type SetFiltersAction = {
  type: "SET_FILTERS";
  payload: {
    categories?: { text: string; checked: boolean }[];
    authors?: { text: string; checked: boolean }[];
  };
};
export type SetSortingAction = {
  type: "SET_SORTING";
  payload: { sortBy: "date" | "title"; sortOrder: "asc" | "desc" };
};
export type SetPageAction = { type: "SET_PAGE"; payload: number };
export type SetLoadingAction = { type: "SET_LOADING"; payload: boolean };
export type SetErrorAction = { type: "SET_ERROR"; payload: string | null };

export type NewsAction =
  | SetArticlesAction
  | SetFiltersAction
  | SetSortingAction
  | SetPageAction
  | SetLoadingAction
  | SetErrorAction;

export type NewsContextProviderProps = {
  children: ReactNode;
};
