class Common {
  constructor(){}

  appendElement({parentElement = document, tag = 'div', elementClass, id, src, alt, innerHTML=''}) {
    let element = document.createElement(tag);
    if (elementClass) element.classList = elementClass;
    if (id) element.id = id;
    if (src) element.src = src;
    if (alt) element.alt = alt;
    element.innerHTML = innerHTML;
    parentElement.append(element)
    return element;
  }
  
  getImgURL(imgNumber) {
    return `./base-img/square/${imgNumber}.jpg`
  }
}

export {Common}