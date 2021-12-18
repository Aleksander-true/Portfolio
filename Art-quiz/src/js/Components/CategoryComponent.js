import { PlayAudio } from "../PlayAudio"
import { Settings } from "../Settings"
import { Timer } from "../Timer"
import { HeaderComponent } from "./HeaderComponent"
import { Menu } from "./Menu"


const CategoryComponent = {
  render: (type) => {
    const playAudio = new PlayAudio()
    playAudio.sound('openPage')

    const timer = new Timer()
    timer.removeTimer()

    const settings = new Settings()
    settings.quizType = type;
    let cardsHTML = settings.categories[type].reduce( (html,cat) => {
      return html + CategoryCard.render(cat)
    },'');
    return `
    ${HeaderComponent.render()}
    <div class="categories show-page" id="categories-page">
    <div class="logo logo_marked"></div>
    <div class="categories__title"><h2>Categories</h2></div>
    <div class="cards-wrapper" id="cards-wrapper">
    ${cardsHTML}
    </div>
    ${Menu.render()}
    `
  }
} 

const CategoryCard = {
  render: ({name, id, isPlayed, answeredQty, totalQuestions, imgData}) => {
    return `
    <div class="card played__${isPlayed}" id="${id}">
      <span class="card_name"> <h4>${name}</h4></span>
      <span class="card_solved-qty visible__${isPlayed}"><h4>${answeredQty}/${totalQuestions}</h4></span>
      <a href="#/category/quiz&${id}">
        <img class="card_img" src="./base-img/square/${imgData[0].imageNum}.jpg" alt="picture">
      </a>
    </div>
    `;
  }
} 

export {CategoryComponent}