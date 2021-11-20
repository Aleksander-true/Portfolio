import {Settings} from "./Settings"

class Quiz {
  static _instance = undefined

  constructor(id) {
    this.settings = new Settings()
    if (id) Quiz._instance = this;
    else return Quiz._instance;

    this.id = id
    let category = this.settings.categories[this.settings.quizType].find(category => category.id === id)
    this.type = this.settings.quizType;
    this.categoryName = category.name;
    this.amount = this.settings.questionsInCategory;
    this.data = category.imgData;
    this.answeredRight =  0;
    this.numberOfQuestion = 0;
    this.isLastQuestion = false;
  }

  nextQuestion() {
    this.rightAnswer = this.data[this.numberOfQuestion];
    this.descriptions = this.getRandomDescriptions(this.rightAnswer)
    this.numberOfQuestion++;
    if (this.numberOfQuestion >= this.amount ) this.isLastQuestion = true
    else this.isLastQuestion = false;
    return this.descriptions
  }

  getRandomDescriptions(rightAnswer) {
    let descriptions = [rightAnswer];
    while (descriptions.length < 4) {
      let randomNmbr = Math.floor(Math.random() * this.amount);
      let pictureData = this.data[randomNmbr]
      if (!descriptions.find(item => item.author == pictureData.author)) descriptions.push(pictureData)
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

  finishThisQuiz() {

    this.settings.categories[this.settings.quizType].forEach(category => {
      if (category.id === this.id) {
        category.isPlayed = true;
        category.answeredQty = this.answeredRight;
      }
    })
    Quiz._instance = undefined;
  }

  getNextId() {
    let settings = new Settings()
    let id = this.id;
    let index = settings.categories[settings.quizType].findIndex(item => item.id === id)
    if (index + 1 == settings.categories[settings.quizType].length) return settings.categories[settings.quizType][0].id
    else return settings.categories[settings.quizType][index + 1].id
  }

  checkRightAnswer(answerImageNum) {
    let isRight = false;
    this.rightAnswer.isGuested = false;
    if (answerImageNum === this.rightAnswer.imageNum)  {
      this.rightAnswer.isGuested = true;
      isRight = true;
      this.answeredRight++;
    }
    return isRight
  }

  checkSuccess() {
    return  (this.answeredRight >= this.settings.rightAnswerToWin)
  }
}

export {Quiz}