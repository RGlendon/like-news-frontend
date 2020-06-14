export default class Menu {
  constructor(menu) {
    this.menu = menu;
    this.header = this.menu.parentElement;
  }

  open() {
    this.header.classList.add('header_menu-is-opened');
  }

  close() {
    this.header.classList.remove('header_menu-is-opened');
  }

  hideButton() {
    this.header.querySelector('.header__menu-icon_open').classList.add('header__btn-hidden');
  }

  showButton() {
    this.header.querySelector('.header__menu-icon_open').classList.remove('header__btn-hidden');
  }
}

