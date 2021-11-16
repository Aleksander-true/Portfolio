import { Common } from "./CommonClass";
import {Categories} from "./Categories";
import {settings} from "./Settings"

class Quiz {
  static _instance = {}

  constructor(id) {
    if (Quiz._instance[id]) return Quiz._instance[id];
    else Quiz._instance[id] = this;
    
    console.log('Quiz id', id)
    let category = settings.categories.find(category => category.id === id)
    console.log('category', category)
    this.categoryName = category.name;
    this.amount = settings.questionsInCategory;
    this.data = category.imgData;
    this.answeredRight =  0;
    this.numberOfQuestion = 0;
  }

  nextQuestion() {
    this.rightAnswer = this.data[this.numberOfQuestion];
    this.descriptions = this.getRandomDescriptions(this.rightAnswer)
    this.numberOfQuestion++;
    if (this.numberOfQuestion >= this.amount ) this.isLastQuestion = true; console.log('Last Question', this.isLastQuestion) 
    return this.descriptions
  }

  getRandomDescriptions(rightAnswer) {
    let descriptions = [rightAnswer];
    while (descriptions.length < 4) {
      let randomNmbr = Math.floor(Math.random() * this.amount);
      let pictureData = this.data[randomNmbr]
      if (!descriptions.includes(pictureData)) descriptions.push(pictureData)
    }
    /* shuffle answers */
    for (let i=0; i < descriptions.length; i++ ) {
      let randomNmbr = Math.round(Math.random() * (descriptions.length - 1))
      let temp = descriptions[i];
      descriptions[i] = descriptions[randomNmbr];
      descriptions[randomNmbr] = temp
      //[descriptions[0], descriptions[3]] = [descriptions[3], descriptions[0]] 
    }
    return descriptions;
  }

  finishThisQuiz(id) {
    settings.categories.forEach(category => {
      if (category.id === id) {
        category.isPlayed = true;
        category.answeredQty = this.answeredRight;
      }
    Quiz._instance[id] = undefined;
    })
    console.log('finish quiz' , settings.categories.find(category => category.name === this.categoryName))
    
  }
  /*
  renderArtistQuestion() {
    this.artistQuiz.innerHTML = '';
    if (settings.timeGame) this.appendElement({parentElement: this.artistQuiz, elementClass: 'quiz__timer', innerHTML: "<h4>Timer 0:00</h4>" })
    this.appendElement({parentElement: this.artistQuiz, elementClass: 'quiz__question', innerHTML: `<h4>Какую картину написал ${this.rightAnswer.author}</h4>` })
    let wrapper = this.appendElement({parentElement: this.artistQuiz, elementClass: 'wrapper_2-col'})
    this.descriptions.forEach( picture => {
      this.appendElement({parentElement: wrapper, tag: 'img', elementClass: 'quiz__img-tile', src: `./base-img/square/${picture.imageNum}.jpg`, alt: 'choose-picture', id: picture.imageNum})
    })
    this.artistQuiz.style.display = 'flex';
    wrapper.addEventListener('click', (event) => this.chosenPicture(event))
  }
  */
  /*
  mainPage(command) {
    if (command === 'hide')  document.querySelector('#main-page').classList.add('hide-page')
    else document.querySelector('#main-page').classList.remove('hide-page')
  }
*/
  chosenPicture(event) {
    let isAnswerRight = false;
    if (event.target.id == this.rightAnswer.imageNum) {
     isAnswerRight = true 
     this.answeredRight++;
    } else {
      isAnswerRight = false
    }
      
    this.renderRightAnswerModal(isAnswerRight)
  }
/*
  renderRightAnswerModal(isAnswerRight) {
    let HTML = `
    <div class="modal__dialog-wrapper">
      <img class="modal__img" src="./base-img/square/${this.rightAnswer.imageNum}.jpg" alt="right-picture" >
      <div class="check-icon check-icon_${isAnswerRight} modal__check"></div>
      <h4 class="modal__picture-name">${this.rightAnswer.name}</h4>
      <h5 class="modal__author">${this.rightAnswer.author}, ${this.rightAnswer.year}</h5>
      <button class="button button_colored button_modal" id="next-btn">Next</button>
    </div>
    `
    let modal = this.appendElement({parentElement: document.body, elementClass: 'modal', innerHTML: HTML})
    this.nextBtn = modal.querySelector('#next-btn')
    this.nextBtn.addEventListener('click', () => {
      modal.remove();
      this.endQuestionHandler()
    })
  }
*/
/*
  endQuestionHandler() {
    if (this.numberOfQuestion >= this.amount) {
      let currentCategory = settings.categories.find(item => item.name == this.categoryName)
      currentCategory.answeredQty = this.answeredRight;
      currentCategory.isPlayed = true;
      this.renderFinalModal()
    } else {
      this.nextQuestion()
    }
  }

  renderFinalModal() {
    let HTML = `
    <div class="modal__dialog-wrapper">
      <div class="trophy-cup-icon modal__trophy-cup-icon"></div>
      <h4 class="modal__congratulations">Congratulations!</h4>
      <h1 class=""modal__answered-questions">${this.answeredRight}/${this.amount}</h1>
      <div class="modal__buttons">
        <button class="button button_modal" id="home-btn">Home</button>
        <button class="button button_colored button_modal"  id="next-quiz-btn">Next Quiz</button>
      </div>
    </div>
    `
    this.modal = this.appendElement({parentElement: document.body, elementClass: 'modal', innerHTML: HTML})

    this.homeBtn = this.modal.querySelector('#home-btn')
    this.nextQuizBtn = this.modal.querySelector('#next-quiz-btn')
    //this.homeBtn.addEventListener('click', ()=> new Categories())
    this.nextQuizBtn.addEventListener('click', () => this.finishThisQuiz())
  }
*/
  
}



export {Quiz}