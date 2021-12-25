import { config } from '../config';
import SwitchButton from './switch/Switch';
import View from './View';

export default class Garland extends View{
  menu: HTMLElement;

  container: HTMLElement;

  configGarland: { parentElementID: string; targetElementID: string; classes: string[]; text: string; textClasses: string; buttons: { animationName: string; classes: string[]; }[]; };

  constructor(configGarland: typeof config.menus.garland) {
    super();
    this.configGarland = configGarland;

    this.menu = super.create(configGarland.parentElementID, 'div', configGarland.classes);
    super.create(this.menu, 'h3', configGarland.textClasses, configGarland.text);
    configGarland.buttons.forEach( btn => {
      const button = super.create(this.menu, 'button', btn.classes);

      button.addEventListener('click', ()=> this.clickHandler(btn.animationName));
    });
    const checkbox = new SwitchButton(this.menu);
    checkbox.input.addEventListener('change', (e) => this.switchGarland(e));
    this.container = super.create(configGarland.targetElementID, 'div', 'multi-color');

    this.renderGarland();

    document.addEventListener('changingTree', () => checkbox.input.checked = false );
  }

  clickHandler(animationName:string){
    console.log('animationName', animationName);
    this.container.className = animationName;
    this.renderGarland(animationName);
  }

  switchGarland(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.checked) {
      this.container.style.display = 'block';
      this.renderGarland();
    } else {
      this.container.remove();
    }
  }

  renderGarland(animationName = 'multi-color'){
    this.container.remove();
    this.container = super.create(this.configGarland.targetElementID, 'div', animationName);
    for (let i = 0; i < 210; i++ ) {
      super.create(this.container, 'div', 'light');
    }
  }
}