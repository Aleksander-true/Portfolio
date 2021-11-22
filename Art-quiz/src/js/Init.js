import {Settings}  from "./Settings"

import {routes} from "./Routes"

class Game {
  constructor() {
    this.loadingGif = document.querySelector('#loading')
    this.settings = new Settings()
    
    this.preLoadedCategoryImg()
    window.addEventListener('load', () => {this.router(); this.loadingGif.style.display = 'none'});    
    window.addEventListener('hashchange', () => this.router());
  }

  preLoadedCategoryImg() {
    for (let type in  this.settings.categories) {
      this.settings.categories[type].forEach( category => {
        let img = new Image()
        img.src = `./base-img/square/${category.imgData[0].imageNum}.jpg`
      });
    }
  }

  router()  {
    const mainPage = document.getElementById('main-page')
    const coverPage = document.getElementById('cover-page')
    const header = document.getElementById('header-page')
    const tempPage = document.getElementById('temp-page')
  
    const [path, ...param] = parseLocation();
    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    if (path.includes('modal')) {
      coverPage.innerHTML = component.render(...param);
    }
    else if (path.includes('header')) header.innerHTML = component.render(...param);
    else {
      coverPage.innerHTML = '';
      tempPage.innerHTML = mainPage.innerHTML
      mainPage.innerHTML = component.render(...param)
      mainPage.addEventListener('animationend', () => {tempPage.innerHTML = ''},{once: true})
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







