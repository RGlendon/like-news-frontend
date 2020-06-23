export const store = {
  isLoggedIn: false,
  currentKeyWord: '',
  currentArticles: [],
  savedArticles: [],
};


export class StoreMethods {
  isLoggedIn(isLoggedIn) {
    return store.isLoggedIn = isLoggedIn;
  }

  setKeyWord(value) {
    return store.currentKeyWord = value;
  }

  setCurrentArticles(articles) {
    return store.currentArticles = articles;
  }

  setSavedtArticles(articles) {
    return store.savedArticles = articles;
  }
}

