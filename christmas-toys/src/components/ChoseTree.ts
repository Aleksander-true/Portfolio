import { config } from '../config';
import { settings } from './Settings';
import View from './View';

export default class ChoseTree extends View {
  menu: HTMLElement;

  treeImg: HTMLElement;

  area: HTMLElement;

  constructor(parentMenuID: string, parentBackgroundID:string) {
    super();
    this.area = document.getElementById('tree-area') as HTMLElement;
    this.area.addEventListener('drop', (e)=> this.dropHandler(e));
    this.area.addEventListener('dragover', (e)=> this.dragoverHandler(e));
    
    this.treeImg = super.create(parentBackgroundID, 'div', 'tree__img-container');
    this.treeImg.id = 'tree-img-container';
    this.treeImg.addEventListener('dragstart', (e)=> this.dragstartHandler(e));

    this.menu = super.create(parentMenuID, 'div', config.menus.tree.classes);

    super.create(this.menu, 'h3', config.menus.tree.textClasses, config.menus.tree.text);
    
    config.menus.tree.imgURLs.forEach( url => {
      const img = super.create(this.menu, 'img', config.menus.tree.imgClasses) as HTMLImageElement;
      img.src = url;
      img.alt = 'tree';

      img.addEventListener('click', () => this.renderImage(url));
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    this.renderImage(settings.treePage.treeImgURL);
  }

  renderImage(url: string){
    settings.treePage.treeImgURL = url;
    
    this.treeImg.innerHTML = '';
    const img = super.create(this.treeImg, 'img', 'tree__img') as HTMLImageElement;
    img.src = url;
    img.useMap = '#tree-map';

    const customEvent = new Event( 'changingTree', { bubbles: true });
    img.dispatchEvent(customEvent);
  }

  dropHandler(e: DragEvent){
    e.preventDefault();
    const innerCords = e.dataTransfer?.getData('text/plain');
    const [targetInnerX, targetInnerY] = innerCords?.split('&') || ['0', '0'];
    
    const data = e.dataTransfer?.getData('text/html');
    const img = this.create(this.treeImg, 'div', 'tree__toy', data);
    
    const containerOffset = this.treeImg.getBoundingClientRect();
    
    img.style.left = `${(e.pageX - containerOffset.left - +targetInnerX) * 100 / containerOffset.width}%`;
    img.style.top = `${(e.pageY  - containerOffset.top - +targetInnerY) * 100  / containerOffset.height}%`;
  }

  dragoverHandler(e: DragEvent) {
    e.preventDefault();
  }

  dragstartHandler(e: DragEvent){
    const target = e.target as HTMLImageElement;
    target.addEventListener('dragend', ()=> target.remove());

    e.dataTransfer?.setData('text/html', target.outerHTML);
    e.dataTransfer?.setData('text/plain', this.getInnerShift(e, target));

    target.addEventListener('dragend', (dropEvent) => this.updateToyCount(dropEvent, target), { once: true });
  }

  getInnerShift(e:MouseEvent, elem: HTMLElement) {
    const box = elem.getBoundingClientRect();
    return `${e.pageX - box.left }&${e.pageY - box.top}`;
  }

  updateToyCount(e: DragEvent, target:HTMLElement){
    if (e.dataTransfer?.dropEffect !== 'none') return;

    const regExp = new RegExp(`^${target.dataset.number}&`);

    settings.treePage.decorateToyNums = settings.treePage.decorateToyNums.map(item => {
      if (regExp.test(item)) {
        const [number, count] = item.split('&');
        return `${number}&${+count + 1}`;
      } else {
        return item;
      }
    });
    const customEvent = new Event( 'updateToyCount', { bubbles: true });
    this.area.dispatchEvent(customEvent);
  }
}