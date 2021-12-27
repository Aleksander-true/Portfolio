import { config } from '../config';
import View from './View';

export default class Song extends View {
  audio: HTMLAudioElement;

  configSong: { parentElementID: string; classes: string[]; songUrl: string; };

  constructor(configSong: { parentElementID: string; classes: string[]; songUrl: string; }) {
    super();
    this.configSong = configSong;
    this.audio = new Audio(configSong.songUrl);
    this.render();
  }

  render() {
    const button = super.create(this.configSong.parentElementID, 'div', this.configSong.classes);
    button.addEventListener('click', ()=> this.toggleAudio(button));
  }

  toggleAudio(button: HTMLElement){
    super.toggleActive(button);
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}