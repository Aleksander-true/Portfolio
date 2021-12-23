import { config } from '../config';
import { settings } from './Settings';
import View from './View';

export default class Filter extends View {
  filters: typeof config['filters'];

  filterButtons: HTMLElement[];

  constructor(configFilters: typeof config.filters) {
    super();
    this.filters = configFilters;
    this.filterButtons = [];
    this.renderAll();
  }

  renderAll() {
    this.filters.forEach( filter => {
      const parentElement = document.getElementById(filter.parentElementID) as HTMLElement;

      const element = super.create(parentElement, 'div', filter.classes);
      super.create(element, 'span', 'filter__text', filter.text);

      filter.options.forEach(option => {
        const button = super.create(element, 'button', option.classes);
        this.filterButtons.push(button);
        if (settings.filters[filter.key] && settings.filters[filter.key].includes(option.value) ) {
          super.toggleActive(button);
        }
        button.addEventListener('click', (e) => this.buttonClickHandler(e, filter.key, option.value));
      }); 

      parentElement.append(element);
    });
  }

  buttonClickHandler(e:Event, key: keyof IToy, value:string){
    const target = e.target as HTMLElement;
    super.toggleActive(target);
    settings.toggleFilter(key, value);

    const customEvent = new Event( 'updateFilter', { bubbles: true });
    target.dispatchEvent(customEvent);
  }

  setDefault(){
    settings.filters = {};
    this.filterButtons.forEach( button => button.classList.remove('active'));
  }
}