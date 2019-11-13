export default class MainPage {
  renderMainPage() {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://use.fontawesome.com/releases/v5.8.2/css/all.css';
    fontAwesome.integrity = 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay';
    fontAwesome.crossOrigin = 'anonymous';
    document.head.appendChild(fontAwesome);

    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';
    document.head.appendChild(viewport);


    const header = document.createElement('header');
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header__container');
    header.appendChild(headerDiv);

    const main1 = document.createElement('main');

    const footer = document.createElement('footer');
    const footerDiv = document.createElement('div');
    footerDiv.className = 'footer__container';
    footer.appendChild(footerDiv);

    const body = document.querySelectorAll('body')[0];

    body.appendChild(header);
    body.appendChild(main1);
    body.appendChild(footer);

    const main = document.querySelectorAll('main')[0];
    const headerContainer = document.getElementsByClassName('header__container')[0];
    const headerText = document.createElement('p');
    headerText.innerHTML = 'Create new sprint';
    headerContainer.appendChild(headerText);

    const footerContainer = document.getElementsByClassName('footer__container')[0];
    const footerText = document.createElement('p');
    footerText.innerHTML = '&copyMitskevich';
    footerContainer.appendChild(footerText);

    const mainWrapper = document.createElement('div');
    mainWrapper.className = 'main_wrapper';

    main.appendChild(mainWrapper);

    const tools = document.createElement('div');
    tools.className = 'tools';

    mainWrapper.appendChild(tools);

    const toolsCenteredContainer = document.createElement('div');
    toolsCenteredContainer.className = 'tools__centered_container';

    tools.appendChild(toolsCenteredContainer);

    const penSizeContainer = document.createElement('div');
    penSizeContainer.className = 'pen_size__container';

    toolsCenteredContainer.appendChild(penSizeContainer);

    const penSizeArray = [];
    for (let i = 0; i < 4; i += 1) {
      const penSize = document.createElement('div');
      penSize.className = 'pen_size';
      penSize.id = `${i + 1}`;
      const penImg = document.createElement('div');
      penImg.className = `pen_img_${i + 1}px`;
      penSize.appendChild(penImg);
      penSizeArray[i] = penSize;
    }

    penSizeArray[0].classList.add('selected_tools');

    penSizeArray.forEach((el) => {
      penSizeContainer.appendChild(el);
    });

    const toolsSelection = document.createElement('div');
    toolsSelection.className = 'tools_selection';
    toolsCenteredContainer.appendChild(toolsSelection);

    const pen = document.createElement('div');
    pen.className = 'tool';
    pen.classList.add('selected_tools');
    pen.id = 'pen';
    const penIcon = document.createElement('i');
    penIcon.className = 'fas fa-pen fa-2x';
    pen.appendChild(penIcon);
    toolsSelection.appendChild(pen);

    const paintBucket = document.createElement('div');
    paintBucket.className = 'tool';
    paintBucket.id = 'paint_bucket';
    const paintBucketIcon = document.createElement('i');
    paintBucketIcon.className = 'fas fa-fill fa-2x';
    paintBucket.appendChild(paintBucketIcon);
    toolsSelection.appendChild(paintBucket);

    const eraser = document.createElement('div');
    eraser.className = 'tool';
    eraser.id = 'eraser';
    const eraserIcon = document.createElement('i');
    eraserIcon.className = 'fas fa-eraser fa-2x';
    eraser.appendChild(eraserIcon);
    toolsSelection.appendChild(eraser);

    const rectangle = document.createElement('div');
    rectangle.className = 'tool';
    rectangle.id = 'rectangle';
    const rectangleIcon = document.createElement('i');
    rectangleIcon.className = 'far fa-square fa-2x';
    rectangle.appendChild(rectangleIcon);
    toolsSelection.appendChild(rectangle);

    const circle = document.createElement('div');
    circle.className = 'tool';
    circle.id = 'circle';
    const circleIcon = document.createElement('i');
    circleIcon.className = 'far fa-circle fa-2x';
    circle.appendChild(circleIcon);
    toolsSelection.appendChild(circle);

    const line = document.createElement('div');
    line.className = 'tool';
    line.id = 'line';
    const lineIcon = document.createElement('i');
    lineIcon.className = 'fas fa-slash fa-2x';
    line.appendChild(lineIcon);
    toolsSelection.appendChild(line);

    const move = document.createElement('div');
    move.className = 'tool';
    move.id = 'cross';
    const moveIcon = document.createElement('i');
    moveIcon.className = 'fas fa-times fa-2x';
    move.appendChild(moveIcon);
    toolsSelection.appendChild(move);

    const shape = document.createElement('div');
    shape.className = 'tool';
    shape.id = 'shape';
    const shapeIcon = document.createElement('i');
    shapeIcon.className = 'fas fa-magic fa-2x';
    shape.appendChild(shapeIcon);
    toolsSelection.appendChild(shape);

    const colorPicker = document.createElement('div');
    colorPicker.className = 'tool';
    colorPicker.id = 'grid';
    const colorPickerIcon = document.createElement('i');
    colorPickerIcon.className = 'fas fa-th fa-2x';
    colorPicker.appendChild(colorPickerIcon);
    toolsSelection.appendChild(colorPicker);

    const lighten = document.createElement('div');
    lighten.className = 'tool';
    lighten.id = 'move';
    const lightenIcon = document.createElement('i');
    lightenIcon.className = 'fas fa-hand-paper fa-2x';
    lighten.appendChild(lightenIcon);
    toolsSelection.appendChild(lighten);

    const smile = document.createElement('div');
    smile.className = 'tool';
    smile.id = 'smile';
    const smileIcon = document.createElement('i');
    smileIcon.className = 'fas fa-smile fa-2x';
    smile.appendChild(smileIcon);
    toolsSelection.appendChild(smile);

    const lighter = document.createElement('div');
    lighter.className = 'tool';
    lighter.id = 'lighter';
    const lighterIcon = document.createElement('i');
    lighterIcon.className = 'fas fa-sun fa-2x';
    lighter.appendChild(lighterIcon);
    toolsSelection.appendChild(lighter);

    const colorsContainer = document.createElement('div');
    colorsContainer.className = 'colors_container';
    const primaryColor = document.createElement('div');
    primaryColor.className = 'primary_color';
    primaryColor.id = 'color_primary';
    const color1 = document.createElement('input');
    color1.type = 'color';
    color1.id = 'primary_color';
    primaryColor.appendChild(color1);
    const secondaryColor = document.createElement('div');
    secondaryColor.className = 'secondary_color';
    secondaryColor.id = 'color_secondary';
    const color2 = document.createElement('input');
    color2.type = 'color';
    color2.id = 'secondary_color';
    secondaryColor.appendChild(color2);
    const swapColor = document.createElement('div');
    swapColor.className = 'swap_colors';
    const swapColorArrow = document.createElement('i');
    swapColorArrow.className = 'fas fa-arrows-alt-h fa-lg';
    swapColorArrow.id = 'swap_color';
    swapColor.appendChild(swapColorArrow);

    colorsContainer.appendChild(primaryColor);
    colorsContainer.appendChild(secondaryColor);
    colorsContainer.appendChild(swapColor);
    toolsCenteredContainer.appendChild(colorsContainer);

    const centerContainer = document.createElement('div');
    centerContainer.className = 'middle_container';

    mainWrapper.appendChild(centerContainer);

    const framesContainer = document.createElement('div');
    framesContainer.className = 'frames';
    const nextFrameButton = document.createElement('div');
    nextFrameButton.className = 'next-frame_button';
    const nextFrameButtonIcon = document.createElement('div');
    nextFrameButtonIcon.className = 'next-frame-button__icon';
    const buttonIcon = document.createElement('i');
    buttonIcon.className = 'fas fa-plus fa-2x';
    const nextFrameButtonLabel = document.createElement('div');
    nextFrameButtonLabel.innerHTML = 'Add new frame';
    nextFrameButtonLabel.className = 'next-frame-button__label';

    nextFrameButtonIcon.appendChild(buttonIcon);
    nextFrameButton.appendChild(nextFrameButtonIcon);
    nextFrameButton.appendChild(nextFrameButtonLabel);

    centerContainer.appendChild(framesContainer);
    framesContainer.appendChild(nextFrameButton);

    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'canvas_container';
    const canvasBackground = document.createElement('div');
    canvasBackground.className = 'canvas_background';
    canvasBackground.style.backgroundSize = '100px';
    const canvas = document.createElement('canvas');
    canvas.classList.add('canvas');
    canvas.id = 'cnvs1';
    canvas.width = 32;
    canvas.height = 32;
    canvas.style.zIndex = '2';
    canvasBackground.appendChild(canvas);

    const auxCanvas = document.createElement('canvas');
    auxCanvas.classList.add('aux_canvas');
    auxCanvas.id = 'aux_cnvs1';
    auxCanvas.width = 32;
    auxCanvas.height = 32;
    auxCanvas.style.zIndex = '1';
    auxCanvas.style.top = '-100.7%';
    canvasBackground.appendChild(auxCanvas);

    canvasContainer.appendChild(canvasBackground);
    centerContainer.appendChild(canvasContainer);

    const previewTools = document.createElement('div');
    previewTools.className = 'preview_tools';

    centerContainer.appendChild(previewTools);

    const previewContainer = document.createElement('div');
    previewContainer.className = 'preview_container';
    previewTools.appendChild(previewContainer);

    const previewCanvasContainer = document.createElement('div');
    previewCanvasContainer.className = 'preview_cnvs_container';
    const previewCanvas = document.createElement('canvas');
    previewCanvas.id = 'preview_cnvs';
    previewCanvas.width = 32;
    previewCanvas.height = 32;
    previewCanvas.style.backgroundImage = "url('./src/components/img/canvas-background-light.png')";
    previewCanvasContainer.appendChild(previewCanvas);
    previewContainer.appendChild(previewCanvasContainer);

    const framesRate = document.createElement('input');
    framesRate.className = 'preview-canvas__slider';
    framesRate.type = 'range';
    framesRate.value = 1;
    framesRate.min = 0;
    framesRate.max = 24;
    previewContainer.appendChild(framesRate);

    const canvasResolution = document.createElement('div');
    canvasResolution.className = 'canvas_resolution__container';
    const resolution32 = document.createElement('div');
    resolution32.id = '32';
    resolution32.classList.add('pen_size');
    resolution32.classList.add('cnvs_width_select');
    resolution32.classList.add('selected_tools');
    const resolution32Text = document.createElement('p');
    resolution32Text.innerHTML = '32';
    resolution32.appendChild(resolution32Text);

    const resolution64 = document.createElement('div');
    resolution64.id = '64';
    resolution64.classList.add('pen_size');
    resolution64.classList.add('cnvs_width_select');
    const resolution64Text = document.createElement('p');
    resolution64Text.innerHTML = '64';
    resolution64.appendChild(resolution64Text);

    const resolution128 = document.createElement('div');
    resolution128.id = '128';
    resolution128.classList.add('pen_size');
    resolution128.classList.add('cnvs_width_select');
    const resolution128Text = document.createElement('p');
    resolution128Text.innerHTML = '128';
    resolution128.appendChild(resolution128Text);

    canvasResolution.appendChild(resolution32);
    canvasResolution.appendChild(resolution64);
    canvasResolution.appendChild(resolution128);

    previewTools.appendChild(canvasResolution);

    const fullscreen = document.createElement('div');
    fullscreen.className = 'fullscreen_button__container';
    const button = document.createElement('button');
    button.className = 'fullscreen_button';
    button.innerText = 'Fullscreen';

    fullscreen.appendChild(button);
    previewTools.appendChild(fullscreen);

    const layers = document.createElement('div');
    layers.className = 'layers_container';
    const layersButtonsContainer = document.createElement('div');
    layersButtonsContainer.className = 'layers_buttons__container';
    const addLayer = document.createElement('div');
    const upCurrentLayer = document.createElement('div');
    const downCurrentLayer = document.createElement('div');
    const mergeLayers = document.createElement('div');
    const deleteLayer = document.createElement('div');

    addLayer.classList.add('layers_button', 'add_layer');
    addLayer.id = 'add';
    upCurrentLayer.classList.add('layers_button', 'up_layer');
    upCurrentLayer.id = 'up';
    downCurrentLayer.classList.add('layers_button', 'down_layer');
    downCurrentLayer.id = 'down';
    mergeLayers.classList.add('layers_button', 'merge_layer');
    mergeLayers.id = 'merge';
    mergeLayers.title = 'merge with layer below';
    deleteLayer.classList.add('layers_button', 'delete_layer');
    deleteLayer.id = 'delete';

    const add = document.createElement('i');
    add.className = 'fas fa-plus fa-2x';
    addLayer.appendChild(add);

    const arrowUp = document.createElement('i');
    arrowUp.classList.add('fas', 'fa-sort-up', 'fa-3x');
    upCurrentLayer.appendChild(arrowUp);
    const arrowDown = document.createElement('i');
    arrowDown.classList.add('fas', 'fa-sort-down', 'fa-3x');
    downCurrentLayer.appendChild(arrowDown);

    const group = document.createElement('i');
    group.classList.add('fas', 'fa-layer-group', 'fa-2x');
    mergeLayers.appendChild(group);

    const trash = document.createElement('i');
    trash.classList.add('fas', 'fa-trash', 'fa-2x');
    deleteLayer.appendChild(trash);

    layersButtonsContainer.appendChild(addLayer);
    layersButtonsContainer.appendChild(upCurrentLayer);
    layersButtonsContainer.appendChild(downCurrentLayer);
    layersButtonsContainer.appendChild(mergeLayers);
    layersButtonsContainer.appendChild(deleteLayer);

    const layersList = document.createElement('div');
    layersList.className = 'layers_list__container';

    layers.appendChild(layersButtonsContainer);
    layers.appendChild(layersList);

    previewTools.appendChild(layers);

    const canvasInfoContainer = document.createElement('div');
    canvasInfoContainer.className = 'canvas_info__container';
    const canvasSize = document.createElement('div');
    canvasSize.className = 'canvas_size';
    canvasSize.classList.add('user_canvas_info');
    const canvasSizeText = document.createElement('p');
    canvasSize.appendChild(canvasSizeText);
    const canvasCoordinate = document.createElement('div');
    canvasCoordinate.className = 'canvas_coord';
    canvasCoordinate.classList.add('user_canvas_info');
    const canvasCoordText = document.createElement('p');
    canvasCoordinate.appendChild(canvasCoordText);

    canvasInfoContainer.appendChild(canvasCoordinate);
    canvasInfoContainer.appendChild(canvasSize);
    previewTools.appendChild(canvasInfoContainer);
    const saveTools = document.createElement('div');
    saveTools.className = 'save_tools';

    mainWrapper.appendChild(saveTools);
    return this;
  }

  renderInfoCanvas(app) {
    const canvasSize = document.querySelector('.canvas_size');
    const canvasCoordinate = document.querySelector('.canvas_coord');

    canvasCoordinate.children[0].textContent = `${app.XCoord}x${app.YCoord}`;
    canvasSize.children[0].textContent = `${app.canvasSize}x${app.canvasSize}`;
    return this;
  }

  stopRenderInfoCanvas() {
    const canvasCoordinate = document.querySelector('.canvas_coord');
    canvasCoordinate.children[0].textContent = '';
    return this;
  }

  createFrame(app) {
    const framesContainer = document.querySelector('.frames');

    const container = document.createElement('div');
    container.classList.add('wrapper');
    container.id = `wrapper${app.framesCount}`;
    framesContainer.insertBefore(container, framesContainer.firstChild);
    if (app.framesCount === 1) {
      container.classList.add('selected_tools');
    }

    const canvasContainer = document.createElement('div');
    canvasContainer.className = 'litCanvasContainer';

    const canvas = document.createElement('canvas');
    canvas.classList.add('litCanvas');
    canvas.style.width = '100%';
    canvas.style.height = '100px';


    const countView = document.createElement('div');
    countView.innerHTML = `${app.framesCount}`;
    countView.classList.add('count');

    const deleteBut = document.createElement('div');
    deleteBut.classList.add('deleteBut');
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fas', 'fa-trash-alt');
    deleteBut.appendChild(trashIcon);

    const copyBut = document.createElement('div');
    copyBut.classList.add('copyBut');
    const copyIcon = document.createElement('i');
    copyIcon.classList.add('fas', 'fa-copy');
    copyBut.appendChild(copyIcon);

    canvasContainer.appendChild(canvas);
    container.appendChild(canvasContainer);
    container.appendChild(countView);
    container.appendChild(deleteBut);
    container.appendChild(copyBut);
    return this;
  }

  addLayerToList(app) {
    const layersList = document.querySelector('.layers_list__container');

    const Layer = document.createElement('div');
    Layer.classList.add('layers_list', `layer${app.layersCount}`);
    Layer.innerText = `Layer ${app.layersCount}`;
    Layer.id = `layer${app.layersCount}`;

    if (app.layersCount === 1) {
      Layer.classList.add('selected_layer');
    }

    layersList.appendChild(Layer);
    return this;
  }

  addNewLayer(app) {
    const container = document.querySelector('.canvas_background');

    const mainCanvas = document.createElement('canvas');
    const auxCanvas = document.createElement('canvas');

    mainCanvas.id = `cnvs${app.layersCount}`;
    mainCanvas.width = app.canvasSize;
    mainCanvas.height = app.canvasSize;
    mainCanvas.style.zIndex = app.layersCount * 2 + 1;
    mainCanvas.classList.add('canvas', 'additional_canvas');
    mainCanvas.style.top = `-${((app.layersCount * 2) * 100) - 200 + (app.layersCount - 1.5 + app.layersCount / 2)}%`;

    auxCanvas.id = `aux_cnvs${app.layersCount}`;
    auxCanvas.width = app.canvasSize;
    auxCanvas.height = app.canvasSize;
    auxCanvas.style.zIndex = app.layersCount * 2;
    auxCanvas.classList.add('aux_canvas', 'aux_additional_canvas');
    auxCanvas.style.top = `-${((app.layersCount * 2) * 100) - 100 + (app.layersCount - 0.8 + app.layersCount / 2)}%`;

    container.appendChild(mainCanvas);
    container.appendChild(auxCanvas);
    return this;
  }

  changeZIndex(app) {
    Object.keys(app.zIndexOfLayers).forEach((item) => {
      const cnvs = document.querySelector(`#${item}`);
      cnvs.style.zIndex = app.zIndexOfLayers[item];
    });
    const mainCanvas = document.querySelector(`#cnvs${app.currentLayer}`);
    const auxCanvas = document.querySelector(`#aux_cnvs${app.currentLayer}`);

    mainCanvas.style.zIndex = `${app.layersCount * 2 + 4}`;
    auxCanvas.style.zIndex = `${app.layersCount * 2 + 3}`;
    return this;
  }

  deleteLayer(app) {
    const mainCanvas = document.querySelector(`#cnvs${app.currentLayer}`);
    const auxCanvas = document.querySelector(`#aux_cnvs${app.currentLayer}`);
    const listItem = document.querySelector(`#layer${app.currentLayer}`);

    mainCanvas.remove();
    auxCanvas.remove();
    listItem.remove();

    return this;
  }

  renumberLayers(app) {
    for (let i = 0; i < app.layersCount; i += 1) {
      const layerList = document.querySelectorAll('.layers_list')[i];
      const mainCanvas = document.querySelectorAll('.canvas')[i];
      const auxCanvas = document.querySelectorAll('.aux_canvas')[i];

      layerList.innerText = `Layer ${i + 1}`;
      layerList.id = `layer${i + 1}`;
      mainCanvas.id = `cnvs${i + 1}`;
      mainCanvas.style.zIndex = ((i + 1) * 3);
      mainCanvas.style.top = `-${(((i + 1) * 2) * 100) - 200 + ((i + 1) - 1.5 + (i + 1) / 2)}%`;
      auxCanvas.id = `aux_cnvs${i + 1}`;
      auxCanvas.style.zIndex = ((i + 1) * 2);
      auxCanvas.style.top = `-${(((i + 1) * 2) * 100) - 100 + ((i + 1) - 0.8 + (i + 1) / 2)}%`;
    }
    return this;
  }

  mergeLayers(app) {
    const targetCanvas = document.querySelectorAll('.canvas')[0];
    const mainCtx = targetCanvas.getContext('2d');
    mainCtx.globalCompositeOperation = 'source-over';

    for (let i = app.layersCount; i > 1; i -= 1) {
      // eslint-disable-next-line no-param-reassign
      app.currentLayer = i;
      const nextLayer = document.querySelector(`#cnvs${i}`);
      const nextLayerCtx = nextLayer.getContext('2d');
      mainCtx.drawImage(nextLayer, 0, 0);
      nextLayerCtx.clearRect(0, 0, app.canvasSize, app.canvasSize);
      this.deleteLayer(app);
    }
  }
}
