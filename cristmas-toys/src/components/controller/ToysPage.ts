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
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON' || !target.dataset.filterValue) return;
    this.view.toggle(target);

    if (target.parentElement?.dataset.filterValue === 'shape') {
      this.settings.toggle('shape', target.dataset.filterValue);
    }
    
    if (target.parentElement?.dataset.filterValue === 'color') {
      this.settings.toggle('color', target.dataset.filterValue);
    }

    if (target.parentElement?.dataset.filterValue === 'size') {
      this.settings.toggle('size', target.dataset.filterValue);
    }

    if (target.parentElement?.dataset.filterValue === 'favorite') {
      this.settings.toggle('favorite', target.dataset.filterValue);
    }

    const filteredData = this.dataBase.filterOut( this.settings);
    this.view.renderCards( 'card-container', 'card-template', filteredData );
  }

}