export default class Overlay {
  constructor(overlay) {
    this.overlay = overlay;
  }

  open() {
    this.overlay.classList.add('overlay_is-opened');
  }

  close() {
    this.overlay.classList.remove('overlay_is-opened');
  }
}

