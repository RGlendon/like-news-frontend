export const store = {
  isLoggedIn: false,
  currentKeyWord: '',
  currentArticles: [],
};


export const isLoggedIn = (isLoggedIn) => {
  return store.isLoggedIn = isLoggedIn;
};
export const setKeyWord = (value) => {
  return store.currentKeyWord = value;
};
export const setArticles = (articles) => {
  return store.currentArticles = articles;
};
