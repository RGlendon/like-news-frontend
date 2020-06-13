export default class Menu {
  constructor(menu, overlay) {
    this.menu = menu;
    this.header = this.menu.parentElement;
    this.overlay = overlay;

    document.addEventListener('click', (event) => {
      if (event.target.matches('.header__menu-icon_open')) {
        this.open();
      }
      if (event.target.matches('.header__menu-icon_close') || event.target === this.overlay) {
        this.close();
      }
    });
  }

  open() {
    this.header.classList.add('header_menu-is-opened');
    this.overlay.classList.add('overlay_is-opened');
  }

  close() {
    this.header.classList.remove('header_menu-is-opened');
    this.overlay.classList.remove('overlay_is-opened');
  }
}

