import data from '../data';
import { settings } from './settings';
import View from './View';

export default class ShowCase extends View {

  stockCards: IData[];

  container: HTMLElement;

  constructor(parentElementID = 'card-container'){
    super();
    this.container = document.getElementById(parentElementID) as HTMLElement;
    this.container.innerHTML = '';

    this.stockCards =  this.filterCards();
    this.renderCards();

    console.log('new ShowCase this.stockCards', this.stockCards);
  }

  filterCards(){
    let base :IData[] = data.slice();
    for (const [key, values] of Object.entries(settings.filters)) {
      if (key === 'favorite') {
        base = base.filter(item => (values[0] === 'да') ? item[key] : true );
      } else {
        base = base.filter(item => values.includes(item[key]));
      }
    }
    return base;
  }

  sortCards(){
    const sortFuncs = settings.sortFuncs;
    sortFuncs.forEach(func => this.stockCards.sort(func));
  }

  renderCards(){
    this.stockCards.forEach(cardData => {
      this.container.append(super.newCard(cardData));
    });
  }
}
