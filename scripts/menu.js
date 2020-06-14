export default class Menu {
  constructor(menu) {
    this.menu = menu;
    this.menuLeft = this.menu.getBoundingClientRect().left;
    this.header = this.menu.parentElement;
    this.lamp = document.querySelector('.header__lamp');
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

  transformLamp() {
    let currentPath = document.location.pathname;
    // console.log(currentPath)
    let currentElement = (currentPath === '/')
      ? document.querySelector('.menu__link_main')
      : document.querySelector('.menu__link_articles');
    // console.log(currentElement)
    let currentElementLeft = currentElement.getBoundingClientRect().left;
    //
    this.lamp.style.width = `${currentElement.offsetWidth}px`;
    this.lamp.style.transform = `translateX(${currentElementLeft - this.menuLeft}px)`;

  };
}

