import View from '../view/View';
import RangeSlider from '../noUiSlider/RangeSlider';
import DataBase from '../DataBase/DataBase';
import Settings from '../DataBase/Settings';

export default class ToysPage {
  view: View;

  dataBase: DataBase;

  settings: Settings;

  constructor() {
    this.view = new View;
    this.dataBase = new DataBase();
    this.settings = new Settings();

    const toysPage = this.view.renderPage('main', 'toy-page-template');
    new RangeSlider();
    this.view.renderCards( 'card-container', 'card-template', this.dataBase.data );
    toysPage.addEventListener('click', (e) => this.clickHandler(e));
  }

  clickHandler(e: MouseEvent) {
    let target = e.target as HTMLElement;

    while (target !== e.currentTarget) {
    /** Filtering buttons */
      if (target.tagName == 'BUTTON' && target.dataset.filterValue) {
        this.view.toggle(target);
        this.settings.toggle(target.dataset.filterValue);
      
        const filteredData = this.dataBase.filterOut( this.settings);
        this.settings.filteredCardNumbers = filteredData.map(item => item.num);
        this.view.renderCards( 'card-container', 'card-template', filteredData );
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

}