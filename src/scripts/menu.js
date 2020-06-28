export default class Menu {
  constructor(menu, overlay) {
    this.menu = menu;
    this.overlay = overlay;
    this.header = this.menu.parentElement;
    this.openIcon = this.header.querySelector('.header__menu-icon_open');
    this.authButton = this.header.querySelector('.header__auth_enter');
    this.nameButton = this.header.querySelector('.header__auth_name');
    this.mainLink = this.header.querySelector('.header__link_main');
    this.savedArticlesLink = this.header.querySelector('.header__link_articles');
    this.lamp = document.querySelector('.header__lamp');
  }


  open() {
    this.header.classList.add('header_menu-is-opened');
    this.header.classList.remove('header_white');
    this.showElement('overlay', true);
  }

  close() {
    this.header.classList.remove('header_menu-is-opened');
    this.showElement('overlay', false);
  }

  closeWhiteMenu() {
    this.close();
    this.header.classList.add('header_white');
  }

  showNameButton(name) {
    this.showElement('nameButton', true);
    this.nameButton.firstChild.textContent = name;
  }


  showElement(elem, isShown) {
    const element = this[elem];

    if (isShown) {
      element.classList.remove('elem-hidden');
    } else {
      element.classList.add('elem-hidden');
    }
  }


  _chooseCurrentLink() {
    let currentPath = window.location.pathname;
    console.log(currentPath)
    // return (currentPath === '/index.html' || currentPath === '/') ? this.mainLink : this.savedArticlesLink;
    return (currentPath.endsWith('/index.html') || currentPath.endsWith('/')) ? this.mainLink : this.savedArticlesLink;
  }

  _activateLink() {
    this.header.querySelectorAll('.header__menu .menu__link').forEach((link) => {
      link.classList.remove('header__link_active');
    });
    this._chooseCurrentLink().classList.add('header__link_active');
  }

  _transformLamp() {
    let currentElement = this._chooseCurrentLink();
    this.lamp.style.width = `${currentElement.offsetWidth}px`;
    this.lamp.style.transform = `translateX(${currentElement.offsetLeft}px)`;
  };

  activateCurrentLink() {
    this._activateLink();
    this._transformLamp();
  }
}

