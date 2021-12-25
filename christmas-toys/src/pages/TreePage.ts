import ChoseTree from '../components/ChoseTree';
import Garland from '../components/Garland';
import ToysMenu from '../components/ToysMenu';
import TreeBackground from '../components/TreeBackground';
import View from '../components/View';
import { config } from '../config';

export default class TreePage extends View{

  constructor() {
    super();
    const treePage = super.renderPage('main', 'tree-page-template', 'tree');
    new ToysMenu(config.menus.decorateToys);
    new TreeBackground('left-menu', 'tree-container');
    new ChoseTree('left-menu', 'tree-container');
    new Garland(config.menus.garland);
  }
}