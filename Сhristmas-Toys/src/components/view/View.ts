import Warning from './Warning';

export default class View {


  renderPage(parentElementID :string, templateID: string, containerClass = '', isClearParent = true ): HTMLElement {
    const container = document.createElement('div');
    container.className = containerClass;

    const parentElement = document.getElementById(parentElementID) as HTMLElement;
    if (isClearParent) parentElement.innerHTML = '';

    const template = document.getElementById(templateID) as HTMLTemplateElement;
    const templateClone = template.content.cloneNode(true) as HTMLElement;

    container.append(templateClone);
    parentElement.append(container);

    return container;
  }

  renderCards(parentElementID: string, templateID: string, filteringData: IData[]) {

    const parentElement = document.getElementById(parentElementID) as HTMLElement;
    parentElement.innerHTML = '';

    if (filteringData.length == 0) {
      new Warning(parentElement, 'Извините,', 'совпадений не обнаружено');
      return;
    }

    filteringData.forEach( card => {
      const template = document.getElementById(templateID) as HTMLTemplateElement;
      const templateClone = template.content.cloneNode(true) as HTMLElement;
      (<HTMLElement>templateClone.querySelector('.card')).dataset.toyNumber = card.num;
      (<HTMLElement>templateClone.querySelector('.card__title')).textContent = card.name;
      (<HTMLElement>templateClone.querySelector('.count')).textContent = `Количество: ${card.count}`;
      (<HTMLElement>templateClone.querySelector('.year')).textContent = `Год: выпуска: ${card.year}`;
      (<HTMLElement>templateClone.querySelector('.shape')).textContent = `Форма: ${card.shape}`;
      (<HTMLElement>templateClone.querySelector('.color')).textContent = `Цвет: ${card.color}`;
      (<HTMLElement>templateClone.querySelector('.size')).textContent = `Размер: ${card.size}`;
      (<HTMLElement>templateClone.querySelector('.favorite')).textContent = card.favorite ? 'Любимая: да' : 'Любимая: нет';
      (<HTMLImageElement>templateClone.querySelector('.card__img')).src = `./assets/toys/${card.num}.png`;

      if (card.checked) (<HTMLElement>templateClone.querySelector('.card'))?.classList.add('active');
      parentElement.append(templateClone);
    }); 
  }

  toggle(element: HTMLElement[] | HTMLElement): void {
    if (!Array.isArray(element)) element = [element];
    element.forEach( item => item.classList.toggle('active'));
  }

  updateSelect(sortType: ISettings['sortType']){
    const optionsElements = document.querySelectorAll('.sort__select option') as NodeListOf<HTMLOptionElement>;
    optionsElements.forEach( option => {
      option.selected = ( option.value == sortType) ? true : false;
    });   
  }

  updateFilterButtons(filters:ISettings['filter']) {
    const filtersElements = document.querySelectorAll('.filter button') as NodeListOf<HTMLElement>;
    const allFilters = Object.values(filters).flat();

    filtersElements.forEach( element => {
      if (allFilters.includes(element.dataset.filterValue || ''))  {
        element.classList.remove('active');
      } else {
        element.classList.add('active');
      }
    });
  }

  updateCartNumber(n:number) {
    (<HTMLElement>document.getElementById('cart-number')).textContent = String(n);
  }

}