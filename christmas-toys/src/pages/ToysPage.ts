import View from '../components/View';
import RangeSlider from '../components/noUiSlider/RangeSlider';
import Filter from '../components/Filter';
import ShowCase from '../components/ShowCase';
import { config } from '../config';
import Select from '../components/Select';
import { settings } from '../components/Settings';

const RESET_BTN_TEXT = 'Сбросить фильтры';
const DEFAULT_BTN_TEXT = 'По умолчанию';

export default class ToysPage extends View {
  filter: Filter;

  quantityRangeSlider: RangeSlider;

  yearRangeSlider: RangeSlider;

  constructor() {
    super();
    const toysPage = super.renderPage('main', 'toy-page-template');
    this.filter = new Filter(config.filters);
    this.quantityRangeSlider = new RangeSlider('quantity-range', config.rangeFilters.quantityRange);
    this.yearRangeSlider = new RangeSlider('year-range', config.rangeFilters.yearRange);
    new Select(config.select);

    const btnContainer = super.create('sorting-cards', 'div', 'sort__buttons');
  
    const resetFiltersBtn = super.create(btnContainer, 'button', ['button', 'button_reset'], RESET_BTN_TEXT);
    resetFiltersBtn.addEventListener('click', (e) => this.resetFilters(e));

    const resetDefaultBtn = super.create(btnContainer, 'button', ['button', 'button_reset'], DEFAULT_BTN_TEXT);
    resetDefaultBtn.addEventListener('click', (e) => this.resetDefault(e));

    new ShowCase();
  }

  resetFilters(e:Event){
    const target = e.target as HTMLElement;

    this.filter.setDefault();
    this.quantityRangeSlider.setDefault();
    this.yearRangeSlider.setDefault();

    const customEvent = new Event( 'updateFilter', { bubbles: true });
    target.dispatchEvent(customEvent);
  }

  resetDefault(e:Event){
    const target = e.target as HTMLElement;
    settings.setDefault();
    localStorage.setItem('settings', '');
    this.resetFilters(e);

    target.dispatchEvent(new Event( 'updateToyNums', { bubbles: true }));

    target.dispatchEvent(new Event( 'updateSelect', { bubbles: true }));
  }
  
}