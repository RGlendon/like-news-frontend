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

  hideMenuButton() {
    this.header.querySelector('.header__menu-icon_open').classList.add('header__elem-hidden');
  }
  showMenuButton() {
    this.header.querySelector('.header__menu-icon_open').classList.remove('header__elem-hidden');
  }

  hideAuthButton() {
    this.header.querySelector('.header__auth_enter').classList.add('header__elem-hidden');
  }
  showAuthButton() {
    this.header.querySelector('.header__auth_enter').classList.remove('header__elem-hidden');
  }

  showNameButton(name) {
    const nameButton = this.header.querySelector('.header__auth_name');
    nameButton.classList.remove('header__elem-hidden');
    nameButton.firstChild.textContent = name;
  }
  hideNameButton() {
    this.header.querySelector('.header__auth_name').classList.add('header__elem-hidden');
  }

  toggleSavedCard() {
    this.header.querySelector('.header__link_articles').classList.toggle('header__elem-hidden');
  }


  chooseCurrentLink() {
    let currentPath = document.location.pathname;
    // console.log(currentPath)
    return (currentPath === '/index.html' || currentPath === '/')
      ? document.querySelector('.header__link_main')
      : document.querySelector('.header__link_articles');
  }
  activateLink() {
    this.header.querySelectorAll('.header__menu .menu__link').forEach((link) => {
      link.classList.remove('header__link_active');
    });
    this.chooseCurrentLink().classList.add('header__link_active');
  }
  transformLamp() {
    let currentElement = this.chooseCurrentLink();
    let currentElementLeft = currentElement.getBoundingClientRect().left;

    this.lamp.style.width = `${currentElement.offsetWidth}px`;
    this.lamp.style.transform = `translateX(${currentElementLeft - this.menuLeft}px)`;
  };

  activateCurrentLink() {
    this.activateLink();
    this.transformLamp();
  }


}

