import { settings } from './Settings';
import View from './View';

const IMG_URL = './assets/toys/';
const IMG_EXTENSION = '.png';
const MAX_CART_CAPACITY = 20;

export default class ToysMenu extends View{

  containerID: string;

  constructor(parentElementID: string){
    super();
    this.containerID = parentElementID;
    this.getNumbers();
  }

  async getNumbers(){
    let toyNumbers = [];
    if (settings.chosenToyNums.length !== 0) {
      toyNumbers = settings.chosenToyNums.slice();
    } else {
      let base = await super.getData();
      base = base.slice(0, MAX_CART_CAPACITY);
      toyNumbers  =  base.map(item => `${item.num}&${item.count}`);
    }
    console.log('toyNumbers', toyNumbers);
    this.renderToys(toyNumbers);
  }

  renderToys(toyNumbers: string[]){
    toyNumbers.forEach( item => {
      const [number, count] = item.split('&');
      const container = super.create(this.containerID, 'div', 'menu__item');
      const img = super.create(container, 'img', 'menu__item_toy');
      img.setAttribute('alt', 'toy');
      img.setAttribute('src', IMG_URL + number + IMG_EXTENSION);
      super.create(container, 'span', 'menu__item_count', count);
    });
    
  }
}