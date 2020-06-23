import './style.css';

import Card from '../scripts/card';
import CardList from '../scripts/cardList';
import Menu from '../scripts/menu';
import Popup from '../scripts/popup';
import FormValidation from '../scripts/formValidation';
import Overlay from '../scripts/overlay';
import initialCards from '../scripts/initialCards';
import savedArticles from '../scripts/savedArticles';
import ApiFetch from '../scripts/api/apiFetch';
import ApiNews from "../scripts/api/apiNews";
import { store, StoreMethods } from "../scripts/configReduser";

const cardContainer = document.querySelector('.result__cards');
const authForm = document.forms.auth;
const registrationForm = document.forms.registration;
const searchForm = document.forms.search;

const api = new ApiFetch('http://localhost:3000/v1');
const apiNews = new ApiNews();

const storeMethods = new StoreMethods();
const card = new Card();
const cardList = new CardList(cardContainer, card, api);
const popup = new Popup(document.querySelector('.popup'));
const menu = new Menu(document.querySelector('.header__menu'));
const overlay = new Overlay(document.querySelector('.overlay'));

const validateAuthForm = new FormValidation(authForm);
const validateRegForm = new FormValidation(registrationForm);




menu.activateCurrentLink();
// cardList.render(initialCards);


Promise.all([
  // api.getInitialCards(),
  // authAPI.me()
  api.getUserInfo()
])
  .then((user) => {
    // console.log(result[0]);
    // console.log(user[0].data.name);
    menu.hideAuthButton();
    menu.showNameButton(user[0].data.name);
    menu.showElement(true, '.header__link_articles');
    menu.showMenuButton();
    storeMethods.isLoggedIn(true);
  })
  .catch((err) => {
    console.dir(err);
  });


function registration(event) {
  event.preventDefault();
  api.signup(registrationForm.elements.email.value, registrationForm.elements.password.value, registrationForm.elements.name.value)
    .then((result) => {
      popup.closeReg();
      popup.openSuccess();
    })
    .catch((err) => {
      let message = err.message;
      validateRegForm.showCommonError(message)
    })
}

function login(event) {
  event.preventDefault();
  api.signin(authForm.elements.email.value, authForm.elements.password.value)
    .then((user) => {
      menu.hideAuthButton();
      menu.showNameButton(user.name);
      menu.toggleSavedCard();
      menu.showMenuButton();
      storeMethods.isLoggedIn(true);
      popup.close();
      overlay.close();
    })
    .catch((err) => {
      const message = err.message;
      validateAuthForm.showCommonError(message)
    })
}

function logout() {
  api.logout()
    .then((user) => {
      menu.showAuthButton();
      menu.hideNameButton();
      menu.toggleSavedCard();
      storeMethods.isLoggedIn(false);
    })
    .catch((err) => {
      console.log(err)
    })
}

function searchNews(event) {
  event.preventDefault();
  cardList.renderResult(true);
  cardList.renderList(false);
  cardList.renderOops(false);
  cardList.renderError(false);
  cardList.renderLoading(true);
  cardList.showBtn(true);
  storeMethods.setKeyWord(searchForm.elements.search.value);
  apiNews.getNews(searchForm.elements.search.value)
    .then((result) => {
      console.log(result.articles);
      if (result.totalResults === 0) {
        cardList.renderOops(true);
      } else {
        // foundArticles.length = 0;
        storeMethods.setCurrentArticles(result.articles);
        // foundArticles = result.articles;
        // console.log(foundArticles);
        cardList.renderList(true);
        cardList.render(store.currentArticles);
      }
    })
    .catch((err) => {
      console.dir(err);
      cardList.renderError(true);
      storeMethods.setCurrentArticles([])
      // console.log(err);
    })
    .finally(() => {
      searchForm.reset();
      cardList.renderLoading(false);
    });

}

registrationForm.addEventListener('submit', registration);
authForm.addEventListener('submit', login);
searchForm.addEventListener('submit', searchNews);

document.addEventListener('click', (e) => {
  if (e.target.matches('.header__auth_enter')) {
    menu.close();
    popup.open();
    popup.openAuth();
    menu.hideMenuButton();
    overlay.open();
  }
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

  if (e.target.matches('.popup__close') || e.target === overlay.overlay) {
    popup.close();
    overlay.close();
    menu.showMenuButton();
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

  if (e.target.matches('.menu__link')) {
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
  }
});


document.addEventListener('keydown', (e) => {
  if (popup.popup.matches('.popup_is-opened') && e.key === "Escape") {
    popup.close();
    overlay.close();
    menu.showMenuButton();
  }
  if (menu.header.matches('.header_menu-is-opened') && e.key === "Escape") {
    menu.close();
    overlay.close();
  }
});


document.addEventListener('DOMContentLoaded', () => {
  console.dir('hello my friend');
});
