export const store = {
  isLoggedIn: false,
  currentKeyWord: '',
  currentArticles: [],
  savedArticles: [],
  constants: {
    // можно здесь определить все элементы и использовать одну функцию modifyElement для управления
    commonPreloader: document.querySelector('.common-preloader'),
    overlay: document.querySelector('.overlay'),
  }
};


export const storeMethods = {
  isLoggedIn(isLoggedIn) {
    return store.isLoggedIn = isLoggedIn;
  },

  setKeyWord(value) {
    return store.currentKeyWord = value;
  },

  setCurrentArticles(articles) {
    return store.currentArticles = articles;
  },

  setSavedtArticles(articles) {
    return store.savedArticles = articles;
  },

  changeId(index, id) {
    store.savedArticles[index]._id = id;
  },


  modifyElement(elem, elemClass, need) {
    const result = store.constants[elem];

    if (need) {
      result.classList.add(elemClass);
    } else {
      result.classList.remove(elemClass);
    }
  },
};

