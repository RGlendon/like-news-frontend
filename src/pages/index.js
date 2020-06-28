import './style.css';

import Card from '../scripts/card';
import CardList from '../scripts/cardList';
import Menu from '../scripts/menu';
import Popup from '../scripts/popup';
import FormValidation from '../scripts/formValidation';
import ApiFetch from '../scripts/api/apiFetch';
import ApiNews from "../scripts/api/apiNews";
import {store, storeMethods} from "../scripts/commonReduser";

const apiNews = new ApiNews();
// const api = new ApiFetch('http://localhost:4000/v1');
const api = new ApiFetch('https://api.like-news.ga/v1');

const constants = {...store.constants};

const card = new Card();
const cardList = new CardList(document.querySelector('.result__cards'), card, api, store, storeMethods);
const menu = new Menu(document.querySelector('.header__menu'), constants.overlay);
const popup = new Popup(document.querySelector('.popup'), constants.overlay);
// можно передать storeMethods.modifyElement для управления всеми элементами
// const menu = new Menu(document.querySelector('.header__menu'), storeMethods.modifyElement);

const authForm = document.forms.auth;
const registrationForm = document.forms.registration;
const searchForm = document.forms.search;

const validateAuthForm = new FormValidation(authForm);
const validateRegForm = new FormValidation(registrationForm);


storeMethods.modifyElement('commonPreloader', 'common-preloader_hidden', false);

Promise.all([
  api.getUserInfo()
])
  .then((user) => {
    menu.showElement('authButton', false);
    menu.showNameButton(user[0].data.name);
    menu.showElement('savedArticlesLink', true);
    menu.showElement('openIcon', true);
    storeMethods.isLoggedIn(true);
  })
  .catch((err) => {
    console.dir(err);
  })
  .finally(() => {
    menu.activateCurrentLink();
    storeMethods.modifyElement('commonPreloader', 'common-preloader_hidden', true);
  });


function registration(event) {
  event.preventDefault();
  api.signup(registrationForm.elements.email.value, registrationForm.elements.password.value, registrationForm.elements.name.value)
    .then((result) => {
      popup.showElement('popupReg', false);
      popup.showElement('popupSuccess', true);
    })
    .catch((err) => {
      validateRegForm.showCommonError(err.message)
    })
}

function login(event) {
  event.preventDefault();
  api.signin(authForm.elements.email.value, authForm.elements.password.value)
    .then((user) => {
      menu.showElement('authButton', false);
      menu.showNameButton(user.name);
      menu.showElement('savedArticlesLink', true);
      menu.showElement('openIcon', true);
      storeMethods.isLoggedIn(true);
      popup.close();
    })
    .catch((err) => {
      validateAuthForm.showCommonError(err.message)
    })
}

function logout() {
  api.logout()
    .then((user) => {
      menu.showElement('authButton', true);
      menu.showElement('nameButton', false);
      menu.showElement('savedArticlesLink', false);
      storeMethods.isLoggedIn(false);
    })
    .catch((err) => {
      console.log(err)
    })
}

function searchNews(event) {
  event.preventDefault();
  cardList.showElement('resultBlock', true);
  cardList.showElement('preloader', true);
  cardList.showElement('cardsWrapper', false);
  cardList.showElement('oops', false);
  cardList.showElement('errorBlock', false);
  storeMethods.setKeyWord(searchForm.elements.search.value);

  apiNews.getNews(searchForm.elements.search.value)
    .then((result) => {
      if (result.totalResults === 0) {
        cardList.showElement('oops', true);
      } else {
        storeMethods.setCurrentArticles(result.articles);
        cardList.showElement('cardsWrapper', true);
        cardList.render(store.currentArticles);
      }
    })
    .catch((err) => {
      console.dir(err);
      cardList.showElement('errorBlock', true);
      storeMethods.setCurrentArticles([])
    })
    .finally(() => {
      searchForm.reset();
      cardList.showElement('preloader', false);
    });

}


function clickHandler(e) {
  if (e.target.matches('.header__auth_enter')) {
    menu.close();
    menu.showElement('openIcon', false);
    popup.open();
    popup.openAuth();
  }
  if (e.target.matches('.header__auth_name')) {
    logout();
  }

  if (e.target.matches('.header__menu-icon_open') || e.target.matches('.header__menu-icon_open rect')) {
    menu.open();
  }

  if (e.target.matches('.header__menu-icon_close') || e.target.matches('.header__menu-icon_close path') || e.target === constants.overlay) {
    menu.close();
  }

  if (e.target.matches('.popup__close') || e.target === constants.overlay) {
    popup.close();
    menu.showElement('openIcon', true);
  }

  if (e.target.matches('.button')) {
    e.target.classList.add('button_active');
    setTimeout(() => e.target.classList.remove('button_active'), 200);
  }


  if (e.target.matches('.result__showmore')) {
    cardList.render(store.currentArticles, {show: 'more'});
  }
}


function keydownHandler(e) {
  if (!popup.popup.matches('.elem-hidden') && e.key === "Escape") {
    popup.close();
    menu.showElement('openIcon', true);
  }
  if (menu.header.matches('.header_menu-is-opened') && e.key === "Escape") {
    menu.close();
  }
}


registrationForm.addEventListener('submit', registration);
authForm.addEventListener('submit', login);
searchForm.addEventListener('submit', searchNews);

document.addEventListener('click', clickHandler);
document.addEventListener('keydown', keydownHandler);


document.addEventListener('DOMContentLoaded', () => {
  console.dir('hello my friend');
});
