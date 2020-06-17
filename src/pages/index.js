import './style.css';

import Card from '../scripts/card';
import CardList from '../scripts/cardList';
import Menu from '../scripts/menu';
import Popup from "../scripts/popup";
import FormValidation from "../scripts/formValidation";
import Overlay from "../scripts/overlay";
import initialCards from '../scripts/initialCards';
import savedArticles from "../scripts/savedArticles";
import { authAPI } from "../scripts/api";

const cardContainer = document.querySelector('.result__cards');
const authForm = document.forms.auth;
const registrationForm = document.forms.registration;

const card = new Card();
const cardList = new CardList(cardContainer, card);
const popup = new Popup(document.querySelector('.popup'));
const menu = new Menu(document.querySelector('.header__menu'));
const overlay = new Overlay(document.querySelector('.overlay'));


const validateAuthForm = new FormValidation(authForm);
const validateRegForm = new FormValidation(registrationForm);

menu.transformLamp();
cardList.render(initialCards);


document.addEventListener('click', (e) => {
  if (e.target.matches('.header__auth_enter')) {
    menu.close();
    popup.open();
    popup.openAuth();
    menu.hideMenuButton();
    overlay.open();
  }

  if (e.target.matches('.popup__close') || e.target === overlay.overlay) {
    popup.close();
    overlay.close();
    menu.showMenuButton();
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
    // cardContainer.innerHTML = '';
    cardList.render(initialCards, {show: 'more'}, e.target);
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


function registration(event) {
  event.preventDefault();
  authAPI.signup(registrationForm.elements.email.value, registrationForm.elements.password.value, registrationForm.elements.name.value)
    .then((result) => {
      popup.closeReg();
      popup.openSuccess();
    })
    .catch((err) => {
      let message = err.response.data.message;
      validateRegForm.showCommonError(message)
    })
}

function login(event) {
  event.preventDefault();
  authAPI.signin(authForm.elements.email.value, authForm.elements.password.value)
    .then((result) => {
      console.log(result);
      menu.hideAuthButton();
      menu.showNameButton(result.data.name);
      menu.toggleSavedCard();
      popup.close();
      overlay.close();
    })
    .catch((err) => {
      let message = err.response.data.message;
      validateAuthForm.showCommonError(message)
    })
}

registrationForm.addEventListener('submit', registration);
authForm.addEventListener('submit', login);

document.addEventListener('DOMContentLoaded', () => {
  console.dir('hello my friend');
});
