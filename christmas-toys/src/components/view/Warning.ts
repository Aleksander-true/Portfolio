export default class Warning{

  modal: HTMLElement;
  
  constructor(parentElement:HTMLElement, title:string, description: string){
    this.modal = this.create(parentElement, 'div', ['modal', 'modal_warning']);
    const modalContainer = this.create(this.modal, 'div', 'modal__container');
    this.create(modalContainer, 'h2', 'modal__title', title);
    this.create(modalContainer, 'p', 'modal__description', description);
  }

  create(parentElement: HTMLElement, tag = 'div', classNames: string[] | string = '', innerHtm = '') {
    if (!Array.isArray(classNames)) classNames = [classNames];
    const element = document.createElement(tag);
    classNames.forEach(item => element.classList.add(item));
    element.innerHTML = innerHtm;
    parentElement.append(element);
    return element;
  }
}