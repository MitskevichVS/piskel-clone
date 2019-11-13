export default class ToolsSelection {
  highlight(e) {
    const element = document.getElementById(e);
    const parentElement = element.parentNode;
    const parentElementChildArray = parentElement.childNodes;
    parentElementChildArray.forEach((item) => { item.classList.remove('selected_tools'); });
    element.classList.add('selected_tools');
    return this;
  }

  highlightLayer(e) {
    const element = document.getElementById(e);
    const parentElement = element.parentNode;
    const parentElementChildArray = parentElement.childNodes;
    parentElementChildArray.forEach((item) => { item.classList.remove('selected_layer'); });
    element.classList.add('selected_layer');
    return this;
  }

  changePrimaryColor(color) {
    const primary = document.getElementById('color_primary');

    primary.style.backgroundColor = color;
    return this;
  }

  changeSecondaryColor(color) {
    const secondary = document.getElementById('color_secondary');

    secondary.style.backgroundColor = color;
    return this;
  }

  swapColors() {
    const primary = document.getElementById('color_primary');
    const secondary = document.getElementById('color_secondary');

    primary.style.backgroundColor = this.primaryColor;
    secondary.style.backgroundColor = this.secondaryColor;
  }
}
