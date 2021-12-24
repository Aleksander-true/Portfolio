import { settings } from './Settings';
import View from './View';

const IMG_URL = './assets/toys/';
const IMG_EXTENSION = '.png';
const MAX_CART_CAPACITY = 20;

export default class ToysMenu extends View{
  container: HTMLElement;

  constructor(parentElementID: string){
    super();
    this.container = document.getElementById(parentElementID) as HTMLElement;
    this.getNumbers();

    document.addEventListener('updateToyCount', () => this.renderToys(settings.decorateToyNums));
  }

  async getNumbers(){
    if (settings.chosenToyNums.length !== 0) {
      settings.decorateToyNums = settings.chosenToyNums.slice();
    } else {
      let base = await super.getData();
      base = base.slice(0, MAX_CART_CAPACITY);
      settings.decorateToyNums  =  base.map(item => `${item.num}&${item.count}`);
    }
    this.renderToys(settings.decorateToyNums);
  }

  renderToys(toyNumbers: string[]){
    this.container.innerHTML = '';

    toyNumbers.forEach( item => {
      const [number, count] = item.split('&');
      const toyItem = super.create(this.container, 'div', ['menu__item', 'menu__item_toy']);
      super.create(toyItem, 'span', 'menu__item_count', count);

      if (+count <= 0) return;
      const img = super.create(toyItem, 'img', 'menu__toy');
      img.setAttribute('alt', 'toy');
      img.setAttribute('src', IMG_URL + number + IMG_EXTENSION);
      img.setAttribute('draggable', 'true');
      img.setAttribute('data-number', number);
      img.addEventListener('dragstart', (e) => this.dragstartHandler(e));
    });   
  }

  dragstartHandler(e: DragEvent){
    const target = e.target as HTMLImageElement;
    e.dataTransfer?.setData('text/html', target.outerHTML);
    e.dataTransfer?.setData('text/plain', this.getInnerShift(e, target));

    target.addEventListener('dragend', (dropEvent) => this.updateToyCount(dropEvent, target), { once: true });
  }

  getInnerShift(e:MouseEvent, elem: HTMLElement) {
    const box = elem.getBoundingClientRect();
    return `${e.pageX - box.left }&${e.pageY - box.top}`;
  }

  updateToyCount(e:DragEvent, target: HTMLElement){
    if (e.dataTransfer?.dropEffect === 'none') return;

    const regExp = new RegExp(`^${target.dataset.number}&`);

    settings.decorateToyNums = settings.decorateToyNums.map(item => {
      if (regExp.test(item)) {
        const [number, count] = item.split('&');
        return `${number}&${+count - 1}`;
      } else {
        return item;
      }
    });
    this.renderToys(settings.decorateToyNums);  
  }
}