export function createElement (parentElement, tag, classElement='', bgImg='') {
  let newElement = document.createElement(tag);
  newElement.className = classElement;
  newElement.style.backgroundImage = `url('${bgImg}')`;
  parentElement.append(newElement);
}
