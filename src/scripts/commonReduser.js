export const store = {
  isLoggedIn: false,
  currentKeyWord: '',
  currentArticles: [],
  savedArticles: [],
  constants: {
    commonPreloader: document.querySelector('.common-preloader'),
  }
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

  changeId(index, id) {
    store.savedArticles[index]._id = id;
  }


  showPreloader(elem, isShown) {
    const result = store.constants[elem];

    if (isShown) {
      result.classList.remove('common-preloader_hidden');
    } else {
      result.classList.add('common-preloader_hidden');
    }
  }

  showElement(elem, isShown) {
    const result = store.constants[elem];

    if (isShown) {
      result.classList.remove('elem-hidden');
    } else {
      result.classList.add('elem-hidden');
    }
  }
}

