import View from '../view/View';
import DataBase from '../DataBase/DataBase';
import Settings from '../DataBase/Settings';
import RangeSlider from '../noUiSlider/RangeSlider';

export default class ToysPage {
  view: View;

  dataBase: DataBase;

  settings: Settings;

  constructor() {
    this.view = new View;
    this.dataBase = new DataBase();
    this.settings = new Settings();

    const toysPage = this.view.renderPage('main', 'toy-page-template');
    new RangeSlider('qty-range', { start:[1, 12], connect: true, range:{ 'min': 1, 'max': 12 }, step: 1 });
    new RangeSlider('year-range', { start: [1940, 2020], connect: true, range: { 'min': 1940, 'max': 2020 }, step: 1 });
    
    this.view.renderCards( 'card-container', 'card-template', this.dataBase.data );
    toysPage.addEventListener('click', (e) => this.clickHandler(e));
    toysPage.addEventListener('update', (e) => this.updateHandler(e));
  }

  clickHandler(e: MouseEvent) {
    let target = e.target as HTMLElement;

    while (target !== e.currentTarget) {
    /** Filtering buttons */
      if (target.tagName == 'BUTTON' && target.dataset.filterValue) {

        this.settings.toggle(target.dataset.filterValue);
        this.settings.filterOut();
        
        this.view.toggle(target);
        this.view.renderCards( 'card-container', 'card-template', this.settings.toyCards );
        return;
      }

      /**Add to cart*/
      if (target.classList.contains('card')) {
        
        const isUpdate = this.settings.updateCartStore(target.dataset.toyNumber);
        this.view.updateCartNumber(this.settings.cartNumber);
        if (isUpdate) {
          this.view.toggle(target);
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
  
  updateHandler(e: Event) {
    const target = e.target as HTMLElement;
    if (target.id === 'qty-range') {
      const outputMin = document.getElementById('qty-range-min') as HTMLElement;
      const outputMax = document.getElementById('qty-range-max') as HTMLElement;

      this.settings.qtyRange = [outputMin.textContent, outputMax.textContent];
    }

    if (target.id === 'year-range') {
      const outputMin = document.getElementById('year-range-min') as HTMLElement;
      const outputMax = document.getElementById('year-range-max') as HTMLElement;

      this.settings.yearRange = [outputMin.textContent, outputMax.textContent];
    }
    this.settings.filterOut();
    this.view.renderCards( 'card-container', 'card-template', this.settings.toyCards );
    console.log('this.settings', this.settings.qtyRange, this.settings.yearRange);
  }

}