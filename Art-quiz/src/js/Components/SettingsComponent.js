import { Settings } from "../Settings";
import { FooterComponent } from "./FooterComponent";

const SettingsComponent = {
  render: () => {
    const settings = new Settings();
    settings.changeSettings();

    return `
    <div class="settings" id="settings-page"> 
    <h4 class="settings__header">Settings</h4>
    <div class="settings__container ">
      <h2 class="settings__title">Volume</h2>
      <input class="volume__range" type="range" name="volume" id="volume-range">
        <span class="volume__icon volume__icon_mute"></span>
        <span class="volume__icon volume__icon_speaker"></span>
    </div>
    <div class="settings__container">
      <h2 class="settings__title">Time game</h2>
      <div class="settings__time">
        <h2 class="settings__time-text">ON</h2>
        <div class="switch-btn switch-on" id="time-game"></div>
      </div>
    </div>
    <div class="settings__container" id="container-time-to-answer">
      <h2 class="settings__title">Time to answer</h2>
      <div class="settings__time">
        <button class="button button_set-time button_colored" onclick="this.nextElementSibling.stepDown()"></button>
        <input class="settings__input"   type="number" name="" id="time-to-answer" value="20" min="2" max="99">
        <button class="button button_set-time button_set-time_plus" onclick="this.previousElementSibling.stepUp()"></button>
      </div>
    </div>
    <div class="settings__container settings__container_buttons">
      <button class="button button_question" id="default-btn">Default</button>
      <button onclick="location.href = '#/'" class="button button_question button_colored">Home</button>
    </div>
  </div>
  ${FooterComponent.render()}
  <iframe style="display:none" id="frame" onload="" src=""></iframe>
    `
  }
}

export {SettingsComponent}