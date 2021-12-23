import ToysMenu from '../components/ToysMenu';
import TreeBackground from '../components/TreeBackground';
import View from '../components/View';

export default class TreePage extends View{

  constructor() {
    super();
    const treePage = super.renderPage('main', 'tree-page-template', 'tree');
    new ToysMenu('toys-menu');
    new TreeBackground('left-menu', 'tree-container');
  }
}