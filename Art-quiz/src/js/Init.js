import {settings}  from "./Settings"
import {images} from "./Images"
import {routes} from "./Components"

class Game {
  constructor() {
    window.addEventListener('load', () => {this.setCategories();this.router();});    
    window.addEventListener('hashchange', () => this.router());
    //this.setCategories()
  }

  setCategories() {
    //let settings = {}
    //console.log('localStorage', localStorage.getItem('settings'),'JSON', JSON.parse(localStorage.getItem('settings')))
    
    
    settings.categories.forEach( (set,index) => {
      set.id = this.convertToId(set.name);
      set.totalQuestions = settings.questionsInCategory;
      set.imgData = this.getImgData(index);
    })
    //console.log('settings.categories', settings.categories)
  }

  convertToId(str) {
    return str.replace(' ', '_').toLowerCase()
  }

  getImgData(categoryNumber) {
    return images.slice(categoryNumber * settings.questionsInCategory, categoryNumber * settings.questionsInCategory + settings.questionsInCategory)
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







