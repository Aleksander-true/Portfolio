import {Settings} from "./Settings"

class Timer {
  static _instance = undefined

  constructor() {
    
    if (Timer._instance) return Timer._instance;
    else Timer._instance = this;

    let settings = new Settings();
    let isTimeGame = settings.timeGame;
    let seconds = settings.secondToAnswer;
  
    if (isTimeGame) this.startTimer(seconds, seconds)
  }

  startTimer(sec, total) {
    if (sec == 0) return  document.location.assign(`#/modal/result-quiz`)
    document.location.assign(`#/category/quiz/header-timer&${sec}&${total}`)
    this.timerID = setTimeout(() => this.startTimer(sec-1, total), 1000);
  }

  removeTimer() {
    clearTimeout(this.timerID)
    document.location.assign(`#/category/quiz/header-timer&9&0`)
    Timer._instance = undefined;
  }
}

export {Timer}