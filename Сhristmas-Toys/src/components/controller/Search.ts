import Settings from '../DataBase/Settings';
import View from '../view/View';

export default class Search {
  input: HTMLInputElement;

  settings: Settings;

  clearBtn: HTMLElement;

  constructor(id:string) {
    this.input = document.getElementById(id) as HTMLInputElement;
    this.clearBtn = document.getElementById('clear-btn') as HTMLElement;
    this.settings = new Settings(); 
    this.settings.search( this.input.value);
    this.input.addEventListener('input', (e) => this.inputHandler(e));
    this.clearBtn.addEventListener('click', () => this.clearSearch());
  }

  inputHandler(e:Event) {
    const target = e.target as HTMLInputElement;
    this.settings.search(target.value);

    if (target.value) {
      this.input.classList.add('active');
    } else {
      this.input.classList.remove('active');
    }
    
    (new View()).renderCards( 'card-container', 'card-template', this.settings.toyCards );
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