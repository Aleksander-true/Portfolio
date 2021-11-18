import {Settings} from "./Settings"

class Quiz {
  static _instance = {}

  constructor(id) {
    this.settings = new Settings()
    if (Quiz._instance[id + this.settings.quizType]) return Quiz._instance[id + this.settings.quizType];
    else Quiz._instance[id + this.settings.quizType] = this;

    console.log('Quiz id', id)
    let category = this.settings.categories[this.settings.quizType].find(category => category.id === id)
    this.type = this.settings.quizType;
    this.categoryName = category.name;
    this.amount = this.settings.questionsInCategory;
    this.data = category.imgData;
    this.answeredRight =  0;
    this.numberOfQuestion = 0;
  }

  nextQuestion() {
    console.log(' nextQuestion() ' )
    this.rightAnswer = this.data[this.numberOfQuestion];
    this.descriptions = this.getRandomDescriptions(this.rightAnswer)
    this.numberOfQuestion++;
    if (this.numberOfQuestion >= this.amount ) this.isLastQuestion = true;
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
    }
    return descriptions;
  }

  finishThisQuiz(id) {

    this.settings.categories[this.settings.quizType].forEach(category => {
      if (category.id === id) {
        category.isPlayed = true;
        category.answeredQty = this.answeredRight;
      }
    })
    Quiz._instance[id + this.settings.quizType] = undefined;
    //console.log('settings', settings)
  }
}

export {Quiz}