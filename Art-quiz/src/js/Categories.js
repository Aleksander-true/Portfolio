import {settings} from "./Settings"

import {Common} from "./CommonClass"
import {Quiz} from "./Quiz"

class Categories extends Common {
  constructor (type) {
    super()
    console.log('constructor')
    this.categoriesPage = document.querySelector('#categories-page')
    this.container = this.appendElement({parentElement: this.categoriesPage, elementClass: 'categories__cards-wrapper', id: 'cards-wrapper' })
    this.type = type;
    //this.renderCategories()
    this.container.addEventListener('click', (event) => this.startNewQuiz(event))

    console.log('this.categoriesPage', this.categoriesPage)
    this.categoriesPage.classList.remove('hide-page')
    this.categoriesPage.classList.add('show-page')

    this.homeLink = document.querySelector('#home-link')
    this.homeLink.addEventListener('click', () => this.hideCategory())
  }
  
startNewQuiz(event) {
    let id = this.getId(event)
    let chosenCategory = settings.categories.find( cat => cat.id === id)
    console.log('chosenCategory', chosenCategory)
    new Quiz(chosenCategory)
    //this.hideCategory() 
  }
/*  
  renderCategories() {
    console.log('renderCategories settings', settings)
    this.container.innerHTML = '';
    settings.categories.forEach( (category)=>{
      let card = this.appendElement({parentElement: this.container, elementClass: `categories__card played__${category.isPlayed}`, id: category.id })
      this.appendElement({parentElement:card, tag: 'span', elementClass: 'categories__card_name', innerHTML: `<h4>${category.name}</h4>`})
      if (category.isPlayed) {
        this.appendElement({parentElement:card, tag: 'span', elementClass: 'categories__card_solved-qty', innerHTML: `<h4>${category.answeredQty}/${settings.questionsInCategory}</h4>`})
      }
      this.appendElement({parentElement: card, tag: 'img', elementClass: 'categories__card_img', src: this.getImgURL(category.imgData[0].imageNum), alt:'picture'})
    })
  }
*/

/*
  hideCategory() {
    this.categoriesPage.classList.remove('show-page')
    this.categoriesPage.classList.add('hide-page')
    this.categoriesPage.addEventListener('animationend', removeContainer.bind(this))

    function removeContainer() {
      this.container.remove();
      this.categoriesPage.removeEventListener('animationend', removeContainer)
    }
  }
*/
  

  getId(event) {
    let id = '';
    for (let element of event.path) {
      if (element.id && element.classList.contains('categories__card')) {
        id = element.id;
        break;
      }
    }
    return id;
  }
}



export {Categories}