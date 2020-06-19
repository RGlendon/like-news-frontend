import savedArticles from "./savedArticles";
import initialCards from "./initialCards";

export default class CardList {
  constructor(container, card) {
    this.container = container;
    this.card = card;
    this.numberOfClickMore = 0;


    // слушатель на весь контейнер
    this.container.addEventListener('click', this.eventHandler.bind(this), true);
  }


  textSizeDetermination(newCard) {
    const infoContainer = newCard.querySelector('.result__info-container');
    const infoContainerStyle = getComputedStyle(infoContainer);
    const infoContainerHeight = infoContainer.offsetHeight;
    const infoContainerInnerHeight = infoContainerHeight - (parseInt(infoContainerStyle.paddingTop) + parseInt(infoContainerStyle.paddingBottom));
    // console.log(`высота контейнера без padding ${infoContainerInnerHeight}`)

    const dateHeight = newCard.querySelector('.result__date').offsetHeight;
    const title = newCard.querySelector('.result__card-title');
    const titleHeight = title.clientHeight;
    // let titleInfo = title.getBoundingClientRect().height;

    // console.log(titleHeight)
    const description = newCard.querySelector('.result__description');
    const publisherHeight = newCard.querySelector('.result__publisher').offsetHeight;

    // if (dateHeight + titleHeight + descriptionHeight + publisherHeight > infoContainerInnerHeight) {
    // console.log('уменьшить высоту')


    // if (title.clientHeight >= title.scrollHeight * 0.98 && title.clientHeight <= title.scrollHeight * 1.02 ) {
    // if (title.clientHeight === title.scrollHeight - 2 ) {
    const descriptionStyle = getComputedStyle(description);
    const descrPaddingTop = parseInt(descriptionStyle.paddingTop);
    const maxInnerDescriptionHeight = infoContainerInnerHeight - dateHeight - titleHeight - publisherHeight - descrPaddingTop;
    // console.log(maxInnerDescriptionHeight)
    const lineHeight = parseInt(descriptionStyle.lineHeight);
    const maxLinesNumber = Math.floor(maxInnerDescriptionHeight / lineHeight);
    // console.log(maxLinesNumber)

    description.style.display = (maxLinesNumber <= 0) ? 'none' : '-webkit-box';
    description.style.WebkitLineClamp = maxLinesNumber;
    // }

    if (description.style.display === 'none') {
      const titleStyle = getComputedStyle(title);
      const titlePaddingTop = parseInt(titleStyle.paddingTop);
      const maxInnerTitleHeight = infoContainerInnerHeight - dateHeight - publisherHeight - titlePaddingTop;
      // console.log(maxInnerDescriptionHeight)
      const titleLineHeight = parseInt(titleStyle.lineHeight);
      const maxTitleLinesNumber = Math.floor(maxInnerTitleHeight / titleLineHeight);
      title.style.WebkitLineClamp = maxTitleLinesNumber;
    }
    // debugger
    // }
  }

  addCard(card, opt) {
    const newCard = this.card.create(card, opt);
    newCard.dataset.id = card._id;
    this.container.append(newCard);

    this.textSizeDetermination(newCard);
  }

  render(initialCards, opt, btn) {
    const show = opt ? opt.show : null;
    const type = opt ? opt.type : null;

    const first = 3;
    const step = 3;
    let multiplier = null;
    if (650 < window.innerWidth) multiplier = 3;
    // if
    // count = (count === 'more') ? initialCards.length : 3;
    this.numberOfClickMore = (show === 'more') ? ++this.numberOfClickMore : 0;

    if (show !== 'more') this.container.innerHTML = '';

    const from = (show === 'more') ? first * this.numberOfClickMore : 0;
    const to = (show === 'more') ? from + step : first;

    initialCards.forEach((card, index) => {
      if (index >= from && index < to) this.addCard(card, type);
    });

    window.addEventListener('resize', () => {
      this.container.children.forEach(card => {
        this.textSizeDetermination(card);
      })
    });

    // console.log(this.container.children)
    // if (to >= initialCards.length && btn) btn.setAttribute('disabled', true);
    if (to >= initialCards.length && btn) btn.classList.add('elem-hidden');
  }

  eventHandler(event) {
    if (event.target.classList.contains('result__bookmark') || event.target.matches('svg') || event.target.matches('path')) {
      let button = event.target.closest('.result__bookmark');
      let idCard = event.target.closest('.result__card').dataset.id;
      // debugger
      if (!button.matches('.result__bookmark_marked') && !button.disabled) {
        this.card.toggleLike(button);
        savedArticles.push(initialCards.find(item => item._id === +idCard));
        // console.dir(savedArticles);
        // console.dir(initialCards)
      } else if (button.matches('.result__bookmark_marked')) {
        this.card.toggleLike(button);
        savedArticles.splice(savedArticles.indexOf(initialCards.find(item => item._id === +idCard)), 1);
        // console.dir(savedArticles);
      }
    }
  }

  renderLoading(isLoading) {
    const preloader = document.querySelector('.preloader');

    if (isLoading) {
      preloader.classList.remove('elem-hidden');
    } else {
      preloader.classList.add('elem-hidden');
    }
  }

  renderOops(isShown) {
    const oops = document.querySelector('.oops');

    if (isShown) {
      oops.classList.remove('elem-hidden');
    } else {
      oops.classList.add('elem-hidden');
    }
  }

  renderResult(isShown) {
    const result = document.querySelector('.result');

    if (isShown) {
      result.classList.remove('elem-hidden');
    } else {
      result.classList.add('elem-hidden');
    }
  }

  renderList(isShown) {
    const result = document.querySelector('.result__wrapper');

    if (isShown) {
      result.classList.remove('elem-hidden');
    } else {
      result.classList.add('elem-hidden');
    }
  }

  renderError(isShown) {
    const result = document.querySelector('.result__error');

    if (isShown) {
      result.classList.remove('elem-hidden');
    } else {
      result.classList.add('elem-hidden');
    }
  }

}
