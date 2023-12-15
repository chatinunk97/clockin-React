const ACCESS_TOKEN = "ACCESS_TOKEN";
const ACCESS_TOKEN_DB = "ACCESS_TOKEN_DB";

export const addAccessToken = (token) =>
  localStorage.setItem(ACCESS_TOKEN, token);
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);

export const addAccessTokenDB = (token) =>
  localStorage.setItem(ACCESS_TOKEN_DB, token);

export const getAccessTokenDB = () => localStorage.getItem(ACCESS_TOKEN_DB);
export const removeAccessTokenDB = () =>
  localStorage.removeItem(ACCESS_TOKEN_DB);
