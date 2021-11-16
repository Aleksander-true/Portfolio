import {settings} from "./Settings"
import {Categories} from "./Categories"
import {images} from "./Images"

class Game {
  constructor() {
    /*
    this.artistQuizBtn = document.querySelector('#artist-quiz-btn')
    this.artistQuizBtn.addEventListener('click', () => {this.chooseCategory('artistQuiz')})

    this.pictureQuizBtn = document.querySelector('#picture-quiz-btn')
    this.pictureQuizBtn.addEventListener('click', () => {this.chooseCategory('pictureQuiz')})
    */
    this.setCategories(); 
  }

  setCategories() {
    console.log('setCategories start')
   settings.categories.forEach( (set,index) => {
    set.id = this.convertToId(set.name);
    set.totalQuestions = settings.questionsInCategory;
    set.imgData = this.getImgData(index);
    })
    console.log('settings.categories', settings.categories)
  }

  convertToId(str) {
    return str.replace(' ', '_').toLowerCase()
  }

  getImgData(categoryNumber) {
    return images.slice(categoryNumber * settings.questionsInCategory, categoryNumber * settings.questionsInCategory + settings.questionsInCategory)
  }

  chooseCategory(categoryType) {
    //settings.quizType = categoryType;
    new Categories()
  }
}


let game = new Game();







