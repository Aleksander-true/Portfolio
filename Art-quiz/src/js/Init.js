import {Settings}  from "./Settings"

import {routes} from "./Routes"

class Game {
  constructor() {
    new Settings()

    window.addEventListener('load', () => {this.router();});    
    window.addEventListener('hashchange', () => this.router());
    
    //this.setCategories()
  }

  router()  {
    const mainPage = document.getElementById('main-page')
    const coverPage = document.getElementById('cover-page')
    const header = document.getElementById('header-page')
  
    const [path, ...param] = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    if (path.includes('modal')) {
      coverPage.innerHTML = component.render(...param);
    }
    else if (path.includes('header')) header.innerHTML = component.render(...param);
    else {
      coverPage.innerHTML = '';
      mainPage.innerHTML = component.render(...param);
    }
  
    function findComponentByPath (path, routes) {
      let regexp = new RegExp(`^\\${path}$`, 'gm')
      return routes.find(route => route.path.match(regexp)) || undefined;
    }
  
    function parseLocation () {
      let pathStr = location.hash.slice(1).toLowerCase() || '/';
      if (pathStr.includes('&')) return pathStr.split('&')
      else return [pathStr, null]
    } 
  };

}


let game = new Game();







