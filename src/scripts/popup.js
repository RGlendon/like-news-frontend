export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this.button = this.popup.querySelector('.popup__button') || undefined;
    this.popupAuth = this.popup.querySelector('.popup__content-auth');
    this.popupReg = this.popup.querySelector('.popup__content-registration');
    this.popupSuccess = this.popup.querySelector('.popup__content-success');

    this.popup.addEventListener('click', (event) => {
      // if (event.target.matches('.popup__close') || event.target === this.overlay) {
      //   this.close();
      // }
      if (event.target.matches('.popup__option_registration')) {
        this.closeAuth();
        this.openReg();
        this.resetForms();
      }
      if (event.target.matches('.popup__option_enter')) {
        this.closeReg();
        this.closeSuccess();
        this.openAuth();
        this.resetForms();
      }
      // if (event.target.matches('.popup__button_registration')) {
      //   event.preventDefault();
      //   this.closeReg();
      //   this.openSuccess();
      // }
    });
  }


  open() {
    this.popup.classList.add('popup_is-opened');
    // не удаляются все error.message, поэтому дополнительно чистим форму
    this.resetForms();
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
    this.closeAuth();
    this.closeReg();
    this.closeSuccess();
    this.resetForms();
  }

  openAuth() {
    this.popupAuth.classList.add('popup__content_is-opened');
    this.popupAuth.querySelector('.popup__input').focus();
  }

  closeAuth() {
    this.popupAuth.classList.remove('popup__content_is-opened');
  }

  openReg() {
    this.popupReg.classList.add('popup__content_is-opened');
    this.popupReg.querySelector('.popup__input').focus();
  }

  closeReg() {
    this.popupReg.classList.remove('popup__content_is-opened');
  }

  openSuccess() {
    this.popupSuccess.classList.add('popup__content_is-opened');
  }

  closeSuccess() {
    this.popupSuccess.classList.remove('popup__content_is-opened');
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

  // renderLoading(isLoading) {
  //   const button = this.popup.querySelector('.popup__button');
  //
  //   if (isLoading) {
  //     button.textContent = 'Загрузка...';
  //   } else {
  //     button.textContent = this.buttonInitialValue;
  //   }
  // }
}
