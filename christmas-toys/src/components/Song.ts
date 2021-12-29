import { settings } from './Settings';
import View from './View';

export default class Song extends View {
  static audio = new Audio();

  audio: HTMLAudioElement;

  configSong: { parentElementID: string; classes: string[]; songUrl: string; };

  constructor(configSong: { parentElementID: string; classes: string[]; songUrl: string; }) {
    super();
    this.configSong = configSong;
    this.audio = Song.audio;
    
    if (!this.audio.currentSrc) {
      this.audio.src = this.configSong.songUrl;
    }
    if (settings.treePage.isPlaySong) {
      this.renderButton('active');
      this.audio.play();
    } else {
      this.renderButton();
    }
  }

  renderButton(additionClass: string | undefined = undefined) {
    const button = super.create(this.configSong.parentElementID, 'div', this.configSong.classes);
    if (additionClass) {
      button.classList.add(additionClass);
    }
    
    button.addEventListener('click', ()=> this.toggleAudio(button));
  }

  toggleAudio(button: HTMLElement | undefined  = undefined){
    if (button){
      super.toggleActive(button);
    }
    if (this.audio.paused) {
      settings.treePage.isPlaySong = true;
      this.audio.play();
    } else {
      settings.treePage.isPlaySong = false;
      this.audio.pause();
    }

  }
}