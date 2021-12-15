import StartPage from './StartPage';
import ToysPage from './ToysPage';

export default class Header {

  constructor() {
    const header = document.getElementById('header') as HTMLElement;
    header.addEventListener('click', (e) => this.clickHandler(e));
  }


  clickHandler(e: Event) {
    const target = e.target as HTMLElement;
    const headerLinks = document.querySelectorAll('.header a');
    headerLinks.forEach( link => link.classList.remove('active'));
    
    if (target.getAttribute('href') === '#toys') {
      target.classList.add('active');
      new ToysPage();
    } 
    
    if (target.getAttribute('href') === '#') {
      new StartPage();
    }
  }
}