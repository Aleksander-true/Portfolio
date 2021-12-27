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

  newCard(card:IToy): HTMLElement{
    const CARD_LEGEND_COUNT = 'Количество: ';
    const CARD_LEGEND_YEAR = 'Год выпуска: ';
    const CARD_LEGEND_SHAPE = 'Форма: ';
    const CARD_LEGEND_COLOR = 'Цвет: ';
    const CARD_LEGEND_SIZE = 'Размер: ';
    const CARD_LEGEND_FAVORITE = 'Любимая: ';
    const IMG_URL = './assets/toys/';
    const IMG_EXTENSION = '.png';

    const template = document.getElementById('card-template') as HTMLTemplateElement;
    const templateClone = template.content.cloneNode(true) as HTMLElement;
    (<HTMLElement>templateClone.querySelector('.card')).dataset.toyNumber = card.num;
    (<HTMLElement>templateClone.querySelector('.card__title')).textContent = card.name;
    (<HTMLElement>templateClone.querySelector('.count')).textContent = CARD_LEGEND_COUNT + card.count;
    (<HTMLElement>templateClone.querySelector('.year')).textContent = CARD_LEGEND_YEAR + card.year;
    (<HTMLElement>templateClone.querySelector('.shape')).textContent = CARD_LEGEND_SHAPE + card.shape;
    (<HTMLElement>templateClone.querySelector('.color')).textContent = CARD_LEGEND_COLOR + card.color;
    (<HTMLElement>templateClone.querySelector('.size')).textContent = CARD_LEGEND_SIZE + card.size;
    (<HTMLElement>templateClone.querySelector('.favorite')).textContent = card.favorite ? (CARD_LEGEND_FAVORITE + 'да') : (CARD_LEGEND_FAVORITE + 'нет');
    (<HTMLImageElement>templateClone.querySelector('.card__img')).src = IMG_URL + card.num + IMG_EXTENSION;

    if (settings.toyPage.chosenToyNums.includes(card.num)) (<HTMLElement>templateClone.querySelector('.card'))?.classList.add('active');
    return  templateClone;
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
