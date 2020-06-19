export const store = {
  isLoggedIn: false,
};

export const isLoggedIn = (isLoggedIn) => {
  return store.isLoggedIn = isLoggedIn;
};
