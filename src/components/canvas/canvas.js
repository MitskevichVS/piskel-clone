/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
import * as url from '../img/canvas-background-light.png';

export default class Canvas {
  constructor() {
    this.state = {
      currentListeners: [],
    };
  }

  RGBToHex(r, g, b) {
    console.log(this);
    let R = r.toString(16);
    let G = g.toString(16);
    let B = b.toString(16);
    // let A = Math.round(a * 255).toString(16);

    if (R.length === 1) R = `0${R}`;
    if (G.length === 1) G = `0${G}`;
    if (B.length === 1) B = `0${B}`;
    // if (A.length === 1) A = `0${A}`;

    console.log(`#${R}${G}${B}`);
    return `#${R}${G}${B}`;
  }

  addCanvasBackground(app) {
    const canvasBackground = document.querySelector('.canvas_background');
    canvasBackground.style.backgroundImage = url;

    canvasBackground.style.backgroundSize = `${(3200 / app.canvasSize)}px`;
    return this;
  }

  removeEventListenersCanvas(app) {
    const canvas = document.querySelector(`#cnvs${app.currentLayer}`);
    const auxCanvas = document.querySelector(`#aux_cnvs${app.currentLayer}`);
    this.state.currentListeners.forEach((item) => {
      canvas.removeEventListener(item[0], item[1]);
      auxCanvas.removeEventListener(item[0], item[1]);
    });
  }

  pendraw(app) {
    this.removeEventListenersCanvas(app);
    const canvas = document.getElementById(`cnvs${app.currentLayer}`);
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    let draw = false;
    let leftButtonFlag = false;
    let rightButtonFlag = false;

    const penToolMousedown = (event) => {
      this.state.currentListeners.push(['mousedown', penToolMousedown]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      draw = true;
      if (event.button === 0) {
        ctx.fillStyle = app.primaryColor;
        leftButtonFlag = true;
      } else {
        ctx.fillStyle = app.secondaryColor;
        rightButtonFlag = true;
      }
      ctx.fillRect(mouse.x, mouse.y, app.penSize, app.penSize);
    };

    const penToolMousemove = (event) => {
      this.state.currentListeners.push(['mousemove', penToolMousemove]);
      if (draw === true) {
        mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
        mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
        if (leftButtonFlag === true) {
          ctx.fillStyle = app.primaryColor;
        } else if (rightButtonFlag === true) {
          ctx.fillStyle = app.secondaryColor;
        }
        ctx.fillRect(mouse.x, mouse.y, app.penSize, app.penSize);
      }
    };

    const penToolMouseup = (event) => {
      this.state.currentListeners.push(['mouseup', penToolMouseup]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      if (event.button === 0) {
        ctx.fillStyle = app.primaryColor;
      } else {
        ctx.fillStyle = app.secondaryColor;
      }
      ctx.fillRect(mouse.x, mouse.y, app.penSize, app.penSize);
      draw = false;
      leftButtonFlag = false;
      rightButtonFlag = false;
    };

    canvas.addEventListener('mousedown', penToolMousedown);

    canvas.addEventListener('mousemove', penToolMousemove);

    canvas.addEventListener('mouseup', penToolMouseup);

    canvas.addEventListener('mouseleave', () => { draw = false; });

    canvas.addEventListener('contextmenu', event => event.preventDefault());
  }

  eraser(app) {
    this.removeEventListenersCanvas(app);
    const canvas = document.getElementById(`cnvs${app.currentLayer}`);
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    let erase = false;

    const eraseToolMousedown = (event) => {
      this.state.currentListeners.push(['mousedown', eraseToolMousedown]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      erase = true;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(mouse.x, mouse.y, app.penSize, app.penSize);
    };

    const eraseToolMousemove = (event) => {
      this.state.currentListeners.push(['mousemove', eraseToolMousemove]);
      if (erase === true) {
        mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
        mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillRect(mouse.x, mouse.y, app.penSize, app.penSize);
      }
    };

    const eraseToolMouseup = (event) => {
      this.state.currentListeners.push(['mouseup', eraseToolMouseup]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(mouse.x, mouse.y, app.penSize, app.penSize);
      ctx.globalCompositeOperation = 'source-over';
      erase = false;
    };

    canvas.addEventListener('mousedown', eraseToolMousedown);

    canvas.addEventListener('mousemove', eraseToolMousemove);

    canvas.addEventListener('mouseup', eraseToolMouseup);

    canvas.addEventListener('mouseleave', () => { erase = false; });

    canvas.addEventListener('contextmenu', event => event.preventDefault());
  }

  paintBucket(app) {
    this.removeEventListenersCanvas(app);
    const canvas = document.getElementById(`cnvs${app.currentLayer}`);
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    let leftFlag = true;
    let rightFlag = true;
    const stack = [];

    const goUp = (mous, R, G, B, A) => {
      if (mous.y === 0) return;
      let Rn = R;
      let Bn = B;
      let Gn = G;
      let An = A;
      let ycoord = mous.y;
      while (ycoord >= 1 && R === Rn && G === Gn && B === Bn && A === An) {
        const cnvs = ctx.getImageData(mous.x, ycoord - 1, 1, 1).data;
        Rn = cnvs[0];
        Bn = cnvs[1];
        Gn = cnvs[2];
        An = cnvs[3];
        if (ycoord >= 1 && R === Rn && G === Gn && B === Bn && A === An) {
          ycoord -= 1;
        } else if (ycoord === 0 || R !== Rn || G !== Gn || B !== Bn || A !== An) {
          break;
        }
      }
      mouse.y = ycoord;
    };

    const watchLeftPixel = (mous, R, G, B, A) => {
      const cnvs = ctx.getImageData(mous.x - 1, mous.y, 1, 1).data;
      const Rn = cnvs[0];
      const Bn = cnvs[1];
      const Gn = cnvs[2];
      const An = cnvs[3];
      if (R === Rn && G === Gn && B === Bn && A === An && mous.x >= 0 && mous.x < app.canvasSize) {
        return true;
      } return false;
    };

    const watchRightPixel = (mous, R, G, B, A) => {
      const cnvs = ctx.getImageData(mous.x + 1, mous.y, 1, 1).data;
      const Rn = cnvs[0];
      const Bn = cnvs[1];
      const Gn = cnvs[2];
      const An = cnvs[3];
      if (R === Rn && G === Gn && B === Bn && A === An && mous.x < app.canvasSize) {
        return true;
      } return false;
    };

    const paintColumn = (mous, Ra, Ga, Ba, Aa, evt) => {
      rightFlag = true;
      leftFlag = true;
      const mouseCoord = mous;
      if (evt.button === 0) {
        ctx.fillStyle = app.primaryColor;
      } else if (evt.button === 2) {
        ctx.fillStyle = app.secondaryColor;
      }
      ctx.fillRect(mouseCoord.x, mouseCoord.y, 1, 1);
      if (watchLeftPixel(mouse, Ra, Ga, Ba, Aa) === true) {
        if (leftFlag === true && mouse.y < 31) {
          stack.push([mouse.x - 1, mouse.y]);
          leftFlag = false;
        }
      } else leftFlag = true;
      if (watchRightPixel(mouse, Ra, Ga, Ba, Aa) === true) {
        if (stack[stack.length - 1] === [mouse.x, mouse.y]) {
          rightFlag = false;
          if (rightFlag === true && mouse.x < 31) {
            stack.push([mouse.x + 1, mouse.y]);
            rightFlag = false;
          }
        } else rightFlag = true;
      }
      while (mouseCoord.y < app.canvasSize) {
        const cnvsPaintCell = ctx.getImageData(mouseCoord.x, mouseCoord.y + 1, 1, 1).data;
        const Rn = cnvsPaintCell[0];
        const Gn = cnvsPaintCell[1];
        const Bn = cnvsPaintCell[2];
        const An = cnvsPaintCell[3];
        mouseCoord.y += 1;
        if (Rn === Ra && Gn === Ga && Bn === Ba && An === Aa && mouseCoord.y < app.canvasSize) {
          ctx.fillRect(mouseCoord.x, mouseCoord.y, 1, 1);
          if (watchLeftPixel(mouse, Ra, Ga, Ba, Aa) === true) {
            if (leftFlag === true) {
              stack.push([mouse.x - 1, mouse.y]);
              leftFlag = false;
            }
          } else leftFlag = true;
          if (watchRightPixel(mouse, Ra, Ga, Ba, Aa) === true) {
            if (rightFlag === true) {
              stack.push([mouse.x + 1, mouse.y]);
              rightFlag = false;
            }
          } else rightFlag = true;
        } else break;
      }
    };

    const paintBucketToolMousedown = (event) => {
      this.state.currentListeners.push(['mousedown', paintBucketToolMousedown]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));

      const cnvs = ctx.getImageData(mouse.x, mouse.y, 1, 1).data;
      const R = cnvs[0];
      const B = cnvs[1];
      const G = cnvs[2];
      const A = cnvs[3];

      const clickedColor = this.RGBToHex(R, G, B, A, app);
      let targetColor;

      if (event.button === 0) {
        targetColor = app.primaryColor;
      } else if (event.button === 2) {
        targetColor = app.secondaryColor;
      }

      if (clickedColor === targetColor) return;

      stack.push([mouse.x, mouse.y]);

      while (stack.length > 0) {
        const coordFromStack = stack.pop();
        mouse.x = coordFromStack[0];
        mouse.y = coordFromStack[1];
        goUp(mouse, R, G, B, A);
        paintColumn(mouse, R, G, B, A, event);
      }
    };

    canvas.addEventListener('mousedown', paintBucketToolMousedown);
  }

  rectangle(app) {
    this.removeEventListenersCanvas(app);
    const auxCanvas = document.getElementById(`aux_cnvs${app.currentLayer}`);
    const auxCtx = auxCanvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    const startCoords = { x: 0, y: 0 };
    let rectDrawFlag = false;

    const rectangleMouseDown = (event) => {
      this.state.currentListeners.push(['mousedown', rectangleMouseDown]);
      startCoords.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      startCoords.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      if (app.penSize % 2 > 0) {
        startCoords.x += 0.5;
        startCoords.y += 0.5;
      }
      rectDrawFlag = true;
      auxCtx.lineStyle = app.primaryColor;
      auxCtx.fillStyle = app.primaryColor;
      auxCtx.lineWidth = app.penSize;
    };

    const rectangleMouseMove = (event) => {
      this.state.currentListeners.push(['mousemove', rectangleMouseMove]);
      if (rectDrawFlag === true) {
        auxCtx.clearRect(0, 0, app.canvasSize, app.canvasSize);
        mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
        mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
        if (app.penSize % 2 > 0) {
          mouse.x += 0.5;
          mouse.y += 0.5;
        }
        auxCtx.beginPath();
        auxCtx.moveTo(startCoords.x, startCoords.y);
        auxCtx.lineTo(startCoords.x, mouse.y);
        auxCtx.lineTo(mouse.x, mouse.y);
        auxCtx.lineTo(mouse.x, startCoords.y);
        auxCtx.lineTo(startCoords.x, startCoords.y);
        auxCtx.closePath();
        auxCtx.stroke();
      }
    };

    const rectangleMouseUp = (event) => {
      this.state.currentListeners.push(['mouseup', rectangleMouseUp]);
      auxCtx.clearRect(0, 0, app.canvasSize, app.canvasSize);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      if (app.penSize % 2 > 0) {
        mouse.x += 0.5;
        mouse.y += 0.5;
      }
      auxCtx.beginPath();
      auxCtx.moveTo(startCoords.x, startCoords.y);
      auxCtx.lineTo(startCoords.x, mouse.y);
      auxCtx.lineTo(mouse.x, mouse.y);
      auxCtx.lineTo(mouse.x, startCoords.y);
      auxCtx.lineTo(startCoords.x, startCoords.y);
      auxCtx.closePath();
      auxCtx.stroke();
      rectDrawFlag = false;
      const mainCanvas = document.getElementById(`cnvs${app.currentLayer}`);
      const mainCtx = mainCanvas.getContext('2d');
      mainCtx.globalCompositeOperation = 'source-over';

      mainCtx.drawImage(auxCanvas, 0, 0);
      auxCtx.clearRect(0, 0, app.canvasSize, app.canvasSize);
    };

    auxCanvas.addEventListener('mousedown', rectangleMouseDown);
    auxCanvas.addEventListener('mousemove', rectangleMouseMove);
    auxCanvas.addEventListener('mouseup', rectangleMouseUp);
    auxCanvas.addEventListener('mouseleave', () => { rectDrawFlag = false; });
  }

  changeCanvasSize(app) {
    const canvasContainer = document.querySelector('.canvas_background');
    const canvases = canvasContainer.childNodes;
    canvases.forEach((item) => {
      const child = item;
      child.width = app.canvasSize;
      child.height = app.canvasSize;
    });
    return this;
  }

  line(app) {
    this.removeEventListenersCanvas(app);
    const auxCanvas = document.getElementById(`aux_cnvs${app.currentLayer}`);
    const auxCtx = auxCanvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    const startCoords = { x: 0, y: 0 };
    let line = false;

    const lineToolMousedown = (event) => {
      this.state.currentListeners.push(['mousedown', lineToolMousedown]);
      startCoords.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      startCoords.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      if (app.penSize % 2 > 0) {
        startCoords.x += 0.5;
        startCoords.y += 0.5;
      }
      line = true;
      auxCtx.strokeStyle = app.primaryColor;
      auxCtx.lineWidth = app.penSize;
    };

    const lineToolMousemove = (event) => {
      this.state.currentListeners.push(['mousemove', lineToolMousemove]);
      if (line === true) {
        mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
        mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
        if (app.penSize % 2 > 0) {
          mouse.x += 0.5;
          mouse.y += 0.5;
        }
        auxCtx.clearRect(0, 0, app.canvasSize, app.canvasSize);
        auxCtx.beginPath();
        auxCtx.moveTo(startCoords.x, startCoords.y);
        auxCtx.lineTo(mouse.x, mouse.y);
        auxCtx.closePath();
        auxCtx.stroke();
      }
    };

    const lineToolMouseup = (event) => {
      this.state.currentListeners.push(['mouseup', lineToolMouseup]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      if (app.penSize % 2 > 0) {
        mouse.x += 0.5;
        mouse.y += 0.5;
      }
      auxCtx.clearRect(0, 0, app.canvasSize, app.canvasSize);
      auxCtx.beginPath();
      auxCtx.moveTo(startCoords.x, startCoords.y);
      auxCtx.lineTo(mouse.x, mouse.y);
      auxCtx.closePath();
      auxCtx.stroke();
      line = false;
      const mainCanvas = document.getElementById(`cnvs${app.currentLayer}`);
      const mainCtx = mainCanvas.getContext('2d');
      mainCtx.globalCompositeOperation = 'source-over';

      mainCtx.drawImage(auxCanvas, 0, 0);
      auxCtx.clearRect(0, 0, app.canvasSize, app.canvasSize);
    };

    auxCanvas.addEventListener('mousedown', lineToolMousedown);

    auxCanvas.addEventListener('mousemove', lineToolMousemove);

    auxCanvas.addEventListener('mouseup', lineToolMouseup);

    auxCanvas.addEventListener('mouseleave', () => { line = false; });

    auxCanvas.addEventListener('contextmenu', event => event.preventDefault());
  }

  circle(app) {
    this.removeEventListenersCanvas(app);
    const auxCanvas = document.getElementById(`aux_cnvs${app.currentLayer}`);
    const auxCtx = auxCanvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    const startCoords = { x: 0, y: 0 };
    let circle = false;

    const circleToolMousedown = (event) => {
      this.state.currentListeners.push(['mousedown', circleToolMousedown]);
      startCoords.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      startCoords.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      circle = true;
      auxCtx.strokeStyle = app.primaryColor;
      auxCtx.lineWidth = app.penSize;
    };

    const circleToolMousemove = (event) => {
      this.state.currentListeners.push(['mousemove', circleToolMousemove]);
      if (circle === true) {
        mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
        mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
        if (app.penSize % 2 > 0) {
          mouse.x += 0.5;
          mouse.y += 0.5;
        }
        auxCtx.clearRect(0, 0, app.canvasSize, app.canvasSize);
        auxCtx.beginPath();
        const radius = Math.sqrt((Math.abs((startCoords.x - mouse.x)) ** 2) + (Math.abs((startCoords.y - mouse.y)) ** 2));
        auxCtx.arc(startCoords.x, startCoords.y, radius, 0, 2 * Math.PI, true);
        auxCtx.stroke();
      }
    };

    const circleToolMouseup = (event) => {
      this.state.currentListeners.push(['mouseup', circleToolMouseup]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      if (app.penSize % 2 > 0) {
        mouse.x += 0.5;
        mouse.y += 0.5;
      }
      auxCtx.clearRect(0, 0, app.canvasSize, app.canvasSize);
      auxCtx.beginPath();
      const radius = Math.sqrt((Math.abs((startCoords.x - mouse.x)) ** 2) + (Math.abs((startCoords.y - mouse.y)) ** 2));
      auxCtx.arc(startCoords.x, startCoords.y, radius, 0, 2 * Math.PI, true);
      auxCtx.stroke();
      circle = false;
      const mainCanvas = document.getElementById(`cnvs${app.currentLayer}`);
      const mainCtx = mainCanvas.getContext('2d');
      mainCtx.globalCompositeOperation = 'source-over';

      mainCtx.drawImage(auxCanvas, 0, 0);
      auxCtx.clearRect(0, 0, app.canvasSize, app.canvasSize);
    };

    auxCanvas.addEventListener('mousedown', circleToolMousedown);

    auxCanvas.addEventListener('mousemove', circleToolMousemove);

    auxCanvas.addEventListener('mouseup', circleToolMouseup);

    auxCanvas.addEventListener('mouseleave', () => { circle = false; });

    auxCanvas.addEventListener('contextmenu', event => event.preventDefault());
  }

  paintSamePixels(app) {
    this.removeEventListenersCanvas(app);
    const canvas = document.getElementById(`cnvs${app.currentLayer}`);
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    let targetColor;

    const paintAllSamePixels = (event) => {
      this.state.currentListeners.push(['mousedown', paintAllSamePixels]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      if (event.button === 0) {
        targetColor = app.primaryColor;
      } else if (event.button === 2) {
        targetColor = app.secondaryColor;
      }

      const clickedPixel = ctx.getImageData(mouse.x, mouse.y, 1, 1).data;
      const R = clickedPixel[0];
      const G = clickedPixel[1];
      const B = clickedPixel[2];
      const A = clickedPixel[3];
      for (let height = 0; height < canvas.height; height += 1) {
        for (let width = 0; width < canvas.width; width += 1) {
          const curPixelColor = ctx.getImageData(width, height, 1, 1).data;
          const Rn = curPixelColor[0];
          const Gn = curPixelColor[1];
          const Bn = curPixelColor[2];
          const An = curPixelColor[3];
          if (R === Rn && G === Gn && B === Bn && A === An) {
            ctx.fillStyle = targetColor;
            ctx.fillRect(width, height, 1, 1);
          }
        }
      }
    };

    canvas.addEventListener('mousedown', paintAllSamePixels);
    canvas.addEventListener('contextmenu', event => event.preventDefault());
  }

  paintCross(app) {
    this.removeEventListenersCanvas(app);
    const canvas = document.getElementById(`cnvs${app.currentLayer}`);
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    let targetColor;

    const makeCross = (event) => {
      this.state.currentListeners.push(['mousedown', makeCross]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      if (event.button === 0) {
        targetColor = app.primaryColor;
      } else if (event.button === 2) {
        targetColor = app.secondaryColor;
      }

      ctx.fillStyle = targetColor;
      ctx.fillRect(mouse.x, mouse.y, 1, 1);
      for (let i = 1; i <= app.penSize; i += 1) {
        ctx.fillRect(mouse.x - i, mouse.y - i, 1, 1);
        ctx.fillRect(mouse.x - i, mouse.y + i, 1, 1);
        ctx.fillRect(mouse.x + i, mouse.y - i, 1, 1);
        ctx.fillRect(mouse.x + i, mouse.y + i, 1, 1);
      }
    };
    canvas.addEventListener('mousedown', makeCross);
    canvas.addEventListener('contextmenu', event => event.preventDefault());
  }

  paintDots(app) {
    this.removeEventListenersCanvas(app);
    const canvas = document.getElementById(`cnvs${app.currentLayer}`);
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    let targetColor;

    const makeDots = (event) => {
      this.state.currentListeners.push(['mousedown', makeDots]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      if (event.button === 0) {
        targetColor = app.primaryColor;
      } else if (event.button === 2) {
        targetColor = app.secondaryColor;
      }

      ctx.fillStyle = targetColor;
      for (let i = mouse.x - 3; i <= mouse.x + 3; i += 1) {
        for (let j = mouse.y - 3; j <= mouse.y + 3; j += 1) {
          if (i % 2 !== 0 && j % 2 !== 0) {
            ctx.fillRect(i, j, 1, 1);
          }
        }
      }
    };
    canvas.addEventListener('mousedown', makeDots);
    canvas.addEventListener('contextmenu', event => event.preventDefault());
  }

  moveCanvas(app) {
    this.removeEventListenersCanvas(app);
    const canvas = document.getElementById(`cnvs${app.currentLayer}`);
    const ctx = canvas.getContext('2d');
    const startCoords = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    let image;
    let moveFlag = false;

    const grabImg = (event) => {
      this.state.currentListeners.push(['mousedown', grabImg]);
      startCoords.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      startCoords.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      moveFlag = true;

      image = ctx.getImageData(0, 0, app.canvasSize, app.canvasSize);
    };

    const moveImg = (event) => {
      this.state.currentListeners.push(['mousemove', moveImg]);
      if (moveFlag === true) {
        mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
        mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
        ctx.clearRect(0, 0, app.canvasSize, app.canvasSize);
        ctx.putImageData(image, Math.floor(mouse.x - startCoords.x), Math.floor(mouse.y - startCoords.y));
      }
    };

    const releaseImg = (event) => {
      this.state.currentListeners.push(['mouseup', releaseImg]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      ctx.putImageData(image, Math.floor(mouse.x - startCoords.x), Math.floor(mouse.y - startCoords.y));
      moveFlag = false;
    };

    canvas.addEventListener('mousedown', grabImg);
    canvas.addEventListener('mousemove', moveImg);
    canvas.addEventListener('mouseup', releaseImg);
  }

  paintSmile(app) {
    this.removeEventListenersCanvas(app);
    const canvas = document.getElementById(`cnvs${app.currentLayer}`);
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    let targetColor;

    const smile = (event) => {
      this.state.currentListeners.push(['mousedown', smile]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));
      if (event.button === 0) {
        targetColor = app.primaryColor;
      } else if (event.button === 2) {
        targetColor = app.secondaryColor;
      }

      ctx.fillStyle = targetColor;
      ctx.strokeStyle = targetColor;
      ctx.fillRect(mouse.x - 2, mouse.y - 1, 1, 1);
      ctx.fillRect(mouse.x + 2, mouse.y - 1, 1, 1);
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.moveTo(mouse.x - 2, mouse.y + 3.5);
      ctx.lineTo(mouse.x + 3, mouse.y + 3.5);
      ctx.closePath();
      ctx.stroke();
      if (event.button === 0) {
        ctx.fillStyle = targetColor;
        ctx.fillRect(mouse.x - 3, mouse.y + 2, 1, 1);
        ctx.fillRect(mouse.x + 3, mouse.y + 2, 1, 1);
      } else if (event.button === 2) {
        ctx.fillStyle = targetColor;
        ctx.fillRect(mouse.x - 3, mouse.y + 4, 1, 1);
        ctx.fillRect(mouse.x + 3, mouse.y + 4, 1, 1);
      }
    };

    canvas.addEventListener('mousedown', smile);
    canvas.addEventListener('contextmenu', event => event.preventDefault());
  }

  lighterImg(app) {
    this.removeEventListenersCanvas(app);
    const canvas = document.getElementById(`cnvs${app.currentLayer}`);
    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };

    const makeLighter = (event) => {
      this.state.currentListeners.push(['mousedown', makeLighter]);
      mouse.x = Math.floor(event.offsetX / (800 / app.canvasSize));
      mouse.y = Math.floor(event.offsetY / (800 / app.canvasSize));

      for (let i = mouse.x; i < (+app.penSize + +mouse.x); i += 1) {
        for (let j = mouse.y; j < (+app.penSize + +mouse.y); j += 1) {
          const pixel = ctx.getImageData(i, j, 1, 1);
          if (pixel.data[3] === 0) break;
          pixel.data[3] -= 25;
          ctx.putImageData(pixel, i, j);
        }
      }
    };

    canvas.addEventListener('mousedown', makeLighter);
    canvas.addEventListener('contextmenu', event => event.preventDefault());
  }
}
