import { store } from "./configReduser";
import notFoundImage from "../images/noPhoto.jpg";


export default class Card {
  create(card, opt) {
    let {urlToImage, source: {name}} = card;

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
        <a class="result__link" href="${sanitarize(card.url)}" target="_blank">
          <img class="result__image" src="${validateUrl(urlToImage) ? sanitarize(urlToImage) : notFoundImage}" alt="фото">
          <div class="result__info-container">
            <div class="result__info-wrapper">
              <p class="result__date">${dateConversion(sanitarize(card.publishedAt))}</p>
              <h3 class="result__card-title">${sanitarize(card.title)}</h3>
              <p class="result__description">${sanitarize(card.description)}</p>
            </div>
            <p class="result__publisher">${sanitarize(name) || 'источник не указан'}</p>
          </div>
        </a>
          <div class="result__bookmark-container">
          ${!store.isLoggedIn 
            ? `<div class="result__prompt">
                   <p class="result__prompt-text">Войдите, чтобы сохранять статьи</p>
                </div>`
            : ''}
            <button class="result__bookmark" ${!store.isLoggedIn ? 'disabled' : ''}>
              ${opt === 'saved'
                  ? `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15 3H9v2H3v2h18V5h-6V3zM5 9v11a2 2 0 002 2h10a2 2 0 002-2V9h-2v11H7V9H5zm4 0v9h2V9H9zm4 0v9h2V9h-2z" fill="#B6BCBF"/>
                   </svg>`
                  : `<svg width="14" height="19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.382 12.714L1 16.942V1h12v15.942l-5.382-4.228L7 12.228l-.618.486z" stroke-width="2"/>
                   </svg>`
                  }
            </button>
          </div>
        </div>`
    );

    return container.firstElementChild;
  }

  toggleLike(btn) {

    btn.classList.toggle('result__bookmark_marked');
  }
}
