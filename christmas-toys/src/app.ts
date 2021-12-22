import Header from './modules/Header';
import StartPage from './pages/StartPage';

export default class App {

  start() {
    new Header();
    new StartPage();
  }
  
}