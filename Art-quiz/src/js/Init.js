import {Settings}  from "./Settings"
import {images} from "./Images"
import {routes} from "./Components"

class Game {
  constructor() {
    window.addEventListener('load', () => {new Settings(), this.router();});    
    window.addEventListener('hashchange', () => this.router());
    
    //this.setCategories()
  }

  router()  {
    const mainPage = document.getElementById('main-page')
    const coverPage = document.getElementById('cover-page')
  
    const [path, ...param] = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
  
    if (path.includes('modal')) coverPage.innerHTML = component.render(...param);
    else {
      coverPage.innerHTML = '';
      mainPage.innerHTML = component.render(...param);
    }
  
    function findComponentByPath (path, routes) {
      let regexp = new RegExp(`^\\${path}$`, 'gm')
      return routes.find(route => route.path.match(regexp)) || undefined;
    }
  
    function parseLocation () {
      //console.log('location.hash', location.hash)
      let pathStr = location.hash.slice(1).toLowerCase() || '/';
      if (pathStr.includes('&')) return pathStr.split('&')
      else return [pathStr, null]
    } 
  };

}


let game = new Game();







