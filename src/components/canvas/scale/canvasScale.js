export default class CanvasScale {
  scaleFn() {
    let scale = 1;

    const canvasBackground = document.querySelector('.canvas_background');
    document.addEventListener('wheel', (event) => {
      if (scale < 0.1) {
        scale = 0.11;
      } else if (scale > 1.3) {
        scale = 1.29;
      }
      if (event.deltaY > 0) {
        scale += 0.05;
      } else scale -= 0.05;

      canvasBackground.style.transform = `scale(${scale})`;
    });
    return this;
  }
}
