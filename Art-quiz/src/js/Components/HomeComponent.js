import { PlayAudio} from "../PlayAudio"
import { HeaderComponent } from "./HeaderComponent";
import { FooterComponent } from "./FooterComponent";



const HomeComponent = {
  render: () => {
    const playAudio = new PlayAudio()
    playAudio.sound('openPage')
    return `
    ${HeaderComponent.render()}
    
      <div class="main-page__menu" id="main-page-menu">
        <div class="logo"></div>
        <div  class="main-page__buttons">
          <button onclick="location.href = '#/category&artist'" class="button" id="artist-quiz-btn">Artist quiz</button>
          <button onclick="location.href = '#/category&pictures'" class="button" id="picture-quiz-btn">Pictures quiz</button>
        </div>
        </div>
  
    ${FooterComponent.render()}
    `;
  }
} 

export {HomeComponent}