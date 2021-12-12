import StartPage from './StartPage';
import ToysPage from './ToysPage';

export default class Header {

  constructor() {
    const header = document.getElementById('header') as HTMLElement;
    //const header = this.view.create('div', 'header__container');
    //this.view.renderPage(header, 'template', 'main');
    header.addEventListener('click', (e) => this.clickHandler(e));
  }


  clickHandler(e: Event) {
    const target = e.target as HTMLElement;
    const headerLinks = document.querySelectorAll('.header a');
    
    if (target.getAttribute('href') === '#toys') {
      headerLinks.forEach( link => link.classList.remove('active'));
      target.classList.add('active');
      new ToysPage();
    } 
    if (target.getAttribute('href') === '#') {
      headerLinks.forEach( link => link.classList.remove('active'));
      new StartPage();
    }
  }
}