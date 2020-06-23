import './articles.css';

import Card from '../../scripts/card';
import CardList from '../../scripts/cardList';
import Menu from '../../scripts/menu';
// import Popup from '../../scripts/popup';
// import FormValidation from '../../scripts/formValidation';
import Overlay from '../../scripts/overlay';
// import initialCards from '../scripts/initialCards';
import savedArticles from '../../scripts/savedArticles';
import ApiFetch from '../../scripts/api/apiFetch';
import ApiNews from "../../scripts/api/apiNews";
import {store, StoreMethods } from "../../scripts/configReduser";

const cardContainer = document.querySelector('.result__cards');

const api = new ApiFetch('http://localhost:3000/v1');
const apiNews = new ApiNews();

const storeMethods = new StoreMethods();
const card = new Card();
const cardList = new CardList(cardContainer, card, api);

const menu = new Menu(document.querySelector('.header__menu'));
const overlay = new Overlay(document.querySelector('.overlay'));


// let savedArticles = JSON.parse(localStorage.getItem('savedArticles'));

// menu.transformLamp();
// cardList.render(savedArticles, {type: 'saved'});


Promise.all([
  // api.getInitialCards(),
  // authAPI.me()
  api.getUserInfo(),
  api.getSavedCards()
])
  .then(([user, cards]) => {
    console.log(cards)
    menu.showNameButton(user.data.name);
    menu.showMenuButton();
    // debugger
    storeMethods.isLoggedIn(true);
    storeMethods.setSavedtArticles(cards.data);
    cardList.render(store.savedArticles, {type: 'saved'});
  })
  .catch((err) => {
    console.dir(err);
    window.location.pathname = '/index.html';
  })
  .finally(() => {
    menu.activateCurrentLink();
  })


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


document.addEventListener('click', (e) => {
  if (e.target.matches('.header__auth_name')) {
    logout();
  }

  if (e.target.matches('.header__menu-icon_open')) {
    menu.open();
    overlay.open();
  }
  if (e.target.matches('.header__menu-icon_close') || e.target === overlay.overlay) {
    menu.close();
    overlay.close();
  }


  if (e.target.matches('.button')) {
    e.target.classList.add('button_active');
    setTimeout(() => e.target.classList.remove('button_active'), 200);
  }


  if (e.target.matches('.result__showmore')) {
    console.log('показал новые карты');
    cardList.render(store.currentArticles, {show: 'more'});
    // e.target.setAttribute('disabled', true);
  }

  // if (e.target.matches('.menu__link')) {
  //   localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
  // }
});


document.addEventListener('keydown', (e) => {
  if (menu.header.matches('.header_menu-is-opened') && e.key === "Escape") {
    menu.close();
    overlay.close();
  }
});


document.addEventListener('DOMContentLoaded', () => {
  console.log('hello, here are saved articles');
});
