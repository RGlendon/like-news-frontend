export default class Menu {
  constructor(menu) {
    this.menu = menu;
    // this.menuLeft = this.menu.getBoundingClientRect().left;
    this.header = this.menu.parentElement;
    this.lamp = document.querySelector('.header__lamp');
  }

  open() {
    this.header.classList.add('header_menu-is-opened');
    this.header.classList.remove('header_white');
  }
  close() {
    this.header.classList.remove('header_menu-is-opened');
  }
  closeWhiteMenu() {
    this.close();
    this.header.classList.add('header_white');
  }

  hideMenuButton() {
    this.header.querySelector('.header__menu-icon_open').classList.add('elem-hidden');
  }
  showMenuButton() {
    this.header.querySelector('.header__menu-icon_open').classList.remove('elem-hidden');
  }

  hideAuthButton() {
    this.header.querySelector('.header__auth_enter').classList.add('elem-hidden');
  }
  showAuthButton() {
    this.header.querySelector('.header__auth_enter').classList.remove('elem-hidden');
  }

  showNameButton(name) {
    const nameButton = this.header.querySelector('.header__auth_name');
    nameButton.classList.remove('elem-hidden');
    nameButton.firstChild.textContent = name;
  }
  hideNameButton() {
    this.header.querySelector('.header__auth_name').classList.add('elem-hidden');
  }

  toggleSavedCard() {
    this.header.querySelector('.header__link_articles').classList.toggle('elem-hidden');
  }

  showElement(isShown, elem) {
    const element = document.querySelector(`${elem}`);

    if (isShown) {
      element.classList.remove('elem-hidden');
    } else {
      element.classList.add('elem-hidden');
    }
  }


  chooseCurrentLink() {
    let currentPath = window.location.pathname;
    // console.log(currentPath)
    return (currentPath === '/index.html' || currentPath === '/')
      ? document.querySelector('.header__link_main')
      : document.querySelector('.header__link_articles');
  }
  activateLink() {
    this.header.querySelectorAll('.header__menu .menu__link').forEach((link) => {
      // console.log(link)
      link.classList.remove('header__link_active');
    });
    this.chooseCurrentLink().classList.add('header__link_active');
  }
  transformLamp() {
    let currentElement = this.chooseCurrentLink();
    // let currentElementLeft = currentElement.getBoundingClientRect().left;
    // let currentElementLeft = currentElement.offsetLeft;

    this.lamp.style.width = `${currentElement.offsetWidth}px`;
    // this.lamp.style.transform = `translateX(${currentElementLeft - this.menuLeft}px)`;
    this.lamp.style.transform = `translateX(${currentElement.offsetLeft}px)`;
  };

  activateCurrentLink() {
    this.activateLink();
    this.transformLamp();
  }


}

