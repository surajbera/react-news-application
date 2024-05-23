export const getImageUrl = (url: string) => {
  const baseUrl = "https://dev-storm-rest-api.pantheonsite.io";
  return url.startsWith("http") ? url : `${baseUrl}${url}`;
};
