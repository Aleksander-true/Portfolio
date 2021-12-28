import { config } from '../config';
import View from './View';

export default class Snow extends View{
  configSnow: { parentElementID: string; targetElementID: string; menuClasses: string[]; snowFlakeClasses: string[]; };

  constructor(configSnow: typeof config.menus.snow) {
    super();
    this.configSnow = configSnow;
    this.renderMenu();
  }

  renderMenu(){
    const button = super.create(this.configSnow.parentElementID, 'div', this.configSnow.menuClasses);

    button.addEventListener('click', () => this.toggleSnow());
  }

  toggleSnow() {
    this.renderSnowFlakes();
  }

  renderSnowFlakes(){
    for (let i = 0; i < 70; i++ ) {
      this.create(this.configSnow.targetElementID, 'div', this.configSnow.snowFlakeClasses);
    }
  }
}