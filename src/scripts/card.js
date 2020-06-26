import { store } from "./commonReduser";
import notFoundImage from "../images/noPhoto.jpg";


export default class Card {
  create(card, type) {
    const {
      urlToImage = card.image,
      publishedAt = card.date,
      url = card.link,
      description = card.text,
      title,
      source: {name = card.source},
      keyword,
    } = card;
// debugger
    const container = document.createElement('div');

    function sanitarize(string) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
      };
      const reg = /[&<>"'/]/ig;
      return string ? string.replace(reg, (match) => (map[match])) : '';
    }



    function dateConversion(str) {
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      const timeStamp = Date.parse(str);
      const date = new Date(timeStamp);

      return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
    }

    function validateUrl(str) {
      const regExp = /https?:\/\/(www\.)?(\w+(-\w+)*(\.\w+(-\w+)*)*\.[a-z]{2,}|(\d\d?|1\d\d|2[0-5][0-5])(\.(\d\d?|1\d\d|2[0-5][0-5])){3})(:\d{2,5})?([0-9a-z\/]+)?#?/
      return regExp.test(str);
    }

    // console.log(validateUrl(urlToImage));
console.log(store.isLoggedIn)

    container.insertAdjacentHTML('beforeend',
      `<div class="result__card">
        <a class="result__link" href="${sanitarize(url)}" target="_blank">
          <img class="result__image" src="${validateUrl(urlToImage) ? sanitarize(urlToImage) : notFoundImage}" alt="фото">
          <div class="result__info-container">
            <div class="result__info-wrapper">
              <p class="result__date">${dateConversion(sanitarize(publishedAt))}</p>
              <h3 class="result__card-title">${sanitarize(title)}</h3>
              <p class="result__description">${sanitarize(description)}</p>
            </div>
            <p class="result__publisher">${sanitarize(name) || 'источник не указан'}</p>
          </div>
        </a>
        
        <div class="result__deleted elem-hidden"></div>
        
        <div class="result__bookmark-container">
          ${!store.isLoggedIn 
            ? `<div class="result__prompt">
                   <p class="result__prompt-text">Войдите, чтобы сохранять статьи</p>
                </div>`
            : ''}        
          ${type === 'saved'
            ? `<div class="result__prompt result__prompt_saved">
                   <p class="result__prompt-text result__prompt-text_delete">Убрать из сохраненных</p>
                   <p class="result__prompt-text result__prompt-text_restore elem-hidden">Восстановить</p>
                </div>`
            : ''}
          
          ${type === 'saved'
            ? `<button class="result__bookmark result__bookmark_delete">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                   <path clip-rule="evenodd"
                     d="M15 3H9v2H3v2h18V5h-6V3zM5 9v11a2 2 0 002 2h10a2 2 0 002-2V9h-2v11H7V9H5zm4 0v9h2V9H9zm4 0v9h2V9h-2z"
                    />
                 </svg>
               </button>`
            : `<button class="result__bookmark result__bookmark_save" ${!store.isLoggedIn ? 'disabled' : ''}>
                 <svg width="14" height="19" xmlns="http://www.w3.org/2000/svg">
                   <path d="M6.382 12.714L1 16.942V1h12v15.942l-5.382-4.228L7 12.228l-.618.486z" stroke-width="2"/>
                 </svg>
                </button>`
          }

            <button class="result__bookmark result__bookmark_restore elem-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M398 18a8 8 0 00-6-2H152a40 40 0 00-40 40v97l-37 33a8 8 0 000 12l29 26v114a64 64 0 01-24-50 8 8 0 00-8-8H24a8 8 0 00-8 8 128 128 0 0096 124v44a40 40 0 0040 40h304a40 40 0 0040-40V120a8 8 0 00-2-6zm2 25l69 69h-45a24 24 0 01-24-24zM32 296h32a80 80 0 1080-88 8 8 0 00-8 8v14l-44-38 44-38v14a8 8 0 008 8A112 112 0 1132 296zm88 51V238l19 16a8 8 0 0013-6v-23a64 64 0 11-32 122zm360 109a24 24 0 01-24 24H152a24 24 0 01-24-24v-41a128 128 0 00144-127c0-68-53-124-120-128v-24a8 8 0 00-13-6l-11 9V56a24 24 0 0124-24h232v56a40 40 0 0040 40h56z"/>
                </svg>             
<!--              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.5 438.5">-->
<!--                <path-->
<!--                  d="M431.2 230.8c-23.6-75.8-98.3-127.5-188-129V13.1c0-4.1-3.5-7.7-7.6-7.7-1.6 0-3 .5-4.6 1.5L3 172c-3.5 2.5-4 7.1-1.5 10.7l1.5 1.6L231 348a8 8 0 0010.7-1.5c1-1.6 1.6-3.1 1.6-4.6v-88.1c55.3 0 101.9 26.1 118.2 65.5 13.9 33.8 2.6 70.2-30.2 100.4-3 3-3.6 7.7-.5 10.7a8.2 8.2 0 005.6 2.6h6.2c1.5 0 3-.5 4-1.5 75.4-49.7 107.6-127 84.6-200.7z"/>-->
<!--              </svg>-->
            </button>
         </div>
          
          ${type === 'saved'
            ? `<div class="result__keyword-container">
                 <p class="result__keyword">${sanitarize(keyword)}</p>
               </div>`
            : ''}          
          
        </div>`
    );

    return container.firstElementChild;
  }

  toggleLike(btn) {
    btn.classList.toggle('result__bookmark_marked');
  }

  showElement(card, isShown, elem) {
    const element = card.querySelector(`${elem}`);

    if (isShown) {
      element.classList.remove('elem-hidden');
    } else {
      element.classList.add('elem-hidden');
    }
  }

  removeCard(currentCard) {
    this.showElement(currentCard, false, '.result__bookmark_delete');
    this.showElement(currentCard, true, '.result__bookmark_restore');
    this.showElement(currentCard, true, '.result__deleted');
    this.showElement(currentCard, false, '.result__prompt-text_delete');
    this.showElement(currentCard, true, '.result__prompt-text_restore');
  }

  restoreCard(currentCard) {
    this.showElement(currentCard, true, '.result__bookmark_delete');
    this.showElement(currentCard, false, '.result__bookmark_restore');
    this.showElement(currentCard, false, '.result__deleted');
    this.showElement(currentCard, true, '.result__prompt-text_delete');
    this.showElement(currentCard, false, '.result__prompt-text_restore');
  }
}
