export default class Popup {
  constructor(popup, overlay) {
    this.popup = popup;
    this.overlay = overlay;
    this.button = this.popup.querySelector('.popup__button') || undefined;
    this.popupAuth = this.popup.querySelector('.popup__content-auth');
    this.popupReg = this.popup.querySelector('.popup__content-registration');
    this.popupSuccess = this.popup.querySelector('.popup__content-success');

    document.addEventListener('keydown', (event) => {
      if (this.popup.matches('.popup_is-opened') && event.key === "Escape") {
        this.close();
      }

    });
    document.addEventListener('click', (event) => {
      if (event.target.matches('.popup__close') || event.target === this.overlay) {
        this.close();
      }
      if (event.target.matches('.popup__option_registration')) {
        this.closeAuth();
        this.openReg();
      }
      if (event.target.matches('.popup__option_enter')) {
        this.closeReg();
        this.closeSuccess();
        this.openAuth();
      }
      if (event.target.matches('.popup__button_registration')) {
        event.preventDefault();
        this.closeReg();
        this.openSuccess();
      }
    });
  }


  open() {
    this.popup.classList.add('popup_is-opened');
    this.overlay.classList.add('overlay_is-opened');
  }

  close() {
    // скрываем предупреждения об ошибках
    // const alarms = this.popup.querySelectorAll('.popup__input-container');
    // alarms.forEach(element => {
    //   element.classList.remove('popup__input-container_invalid');
    // });

    this.popup.classList.remove('popup_is-opened');
    this.overlay.classList.remove('overlay_is-opened');
    this.closeAuth();
  }

  openAuth() {
    this.popupAuth.classList.add('popup__content_is-opened');
  }
  closeAuth() {
    this.popupAuth.classList.remove('popup__content_is-opened');
  }

  openReg() {
    this.popupReg.classList.add('popup__content_is-opened');
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
