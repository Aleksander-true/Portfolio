import View from '../components/view/View';
import Header from '../components/controller/Header';
import StartPage from '../components/controller/StartPage';


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