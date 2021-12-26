import InfoWindow from './modal/InfoWindow';
import Card from './Card';
import { settings } from './Settings';
import View from './View';

export default class ShowCase extends View {

  stockCards: IToy[] ;

  container: HTMLElement;

  constructor(parentElementID = 'main'){
    super();
    this.container = this.create(parentElementID, 'div', 'card-container');
    this.stockCards = [];
    this.updateFilter();

    const controlElement = document.getElementById('control') as HTMLElement;
    controlElement.addEventListener('updateFilter', () => this.updateFilter());
    controlElement.addEventListener('updateInput', () => this.updateFilter());
    controlElement.addEventListener('updateSort', () => this.updateSort());
  }

  async updateFilter() {
    this.stockCards = await this.filterCards();
    this.sortCards();
    this.renderCards();
    console.log('updateFilter');
  }

  updateSort(){
    this.sortCards();
    this.renderCards();
  }

  async filterCards(){
    let base = await super.getData();
    for (const [keyOfData, values] of Object.entries(settings.toyPage.filters)) {
      const key = keyOfData as keyof IToy;
      if (key === CardKeys.Favorite) {
        base = base.filter(item => (values[0] === 'да') ? item[key] : true );
      } else if (key === CardKeys.Count || key === CardKeys.Year) {
        base = base.filter(item => ((+item[key] >= +values[0]) && (+item[key] <= +values[1])));
      } else if (key === CardKeys.Name) {
        const regExp = new RegExp(values[0], 'i');
        base = base.filter(item => regExp.test(item[key]));
      } else {
        base = base.filter(item => values.includes(item[key]));
      }
    }
    return base;
  }

  sortCards(){
    const { key, direction } = settings.toyPage.sort;
    let func: SortFunc = (a, b) => a[key] > b[key] ? 1 : -1 ;
    
    if (key === CardKeys.Name && direction === Direction.Reverse) {
      func = (a, b) => a[key] < b[key] ? 1 : -1 ;
        
    } else if (key === CardKeys.Count && direction === Direction.Direct) {
      func = (a, b) => +a[key] > +b[key] ? 1 : -1 ;
    
    } else if (key === CardKeys.Count && direction === Direction.Reverse) {
      func = (a, b) => +a[key] < +b[key] ? 1 : -1 ;
    } 

    this.stockCards.sort(func);
  }

  renderCards(){
    this.container.innerHTML = '';

    if (this.stockCards.length == 0) {
      new InfoWindow(this.container, 'Извините,', 'совпадений не обнаружено');
    } else {
      this.stockCards.forEach(cardData => {
        new Card(this.container, cardData);
      });
    }
  }
}
