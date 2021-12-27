import { config } from '../config';
import { settings } from './Settings';
import View from './View';

const IMG_URL = './assets/toys/';
const IMG_EXTENSION = '.png';
const MAX_CART_CAPACITY = 20;

export default class ToysMenu extends View{
  container: HTMLElement;

  config: typeof config.menus.decorateToys;

  constructor(toyConfig: typeof config.menus.decorateToys){
    super();
    this.config = toyConfig;
    this.container = super.create(this.config.parentElementID, 'div', this.config.classes);
    this.getNumbers();

    document.addEventListener('updateToyCount', () => this.renderToys(settings.treePage.decorateToyNums));
  }

  async getNumbers(){
    if (settings.toyPage.chosenToyNums.length !== 0) {
      settings.treePage.decorateToyNums = settings.toyPage.chosenToyNums.slice();
    } else {
      let base = await super.getData();
      base = base.slice(0, MAX_CART_CAPACITY);
      settings.treePage.decorateToyNums  =  base.map(item => `${item.num}&${item.count}`);
    }
    this.renderToys(settings.treePage.decorateToyNums);
  }

  renderToys(toyNumbers: string[]){
    this.container.innerHTML = '';
    super.create(this.container, 'h3', this.config.textClasses, this.config.text);

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

    settings.treePage.decorateToyNums = settings.treePage.decorateToyNums.map(item => {
      if (regExp.test(item)) {
        const [number, count] = item.split('&');
        return `${number}&${+count - 1}`;
      } else {
        return item;
      }
    });
    this.renderToys(settings.treePage.decorateToyNums);  
  }
}