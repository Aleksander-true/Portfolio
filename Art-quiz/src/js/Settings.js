
class Settings {
  static _instance = undefined;
  static _default = {
    quizType: '',
    volume: 50,
    timeGame: true,
    secondToAnswer: 40,
    categoryQty:12,
    questionsInCategory:10,
    rightAnswerToWin: 6
  } 
  static  _categories = {
      artist: ['Apprentice','Master','Secret Master','Perfect Master','Intimate Secretary','Provost','Intendant', 'Sublime Master', 'Grand Master','Knight','Pontiff','Prince'], 
      pictures: ['Apprentice','Master','Secret Master','Perfect Master','Intimate Secretary','Provost','Intendant', 'Sublime Master', 'Grand Master','Knight','Pontiff','Prince']
      }

  constructor() {
    /** Singleton */
    if (Settings._instance) return Settings._instance;
    else Settings._instance = this;

    /**Restoring settings and saves from localStorage */
    
    if (localStorage.getItem('settings')) {
      try {
        //throw new Error('test')
        this.settingsFromObject(JSON.parse(localStorage.getItem('settings')))

      } catch (e) {
        console.log("Can't restore saves because:", e.message)
        this.setDefaultSettings()
        this.getImagesFromJson()
      }
    } else {
      this.setDefaultSettings()
      this.getImagesFromJson()
    }
    
    /**Save settings and saves */
    window.addEventListener('beforeunload', () => localStorage.setItem('settings', this.getSettings())); 
  }

  getSettings() {
    let set = Object.assign({}, this);
    return JSON.stringify(set)
  }

  settingsFromObject(settingsObj) {
    Object.assign(this, settingsObj);
  }

  setDefaultSettings() {
    this.settingsFromObject(Settings._default)
  }

  async getImagesFromJson() {
    try {
      let response = await fetch('./js/Images.json');
      const images = await response.json();
      this.setCategories(images)
    } catch (error) {
      console.log("Can't read data", error.message)
    }
  }

  setCategories(images) {
    this.categories = Settings._categories
    for (let type in  this.categories) {
      this.categories[type] = this.categories[type].map( (catName,index) => {
        return {
        name: catName,
        id: this.convertToId(catName),
        isPlayed: false,
        answeredQty: undefined,
        totalQuestions: this.questionsInCategory,
        imgData: this.getImgData(index, type, images)
        }
      })
    }
    console.log('this.categories', this.categories)
  }

  convertToId(str) {
    return str.replace(' ', '_').toLowerCase()
  }

  getImgData(categoryNumber, type, images) {
    const startIndex = (type == 'pictures')? 120 + categoryNumber * this.questionsInCategory : categoryNumber * this.questionsInCategory
    return  images.slice(startIndex, startIndex + this.questionsInCategory) 
  }

  changeSettings() {
    /**Checking if load */
    
    if (document.querySelector('#settings-page')) {     
      let page = document.querySelector('#settings-page')

      /**Volume game settings */
      const volumeInput = page.querySelector('#volume-range')
      const changeVolume = (value) => {
        this.volume = value
        volumeInput.value = value
        volumeInput.style.background = `linear-gradient(to right, #FFBCA2 0%, #FFBCA2 ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`
      }
      changeVolume(this.volume)
      volumeInput.addEventListener('input', (e) => changeVolume(e.target.value))

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
      secondToAnswer.value = this.secondToAnswer
      containerSecondToAnswer.addEventListener('click', (e)=> {
        this.secondToAnswer = secondToAnswer.value
      })

      /**Default settings button */
      const defaultBtn = page.querySelector('#default-btn')
      const setDefault = () => {
        this.setDefaultSettings();
        document.location.reload()
      }
      defaultBtn.addEventListener('click', () => setDefault())
    
    /**If hasn't load yet, try in 10ms */
    } else {
      console.log('try')
      setTimeout(() => this.changeSettings(), 10)
    }
  }
}

export {Settings}