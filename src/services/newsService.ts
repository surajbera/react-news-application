import axios, { AxiosError, CancelTokenSource } from "axios";
import { NewsArticle } from "../context/NewsTypes";

export const fetchArticles = async (cancelToken: CancelTokenSource): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get<NewsArticle[]>(
      "https://dev-storm-rest-api.pantheonsite.io/api/v1/news",
      {
        cancelToken: cancelToken.token,
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axios.isCancel(error)) {
      console.log("Request canceled:", axiosError.message);
      throw new Error("Request canceled by the user.");
    } else if (axiosError.response) {
      console.error(
        `Failed to fetch articles: ${axiosError.response.status} ${axiosError.response.statusText}`
      );
      throw new Error("Failed to fetch articles. Please check the network or contact support.");
    } else {
      console.error("Failed to fetch articles:", axiosError.message);
      throw new Error("Failed to fetch articles. Please try again later.");
    }
  }
};
