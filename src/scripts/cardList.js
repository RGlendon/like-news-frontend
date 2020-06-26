export default class CardList {
  constructor(container, card, api, store, storeMethods) {
    this.container = container;
    this.card = card;
    this.api = api;
    this.store = store;
    this.storeMethods = storeMethods;
    this.preloader = document.querySelector('.preloader');
    this.resultBlock = document.querySelector('.result');
    this.cardsWrapper = document.querySelector('.result__cards-wrapper');
    this.oops = document.querySelector('.oops');
    this.errorBlock = document.querySelector('.result__error');
    this.showMoreBtn = document.querySelector('.result__showmore');
    this.numberOfClickMore = 0;


    // слушатель на весь контейнер
    this.container.addEventListener('click', this.eventHandler.bind(this), true);

    window.addEventListener('resize', () => {
      this.container.children.forEach(card => {
        this._textSizeDetermination(card);
      });
    });
  }


  _textSizeDetermination(newCard) {
    const infoContainer = newCard.querySelector('.result__info-container');
    const infoContainerStyle = getComputedStyle(infoContainer);
    const infoContainerHeight = infoContainer.offsetHeight;
    const infoContainerInnerHeight = infoContainerHeight - (parseInt(infoContainerStyle.paddingTop) + parseInt(infoContainerStyle.paddingBottom));

    const dateHeight = newCard.querySelector('.result__date').offsetHeight;

    const title = newCard.querySelector('.result__card-title');
    const titleHeight = title.clientHeight;

    const publisherHeight = newCard.querySelector('.result__publisher').offsetHeight;

    const description = newCard.querySelector('.result__description');
    const descriptionStyle = getComputedStyle(description);
    const descrPaddingTop = parseInt(descriptionStyle.paddingTop);
    const maxInnerDescriptionHeight = infoContainerInnerHeight - dateHeight - titleHeight - publisherHeight - descrPaddingTop;
    const lineHeight = parseInt(descriptionStyle.lineHeight);
    const maxLinesNumber = Math.floor(maxInnerDescriptionHeight / lineHeight);
    description.style.display = (maxLinesNumber <= 0) ? 'none' : '-webkit-box';
    description.style.WebkitLineClamp = maxLinesNumber;

    if (description.style.display === 'none') {
      const titleStyle = getComputedStyle(title);
      const titlePaddingTop = parseInt(titleStyle.paddingTop);
      const maxInnerTitleHeight = infoContainerInnerHeight - dateHeight - publisherHeight - titlePaddingTop;
      const titleLineHeight = parseInt(titleStyle.lineHeight);
      const maxTitleLinesNumber = Math.floor(maxInnerTitleHeight / titleLineHeight);
      title.style.WebkitLineClamp = maxTitleLinesNumber;
    }
  }

  addCard(card, {type, index}) {
    const newCard = this.card.create(card, type);
    newCard.dataset.number = index;
    this.container.append(newCard);

    this._textSizeDetermination(newCard);
  }

  render(initialCards, opt) {
    const show = opt ? opt.show : null;
    const type = opt ? opt.type : null;

    // можно переопределить шаг
    // const multiplier = (350 < window.innerWidth) ? 3 : (650 < window.innerWidth) ? 2 : 3;
    const first = 3;
    const step = 3;

    this.numberOfClickMore = (show === 'more') ? ++this.numberOfClickMore : 0;

    if (show !== 'more') this.container.innerHTML = '';

    const from = (show === 'more') ? first * this.numberOfClickMore : 0;
    const to = (show === 'more') ? from + step : first;

    initialCards.forEach((card, index) => {
      if (index >= from && index < to) this.addCard(card, {type, index});
    });

    if (to >= initialCards.length) {
      this.showElement('showMoreBtn', false);
    } else {
      this.showElement('showMoreBtn', true);
    }


  }

  eventHandler(event) {
    if (event.target.classList.contains('result__bookmark') || event.target.matches('svg') || event.target.matches('path')) {
      const button = event.target.closest('.result__bookmark');
      const currentCard = event.target.closest('.result__card');
      const cardNumber = currentCard.dataset.number;

      if (button.matches('.result__bookmark_save') && !button.matches('.result__bookmark_marked') && !button.disabled) {
        const {
          urlToImage: image, publishedAt: date, title, description: text, url: link, source: {name: source}
        } = this.store.currentArticles[cardNumber];
        const data = {keyword: this.store.currentKeyWord, image, date, title, text, source, link};

        this.api.likeArticle(data)
          .then((article) => {
            this.card.toggleLike(button);
            currentCard.dataset.id = article.data._id;
          })
          .catch((err) => {
            console.dir(err)
          });

      } else if (button.matches('.result__bookmark_marked')) {
        const cardId = currentCard.dataset.id;
        this.api.dislikeArticle(cardId)
          .then((article) => {
            this.card.toggleLike(button);
          })
          .catch((err) => {
            console.dir(err)
          });

      } else if (button.matches('.result__bookmark_delete')) {
        const cardId = this.store.savedArticles[cardNumber]._id;

        this.api.dislikeArticle(cardId)
          .then((article) => {
            this.card.removeCard(currentCard)
          })
          .catch((err) => {
            console.dir(err)
          });

      } else if (button.matches('.result__bookmark_restore')) {
        const { keyword, image, date, title, text, source, link } = this.store.savedArticles[cardNumber];
        const data = {keyword, image, date, title, text, source, link};

        this.api.likeArticle(data)
          .then((article) => {
            this.card.restoreCard(currentCard);
            this.storeMethods.changeId(cardNumber, article.data._id);
          })
          .catch((err) => {
            console.dir(err)
          });
      }
    }
  }

  showElement(elem, isShown) {
    const element = this[elem];

    if (isShown) {
      element.classList.remove('elem-hidden');
    } else {
      element.classList.add('elem-hidden');
    }
  }
}
