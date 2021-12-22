import Search from './Search';
import StartPage from '../pages/StartPage';
import ToysPage from '../pages/ToysPage';
import ToyCart from './ToyCart';

export default class Header { 

  constructor() {
    const header = document.getElementById('header') as HTMLElement;
    header.addEventListener('click', (e) => this.clickHandler(e));
    new Search('input-search');
    new ToyCart('cart-number');
  }

  clickHandler(e: Event) {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'A') return;
   
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