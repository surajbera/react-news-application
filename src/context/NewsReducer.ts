import { NewsState, NewsAction } from "./NewsTypes";

export function newsReducer(state: NewsState, action: NewsAction): NewsState {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.payload,
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_SORTING":
      return {
        ...state,
        sorting: {
          ...state.sorting,
          ...action.payload,
        },
      };
    case "SET_PAGE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload,
        },
      };
    case "SET_ERROR": // Handle error state
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
