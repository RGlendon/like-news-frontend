import './style.css';

import Menu from '../scripts/menu';

new Menu(document.querySelector('.menu'));

document.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    e.target.classList.add('button_active');
    setTimeout(() => e.target.classList.remove('button_active'), 200);
  }
});


document.addEventListener("DOMContentLoaded", function () {
  console.log('hello')
});
