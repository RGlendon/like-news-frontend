import './articles.css';

import Card from '../../scripts/card';
import CardList from '../../scripts/cardList';
import Menu from '../../scripts/menu';
import ApiFetch from '../../scripts/api/apiFetch';
import SavedBlock from "../../scripts/saved";
import {store, storeMethods} from "../../scripts/commonReduser";

const api = new ApiFetch('http://localhost:3000/v1');

const constants = {...store.constants};

const card = new Card();
const cardList = new CardList(document.querySelector('.result__cards'), card, api, store, storeMethods);
const menu = new Menu(document.querySelector('.header__menu'), constants.overlay);
const savedBlock = new SavedBlock(document.querySelector('.saved'));


storeMethods.modifyElement('commonPreloader', 'common-preloader_hidden', false);

Promise.all([
  api.getUserInfo(),
  api.getSavedCards()
])
  .then(([user, cards]) => {
    menu.showNameButton(user.data.name);
    menu.showElement('openIcon', true);
    savedBlock.setName(user.data.name);

    storeMethods.isLoggedIn(true);
    storeMethods.setSavedtArticles(cards.data);
    cardList.render(store.savedArticles, {type: 'saved'});
    savedBlock.setCountArticles(store.savedArticles);
    savedBlock.setKeywords(store.savedArticles);
  })
  .catch((err) => {
    console.dir(err);
    window.location.pathname = '/index.html';
  })
  .finally(() => {
    menu.activateCurrentLink();
    storeMethods.modifyElement('commonPreloader', 'common-preloader_hidden', true);
  });


function logout() {
  api.logout()
    .then((user) => {
      storeMethods.isLoggedIn(false);
      window.location.pathname = '/index.html';
    })
    .catch((err) => {
      console.log(err)
    })
}

function clickHandler(e) {
  if (e.target.matches('.header__auth_name')) {
    logout();
  }

  if (e.target.matches('.header__menu-icon_open') || e.target.matches('.header__menu-icon_open rect')) {
    menu.open();
  }

  if (e.target.matches('.header__menu-icon_close') || e.target.matches('.header__menu-icon_close path') || e.target === constants.overlay) {
    menu.closeWhiteMenu();
  }

  if (e.target.matches('.result__showmore')) {
    cardList.render(store.savedArticles, {type: 'saved', show: 'more'});
  }
}

function keydownHandler(e) {
  if (menu.header.matches('.header_menu-is-opened') && e.key === "Escape") {
    menu.close();
  }
}


document.addEventListener('click', clickHandler);
document.addEventListener('keydown', keydownHandler);

document.addEventListener('DOMContentLoaded', () => {
  console.log('hello, here are saved articles');
});
