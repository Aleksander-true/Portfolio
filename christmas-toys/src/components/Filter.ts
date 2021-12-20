import { config } from './config';
import { settings } from './settings';
import ShowCase from './ShowCase';
import View from './View';

export default class Filter extends View {
  filters: typeof config['filters'];

  constructor(parentElementID: string) {
    super();
    this.filters = config.filters;
    this.renderAll(parentElementID);
    console.log('this.filters', this.filters);
  }

  renderAll(parentElementID: string) {
    const parentElement = document.getElementById(parentElementID) as HTMLElement;

    this.filters.forEach( filter => {
      const element = super.create(parentElementID, 'div', filter.classes);
      const filterText = super.create(element, 'span', 'filter__text');
      filterText.textContent = filter.text;

      filter.options.forEach(option => {
        const button = super.create(element, 'button', option.classes);
        button.addEventListener('click', (e) => this.buttonClickHandler(e, filter.key, option.value));
      }); 

      parentElement.append(element);
    });
  }

  buttonClickHandler(e:Event, key: keyof IData, value:string){
    const target = e.target as HTMLElement;
    super.toggleActive(target);
    settings.toggleFilter(key, value);
    new ShowCase();
  }
}