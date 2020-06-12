export default class CardList {
  constructor(container, card) {
    this.container = container;
    this.card = card;
    this.numberOfClickMore = 0;
  }

  addCard(card) {
    const newCard = this.card.create(card);
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
    const first = 3;
    const step = 3;
    let multiplier = null;
    if (650 < window.innerWidth) multiplier = 3;
    // if
    // count = (count === 'more') ? initialCards.length : 3;
    this.numberOfClickMore = (opt === 'more') ? ++this.numberOfClickMore : 0;

    const from = (opt === 'more') ? first * this.numberOfClickMore : 0;
    const to = (opt === 'more') ? from + step : first;

    initialCards.forEach((card, index) => {
      if (index >= from && index < to) this.addCard(card);
    });

    if (to >= initialCards.length && btn) btn.setAttribute('disabled', true);
  }
}
