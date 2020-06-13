import './style.css';

import Menu from '../scripts/menu';
import Card from '../scripts/card';
import CardList from '../scripts/cardList';
import initialCards from '../scripts/initialCards';
import savedArticles from "../scripts/savedArticles";

const cardContainer = document.querySelector('.result__cards');

const card = new Card();
const cardList = new CardList(cardContainer, card);


new Menu(document.querySelector('.menu'));

cardList.render(initialCards);
// cardList.render();

document.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    e.target.classList.add('button_active');
    setTimeout(() => e.target.classList.remove('button_active'), 200);
  }

  if (e.target.matches('.result__showmore')) {
    console.log('показал новые карты');
    // cardContainer.innerHTML = '';
    cardList.render(initialCards, 'more', e.target);
    // e.target.setAttribute('disabled', true);
  }

  if (e.target.matches('.menu__link')) {
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
  }
});


document.addEventListener('DOMContentLoaded', () => {
  console.dir('hello my friend');
});
