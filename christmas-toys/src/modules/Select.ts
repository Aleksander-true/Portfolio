import { config } from '../config';
import { settings } from './Settings';
import View from './View';

export default class Select extends View{
  select: HTMLSelectElement;

  constructor(configSelect: typeof config.select){
    super();
    this.select = super.create(configSelect.parentElementID, 'select', configSelect.classes) as HTMLSelectElement;
    configSelect.options.forEach(option => {
      const optionElement = this.create(this.select, 'option', option.classes, option.text) as HTMLOptionElement;
      optionElement.value = `${option.key}&${option.direction}`;
    });

    this.addSort();
    this.select.addEventListener('change', () => this.changeHandler());
  }

  changeHandler(){
    const optionElements = this.select.querySelectorAll('option');
    optionElements.forEach( element => {
      if (element.selected) {
        const [key, direction] = element.value.split('&');
        this.addSort(key as keyof IToy, direction as Direction);
        return;
      }
    });
  }
    
  addSort(key: keyof IToy = CardKeys.Name, direction = Direction.Direct){
    let func: SortFunc = (a, b) => a[key] > b[key] ? 1 : -1 ;
  
    if (key === CardKeys.Name && direction === Direction.Reverse) {
      func = (a, b) => a[key] < b[key] ? 1 : -1 ;
      
    } else if (key === CardKeys.Count && direction === Direction.Direct) {
      func = (a, b) => +a[key] > +b[key] ? 1 : -1 ;
  
    } else if (key === CardKeys.Count && direction === Direction.Reverse) {
      func = (a, b) => +a[key] < +b[key] ? 1 : -1 ;
    } 
    
    settings.sortFunc = func;
    const customEvent = new Event( 'updateSort', { bubbles: true });
    this.select.dispatchEvent(customEvent);
  }
}