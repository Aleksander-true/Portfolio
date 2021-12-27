import { config } from '../config';
import { settings } from './Settings';
import SwitchButton from './switch/Switch';
import View from './View';

const GARLAND_LIGHT_QUANTITY = 80;

export default class Garland extends View{
  menu: HTMLElement;

  container: HTMLElement;

  configGarland: { parentElementID: string; targetElementID: string; classes: string[]; text: string; textClasses: string; buttons: { animationName: string; classes: string[]; }[]; };
  
  checkbox: SwitchButton;

  constructor(configGarland: typeof config.menus.garland) {
    super();
    this.configGarland = configGarland;

    this.menu = super.create(configGarland.parentElementID, 'div', configGarland.classes);
    super.create(this.menu, 'h3', configGarland.textClasses, configGarland.text);
    configGarland.buttons.forEach( btn => {
      const button = super.create(this.menu, 'button', btn.classes);

      button.addEventListener('click', ()=> this.clickHandler(btn.animationName));
    });

    this.checkbox = new SwitchButton(this.menu);
    this.checkbox.input.checked = settings.treePage.garlandSwitch;
    this.checkbox.input.addEventListener('change', (e) => this.switchGarland(e));
    this.container = super.create(configGarland.targetElementID, 'div', settings.treePage.garlandColor);

    if (this.checkbox.input.checked) {
      this.renderGarland(settings.treePage.garlandColor);
    }

    document.addEventListener('changingTree', () => this.checkbox.input.checked = false );
  }

  clickHandler(animationName:string){
    console.log('animationName', animationName);
    settings.treePage.garlandColor = animationName;
    this.container.className = animationName;
    if (!this.checkbox.input.checked) {
      this.checkbox.input.checked = true;
      settings.treePage.garlandSwitch = true;
    }
    this.renderGarland(animationName);
  }

  switchGarland(e: Event) {
    const input = e.target as HTMLInputElement;
    settings.treePage.garlandSwitch = input.checked;
    if (input.checked) {
      this.container.style.display = 'block';
      this.renderGarland(settings.treePage.garlandColor);
    } else {
      this.container.remove();
    }
  }

  renderGarland(animationName: string){
    settings.treePage.garlandColor = animationName;
    this.container.remove();
    this.container = super.create(this.configGarland.targetElementID, 'div', animationName);
    for (let i = 0; i < GARLAND_LIGHT_QUANTITY; i++ ) {
      super.create(this.container, 'div', 'light');
    }
  }
}