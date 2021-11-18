import {Settings} from "./Settings"

class Timer {
  static _instance = {}

  constructor(id) {
    if (Timer._instance[id]) return Timer._instance[id];
    else Timer._instance[id] = this;

    this.id = id
    let settings = new Settings();
    let isTimeGame = settings.timeGame;
    let seconds = settings.secondToAnswer;
  
    if (isTimeGame) this.startTimer(seconds, seconds)
    
  }

  startTimer(sec, total) {
    if (sec == 0) return  document.location.assign(`#/modal/result-quiz&${this.id}`)
    document.location.assign(`#/category/quiz/header-timer&${sec}&${total}`)
    this.timerID = setTimeout(() => this.startTimer(sec-1, total), 1000);
  }

  removeTimer() {
    clearTimeout(this.timerID)
    document.location.assign(`#/category/quiz/header-timer&9&0`)
    Timer._instance[this.id] = undefined;
  }
}

export {Timer}