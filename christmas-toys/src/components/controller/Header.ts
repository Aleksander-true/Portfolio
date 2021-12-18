import Settings from '../DataBase/Settings';
import View from '../view/View';
import Search from './Search';
import StartPage from './StartPage';
import ToysPage from './ToysPage';

export default class Header {

  search: Search;

  constructor() {
    this.search = new Search('input-search');
    (new View).updateCartNumber((new Settings).cartNumber);
    const header = document.getElementById('header') as HTMLElement;
    header.addEventListener('click', (e) => this.clickHandler(e));
  }

  clickHandler(e: Event) {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'A') return;
   
    const headerLinks = document.querySelectorAll('.header a');
    headerLinks.forEach( link => link.classList.remove('active'));

    
    if (target.getAttribute('href') === '#toys') {
      target.classList.add('active');
      new ToysPage();
      this.search.focus();
      this.search.select();
    } 
    
    if (target.getAttribute('href') === '#') {
      new StartPage();
    }
  }

}