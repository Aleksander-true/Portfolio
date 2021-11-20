import { PlayAudio } from "../PlayAudio";
import { Settings } from "../Settings";
import { FooterMenu } from "./FooterMenu";

const ScoreComponent = {
  render: (categoryNumber) => {
    const playAudio = new PlayAudio()
    playAudio.sound('openPage')

    if (categoryNumber == undefined) categoryNumber = 0;
    const settings = new Settings()
    const category =  settings.categories[settings.quizType][categoryNumber]
    const nextCategoryNumber = settings.categories[settings.quizType][+categoryNumber+1]? +categoryNumber+1 : 0;
    const previousCategoryNumber = settings.categories[settings.quizType][+categoryNumber-1]? +categoryNumber-1 : settings.categories[settings.quizType].length - 1;
    const points = getPoints(category)
    const cardsHTML = category.imgData.reduce( (html,imgDescription) => {
      return html + ScoreCard.render(imgDescription, categoryNumber)
    },'');

    return `
    <div class="score">
    <div class="score__title">Score</div>
    <div class="score__navigation">
      <button onclick="location.href = '#/score&${previousCategoryNumber}'" class="button button__arrow button__arrow_left"><</button>
      <h2 class="score__category-name"><span class="score__category-name_color" >${category.name}:</span> <br>${points} </h2>
      <button onclick="location.href = '#/score&${nextCategoryNumber}'" class="button button__arrow button__arrow_right">></button>
    </div>
    <div class="cards-wrapper cards-wrapper_tree-column show-page">
    ${cardsHTML} 
    </div>
  </div>
  ${FooterMenu.render()}
    `;
  }
} 

const getPoints = (category) => {
  const points = category.imgData.reduce( (sum, imgDescription) => sum + Number(imgDescription.isGuested),0)
  if (isNaN(points)) return 'not played' 
  else return points === 1 ? `${points} point` : `${points} points`
}

const ScoreCard = {
  render: (imgDescription, categoryNumber) => {
    const href = imgDescription.isGuested === undefined ? '#/modal/score-warning' : `#/modal/learn-picture&${categoryNumber}&${imgDescription.imageNum}`;
    return `
      <div class="card played__${imgDescription.isGuested}">
        <a href="${href}">
          <img class="card_img" src="./base-img/square/${imgDescription.imageNum}.jpg" alt="picture">
        </a>
        <div class="check-icon check-icon_${imgDescription.isGuested} score__check"></div>
      </div>
    `;
  }
} 

export {ScoreComponent}