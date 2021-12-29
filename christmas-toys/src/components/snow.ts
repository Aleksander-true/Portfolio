import { config } from '../config';
import { settings } from './Settings';
import View from './View';

export default class Snow extends View{
  configSnow: { parentElementID: string; targetElementID: string; menuClasses: string[]; snowFlakeClasses: string[]; };

  container: HTMLElement;

  constructor(configSnow: typeof config.menus.snow) {
    super();
    this.configSnow = configSnow;
    this.container = document.getElementById(this.configSnow.targetElementID) as HTMLElement;
    this.renderMenu();
    this.renderSnowFlakes();
    this.toggleSnow();
    this.toggleSnow();
  }

  renderMenu(){
    const button = super.create(this.configSnow.parentElementID, 'div', this.configSnow.menuClasses);

    button.addEventListener('click', () => this.toggleSnow());
  }

  toggleSnow() {
    if (settings.treePage.isSnow) {
      settings.treePage.isSnow = false;
      this.container.classList.add('snow-ON');
    } else {
      settings.treePage.isSnow = true;
      this.container.classList.remove('snow-ON');
    }
  }

  renderSnowFlakes(){
    for (let i = 0; i < 70; i++ ) {
      this.create(this.container, 'div', this.configSnow.snowFlakeClasses);
    }
  }
}