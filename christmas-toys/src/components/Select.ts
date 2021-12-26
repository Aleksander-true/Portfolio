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

      if (option.key == settings.toyPage.sort.key && option.direction == settings.toyPage.sort.direction) {
        optionElement.selected = true;
      }
    });

    this.addSort(settings.toyPage.sort.key, settings.toyPage.sort.direction);
    this.select.addEventListener('change', () => this.changeHandler());
    document.addEventListener('updateSelect', () => this.update());
  }

  update() {
    const options = this.select.querySelectorAll('option');
    options.forEach(option => {
      const [key, direction] = option.value.split('&');
      if (key == settings.toyPage.sort.key && direction == settings.toyPage.sort.direction) {
        option.selected = true;
      }
    });
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
    settings.toyPage.sort = { key: key, direction: direction };

    const customEvent = new Event( 'updateSort', { bubbles: true });
    this.select.dispatchEvent(customEvent);
  }
}