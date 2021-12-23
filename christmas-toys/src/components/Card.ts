import Modal from './modal/Modal';
import { settings } from './Settings';
import View from './View';

const CARD_LEGEND_COUNT = 'Количество: ';
const CARD_LEGEND_YEAR = 'Год выпуска: ';
const CARD_LEGEND_SHAPE = 'Форма: ';
const CARD_LEGEND_COLOR = 'Цвет: ';
const CARD_LEGEND_SIZE = 'Размер: ';
const CARD_LEGEND_FAVORITE = 'Любимая: ';
const IMG_URL = './assets/toys/';
const IMG_EXTENSION = '.png';
const MAX_CART_CAPACITY = 20;

export default class Card extends View {

  constructor(parentElement: HTMLElement, card: IToy){
    super();
    const template = document.getElementById('card-template') as HTMLTemplateElement;
    const templateClone = template.content.cloneNode(true) as HTMLTemplateElement;
    const cardElement = templateClone.querySelector('.card') as HTMLElement;
    cardElement.dataset.toyNumber = card.num;
    (<HTMLElement>templateClone.querySelector('.card__title')).textContent = card.name;
    (<HTMLElement>templateClone.querySelector('.count')).textContent = CARD_LEGEND_COUNT + card.count;
    (<HTMLElement>templateClone.querySelector('.year')).textContent = CARD_LEGEND_YEAR + card.year;
    (<HTMLElement>templateClone.querySelector('.shape')).textContent = CARD_LEGEND_SHAPE + card.shape;
    (<HTMLElement>templateClone.querySelector('.color')).textContent = CARD_LEGEND_COLOR + card.color;
    (<HTMLElement>templateClone.querySelector('.size')).textContent = CARD_LEGEND_SIZE + card.size;
    (<HTMLElement>templateClone.querySelector('.favorite')).textContent = card.favorite ? (CARD_LEGEND_FAVORITE + Favorite.True) : (CARD_LEGEND_FAVORITE + Favorite.False);
    (<HTMLImageElement>templateClone.querySelector('.card__img')).src = IMG_URL + card.num + IMG_EXTENSION;
  
    if (settings.chosenToyNums.includes(`${card.num}&${card.count}`)) (<HTMLElement>templateClone.querySelector('.card'))?.classList.add('active');

    cardElement.addEventListener('click', (e) => this.clickHandler(e, card.num, card.count));
    
    parentElement.append(templateClone);
  }

  clickHandler(e:Event, toyNumber: string, toyCount: string){
    const currentTarget = e.currentTarget as HTMLElement;
    if (settings.chosenToyNums.length >= MAX_CART_CAPACITY && !settings.chosenToyNums.includes(toyNumber)) {
      new Modal(document.body, 'Извините,', 'все слоты заполнены');
      return;
    } 
    super.toggleActive(currentTarget);
    settings.toggleChosenToy(toyNumber, toyCount);

    const customEvent = new Event( 'updateToyNums', { bubbles: true });
    currentTarget.dispatchEvent(customEvent);
  }

}