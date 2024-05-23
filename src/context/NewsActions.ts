import {
  NewsArticle,
  SetArticlesAction,
  SetFiltersAction,
  SetPageAction,
  SetSortingAction,
} from "./NewsTypes";

export function setArticles(articles: NewsArticle[]): SetArticlesAction {
  return { type: "SET_ARTICLES", payload: articles };
}

export function setFilters(filters: {
  categories?: { text: string; checked: boolean }[];
  authors?: { text: string; checked: boolean }[];
}): SetFiltersAction {
  return { type: "SET_FILTERS", payload: filters };
}

export function setSorting(sorting: {
  sortBy: "date" | "title";
  sortOrder: "asc" | "desc";
}): SetSortingAction {
  return { type: "SET_SORTING", payload: sorting };
}

export function setPage(page: number): SetPageAction {
  return { type: "SET_PAGE", payload: page };
}
