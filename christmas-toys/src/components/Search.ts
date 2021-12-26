import { settings } from './Settings';

export default class Search {
  input: HTMLInputElement;

  clearBtn: HTMLElement;

  constructor(id:string) {
    this.input = document.getElementById(id) as HTMLInputElement;
    this.clearBtn = document.getElementById('clear-btn') as HTMLElement;

    this.input.addEventListener('input', (e) => this.inputHandler(e));
    this.clearBtn.addEventListener('click', () => this.clearSearch());
  }

  inputHandler(e:Event) {
    const target = e.target as HTMLInputElement;

    if (target.value) {
      this.input.classList.add('active');
    } else {
      this.input.classList.remove('active');
    }

    settings.filters[CardKeys.Name] = [target.value];

    const controlElement = document.getElementById('control') as HTMLElement;
    
    const customEvent = new Event( 'updateInput', { bubbles: true });
    controlElement.dispatchEvent(customEvent);
  }

  clearSearch(){
    this.input.value = '';
    this.input.dispatchEvent(new Event('input', { bubbles: true }) );
  }

  focus() {
    this.input.focus();
  }

  select() {
    this.input.select();
  }
}