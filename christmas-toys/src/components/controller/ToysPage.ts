import View from '../view/View';
import DataBase from '../DataBase/DataBase';
import Settings from '../DataBase/Settings';
import RangeSlider from '../noUiSlider/RangeSlider';
import { Options } from 'nouislider';

export default class ToysPage {
  view: View;

  dataBase: DataBase;

  settings: Settings;

  qtyRangeSlider: RangeSlider;

  yearRangeSlider: RangeSlider;

  constructor() {
    this.view = new View;
    this.dataBase = new DataBase();
    this.settings = new Settings();

    const toysPage = this.view.renderPage('main', 'toy-page-template');

    this.qtyRangeSlider = new RangeSlider('qty-range', this.qtyRangeSliderOptions );
    this.yearRangeSlider = new RangeSlider('year-range', this.yearRangeSliderOptions);

    this.settings.sort(this.settings.sortType);

    this.view.updateFilterButtons(this.settings.filter);
    this.view.updateSelect(this.settings.sortType);
    this.view.renderCards( 'card-container', 'card-template', this.settings.toyCards );

    toysPage.addEventListener('click', (e) => this.clickHandler(e));
    toysPage.addEventListener('update', (e) => this.updateHandler(e));
    toysPage.addEventListener('change', (e) => this.selectHandler(e));
  }

  get qtyRangeSliderOptions():Options {
    return {
      start: this.settings.filter.qty, 
      connect: true, 
      range:{ min: +Settings.default.qty[0], max: +Settings.default.qty[1] }, 
      step: 1,
    };
  }

  get yearRangeSliderOptions():Options {
    return {
      start: this.settings.filter.year, 
      connect: true, 
      range:{ min: +Settings.default.year[0], max: +Settings.default.year[1] }, 
      step: 5,
    };
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

      /**Reset all filters */
      if (target.tagName == 'BUTTON' && target.classList.contains('button__reset')) {
        this.settings.resetFilters();
        this.view.updateFilterButtons(this.settings.filter);
        this.qtyRangeSlider.setRange(Settings.default.qty);
        this.yearRangeSlider.setRange(Settings.default.year);
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

    /**Changing toy quantity and toy year by range sliders */
    if (target.id === 'qty-range') {
      this.settings.qtyRange = this.qtyRangeSlider.getRange();
    }

    if (target.id === 'year-range') {
      this.settings.yearRange = this.yearRangeSlider.getRange();
    }

    this.settings.filterOut();
    this.view.renderCards( 'card-container', 'card-template', this.settings.toyCards );
  }

  selectHandler(e: Event){
    const target = e.target as HTMLSelectElement;

    this.settings.sort(target.value);
    this.view.renderCards( 'card-container', 'card-template', this.settings.toyCards );
  }

}