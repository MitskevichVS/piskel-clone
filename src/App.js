import './screens/mainPage/mainPage.scss';
import MainPage from './screens/mainPage/mainPage';
import ToolsSelection from './components/Tools/ToolsSelection';
import CanvasScale from './components/canvas/scale/canvasScale';
import Canvas from './components/canvas/canvas';
import Fullscreen from './components/canvas/fullscreen/fullscreen';

export default class App {
  constructor() {
    this.app = {
      primaryColor: '#010101',
      secondaryColor: '#ffffff',
      canvasSize: 32,
      penSize: 1,
      currentTool: 'pen',
      frameRate: 1,
      XCoord: '',
      YCoord: '',
      framesCount: 1,
      currentFrame: 1,
      framesArray: [],
      animateCount: 0,
      layersCount: 1,
      currentLayer: 1,
      zIndexOfLayers: {},
    };
  }

  start() {
    const ToolSelection = new ToolsSelection();
    const mainPage = new MainPage();
    const CanvasScaleEl = new CanvasScale();
    const mainCanvas = new Canvas();
    const fullscreen = new Fullscreen();

    mainPage.renderMainPage();
    CanvasScaleEl.scaleFn();
    mainCanvas.addCanvasBackground(this);
    mainPage.createFrame(this.app);
    fullscreen.fullscreenListener();
    mainPage.addLayerToList(this.app);
    this.app.zIndexOfLayers[`cnvs${this.app.layersCount}`] = this.app.layersCount * 2 + 1;
    this.app.zIndexOfLayers[`aux_cnvs${this.app.layersCount}`] = this.app.layersCount * 2;

    const draw = (frame) => {
      const previewCanvas = document.querySelector('#preview_cnvs');
      const previewCanvasCtx = previewCanvas.getContext('2d');

      previewCanvasCtx.putImageData(frame, 0, 0);
    };

    let animateCount = 0;

    const animate = () => {
      const frameRate = document.getElementsByClassName('preview-canvas__slider')[0].value;
      if (+frameRate === 0) {
        draw(this.app.framesArray[this.app.currentFrame - 1]);
      } else if (animateCount < this.app.framesArray.length) {
        const frame = this.app.framesArray[animateCount];
        draw(frame);
        animateCount += 1;
      } else {
        animateCount = 0;
      }
      setTimeout(animate, 1000 / frameRate);
    };

    const drawFrameCanvas = () => {
      const size = this.app.canvasSize;
      const currentFrame = document.querySelector(`#wrapper${this.app.currentFrame}`);
      const currentFrameCnvsContainer = currentFrame.children[0].firstChild;
      currentFrameCnvsContainer.width = size;
      currentFrameCnvsContainer.height = size;
      const bigCanvas = document.querySelector('#cnvs1');
      const bigCtx = bigCanvas.getContext('2d');
      const litCnvs = currentFrameCnvsContainer.getContext('2d');
      litCnvs.drawImage(bigCanvas, 0, 0);
      this.app.framesArray[this.app.currentFrame - 1] = bigCtx.getImageData(0, 0, size, size);
    };

    function addToolsListener() {
      const toolsContainer = document.querySelector('.tools_selection');
      const penSizeContainer = document.querySelector('.pen_size__container');
      const colorsContainer = document.querySelector('.colors_container');
      const primaryColorSelector = document.querySelector('#primary_color');
      const secondaryColorSelector = document.querySelector('#secondary_color');
      const bigCanvas = document.querySelector('#cnvs1');
      let auxCanvas;
      const canvasContainer = document.querySelector('.canvas_background');
      const newFrame = document.querySelector('.next-frame_button');
      const framesContainer = document.querySelector('.frames');
      const frameRateSlider = document.querySelector('.preview-canvas__slider');
      const layers = document.querySelector('.layers_container');
      let canvasArr;

      toolsContainer.addEventListener('click', (event) => {
        if (event.target.id || event.path[1].id) {
          if (event.target.id) {
            this.currentTool = event.target.id;
          } else {
            this.currentTool = event.path[1].id;
          }
          ToolSelection.highlight(this.currentTool);
        }
      });

      penSizeContainer.addEventListener('click', (event) => {
        if (event.target.id) {
          this.penSize = event.target.id;
        } else {
          this.penSize = event.path[1].id;
        }
        ToolSelection.highlight(this.penSize);
      });

      primaryColorSelector.addEventListener('change', (event) => {
        this.primaryColor = event.target.value;
        ToolSelection.changePrimaryColor(this.primaryColor);
      });

      secondaryColorSelector.addEventListener('change', (event) => {
        this.secondaryColor = event.target.value;
        ToolSelection.changeSecondaryColor(this.secondaryColor);
      });

      colorsContainer.addEventListener('click', (event) => {
        if (event.target.id === 'swap_color') {
          const tmp = this.primaryColor;
          this.primaryColor = this.secondaryColor;
          this.secondaryColor = tmp;
          ToolSelection.swapColors.apply(this);
        }
      });

      canvasContainer.addEventListener('mouseenter', () => {
        switch (this.currentTool) {
          case 'pen':
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.pendraw(this);
            break;
          case 'eraser':
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.eraser(this);
            break;
          case 'paint_bucket':
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.paintBucket(this);
            break;
          case 'line':
            auxCanvas = document.querySelector(`#aux_cnvs${this.currentLayer}`);
            auxCanvas.addEventListener('mouseleave', () => {
              auxCanvas.style.zIndex = this.currentLayer;
            });
            auxCanvas.style.zIndex = this.layersCount * 2 + 5;
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.line(this);
            break;
          case 'rectangle':
            auxCanvas = document.querySelector(`#aux_cnvs${this.currentLayer}`);
            auxCanvas.addEventListener('mouseleave', () => {
              auxCanvas.style.zIndex = this.currentLayer;
            });
            auxCanvas.style.zIndex = this.layersCount * 2 + 5;
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.rectangle(this);
            break;
          case 'circle':
            auxCanvas = document.querySelector(`#aux_cnvs${this.currentLayer}`);
            auxCanvas.addEventListener('mouseleave', () => {
              auxCanvas.style.zIndex = this.currentLayer;
            });
            auxCanvas.style.zIndex = this.layersCount * 2 + 5;
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.circle(this);
            break;
          case 'shape':
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.paintSamePixels(this);
            break;
          case 'cross':
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.paintCross(this);
            break;
          case 'grid':
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.paintDots(this);
            break;
          case 'move':
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.moveCanvas(this);
            break;
          case 'smile':
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.paintSmile(this);
            break;
          case 'lighter':
            mainCanvas.removeEventListenersCanvas(this);
            mainCanvas.lighterImg(this);
            break;
          default:
            console.log(':(');
        }
      });

      canvasContainer.addEventListener('mousemove', (event) => {
        this.XCoord = Math.floor(event.offsetX / (800 / this.canvasSize));
        this.YCoord = Math.floor(event.offsetY / (800 / this.canvasSize));

        mainPage.renderInfoCanvas(this);
      });

      canvasContainer.addEventListener('mouseleave', () => {
        mainPage.stopRenderInfoCanvas();
      });

      canvasContainer.addEventListener('mouseup', () => {
        drawFrameCanvas();
      });

      frameRateSlider.addEventListener('mousemove', () => {
        this.frameRate = frameRateSlider.value;
      });

      framesContainer.addEventListener('click', (event) => {
        if (event.target.className === 'litCanvas') {
          const targetId = event.path[2].id;
          ToolSelection.highlight(targetId);
          const targetNumber = targetId.slice(-1);
          this.currentFrame = targetNumber;
          const bigCtx = bigCanvas.getContext('2d');
          bigCtx.clearRect(0, 0, this.canvasSize, this.canvasSize);
          console.log(this.framesArray);
          bigCtx.putImageData(this.framesArray[this.currentFrame - 1], 0, 0);
        }

        if (event.target.className === 'fas fa-trash-alt') {
          const targetId = event.path[2].id;
          const targetNumber = targetId.slice(-1);
          if (targetNumber < 2) {
            return;
          }
          const wrapper = document.querySelector(`#${targetId}`);
          wrapper.parentNode.removeChild(wrapper);
          this.framesArray.splice(targetNumber - 1, 1);
          this.framesCount -= 1;
          this.currentFrame = this.framesCount;

          const framesNumbersArray = document.getElementsByClassName('count');
          for (let count = framesNumbersArray.length - 1; count >= 0; count -= 1) {
            framesNumbersArray[count].innerHTML = `${framesNumbersArray.length - count}`;
            framesNumbersArray[count].offsetParent.id = `wrapper${framesNumbersArray.length - count}`;
          }
        }
        if (event.target.className === 'fas fa-copy') {
          const targetId = event.path[2].id;
          const targetNumber = targetId.slice(-1);
          const tergetCnvs = event.path[2].children[0].firstChild;
          this.framesCount += 1;
          mainPage.createFrame(this);
          this.framesArray.push(this.framesArray[targetNumber - 1]);
          const newFrameCopied = document.querySelector(`#wrapper${this.framesCount}`);
          const copiedCanvas = newFrameCopied.children[0].firstChild;
          copiedCanvas.width = this.canvasSize;
          copiedCanvas.height = this.canvasSize;
          const copiedCtx = copiedCanvas.getContext('2d');
          copiedCtx.drawImage(tergetCnvs, 0, 0);
        }
      });

      newFrame.addEventListener('click', () => {
        const size = this.canvasSize;
        this.framesCount += 1;
        this.layersCount = 1;
        this.currentLayer = 1;
        ToolSelection.highlightLayer(`layer${this.currentLayer}`);
        mainPage.createFrame(this);
        const bigCtx = bigCanvas.getContext('2d');
        this.framesArray[this.currentFrame - 1] = bigCtx.getImageData(0, 0, size, size);
        this.currentFrame = this.framesCount;
        bigCtx.clearRect(0, 0, size, size);
        this.framesArray[this.currentFrame - 1] = bigCtx.getImageData(0, 0, size, size);
        ToolSelection.highlight(`wrapper${this.currentFrame}`);
        animate(this);
      });

      layers.addEventListener('click', (event) => {
        let targetId;
        if (event.target.id) {
          targetId = event.target.id;
        } else targetId = event.path[1].id;
        if (targetId.search(/layer/i) === 0) {
          this.currentLayer = targetId.slice(-1);
          ToolSelection.highlightLayer(`layer${this.currentLayer}`);
          mainPage.changeZIndex(this);
        }
        switch (targetId) {
          case 'add':
            if (this.layersCount === 4) break;
            this.layersCount += 1;
            this.currentLayer = this.layersCount;
            this.zIndexOfLayers[`cnvs${this.layersCount}`] = this.layersCount * 2 + 1;
            this.zIndexOfLayers[`aux_cnvs${this.layersCount}`] = this.layersCount * 2;
            mainPage.addLayerToList(this);
            ToolSelection.highlightLayer(`layer${this.currentLayer}`);
            mainPage.addNewLayer(this);
            break;
          case 'delete':
            if (this.layersCount === 1) break;
            mainPage.deleteLayer(this);
            delete this.zIndexOfLayers[`cnvs${this.currentLayer}`];
            delete this.zIndexOfLayers[`aux_cnvs${this.currentLayer}`];
            this.layersCount -= 1;
            this.currentLayer = 1;
            mainPage.renumberLayers(this);
            ToolSelection.highlightLayer(`layer${this.currentLayer}`);
            canvasArr = document.querySelector('.canvas_background').childNodes;
            this.zIndexOfLayers = {};
            canvasArr.forEach((item) => {
              this.zIndexOfLayers[item.id] = item.style.zIndex;
            });
            mainPage.changeZIndex(this);
            break;
          case 'merge':
            mainPage.mergeLayers(this);
            drawFrameCanvas();
            this.currentLayer = 1;
            this.layersCount = 1;
            ToolSelection.highlightLayer(`layer${this.currentLayer}`);
            break;
          default:
            console.log(':(');
        }
      });

      document.addEventListener('mousemove', () => {
        localStorage.clear();
        const appObj = JSON.stringify(this);
        localStorage.setItem('app', appObj);
      });
    }
    addToolsListener.apply(this.app);

    function canvasSize() {
      const sizeButtonsContainer = document.querySelector('.canvas_resolution__container');

      sizeButtonsContainer.addEventListener('click', (event) => {
        if (event.target.id) {
          this.canvasSize = event.target.id;
        } else {
          this.canvasSize = event.path[1].id;
        }
        mainCanvas.changeCanvasSize(this);
        mainCanvas.addCanvasBackground(this);
        ToolSelection.highlight(this.canvasSize);
        mainPage.renderInfoCanvas(this);
        mainPage.stopRenderInfoCanvas();
      });
    }

    canvasSize.apply(this.app);
    if (localStorage.length === 0) {
      const framesArr = this.app.framesArray;
      this.app.framesArray = JSON.stringify(framesArr);
      const appObj = JSON.stringify(this.app);
      localStorage.setItem('app', appObj);
    } else {
      const localApp = JSON.parse(localStorage.getItem('app'));
      const localAppKeys = Object.keys(localApp);
      for (let key = 0; key < localAppKeys.length; key += 1) {
        const appKey = localAppKeys[key];
        this.app[appKey] = localApp[localAppKeys[key]];
      }
      this.app.framesArray = [];
      this.app.framesCount = 1;
      this.app.currentFrame = 1;
      this.app.layersCount = 1;
      this.app.currentLayer = 1;
      this.app.zIndexOfLayers = {};
      ToolSelection.highlight(this.app.currentTool);
      ToolSelection.highlight(this.app.penSize);
      ToolSelection.changePrimaryColor(this.app.primaryColor);
      ToolSelection.changeSecondaryColor(this.app.secondaryColor);
      const slider = document.querySelector('.preview-canvas__slider');
      slider.value = this.app.frameRate;
      ToolSelection.highlight(this.app.canvasSize);
      mainCanvas.changeCanvasSize(this.app);
      mainCanvas.addCanvasBackground(this.app);
    }
  }
}

const app = new App();
app.start();
