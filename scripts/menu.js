export default class Menu {
  constructor(menu) {
    this.menu = menu;
    this.header = this.menu.parentElement;
    // this.header = this.popup.querySelector('.popup__button') || undefined;
    // this.menuOpenButton = this.header.querySelector('.header__menu-icon_open') || undefined;
    // this.menuCloseButton = this.header.querySelector('.header__menu-icon_close') || undefined;

    document.addEventListener('click', (event) => {
      if (event.target.matches('.header__menu-icon') || event.target.matches('.header__overlay')) {
      // if (event.target.matches('.header__menu-icon')) {
        this.toggleMenu();
      }
    });

    // this.menuOpenButton.addEventListener('click', (event) => {
    //   this.toggleMenu();
    // });
    // this.menuCloseButton.addEventListener('click', (event) => {
    //   this.toggleMenu();
    // });
  }

  toggleMenu() {
    console.log('сработало')
    this.header.classList.toggle('header_menu-is-opened');
  }

  close() {
    //скрываем предупреждения об ошибках
    // const alarms = this.popup.querySelectorAll('.popup__input-container');
    // alarms.forEach(element => {
    //   element.classList.remove('popup__input-container_invalid');
    // });
    //
    // this.popup.classList.remove('popup_is-opened');
  }
}

// const menuButton = document.querySelector('.header__menu-icon');
// const header = document.querySelector('header');
// const menu = document.querySelector('.menu');
//
// menuButton.addEventListener('click', toggleMenu);
