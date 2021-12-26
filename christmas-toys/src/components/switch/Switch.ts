import './_switch.scss';

export default class  SwitchButton {
  input: HTMLInputElement;

  constructor(parentElement: string | HTMLElement) {
    const container = this.create(parentElement, 'div', 'switch');

    this.input = this.create(container, 'input', 'switch__checkbox') as HTMLInputElement;
    this.input.type = 'checkbox';
    this.input.id = 'switch';
    this.input.checked = false;

    const label = this.create(container, 'label', 'switch__label') as HTMLLabelElement;
    label.setAttribute('for', 'switch');

    this.create(label, 'div', 'switch__inner');
    this.create(label, 'div', 'switch__button');
  }

  create(parentElement: string | HTMLElement, tag = 'div', classNames: string[] | string = ''):HTMLElement {
    if (typeof parentElement === 'string') {
      parentElement = document.getElementById(parentElement) as HTMLElement;
    }
    const element = document.createElement(tag);

    if (!Array.isArray(classNames)) classNames = [classNames];
    classNames.forEach(item => element.classList.add(item));

    parentElement.append(element);
    return element;
  }
}