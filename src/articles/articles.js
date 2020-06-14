import './style.css';

import Menu from '../../scripts/menu';
import Card from '../../scripts/card';
import CardList from '../../scripts/cardList';
import Overlay from "../../scripts/overlay";

const cardContainer = document.querySelector('.result__cards');

const card = new Card();
const cardList = new CardList(cardContainer, card);

const menu = new Menu(document.querySelector('.menu'));
const overlay = new Overlay(document.querySelector('.overlay'));

let savedArticles = JSON.parse(localStorage.getItem('savedArticles'));


cardList.render(savedArticles, {type: 'saved'});


document.addEventListener('click', (e) => {
  if (e.target.matches('.header__menu-icon_open')) {
    menu.open();
    overlay.open();
  }
  if (e.target.matches('.header__menu-icon_close') || e.target === overlay.overlay) {
    menu.close();
    overlay.close();
  }


  if (e.target.matches('.result__showmore')) {
    cardList.render(savedArticles, {show: 'more', type: 'saved'}, e.target);
  }

  if (e.target.matches('.menu__link')) {
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
  }
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
