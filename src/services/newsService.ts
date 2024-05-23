import axios, { AxiosError } from "axios";
import { NewsArticle } from "../context/NewsTypes";

export const fetchArticles = async (): Promise<NewsArticle[]> => {
  try {
    const response = await axios.get<NewsArticle[]>(
      "https://dev-storm-rest-api.pantheonsite.io/api/v1/news"
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error(
        `Failed to fetch articles: ${axiosError.response.status} ${axiosError.response.statusText}`
      );
      throw new Error(`API responded with a status of ${axiosError.response.status}`);
    } else {
      console.error("Failed to fetch articles:", axiosError.message);
      throw new Error(axiosError.message);
    }
  }
};
