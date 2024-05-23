import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

export const useNewsContext = () => {
  const newsCtx = useContext(NewsContext);

  if (!newsCtx) throw new Error("useNewsContext must be used within a NewsContextProvider");

  return newsCtx;
};
