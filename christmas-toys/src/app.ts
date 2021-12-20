import Header from './components/pages/Header';
import StartPage from './components/pages/StartPage';
import View from './components/View';

export default class App {
  view: View;

  constructor() {
    this.view = new View();
  }

  start() {
    new StartPage();
    new Header();
  }
  
}