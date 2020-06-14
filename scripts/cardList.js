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

  addCard(card, opt) {
    const newCard = this.card.create(card, opt);
    newCard.dataset.id = card._id;
    this.container.append(newCard);

    const infoContainer = newCard.querySelector('.result__info-container');
    const infoContainerStyle = getComputedStyle(infoContainer);
    const infoContainerHeight = newCard.querySelector('.result__info-container').offsetHeight;
    const infoContainerInnerHeight = infoContainerHeight - (parseInt(infoContainerStyle.paddingTop) + parseInt(infoContainerStyle.paddingBottom));
    // console.log(infoContainerInnerHeight)

    const dateHeight = newCard.querySelector('.result__date').offsetHeight;
    const titleHeight = newCard.querySelector('.result__card-title').offsetHeight;
    // let title = newCard.querySelector('.result__card-title');
    // let titleInfo = title.getBoundingClientRect();
    // let titleHeight = titleInfo.height;
    // console.log(titleHeight)
    const description = newCard.querySelector('.result__description');
    const descriptionHeight = newCard.querySelector('.result__description').offsetHeight;
    const publisherHeight = newCard.querySelector('.result__publisher').offsetHeight;

    if (dateHeight + titleHeight + descriptionHeight + publisherHeight > infoContainerInnerHeight) {
      // console.log('уменьшить высоту')
      const descriptionStyle = getComputedStyle(description);
      const descrPaddingTop = parseInt(descriptionStyle.paddingTop);
      const maxInnerDescriptionHeight = infoContainerInnerHeight - dateHeight - titleHeight - publisherHeight - descrPaddingTop;
      // console.log(maxInnerDescriptionHeight)
      const lineHeight = parseInt(descriptionStyle.lineHeight);
      const maxLinesNumber = Math.floor(maxInnerDescriptionHeight / lineHeight);
      // console.log(maxLinesNumber)
      description.style.WebkitLineClamp = maxLinesNumber;
      // debugger
    }
  }

  render(initialCards, opt, btn) {
    const  show = opt ? opt.show : null;
    const  type = opt ? opt.type : null;

    const first = 3;
    const step = 3;
    let multiplier = null;
    if (650 < window.innerWidth) multiplier = 3;
    // if
    // count = (count === 'more') ? initialCards.length : 3;
    this.numberOfClickMore = (show === 'more') ? ++this.numberOfClickMore : 0;

    const from = (show === 'more') ? first * this.numberOfClickMore : 0;
    const to = (show === 'more') ? from + step : first;

    initialCards.forEach((card, index) => {
      if (index >= from && index < to) this.addCard(card, type);
    });

    if (to >= initialCards.length && btn) btn.setAttribute('disabled', true);
  }

  eventHandler(event) {
    if (event.target.classList.contains('result__bookmark') || event.target.matches('svg') || event.target.matches('path')) {
      let button = event.target.closest('.result__bookmark');
      let idCard = event.target.closest('.result__card').dataset.id;
      if (!button.matches('.result__bookmark_marked')) {
        this.card.toggleLike(button);
        savedArticles.push(initialCards.find(item => item._id === +idCard));
        // console.dir(savedArticles);
        // console.dir(initialCards)
      } else {
        this.card.toggleLike(button);
        savedArticles.splice(savedArticles.indexOf(initialCards.find(item => item._id === +idCard)), 1);
        // console.dir(savedArticles);
      }
    }
  }

}
