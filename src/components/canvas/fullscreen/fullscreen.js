export default class Fullscreen {
  openFullScreen() {
    const fullscreenCanvas = document.getElementById('preview_cnvs');
    if (fullscreenCanvas) {
      fullscreenCanvas.requestFullscreen();
    }
    return this;
  }

  fullscreenListener() {
    const btn = document.querySelector('.fullscreen_button');

    btn.addEventListener('click', () => {
      this.openFullScreen();
    });
  }
}
