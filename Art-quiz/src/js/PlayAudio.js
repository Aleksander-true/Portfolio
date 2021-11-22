import {Settings} from "./Settings"

class PlayAudio{
  constructor() {
    this.sounds = {
      badResult: './assets/sounds/bad-result.mp3',
      goodResult: './assets/sounds/good-result.mp3',
      openPage: './assets/sounds/open-page-sound.mp3',
      falseAnswer: './assets/sounds/wrongAnswer.mp3',
      rightAnswer: './assets/sounds/right-answer-sound.mp3',
      timesUp: './assets/sounds/timesUP-sound.mp3',
      clickButton: './assets/sounds/button-sound.mp3'
    }
    this.player = new Audio();
    this.settings = new Settings() 
  }

  sound(soundName) {
    this.player.volume = this.settings.volume / 100
    this.player.pause()
    this.player.currentTime = 0;
    this.player.src = this.sounds[soundName]
    this.player.play()
  }

}

export {PlayAudio}