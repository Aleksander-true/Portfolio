import View from '../modules/View';
import ToysPage from './ToysPage';

export default class StartPage {
  view: View;

  constructor() {
    this.view = new View;

    const startPage = this.view.renderPage('main', 'start-page', 'start-page');
    startPage.addEventListener('click', (e) => this.clickHandler(e));
  }

  clickHandler(e: Event) {
    const target = e.target as HTMLElement;

    if (target.getAttribute('id') === 'start-button') {
      new ToysPage();
    }
  }
}
 