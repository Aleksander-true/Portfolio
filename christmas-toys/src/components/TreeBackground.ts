import { config } from '../config';
import { settings } from './Settings';
import View from './View';

export default class TreeBackground extends View{
  background: HTMLElement;

  menu: HTMLElement;
    
  constructor(parentMenuID: string, parentBackgroundID:string){
    super();
    this.background = super.create(parentBackgroundID, 'div', 'tree__background');

    this.menu = super.create(parentMenuID, 'div', config.menus.background.classes);
    super.create(this.menu, 'h3', config.menus.background.textClasses, config.menus.background.text);
    
    config.menus.background.imgURLs.forEach( url => {
      const img = super.create(this.menu, 'img', config.menus.background.imgClasses) as HTMLImageElement;
      img.src = url;
      img.alt = 'background';

      img.addEventListener('click', () => this.renderBackground(url));
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    this.renderBackground(settings.treePage.backgroundImgURL);
  }

  renderBackground(url: string){
    settings.treePage.backgroundImgURL = url;
    this.background.style.backgroundImage = `url("${url}")`;
  }
}