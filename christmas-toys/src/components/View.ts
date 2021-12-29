import { settings } from './Settings';

export default class View {

  create(parentElement: string | HTMLElement, tag = 'div', classNames: string[] | string = '', innerHtm = ''):HTMLElement {
    if (typeof parentElement === 'string') {
      parentElement = document.getElementById(parentElement) as HTMLElement;
    }
    const element = document.createElement(tag);

    if (!Array.isArray(classNames)) classNames = [classNames];
    classNames.forEach(item => element.classList.add(item));
    element.innerHTML = innerHtm;

    if (parentElement) {
      parentElement.append(element);
    }
    return element;
  }

  toggleActive(element: HTMLElement[] | HTMLElement): void {
    if (!Array.isArray(element)) element = [element];
    element.forEach( item => item.classList.toggle('active'));
  }

  renderPage(parentElementID :string, templateID: string, containerClass = '', isClearParent = true ): HTMLElement {
    const container = document.createElement('div');
    container.className = containerClass;

    const parentElement = document.getElementById(parentElementID) as HTMLElement;
    if (isClearParent) parentElement.innerHTML = '';

    const template = document.getElementById(templateID) as HTMLTemplateElement;
    const templateClone = template.content.cloneNode(true) as HTMLElement;

    container.append(templateClone);
    parentElement.append(container);

    return container;
  }

  async getData(){
    const response = await fetch('./data.json');
    let data: IToy[] | never[] = [];
    try {
      data = await response.json() as IToy[];
    } catch {
      console.log( 'Error getData' );
    }
    return data;
  }
}
