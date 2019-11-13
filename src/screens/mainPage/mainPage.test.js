import MainPage from './mainPage';

describe('MainPage.renderMainPage', () => {
  it('Should be an instance of Function', () => {
    expect(MainPage.prototype.renderMainPage).toBeInstanceOf(Function);
  });
});

describe('MainPage.renderInfoCanvas', () => {
  it('Should be an instance of Function', () => {
    expect(MainPage.prototype.renderInfoCanvas).toBeInstanceOf(Function);
  });
});

describe('MainPage.stopRenderInfoCanvas', () => {
  it('Should be an instance of Function', () => {
    expect(MainPage.prototype.stopRenderInfoCanvas).toBeInstanceOf(Function);
  });
});

describe('MainPage.createFrame', () => {
  it('Should be an instance of Function', () => {
    expect(MainPage.prototype.createFrame).toBeInstanceOf(Function);
  });
});


describe('MainPage.addLayerToList', () => {
  it('Should be an instance of Function', () => {
    expect(MainPage.prototype.addLayerToList).toBeInstanceOf(Function);
  });
});

describe('MainPage.addNewLayer', () => {
  it('Should be an instance of Function', () => {
    expect(MainPage.prototype.addNewLayer).toBeInstanceOf(Function);
  });
});

describe('MainPage.changeZIndex', () => {
  it('Should be an instance of Function', () => {
    expect(MainPage.prototype.changeZIndex).toBeInstanceOf(Function);
  });
});

describe('MainPage.deleteLayer', () => {
  it('Should be an instance of Function', () => {
    expect(MainPage.prototype.deleteLayer).toBeInstanceOf(Function);
  });
});

describe('MainPage.renumberLayers', () => {
  it('Should be an instance of Function', () => {
    expect(MainPage.prototype.renumberLayers).toBeInstanceOf(Function);
  });
});

describe('MainPage.mergeLayers', () => {
  it('Should be an instance of Function', () => {
    expect(MainPage.prototype.mergeLayers).toBeInstanceOf(Function);
  });
});
