const {isEmail} = require('validator');
import {validatePassword} from './helpers/validations';

const errorMessage = {
  must: 'Это обязательное поле',
  password: 'Пароль должен содержать как минимун одну прописную и заглавную буквы, цифру. Минимальная длина 8 символов',
  length: 'Должно быть от 2 до 30 символов',
  email: 'Неправильный формат email',
  ok: '',
};


export default class FormValidation {
  constructor(form) {
    this.form = form;
    this.button = form.querySelector('button');

    this.form.addEventListener('input', (event) => {
      this.validate.bind(this)(event);
      this.hideCommonError();
    });
    this.form.elements.forEach(elem => {
      if (!elem.matches('button')) {
        elem.addEventListener('blur', this.validate.bind(this));
      }
    });
  }

  validate(event) {
    this.setSubmitButtonState(this.form, this.button);

    if (this.checkInputValidity(event.target)) {
      return this.activateError(event.target);
    }
    return this.resetError(event.target);
  }

  activateError(elem) {
    elem.parentElement.classList.add('popup__input-container_invalid');
  }

  resetError(elem) {
    elem.parentElement.classList.remove('popup__input-container_invalid');
  }

  checkInputValidity(elem) {
    const errorElem = this.form.querySelector(`.popup__error-message_${elem.name}`);

    // console.dir(elem);
    // if (elem.validity.typeMismatch) {
    if (elem.validity.valueMissing) {
      return errorElem.textContent = errorMessage.must;
    }
    if (elem.name === 'email' && !isEmail(elem.value)) {
      return errorElem.textContent = errorMessage.email;
    }
    if (elem.name === 'password' && !validatePassword(elem.value)) {
      return errorElem.textContent = errorMessage.password;
    }
    if ((elem.value.length < 2 || elem.value.length > 30)) {
      return errorElem.textContent = errorMessage.length;
    }
    return errorElem.textContent = errorMessage.ok;
  }

  setSubmitButtonState(form, button) {
    let isValid = true;

    form.elements.forEach((item) => {
      if (!item.matches('.button')) {
        if (this.checkInputValidity(item)) {
          isValid = false;
        }
      }
    });

    if (isValid) {
      return button.removeAttribute('disabled');
    }

    return button.setAttribute('disabled', '');
  }

  showCommonError(message) {
    if (!this.lastErrorSpan) {
      const errorSpans = this.form.querySelectorAll('.popup__error-message');
      this.lastErrorSpan = errorSpans[errorSpans.length - 1];
    }
    this.lastErrorSpan.classList.add('popup__error-message_common');
    this.lastErrorSpan.textContent = message;
  }

  hideCommonError() {
    if (this.lastErrorSpan) {
      this.lastErrorSpan.classList.remove('popup__error-message_common');
    }
  }

}
