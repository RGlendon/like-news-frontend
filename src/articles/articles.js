import './style.css';

import Menu from '../../scripts/menu';
import Card from '../../scripts/card';
import CardList from '../../scripts/cardList';


const cardContainer = document.querySelector('.result__cards');

const card = new Card();
const cardList = new CardList(cardContainer, card);
let savedArticles = JSON.parse(localStorage.getItem('savedArticles'));

new Menu(document.querySelector('.menu'));


cardList.render(savedArticles, 'saved');

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
});


document.addEventListener('DOMContentLoaded', () => {
  console.log('hello, here are saved articles');
});
