import {images} from "./Images"



class Settings {
  static _instance = undefined;

  constructor() {
    if (Settings._instance) return Settings._instance;
    else Settings._instance = this;

    this.quizType = '';
    this.volume = 50;
    this.timeGame = false;
    this.secondToAnswer = 20;
    this.categoryQty = 12;
    this.questionsInCategory = 4;
    this.categories = {
      artist: [
      {name: 'Apprentice', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Master', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Secret Master', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Perfect Master', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Intimate Secretary', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Provost', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Intendant', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Sublime Master', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Grand Master', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Knight', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Pontiff', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Prince', isPlayed: false, answeredQty: undefined, imgData: []}
      ],
      pictures: [
      {name: 'Apprentice', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Master', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Secret Master', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Perfect Master', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Intimate Secretary', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Provost', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Intendant', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Sublime Master', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Grand Master', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Knight', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Pontiff', isPlayed: false, answeredQty: undefined, imgData: []},
      {name: 'Prince', isPlayed: false, answeredQty: undefined, imgData: []}
      ]
    }
    this.setCategories()
  }

  setCategories() {
    for (let type in this.categories) {
      console.log('categoryType set', type)
      this.categories[type].forEach( (set,index) => {
        set.id = this.convertToId(set.name);
        set.totalQuestions = this.questionsInCategory;
        set.imgData = this.getImgData(index, type);
      })
    }
    console.log('settings set', this.categories)
  }

  convertToId(str) {
    return str.replace(' ', '_').toLowerCase()
  }

  getImgData(categoryNumber, type) {
    let startIndex;
    type == 'pictures'? startIndex = 120 + (categoryNumber * this.questionsInCategory) : startIndex = categoryNumber * this.questionsInCategory
    return images.slice(startIndex, startIndex + this.questionsInCategory) 

  }

  changeSettings() {
    console.log('changeSettings')
    /**Checking if load */
    if (document.querySelector('#settings-page')) {
      
      let page = document.querySelector('#settings-page')
      

      /**Volume game settings */
      this.volumeInput = page.querySelector('#volume-range')
      this.volumeInput.addEventListener('input', (e) => {
        const value = e.target.value;
        this.volume = value
        e.target.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`
      })

      /**Time game settings */
      const timeGameSwitch = page.querySelector('#time-game')
      const containerSecondToAnswer = page.querySelector('#container-time-to-answer')  
      const secondToAnswer = page.querySelector('#time-to-answer')  

      const text = page.querySelector('.settings__time-text')
      if (this.timeGame) {
        text.textContent = "ON"
        timeGameSwitch.classList.add('switch-on')
        containerSecondToAnswer.classList.remove('hidden')
      } else {
        text.textContent = "OFF"
        timeGameSwitch.classList.remove('switch-on')
        containerSecondToAnswer.classList.add('hidden')
      }

      timeGameSwitch.addEventListener('click', (e)=> {
        e.target.classList.toggle('switch-on')
        containerSecondToAnswer.classList.toggle('hidden')
        this.timeGame = !this.timeGame
        text.textContent == "ON" ? text.textContent = "OFF" : text.textContent = "ON"
      })

      containerSecondToAnswer.addEventListener('click', (e)=> {
        this.secondToAnswer = secondToAnswer.value
      })
 
    /**If hasn't load yet, try in 10ms */
    } else {
      console.log('try')
      setTimeout(this.changeSettings, 10)
    }
  }
  
}

export {Settings}

/*
let settings = {
quizType: '',
volume: 50,
timeGame: false,
secondToAnswer: 20,
categoryQty:12,
questionsInCategory:4,
categories: {
  artist: [
  {name: 'Apprentice', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Master', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Secret Master', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Perfect Master', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Intimate Secretary', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Provost', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Intendant', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Sublime Master', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Grand Master', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Knight', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Pontiff', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Prince', isPlayed: false, answeredQty: undefined, imgData: []}
  ],
  pictures: [
  {name: 'Apprentice', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Master', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Secret Master', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Perfect Master', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Intimate Secretary', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Provost', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Intendant', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Sublime Master', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Grand Master', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Knight', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Pontiff', isPlayed: false, answeredQty: undefined, imgData: []},
  {name: 'Prince', isPlayed: false, answeredQty: undefined, imgData: []}
  ]}
}
if (localStorage.getItem('settings')) settings = Object.assign({},JSON.parse(localStorage.getItem('settings')))

window.addEventListener('beforeunload', () => localStorage.setItem('settings', JSON.stringify(settings))); 
console.log('settings', settings)

*/