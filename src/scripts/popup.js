export default class Popup {
  constructor(popup, overlay) {
    this.popup = popup;
    this.overlay = overlay;
    this.button = this.popup.querySelector('.popup__button') || undefined;
    this.popupAuth = this.popup.querySelector('.popup__content-auth');
    this.popupReg = this.popup.querySelector('.popup__content-registration');
    this.popupSuccess = this.popup.querySelector('.popup__content-success');

    this.popup.addEventListener('click', (event) => {
      if (event.target.matches('.popup__option_registration')) {
        this.showElement('popupAuth', false);
        this.openReg();
        this.resetForms();
      }
      if (event.target.matches('.popup__option_enter')) {
        this.showElement('popupReg', false);
        this.showElement('popupSuccess', false);
        this.openAuth();
        this.resetForms();
      }
    });
  }

  open() {
    this.showElement('popup', true);
    this.showElement('overlay', true);
    // не удаляются все error.message, поэтому дополнительно чистим форму
    this.resetForms();
  }

  close() {
    this.showElement('popup', false);
    this.showElement('popupAuth', false);
    this.showElement('popupReg', false);
    this.showElement('popupSuccess', false);
    this.resetForms();
    this.showElement('overlay', false);
  }

  openAuth() {
    this.showElement('popupAuth', true);
    this.popupAuth.querySelector('.popup__input').focus();
  }

  openReg() {
    this.showElement('popupReg', true);
    this.popupReg.querySelector('.popup__input').focus();
  }

  resetForms() {
    // скрываем предупреждения об ошибках
    this.popup.querySelectorAll('.popup__input-container').forEach(elem => {
      elem.classList.remove('popup__input-container_invalid');
    });

    this.popup.querySelectorAll('.popup__form').forEach(form => {
      form.reset();
    });
  }

  showElement(elem, isShown) {
    const element = this[elem];

    if (isShown) {
      element.classList.remove('elem-hidden');
    } else {
      element.classList.add('elem-hidden');
    }
  }
}
