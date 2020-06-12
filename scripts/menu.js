export default class Menu {
  constructor(menu) {
    this.menu = menu;
    this.header = this.menu.parentElement;
    this.overlay = document.querySelector('.overlay');

    document.addEventListener('click', (event) => {
      // if (event.target.matches('.header__menu-icon') || event.target.matches('.header__overlay')) {
      if (event.target.matches('.header__menu-icon') || event.target.matches('.overlay')) {
        this.toggleMenu();
      }
    });
  }

  toggleMenu() {
    console.log('сработало');
    this.header.classList.toggle('header_menu-is-opened');
    this.overlay.classList.toggle('overlay_is-opened');
  }
}

